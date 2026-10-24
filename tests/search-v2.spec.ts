import { expect, test } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

import { searchEval } from "../src/lib/data/search-eval-v2";

const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;
if (executablePath) {
  test.use({ launchOptions: { executablePath } });
}

const shots = join(homedir(), ".local/tmp/sse/shots");
mkdirSync(shots, { recursive: true });
const posthocShots = join(homedir(), ".local/tmp/sanityboard-shots");
mkdirSync(posthocShots, { recursive: true });

test("post-hoc additions keep all retrieval rows and show the Developer Index result", async ({
  page,
}) => {
  await page.goto("http://localhost:4173/evals/search-v2");
  const section = page.getByRole("region", {
    name: "What changed after the frozen evaluation?",
    exact: true,
  });
  await expect(
    section.getByRole("heading", {
      name: "What changed after the frozen evaluation?",
    }),
  ).toBeVisible();
  await expect(section).toContainText("Post-hoc additions, 2026-10-24");
  const retrieval = section.getByRole("table", {
    name: "Post-hoc retrieval",
    exact: true,
  });
  await expect(retrieval.locator("tbody tr")).toHaveCount(11);
  const developer = retrieval.getByRole("row").filter({
    has: page.getByRole("rowheader", {
      name: "firecrawl:developer new",
      exact: true,
    }),
  });
  await expect(developer.getByRole("cell").nth(1)).toHaveText("19/24");
  await expect(
    retrieval.getByRole("row").filter({ hasText: "exa:auto-uncached" }),
  ).toContainText("control");
  await expect(
    retrieval.getByRole("link", { name: "Cache-flattered latency; see note" }),
  ).toHaveAttribute("href", "#posthoc-latency-note");
  await expect(section.locator("#posthoc-latency-note")).toContainText(
    "use exa:auto-uncached for latency",
  );
  const agents = section.getByRole("table", { name: "Post-hoc agents" });
  await expect(agents.locator("tbody tr")).toHaveCount(2);
  await expect(
    agents.getByRole("row").filter({ hasText: "firecrawl:developer" }),
  ).toContainText("4/4");
  await page.setViewportSize({ width: 390, height: 900 });
  const scrollRegion = section.getByRole("region", {
    name: "Post-hoc retrieval results, scroll horizontally",
    exact: true,
  });
  await scrollRegion.focus();
  await page.keyboard.press("ArrowRight");
  await expect
    .poll(() => scrollRegion.evaluate((element) => element.scrollLeft))
    .toBeGreaterThan(0);
});

test("OpenCode recommendation links to the separate post-hoc section", async ({
  page,
}) => {
  await page.goto("http://localhost:4173/evals/search-v2");
  const card = page.locator("#recommendations article").filter({
    has: page.getByRole("heading", {
      name: "OpenCode: Parallel fast",
      exact: true,
    }),
  });
  const update = card.getByRole("link", { name: "see post-hoc additions" });
  await expect(update).toHaveAttribute("href", "#posthoc");
  await update.click();
  await expect(page).toHaveURL(/\/evals\/search-v2#posthoc$/);
  await expect(page.locator("#posthoc-title")).toBeInViewport();
  await expect(
    page
      .getByRole("navigation", { name: "Report sections" })
      .getByRole("link", { name: "Post-hoc" }),
  ).toHaveAttribute("href", "#posthoc");
});

test("retrieval filters and question inspection work with the keyboard", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("http://localhost:4173/evals/search-v2");
  await expect(
    page.getByRole("heading", { name: "Search API Eval v2", exact: true }),
  ).toBeVisible();
  await expect(page.getByText("18/18", { exact: true })).toBeVisible();
  const heatmap = page.getByRole("region", {
    name: "Per-question evidence ranks, scroll horizontally",
  });
  await expect(heatmap.getByRole("row")).toHaveCount(
    searchEval.retrieval.cases + 1,
  );
  for (const [name, count] of [
    ["Revera-like", searchEval.retrieval.slices.revera],
    ["OpenCode-like", searchEval.retrieval.slices.opencode],
    ["Traps", searchEval.retrieval.slices.traps],
  ] as const) {
    const filter = page.getByRole("button", { name, exact: true });
    await filter.focus();
    await page.keyboard.press("Enter");
    await expect(filter).toHaveAttribute("aria-pressed", "true");
    await expect(heatmap.getByRole("row")).toHaveCount(count + 1);
  }
  await page.getByRole("button", { name: "All", exact: true }).click();
  const question = searchEval.retrieval.matrix[1];
  const rowButton = heatmap.getByRole("button", {
    name: new RegExp(question.id),
  });
  await rowButton.focus();
  await page.keyboard.press("Enter");
  await expect(rowButton).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("#question-details")).toContainText(
    question.question,
  );
  await expect(page.locator("#question-details")).toContainText(
    question.difficulty,
  );
  await heatmap.getByRole("row").nth(1).getByRole("cell").first().hover();
  await expect(page.locator("#question-details")).toContainText(
    searchEval.retrieval.matrix[0].question,
  );
  await expect(heatmap.getByLabel("read error", { exact: true })).toHaveCount(
    2,
  );
  await expect(page.locator("#revera")).toContainText("1.9x");
  await expect(page.locator("#opencode")).toContainText("1.8x");
  await expect(page.locator("#opencode")).toContainText(
    "Exa 2/3, Firecrawl 1/3, none 2/3",
  );
  await expect(
    page.getByRole("link", { name: "source: INTEGRATION_RECOMMENDATIONS.md" }),
  ).toHaveAttribute("href", /INTEGRATION_RECOMMENDATIONS\.md$/);
  await page.setViewportSize({ width: 375, height: 900 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    375,
  );
  await heatmap.focus();
  await page.keyboard.press("ArrowRight");
  await expect
    .poll(() => heatmap.evaluate((element) => element.scrollLeft))
    .toBeGreaterThan(0);
  expect(errors).toEqual([]);
});

