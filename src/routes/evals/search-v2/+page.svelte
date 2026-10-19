<script lang="ts">
  import { ArrowUpRight, Github } from "lucide-svelte";

  import Seo from "$lib/components/core/Seo.svelte";
  import AgentMatrix from "$lib/components/search-eval/AgentMatrix.svelte";
  import CostChart from "$lib/components/search-eval/CostChart.svelte";
  import EvidenceChart from "$lib/components/search-eval/EvidenceChart.svelte";
  import LatencyChart from "$lib/components/search-eval/LatencyChart.svelte";
  import ProviderLabel from "$lib/components/search-eval/ProviderLabel.svelte";
  import QuestionHeatmap from "$lib/components/search-eval/QuestionHeatmap.svelte";
  import QuickPassTable from "$lib/components/search-eval/QuickPassTable.svelte";
  import SliceTable from "$lib/components/search-eval/SliceTable.svelte";
  import {
    bestSearchCoding,
    codingSpendRatio,
    exa,
    failedReads,
    judgeUnits,
    judgeVerdicts,
    modelCost,
    noSearchCoding,
    noSearchReview,
    parallel,
    profiles,
    PROVIDER_COLORS,
    repeatPasses,
    reviewSpendRatio,
    searchBugs,
    searchEval,
    seconds,
    usd,
  } from "$lib/data/search-eval-v2";

  const REPO = "https://github.com/lemon07r/SanitySearchEval";
  const card =
    "rounded-2xl border border-border/60 bg-card p-5 dark:border-white/10 dark:bg-white/[0.025] sm:p-6";
  const muted = "text-muted-foreground dark:text-white/60";
  const link =
    "text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground dark:text-cyan-200 dark:decoration-cyan-400/30 dark:hover:decoration-cyan-200";
  const cleanReviews = searchEval.agent_matrix.filter(
    (task) => task.product === "revera" && task.clean,
  ).length;
  const sections = [
    { id: "retrieval", label: "Retrieval" },
    { id: "revera", label: "Revera" },
    { id: "opencode", label: "OpenCode" },
    { id: "recommendations", label: "Recommendations" },
    { id: "method", label: "Method & limits" },
  ];
</script>

<Seo
  title="Search API Eval v2"
  description="Brave, Exa, Parallel, Firecrawl and Tavily as search tools for a PR reviewer and a coding agent. Retrieval accuracy, bug finding, hidden tests, latency and cost."
/>

<div
  class="mx-auto w-full max-w-6xl px-5 py-10 text-foreground dark:text-white sm:px-8 sm:py-12"
