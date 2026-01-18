import { getAllRuns } from "$lib/server/data";

export const load = async () => {
  const runs = getAllRuns();
  return { runs };
};
