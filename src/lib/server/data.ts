import fs from "node:fs";
import path from "node:path";
import { z } from "zod";

const DATA_DIR = path.join(process.cwd(), "eval-results");
const V18_DATA_DIR = path.join(process.cwd(), "v1.8-results");

export const MetadataSchema = z.object({
  "Agent Name": z.string(),
  "Agent Version": z.string(),
  "Agent Type": z.enum(["Open Source", "Proprietary"]).optional(),
  "Agent URL": z.string().url().optional(),
  "Model Name": z.string(),
  Variant: z.string().optional(),
  "Model Type": z
    .enum(["Open Source", "Open Weight", "Proprietary"])
    .optional(),
  "Model Provider": z.string(),
  "Access Provider": z.string().optional(),
  "Run Date": z.string(),
  "Skills or MCP available": z.boolean().optional(),
  "Skills used": z.array(z.string()).optional(),
  "MCP tools used": z.array(z.string()).optional(),
  verified: z.boolean().optional(),
});

export const TaskResultSchema = z.object({
  task: z.string(),
  language: z.string(),
  tier: z.string(),
  difficulty: z.string(),
  passed: z.boolean(),
  status: z.string().optional(),
  attempts: z.number(),
  duration_seconds: z.number().optional(),
  agent_duration_seconds: z.number().optional(),
  validation_duration_seconds: z.number().optional(),
  prompt_chars: z.number().optional(),
  weight: z.number().optional(),
  weighted_score: z.number().optional(),
  agent_timed_out: z.boolean().optional(),
  quota_retries: z.number().optional(),
  quota_exhausted: z.boolean().optional(),
  infra_failure: z.boolean().optional(),
  self_test_commands: z.number().optional(),
  toolchain_install_attempts: z.number().optional(),
  out_of_workspace_read_attempts: z.number().optional(),
});

export const LanguageStatsSchema = z
  .object({
    passed: z.number(),
    failed: z.number(),
    total: z.number(),
    pass_rate: z.number(),
  })
  .passthrough();

export const ResultsSchema = z
  .object({
    results: z.array(TaskResultSchema),
    by_tier: z.record(z.string(), LanguageStatsSchema).optional(),
    by_difficulty: z.record(z.string(), LanguageStatsSchema).optional(),
    by_language: z.record(z.string(), LanguageStatsSchema).optional(),
  })
  .passthrough();

// v1.8 summary.json has results as a top-level array alongside stats fields
export const V18ResultsSchema = z
  .object({
    results: z.array(TaskResultSchema),
  })
  .passthrough()
  .transform((data) => {
    // Normalize v1.8 flat format into the nested format expected by the UI
    const { results, ...rest } = data;
    return {
      results,
      by_tier: (rest as Record<string, unknown>).by_tier as Record<string, LanguageStats> | undefined,
      by_difficulty: (rest as Record<string, unknown>).by_difficulty as Record<string, LanguageStats> | undefined,
      by_language: (rest as Record<string, unknown>).by_language as Record<string, LanguageStats> | undefined,
    } as Results;
  });

export const StatsSchema = z
  .object({
    agent: z.string().optional(),
    model: z.string().optional(),
    timestamp: z.string().optional(),
    pass_rate: z.number().optional(),
    weighted_pass_rate: z.number().optional(),
    passed: z.number().optional(),
    failed: z.number().optional(),
    total: z.number().optional(),
    weighted_score: z.number().optional(),
    max_possible_score: z.number().optional(),
    clean_passes: z.number().optional(),
    partial_passes: z.number().optional(),
    integrity_violations: z.number().optional(),
    by_language: z.record(z.string(), LanguageStatsSchema).optional(),
    total_duration_seconds: z.number().optional(),
    agent_duration_seconds: z.number().optional(),
    harness_version: z.string().optional(),
    weight_version: z.string().optional(),
    tasks_hash: z.string().optional(),
    results_hash: z.string().optional(),
  })
  .passthrough();

export type Metadata = z.infer<typeof MetadataSchema>;
export type TaskResult = z.infer<typeof TaskResultSchema>;
export type LanguageStats = z.infer<typeof LanguageStatsSchema>;
export type Results = z.infer<typeof ResultsSchema>;
export type Stats = z.infer<typeof StatsSchema>;

export interface RunData {
  id: string;
  metadata: Metadata;
  stats: Stats | null;
  results: Results | null;
}

export function getRunIds(dataDir: string = DATA_DIR): string[] {
  if (!fs.existsSync(dataDir)) return [];

  return fs.readdirSync(dataDir).filter((file) => {
    // Skip hidden directories (like .junie)
    if (file.startsWith(".")) return false;
    return fs.statSync(path.join(dataDir, file)).isDirectory();
  });
}

export function getRunData(runId: string, dataDir: string = DATA_DIR): RunData {
  const runPath = path.join(dataDir, runId);

  if (!fs.existsSync(runPath)) {
    throw new Error(`Run ID ${runId} not found`);
  }

  const readJson = <T>(filename: string, schema: z.ZodType<T>): T | null => {
    const filePath = path.join(runPath, filename);
    if (!fs.existsSync(filePath)) return null;
    try {
      const content = fs.readFileSync(filePath, "utf-8");
      return schema.parse(JSON.parse(content));
    } catch (e) {
      console.error(`Error parsing ${filename} for ${runId}:`, e);
      throw e;
    }
  };

  const isV18 = dataDir === V18_DATA_DIR;
  const resultsSchema = isV18 ? V18ResultsSchema : ResultsSchema;

  return {
    id: runId,
    metadata: readJson("metadata.json", MetadataSchema)!,
    stats: readJson("submission.json", StatsSchema),
    results: readJson("summary.json", resultsSchema) as Results | null,
  };
}

export function getAllRuns(dataDir: string = DATA_DIR): RunData[] {
  const ids = getRunIds(dataDir);
  return ids
    .map((id) => getRunData(id, dataDir))
    .sort((a, b) => {
      // Sort by weighted_score desc, then date desc
      const scoreA = a.stats?.weighted_score || 0;
      const scoreB = b.stats?.weighted_score || 0;
      if (scoreA !== scoreB) return scoreB - scoreA;

      return (
        new Date(b.metadata["Run Date"]).getTime() -
        new Date(a.metadata["Run Date"]).getTime()
      );
    });
}

export function getAllRunsV18(): RunData[] {
  return getAllRuns(V18_DATA_DIR);
}
