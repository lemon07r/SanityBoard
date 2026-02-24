import { getAllRuns, getAllRunsV18 } from "$lib/server/data";

function computeStats(runs: ReturnType<typeof getAllRuns>) {
  const uniqueAgents = new Set(runs.map((r) => r.metadata["Agent Name"]));
  const uniqueModels = new Set(runs.map((r) => r.metadata["Model Name"]));
  const uniqueLanguages = new Set(
    runs.flatMap((r) => Object.keys(r.stats?.by_language ?? {})),
  );
  return {
    totalEvals: runs.length,
    totalAgents: uniqueAgents.size,
    totalModels: uniqueModels.size,
    totalLanguages: uniqueLanguages.size,
  };
}

export const load = async () => {
  const runs = getAllRuns();
  const v18Runs = getAllRunsV18();

  return {
    runs,
    stats: computeStats(runs),
    v18Runs,
    v18Stats: computeStats(v18Runs),
  };
};
