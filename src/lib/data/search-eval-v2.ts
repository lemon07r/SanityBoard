import { z } from "zod";

import rawData from "./search-eval-v2.json" with { type: "json" };

const retrievalArmSchema = z.enum([
  "exa:auto",
  "parallel:fast",
  "tavily:advanced",
  "brave:web",
  "firecrawl:search",
]);
const armSchema = z.enum([...retrievalArmSchema.options, "none"]);
const count = z.number().int().nonnegative();
const costBasis = z.enum(["metered", "estimate"]);
const ranks = z.object({ 1: count, 3: count, 5: count });
const latency = z.object({
  p50: z.number().nonnegative(),
  p90: z.number().nonnegative(),
});
const slice = z.object({
  n: count,
  evidence1: count,
  evidence5: count,
  in_read: count,
});
const profileSchema = z.object({
  arm: retrievalArmSchema,
  provider: z.string(),
  profile: z.string(),
  n: count.positive(),
  url: ranks,
  evidence: ranks,
  evidence5_wilson: z.tuple([
    z.number().min(0).max(1),
    z.number().min(0).max(1),
  ]),
  read_ok: count,
  evidence_in_read: count,
  search_ms: latency,
  total_ms: latency,
  visible_tokens_p50: count,
  usd_per_query: z.number().nonnegative(),
  usd_basis: costBasis,
  slices: z.object({ revera: slice, opencode: slice, traps: slice }),
  errors: z.record(z.string(), count),
  judge: z.object({
    n: count,
    supported: count,
    insufficient: count,
    contradicted: count,
  }),
});
const questionSchema = z.object({
  id: z.string(),
  slice: z.enum(["revera", "opencode"]),
  trap: z.boolean(),
  category: z.string(),
  difficulty: z.string(),
  question: z.string(),
  ranks: z.record(
    retrievalArmSchema,
    z.object({
      evidence_rank: z.number().int().min(1).max(5).nullable(),
      read_error: z.boolean(),
    }),
  ),
});
const agentSummary = z.object({
  arm: armSchema,
  provider: z.string(),
  profile: z.string(),
  runs: count,
  model_usd_mean: z.number().nonnegative(),
  search_usd_mean: z.number().nonnegative(),
  search_usd_basis: costBasis,
  wall_s_mean: z.number().nonnegative(),
  model_calls: count,
  searches: count,
  reads: count,
});
const reveraSummary = agentSummary.extend({
  bugs_found: count,
  bugs_available: count,
  strict_fps: count,
  uncertain: count,
});
const opencodeSummary = agentSummary.extend({ all_pass: count, tasks: count });
const posthocProfileSchema = profileSchema.extend({
  arm: z.string().min(1),
  judge: z.null(),
  posthoc: z.boolean(),
  control: z.literal(true).optional(),
  latency_note: z.string().min(1).optional(),
});
const posthocAgentFields = {
  arm: z.string().min(1),
  n: count.positive(),
  posthoc: z.literal(true),
};
const posthocSchema = z.object({
  run_date: z.iso.date(),
  runs: z.object({
    retrieval_same_day: z.string().min(1),
    retrieval_exa_uncached: z.string().min(1),
    revera: z.string().min(1),
    opencode: z.string().min(1),
  }),
  notes: z.array(z.string()),
  retrieval_same_day: z.array(posthocProfileSchema).length(9),
  retrieval_exa_uncached: z.array(posthocProfileSchema).length(2),
  revera: z.array(reveraSummary.extend(posthocAgentFields)).length(2),
  opencode: z.array(opencodeSummary.extend(posthocAgentFields)).length(2),
});
const outcome = z.object({ rep: count, searches: count, reads: count });
const reveraOutcome = outcome.extend({
  bugs_found: count,
  bugs_available: count,
  strict_fps: count,
  uncertain: count,
});
const opencodeOutcome = outcome.extend({
  all_pass: z.boolean(),
  tests_pass: count,
  tests_total: count,
});
const task = z.object({
  id: z.string(),
  title: z.string(),
  clean: z.boolean(),
});

export const searchEvalSchema = z.object({
  generated_from: z.object({
    pilot: z.string(),
    retrieval: z.string(),
    agents: z.string(),
    confirmation: z.string(),
  }),
  run_date: z.iso.date(),
  model: z.string(),
  retrieval: z.object({
    cases: count.positive(),
    slices: z.object({ revera: count, opencode: count, traps: count }),
    profiles: z.array(profileSchema).length(retrievalArmSchema.options.length),
    matrix: z.array(questionSchema),
  }),
  revera: z.object({
    quick_pass: z.array(reveraSummary),
    pooled: z.array(reveraSummary),
  }),
  opencode: z.object({
    quick_pass: z.array(opencodeSummary),
    pooled: z.array(opencodeSummary),
  }),
  agent_matrix: z.array(
    z.discriminatedUnion("product", [
      task.extend({
        product: z.literal("revera"),
        arms: z.record(armSchema, z.array(reveraOutcome)),
      }),
      task.extend({
        product: z.literal("opencode"),
        arms: z.record(armSchema, z.array(opencodeOutcome)),
      }),
    ]),
  ),
  eval_cost: z.object({
    provider_fees_usd: z.number().nonnegative(),
    agent_model_usd: z.number().nonnegative(),
    judge_model_usd: z.number().nonnegative(),
    model_basis: z.string(),
  }),
  blocked: z.array(z.object({ arm: z.string(), reason: z.string() })),
  posthoc: posthocSchema,
});