>
  <a
    href="/evals"
    class="mb-8 inline-block text-sm text-muted-foreground transition-colors hover:text-foreground dark:text-white/55 dark:hover:text-white"
    >&larr; Back to Evals</a
  >

  <header>
    <p
      class="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground dark:text-cyan-300"
    >
      Search tools · real agent work
    </p>
    <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">
      Search API Eval v2
    </h1>
    <p
      class="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground dark:text-white/70 sm:text-xl"
    >
      Which web search API helps a PR reviewer (Revera) and a coding agent
      (OpenCode)?
    </p>
    <div
      class="mt-6 flex flex-wrap gap-2 text-xs text-muted-foreground dark:text-white/65"
    >
      <span
        class="rounded-full border border-border/60 bg-muted/20 px-3 py-2 dark:border-white/10 dark:bg-white/5"
        >Run <time datetime={searchEval.run_date}>{searchEval.run_date}</time
        ></span
      >
      <span
        class="rounded-full border border-border/60 bg-muted/20 px-3 py-2 dark:border-white/10 dark:bg-white/5"
        >{profiles.length} providers + no-search baseline</span
      >
      <span
        class="rounded-full border border-border/60 bg-muted/20 px-3 py-2 dark:border-white/10 dark:bg-white/5"
        >Agent / judge: {searchEval.model.split(" (")[0]}</span
      >
    </div>
    <p
      class="mt-3 text-xs leading-relaxed text-muted-foreground dark:text-white/50"
    >
      Brave, Exa, Parallel, Firecrawl and Tavily. Model settings: {searchEval.model.includes(
        "(",
      )
        ? searchEval.model.slice(searchEval.model.indexOf("(") + 1, -1)
        : ""}.
    </p>
    <div class="mt-6 flex flex-wrap gap-3">
      <a
        href={REPO}
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 rounded-lg border border-foreground bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-colors hover:bg-foreground/85 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
        ><Github size={16} />GitHub repo</a
      >
      <a
        href={`${REPO}/blob/main/REPORT.md`}
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/40 dark:border-white/15 dark:bg-transparent dark:text-white/85 dark:hover:bg-white/5"
        >Full report<ArrowUpRight size={16} /></a
      >
    </div>
    <p
      class="mt-6 max-w-3xl border-l-2 border-border pl-4 text-sm leading-relaxed text-muted-foreground dark:border-cyan-400/40 dark:text-white/60"
    >
      Small samples. Treat comparisons as directional. No blended score: each
      question is answered separately.
    </p>
  </header>

  <div class="mt-10 grid gap-4 lg:grid-cols-3" aria-label="Key takeaways">
    <article class={card}>
      <p
        class="text-xs font-semibold uppercase tracking-wider text-muted-foreground dark:text-indigo-300"
      >
        Revera · PR review
      </p>
      <h2 class="mt-3 text-xl font-semibold leading-snug">
        Search finds breaking-change bugs.
      </h2>
      <div class="mt-5 flex items-baseline gap-3">
        <span class="text-4xl font-bold tracking-tight"
          >{searchBugs.found}/{searchBugs.available}</span
        ><span class="text-sm {muted}">bug-task runs</span>
      </div>
      <p class="mt-2 text-sm {muted}">
        Search arms pooled vs. no search <strong
          class="font-semibold text-foreground dark:text-white/85"
          >{noSearchReview.bugs_found}/{noSearchReview.bugs_available}</strong
        >.
      </p>
      <p class="mt-5 text-sm leading-relaxed {muted}">
        <strong class="font-semibold text-foreground dark:text-white/90"
          >Recommended: keep Exa auto.</strong
        >
        Best rank-1 evidence on review-style lookups ({exa.slices.revera
          .evidence1}/{exa.slices.revera.n}) and no strict false positives.
        Parallel fast is a close, faster, cheaper backup.
      </p>
    </article>
    <article class={card}>
      <p
        class="text-xs font-semibold uppercase tracking-wider text-muted-foreground dark:text-cyan-300"
      >
        OpenCode · coding
      </p>
      <h2 class="mt-3 text-xl font-semibold leading-snug">
        No measurable gain from search on these {noSearchCoding.tasks} tasks.
      </h2>
      <div class="mt-5 flex items-baseline gap-3">
        <span class="text-4xl font-bold tracking-tight"
          >{noSearchCoding.all_pass}/{noSearchCoding.tasks}</span
        ><span class="text-sm {muted}">no search</span>
      </div>
      <p class="mt-2 text-sm {muted}">
        = best search arm <strong
          class="font-semibold text-foreground dark:text-white/85"
          >{bestSearchCoding.all_pass}/{bestSearchCoding.tasks}</strong
        > in the quick pass.
      </p>
      <p class="mt-5 text-sm leading-relaxed {muted}">
        <strong class="font-semibold text-foreground dark:text-white/90"
          >Pick on retrieval and latency:</strong
        >
        Parallel fast ({parallel.evidence[5]}/{parallel.n} evidence@5, ~{seconds(
          parallel.search_ms.p50,
        )} s per search).
      </p>
    </article>
    <article class={card}>
      <p
        class="text-xs font-semibold uppercase tracking-wider text-muted-foreground dark:text-emerald-300"
      >
        Retrieval · held-out
      </p>
      <h2 class="mt-3 text-xl font-semibold leading-snug">
        Exa and Parallel tie at the top.
      </h2>
      <ul
        class="mt-5 space-y-2.5"
        aria-label={`Evidence at rank 5 out of ${searchEval.retrieval.cases}`}
      >
        {#each profiles as profile (profile.arm)}
          <li class="flex items-center gap-3 text-xs">
            <span class="w-16 shrink-0">{profile.provider}</span><svg
              viewBox="0 0 100 6"
              class="h-1.5 min-w-0 flex-1"
              aria-hidden="true"
              ><rect
                width="100"
                height="6"
                rx="3"
                class="fill-muted/60 dark:fill-white/10"
              /><rect
                width={(profile.evidence[5] / profile.n) * 100}
                height="6"
                rx="3"
                fill={PROVIDER_COLORS[profile.arm]}
              /></svg
            ><span class="w-9 shrink-0 text-right tabular-nums"
              >{profile.evidence[5]}/{profile.n}</span
            >
          </li>
        {/each}
      </ul>
      <p class="mt-5 text-sm leading-relaxed {muted}">
        Only Firecrawl is clearly behind; the rest overlap within noise.
      </p>
    </article>
  </div>

  <nav
    aria-label="Report sections"
    class="mt-8 flex flex-wrap gap-x-5 gap-y-3 border-b border-border/60 pb-6 text-sm dark:border-white/10"
  >
    {#each sections as section (section.id)}<a
        href={`#${section.id}`}
        class="text-muted-foreground transition-colors hover:text-foreground dark:text-white/55 dark:hover:text-cyan-200"
        >{section.label}<span
          class="ml-1 text-muted-foreground dark:text-white/30"
          aria-hidden="true">↓</span
        ></a
      >{/each}
  </nav>

  <p class="mt-3 text-xs text-muted-foreground dark:text-white/50 md:hidden">
    Swipe tables horizontally to compare providers.
  </p>

  <section
    id="retrieval"
    class="scroll-mt-28 pt-12 sm:pt-16"
    aria-labelledby="retrieval-title"
  >
    <p
      class="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground dark:text-cyan-300"
    >
      Retrieval
    </p>
    <h2 id="retrieval-title" class="mt-3 text-3xl font-semibold tracking-tight">
      Can it find the right evidence?
    </h2>
    <p class="mt-3 max-w-3xl text-sm leading-relaxed {muted}">
      {searchEval.retrieval.cases} held-out questions, one search + read of the top
      result each. Evidence means the gold fact’s patterns matched provider-returned
      text, not merely that a familiar URL appeared.
    </p>
    <div class="mt-6 grid gap-4 md:grid-cols-2">
      <EvidenceChart /><LatencyChart /><CostChart /><SliceTable />
    </div>
    <div class="mt-4"><QuestionHeatmap /></div>
    <div class="mt-4 grid gap-3 text-xs leading-relaxed {muted} sm:grid-cols-2">
      <p
        class="rounded-xl border border-border/50 bg-muted/20 p-4 dark:border-white/10 dark:bg-white/[0.02]"
      >
        A blinded LLM judge, shown the same search results and read page, agreed
        with the deterministic match (gold fact anywhere in that payload) on all
        {judgeUnits} units: {judgeVerdicts.supported} supported,
        {judgeVerdicts.insufficient} insufficient, {judgeVerdicts.contradicted} contradicted.
      </p>
      <p
        class="rounded-xl border border-border/50 bg-muted/20 p-4 dark:border-white/10 dark:bg-white/[0.02]"
      >
        No search call failed; {failedReads} Brave reads failed in the shared reader.
        Failures stay in the denominators.
      </p>
    </div>
  </section>

  <section
    id="revera"
    class="scroll-mt-28 pt-12 sm:pt-16"
    aria-labelledby="revera-title"
  >
    <p
      class="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground dark:text-indigo-300"
    >
      Revera
    </p>
    <h2 id="revera-title" class="mt-3 text-3xl font-semibold tracking-tight">
      Does search improve a PR review?
    </h2>
    <p class="mt-3 text-sm leading-relaxed {muted}">
      {searchEval.revera.quick_pass.find((row) => row.arm === "none")
        ?.bugs_available} real breaking-change bugs, {cleanReviews} clean PRs. The
      grid includes confirmation reps; the table keeps the equal-sized quick pass
      separate.
    </p>
    <div class="mt-6 space-y-4">
      <AgentMatrix product="revera" /><QuickPassTable product="revera" />
    </div>
    <div
      class="mt-4 space-y-3 rounded-xl border border-border/60 bg-muted/20 p-5 text-sm leading-relaxed dark:border-white/10 dark:bg-white/[0.025] {muted}"
    >
      <p>
        Every strict false positive was the same comment on the clean <code
          class="text-xs text-foreground dark:text-white/85"
          >rv-got16-migrate</code
        >
        PR (that
        <code class="text-xs text-foreground dark:text-white/85"
          >agent: &#123;http2: false&#125;</code
        > disables session pooling). The premise is correct per the Got 16 docs; adjudicated
        as a reasonable non-blocking comment, not a hallucination.
      </p>
      <p>
        No-search reviewers missed both bugs; on Commander 15 the no-search
        reviewer asserted the old behavior.
      </p>
      <p>
        An Exa review used about <strong
          class="font-semibold text-foreground dark:text-white/90"
          >{reviewSpendRatio.toFixed(1)}x</strong
        > the no-search model cost, with similar wall time.
      </p>
    </div>
  </section>

  <section
    id="opencode"
    class="scroll-mt-28 pt-12 sm:pt-16"
    aria-labelledby="opencode-title"
  >
    <p
      class="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground dark:text-cyan-300"
    >
      OpenCode
    </p>
    <h2 id="opencode-title" class="mt-3 text-3xl font-semibold tracking-tight">
      Does search help the repair pass?
    </h2>
    <p class="mt-3 text-sm leading-relaxed {muted}">
      {noSearchCoding.tasks} dependency-upgrade repairs, scored by hidden tests run
      offline. Confirmation reps focus on
      <code class="text-xs text-foreground dark:text-white/85">oc-ai7</code>.
    </p>
    <div class="mt-6 space-y-4">
      <AgentMatrix product="opencode" /><QuickPassTable product="opencode" />
    </div>
    <div
      class="mt-4 space-y-3 rounded-xl border border-border/60 bg-muted/20 p-5 text-sm leading-relaxed dark:border-white/10 dark:bg-white/[0.025] {muted}"
    >
      <p>
        Every lost run was on <code
          class="text-xs text-foreground dark:text-white/85">oc-ai7</code
        >, with the same
        <code class="text-xs text-foreground dark:text-white/85">tsc</code>
        error: the code used a non-generic
        <code class="break-all text-xs text-foreground dark:text-white/85"
          >ToolExecutionOptions</code
        >, but it is generic in the installed
        <code class="text-xs text-foreground dark:text-white/85"
          >ai@7.0.143</code
        >
        (in the quick pass, the web arms had copied it from docs). In repeat runs
        oc-ai7 was noisy for every arm (Exa {repeatPasses("exa:auto")},
        Firecrawl {repeatPasses("firecrawl:search")}, none {repeatPasses(
          "none",
        )}).
      </p>
      <p>
        Search arms used about <strong
          class="font-semibold text-foreground dark:text-white/90"
          >{codingSpendRatio.toFixed(1)}x</strong
        > the model spend of no search, without adding passes. One untested hypothesis:
        the model already knows these releases.
      </p>
    </div>
  </section>

  <section
    id="recommendations"
    class="scroll-mt-28 pt-12 sm:pt-16"
    aria-labelledby="recommendations-title"
  >
    <p
      class="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground dark:text-emerald-300"
    >
      Recommendations
    </p>
    <h2
      id="recommendations-title"
      class="mt-3 text-3xl font-semibold tracking-tight"
    >
      Keep search useful. Keep it optional.
    </h2>
    <div class="mt-6 grid gap-4 md:grid-cols-2">
      <article class={card}>
        <h3 class="text-lg font-semibold">Revera: keep Exa auto</h3>
        <div class="mt-4">
          <ProviderLabel
            arm={exa.arm}
            name={exa.provider}
            profile={exa.profile}
          />
        </div>
        <ul
          class="mt-5 list-disc space-y-3 pl-4 text-sm leading-relaxed marker:text-muted-foreground dark:marker:text-white/35 {muted}"
        >
          <li>
            Keep web search opt-in. Keep Exa REST <code
              class="text-xs text-foreground dark:text-white/85">type:auto</code
            >
            with highlights +
            <code class="text-xs text-foreground dark:text-white/85"
              >/contents</code
            > reads.
          </li>
          <li>
            Raise highlight length to 2,000–4,000 chars. Cutting to 1,000 drops
            Exa from {exa.evidence[5]}/{exa.n} to 22/{exa.n} evidence@5.
          </li>
          <li>
            Raise the page read cap with query-aware trimming: 6 of {exa.n} Exa reads
            had the first evidence past 6,000 chars.
          </li>
          <li>
            Parallel fast + <code
              class="text-xs text-foreground dark:text-white/85"
              >/v1/extract</code
            > as optional failover.
          </li>
        </ul>
        <p class="mt-5 text-xs {muted}">
          Highlight and read-depth figures: <a
            href={`${REPO}/blob/main/INTEGRATION_RECOMMENDATIONS.md`}
            target="_blank"
            rel="noopener noreferrer"
            class={link}>source: INTEGRATION_RECOMMENDATIONS.md</a
          >
        </p>
      </article>
      <article class={card}>
        <h3 class="text-lg font-semibold">OpenCode: Parallel fast</h3>
        <div class="mt-4">
          <ProviderLabel
            arm={parallel.arm}
            name={parallel.provider}
            profile={parallel.profile}
          />
        </div>
        <ul
          class="mt-5 list-disc space-y-3 pl-4 text-sm leading-relaxed marker:text-muted-foreground dark:marker:text-white/35 {muted}"
        >
          <li>
            Parallel fast for interactive search: {parallel
              .evidence[5]}/{parallel.n} evidence@5 with ~{seconds(
              parallel.search_ms.p50,
            )} s search p50.
          </li>
          <li>
            Exa auto as the equally accurate but slower (~{seconds(
              exa.search_ms.p50,
            )} s) alternative.
          </li>
          <li>Keep search an optional tool, not run on every task.</li>
        </ul>
      </article>
    </div>
    <div
      class="mt-4 rounded-xl border border-border/60 bg-muted/20 p-5 dark:border-white/10 dark:bg-white/[0.025]"
    >
      <h3 class="text-sm font-semibold">Not tested</h3>
      <p class="mt-2 text-sm leading-relaxed {muted}">
        Brave LLM Context (<code
          class="text-xs text-foreground dark:text-white/85"
          >{searchEval.blocked[0].arm}</code
        >) was blocked: {searchEval.blocked[0].reason}. Listed as blocked, not
        as a loss. Optional reranker ablation skipped.
      </p>
    </div>
  </section>

  <section
    id="method"
    class="scroll-mt-28 pb-8 pt-12 sm:pt-16"
    aria-labelledby="method-title"
  >
    <p
      class="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground dark:text-white/50"
    >
      Read the fine print
    </p>
    <h2 id="method-title" class="mt-3 text-3xl font-semibold tracking-tight">
      Method & limitations
    </h2>
    <div class="mt-6 grid gap-4 sm:grid-cols-3" aria-label="Evaluation costs">
      <div class={card}>
        <p class="text-xs {muted}">Provider fee estimate</p>
        <p class="mt-2 text-2xl font-semibold tabular-nums">
          {usd(searchEval.eval_cost.provider_fees_usd, 2)}
        </p>
        <p class="mt-1 text-xs {muted}">
          List-price estimate; Exa portion metered
        </p>
      </div>
      <div class={card}>
        <p class="text-xs {muted}">Agent model estimate</p>
        <p class="mt-2 text-2xl font-semibold tabular-nums">
          {usd(searchEval.eval_cost.agent_model_usd, 2)}
        </p>
        <p class="mt-1 text-xs {muted}">List prices, not a proxy bill</p>
      </div>
      <div class={card}>
        <p class="text-xs {muted}">Judge model estimate</p>
        <p class="mt-2 text-2xl font-semibold tabular-nums">
          {usd(searchEval.eval_cost.judge_model_usd, 2)}
        </p>
        <p class="mt-1 text-xs {muted}">Model total: {usd(modelCost, 2)}</p>
      </div>
    </div>
    <div
      class="mt-4 divide-y divide-border/60 overflow-hidden rounded-2xl border border-border/60 bg-card dark:divide-white/10 dark:border-white/10 dark:bg-white/[0.025]"
    >
      <details class="group" open>
        <summary
          class="cursor-pointer px-5 py-5 text-sm font-semibold transition-colors hover:bg-muted/25 focus-visible:outline-2 focus-visible:outline-foreground dark:hover:bg-white/5 dark:focus-visible:outline-cyan-400 sm:px-6"
          >Same tool contract, frozen profiles</summary
        >
        <div
          class="space-y-3 px-5 pb-6 text-sm leading-relaxed sm:px-6 {muted}"
        >
          <p>
            One tool contract for all providers: <code
              class="text-xs text-foreground dark:text-white/85"
              >web_search</code
            >
            returns at most 5 results;
            <code class="text-xs text-foreground dark:text-white/85"
              >web_read</code
            > reads only a returned result. Search responses have a 4,000-token cap;
            reads have a 6,000-token cap.
          </p>
          <p>
            Deterministic scoring against gold fact patterns. Failures stay in
            denominators. Profiles were frozen from a pilot, not tuned on the
            held-out results.
          </p>
          <ul class="flex flex-wrap gap-2" aria-label="Frozen profiles">
            {#each profiles as profile (profile.arm)}<li
                class="rounded-md border border-border/60 bg-muted/20 px-2.5 py-1.5 font-mono text-xs text-foreground dark:border-white/10 dark:bg-white/5 dark:text-white/75"
              >
                {profile.arm}
              </li>{/each}
          </ul>
          <p>
            <a
              class={link}
              href={`${REPO}/blob/main/PROTOCOL.md`}
              target="_blank"
              rel="noopener noreferrer">Read the protocol</a
            >
          </p>
        </div>
      </details>
      <details>
        <summary
          class="cursor-pointer px-5 py-5 text-sm font-semibold transition-colors hover:bg-muted/25 focus-visible:outline-2 focus-visible:outline-foreground dark:hover:bg-white/5 dark:focus-visible:outline-cyan-400 sm:px-6"
          >What this evaluation cannot establish</summary
        >
        <div
          class="space-y-3 px-5 pb-6 text-sm leading-relaxed sm:px-6 {muted}"
        >
          <p>
            Small samples; only two Revera bugs, both version-upgrade bugs in JS
            libraries. Do not read the ordering as a universal provider ranking.
            Provider indexes change over time.
          </p>
          <p>
            Model costs are list-price estimates, not proxy bills. {searchEval
              .eval_cost.model_basis}.
          </p>
          <p>
            <a
              class={link}
              href={`${REPO}/blob/main/LIMITATIONS.md`}
              target="_blank"
              rel="noopener noreferrer">Read all limitations</a
            >
          </p>
        </div>
      </details>
    </div>
    <p class="mt-8 text-xs leading-relaxed {muted}">
      All results come from the frozen evaluation export; the two recommendation
      ablations are linked to their source above. <a
        href={REPO}
        target="_blank"
        rel="noopener noreferrer"
        class={link}>Inspect the code and artifacts</a
      >.
    </p>
  </section>
</div>
