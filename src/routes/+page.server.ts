import { getAllRuns } from "$lib/server/data";

export const load = async () => {
  const runs = getAllRuns();

  const uniqueAgents = new Set(runs.map((r) => r.metadata["Agent Name"]));
  const uniqueModels = new Set(runs.map((r) => r.metadata["Model Name"]));
  const uniqueLanguages = new Set(
    runs.flatMap((r) => Object.keys(r.stats?.by_language ?? {})),
  );

  return {
    runs,
    stats: {
      totalEvals: runs.length,
      totalAgents: uniqueAgents.size,
      totalModels: uniqueModels.size,
      totalLanguages: uniqueLanguages.size,
    },
  };
};