export type SearchEval = z.infer<typeof searchEvalSchema>;
export type Profile = z.infer<typeof profileSchema>;
export type Arm = z.infer<typeof armSchema>;
export type AgentTask = SearchEval["agent_matrix"][number];
export type AgentOutcome = AgentTask["arms"][Arm][number];
export type Product = AgentTask["product"];
export type PosthocProfile = z.infer<typeof posthocProfileSchema>;

export const searchEval = searchEvalSchema.parse(rawData);
export const PROVIDER_COLORS: Record<Arm, string> = {
  "exa:auto": "#6366f1",
  "parallel:fast": "#06b6d4",
  "tavily:advanced": "#10b981",
  "brave:web": "#f97316",
  "firecrawl:search": "#f43f5e",
  none: "#9ca3af",
};
export const profiles = [...searchEval.retrieval.profiles].sort(
  (a, b) => b.evidence[5] - a.evidence[5] || b.evidence[1] - a.evidence[1],
);
export const arms = searchEval.revera.quick_pass;
export const posthoc = searchEval.posthoc;
export const posthocProfiles = [
  ...posthoc.retrieval_same_day,
  ...posthoc.retrieval_exa_uncached,
].sort(
  (a, b) => b.evidence[5] - a.evidence[5] || b.evidence[1] - a.evidence[1],
);
export const posthocAgents = posthoc.revera.map((review) => {
  const coding = posthoc.opencode.find((row) => row.arm === review.arm);
  if (!coding)
    throw new Error(`Post-hoc OpenCode evaluation is missing ${review.arm}`);
  return { arm: review.arm, review, coding };
});

export function posthocProfile(arm: string): PosthocProfile {
  const row = posthocProfiles.find((item) => item.arm === arm);
  if (!row) throw new Error(`Post-hoc retrieval evaluation is missing ${arm}`);
  return row;
}

function requiredArm<T extends { arm: Arm }>(rows: T[], arm: Arm): T {
  const row = rows.find((item) => item.arm === arm);
  if (!row) throw new Error(`Search evaluation is missing ${arm}`);
  return row;
}

export const exa = requiredArm(profiles, "exa:auto");
export const parallel = requiredArm(profiles, "parallel:fast");
export const noSearchReview = requiredArm(searchEval.revera.pooled, "none");
export const noSearchCoding = requiredArm(
  searchEval.opencode.quick_pass,
  "none",
);
export const bestSearchCoding = searchEval.opencode.quick_pass
  .filter((row) => row.arm !== "none")
  .reduce((best, row) => (row.all_pass > best.all_pass ? row : best));
export const searchBugs = searchEval.revera.pooled
  .filter((row) => row.arm !== "none")
  .reduce(
    (sum, row) => ({
      found: sum.found + row.bugs_found,
      available: sum.available + row.bugs_available,
    }),
    { found: 0, available: 0 },
  );
export const reviewSpendRatio =
  requiredArm(searchEval.revera.quick_pass, "exa:auto").model_usd_mean /
  requiredArm(searchEval.revera.quick_pass, "none").model_usd_mean;
const codingSearchRows = searchEval.opencode.quick_pass.filter(
  (row) => row.arm !== "none",
);
export const codingSpendRatio =
  codingSearchRows.reduce(
    (sum, row) => sum + row.model_usd_mean * row.runs,
    0,
  ) /
  codingSearchRows.reduce((sum, row) => sum + row.runs, 0) /
  noSearchCoding.model_usd_mean;
export const judgeUnits = profiles.reduce((sum, row) => sum + row.judge.n, 0);
export const judgeVerdicts = profiles.reduce(
  (sum, row) => ({
    supported: sum.supported + row.judge.supported,
    insufficient: sum.insufficient + row.judge.insufficient,
    contradicted: sum.contradicted + row.judge.contradicted,
  }),
  { supported: 0, insufficient: 0, contradicted: 0 },
);
export const failedReads = profiles.reduce(
  (sum, row) => sum + row.n - row.read_ok,
  0,
);
export const modelCost =
  searchEval.eval_cost.agent_model_usd + searchEval.eval_cost.judge_model_usd;

export function repeatPasses(arm: Arm): string {
  const aiTask = searchEval.agent_matrix.find((item) => item.id === "oc-ai7");
  if (!aiTask || aiTask.product !== "opencode")
    throw new Error("Missing oc-ai7 outcomes");
  const runs = aiTask.arms[arm];
  return `${runs.filter((run) => run.all_pass).length}/${runs.length}`;
}

export function usd(value: number, digits = 4): string {
  return `$${value.toFixed(digits)}`;
}

export function seconds(ms: number, digits = 1): string {
  return (ms / 1000).toFixed(digits);
}

export function outcomeLabel(run: AgentOutcome, clean: boolean): string {
  if ("all_pass" in run)
    return `${run.all_pass ? "All tests pass" : "Task failed"}; ${run.tests_pass}/${run.tests_total} tests`;
  return [
    clean
      ? "Clean control"
      : `${run.bugs_found}/${run.bugs_available} bugs found`,
    `${run.strict_fps} strict false positives`,
    `${run.uncertain} uncertain findings`,
  ].join("; ");
}