test("run markers retain primary outcomes and evidence bars match their legend", async ({
  page,
}) => {
  await page.goto("http://localhost:4173/evals/search-v2");
  const missedRuns = page
    .locator("#revera")
    .getByRole("row")
    .filter({ hasText: "rv-got16-http2-agent" })
    .getByRole("cell")
    .last()
    .getByRole("img");
  await expect(missedRuns).toHaveCount(3);
  for (const run of await missedRuns.all()) {
    await expect(run.locator("circle")).toHaveCount(2);
    await expect(run.locator("circle").first()).toHaveAttribute("r", "5.5");
    await expect(run.locator("circle").first()).toHaveAttribute("fill", "none");
    await expect(run.locator("circle").last()).toHaveAttribute("r", "2.75");
  }
  const cleanTask = page
    .locator("#revera")
    .getByRole("row")
    .filter({ hasText: "rv-got16-migrate" });
  const exaUncertain = cleanTask
    .getByRole("cell")
    .first()
    .getByRole("img")
    .nth(2);
  await expect(exaUncertain.locator("circle")).toHaveCount(2);
  await expect(exaUncertain.locator("circle").first()).toHaveAttribute(
    "fill",
    "#6366f1",
  );
  const parallelStrict = cleanTask.getByRole("cell").nth(1).getByRole("img");
  await expect(parallelStrict.locator("path")).toHaveCount(1);
  await expect(parallelStrict.locator("circle")).toHaveCount(1);
  await expect(
    page.getByText(
      "Small amber dot: an uncertain comment was also filed (not a strict finding)",
      { exact: true },
    ),
  ).toBeVisible();

  const exaBars = page
    .getByRole("img", { name: /^Exa: evidence at rank 1/ })
    .locator("rect");
  await expect(exaBars).toHaveCount(2);
  await expect(exaBars.first()).toHaveAttribute("fill", "#6366f1");
  await expect(exaBars.first()).not.toHaveAttribute("opacity");
  const insetColor = await exaBars
    .last()
    .evaluate((element) => getComputedStyle(element).fill);
  const legendColor = await page
    .getByText("Evidence@1 (lighter inset)", { exact: true })
    .locator("span")
    .evaluate((element) => getComputedStyle(element).backgroundColor);
  expect(insetColor).toBe(legendColor);
  await expect(
    page.locator("#opencode").getByText(/^Every lost run was on/),
  ).toHaveText(
    "Every lost run was on oc-ai7, with the same tsc error: the code used a non-generic ToolExecutionOptions, but it is generic in the installed ai@7.0.143 (in the quick pass, the web arms had copied it from docs). In repeat runs oc-ai7 was noisy for every arm (Exa 2/3, Firecrawl 1/3, none 2/3).",
  );
  await expect(page.getByText(/^A blinded LLM judge,/)).toHaveText(
    "A blinded LLM judge, shown the same search results and read page, agreed with the deterministic match (gold fact anywhere in that payload) on all 120 units: 115 supported, 5 insufficient, 0 contradicted.",
  );
  await expect(
    page.getByText("Provider fee estimate", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("List-price estimate; Exa portion metered", { exact: true }),
  ).toBeVisible();
  await expect(
    page.locator("#revera").getByText(/^An Exa review used about/),
  ).toHaveText(
    "An Exa review used about 1.9x the no-search model cost, with similar wall time.",
  );
  await expect(
    page.locator("#opencode").getByText(/^Search arms used about/),
  ).toContainText(
    "Search arms used about 1.8x the model spend of no search, without adding passes.",
  );
});

for (const width of [1280, 390]) {
  test(`keyboard focus keeps a lower question in the viewport at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("http://localhost:4173/evals/search-v2");
    const heatmap = page.getByRole("region", {
      name: "Per-question evidence ranks, scroll horizontally",
    });
    const buttons = heatmap.getByRole("button");
    const questionIndex = searchEval.retrieval.matrix.length - 2;
    const question = searchEval.retrieval.matrix[questionIndex];
    await buttons.first().focus();
    for (let index = 0; index < questionIndex; index++) {
      await page.keyboard.press("Tab");
    }
    await expect(buttons.nth(questionIndex)).toBeFocused();
    await expect(buttons.nth(questionIndex)).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    const details = page.locator(
      width === 390 ? "#question-inline-details" : "#question-details",
    );
    const text = details.getByText(question.question, { exact: true });
    await expect(text).toBeInViewport({ ratio: 1 });
    const bounds = await text.boundingBox();
    expect(bounds?.y).toBeGreaterThanOrEqual(112);
    if (width === 1280) await expect(details).toHaveCSS("position", "sticky");
  });
}

for (const theme of ["light", "dark"] as const) {
  for (const width of [1280, 390]) {
    test(`full report screenshot, ${theme}, ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript(
        (value) => localStorage.setItem("theme", value),
        theme,
      );
      await page.goto("http://localhost:4173/evals/search-v2");
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator("html")).toHaveClass(
        theme === "dark" ? /dark/ : /^(?!.*\bdark\b).*$/,
      );
      await expect(
        page.getByRole("heading", {
          name: "Method & limitations",
          exact: true,
        }),
      ).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
      const primaryMarkers = page.locator(
        '#revera circle[r="5.5"], #opencode circle[r="5.5"]',
      );
      expect(await primaryMarkers.count()).toBeGreaterThan(0);
      if (theme === "light") {
        const contrastRatios = await primaryMarkers.evaluateAll((markers) =>
          markers.map((marker) => {
            const rgb = getComputedStyle(marker)
              .stroke.match(/\d+(?:\.\d+)?/g)
              ?.slice(0, 3)
              .map(Number);
            if (!rgb || rgb.length !== 3)
              throw new Error("Expected an RGB marker stroke");
            const linear = rgb.map((channel) => {
              const value = channel / 255;
              return value <= 0.04045
                ? value / 12.92
                : ((value + 0.055) / 1.055) ** 2.4;
            });
            const luminance =
              linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
            return 1.05 / (luminance + 0.05);
          }),
        );
        expect(Math.min(...contrastRatios)).toBeGreaterThanOrEqual(3);
      } else {
        const parallelMarker = page
          .locator("#revera")
          .getByRole("row")
          .filter({ hasText: "rv-commander15-negate" })
          .getByRole("cell")
          .nth(1)
          .locator("circle")
          .first();
        await expect(parallelMarker).toHaveCSS("stroke", "rgb(6, 182, 212)");
      }
      const heatmap = page.getByRole("region", {
        name: "Per-question evidence ranks, scroll horizontally",
      });
      const widths = await heatmap
        .locator("thead th")
        .evaluateAll((headers) =>
          headers
            .slice(1)
            .map((header) => header.getBoundingClientRect().width),
        );
      expect(Math.max(...widths) - Math.min(...widths)).toBeLessThan(1);
      if (width === 390) {
        const visibleProviders = await heatmap.evaluate((element) => {
          const rightEdge = element.getBoundingClientRect().right;
          return [...element.querySelectorAll("thead th")]
            .slice(1)
            .filter(
              (header) => header.getBoundingClientRect().right <= rightEdge,
            ).length;
        });
        expect(visibleProviders).toBeGreaterThanOrEqual(4);
        const questionColumn = heatmap.locator("tbody th").first();
        const initialLeft = await questionColumn.evaluate(
          (element) => element.getBoundingClientRect().left,
        );
        await heatmap.evaluate(
          (element) => (element.scrollLeft = element.scrollWidth),
        );
        expect(
          await questionColumn.evaluate(
            (element) => element.getBoundingClientRect().left,
          ),
        ).toBeCloseTo(initialLeft, 1);
        await heatmap.evaluate((element) => (element.scrollLeft = 0));
      }
      await page.screenshot({
        path: join(shots, `search-v2-${theme}-${width}.png`),
        fullPage: true,
        animations: "disabled",
      });
      await page.locator("#posthoc").screenshot({
        path: join(posthocShots, `search-v2-posthoc-${theme}-${width}.png`),
        animations: "disabled",
        style: "nav { visibility: hidden !important; }",
      });
    });
  }
}

test("eval listing retains existing cards and links the new report first", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.addInitScript(() => localStorage.setItem("theme", "dark"));
  await page.goto("http://localhost:4173/evals");
  const headings = page.getByRole("heading", { level: 2 });
  await expect(headings).toHaveText([
    "Search API Eval v2",
    "Vector DB Benchmark",
    "Web Search API Benchmark",
  ]);
  await expect(
    page.getByRole("link", { name: /^Search API Eval v2/ }),
  ).toHaveAttribute("href", "/evals/search-v2");
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: join(shots, "evals-dark-1280.png"),
    fullPage: true,
    animations: "disabled",
  });
});
