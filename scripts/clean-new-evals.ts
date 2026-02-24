/**
 * Cleans evaluation result folders by deleting everything except the files
 * needed by SanityBoard.
 *
 * Keeps (per run folder in `eval-results/` and `v1.8-results/`):
 * - `metadata.json`
 * - `report.md`
 * - `summary.json`
 * - `submission.json`
 *
 * Usage:
 * - Dry run (default): `bun run clean-new-evals`
 * - Apply deletions:     `bun run clean-new-evals --apply`
 */

import fs from "node:fs/promises";
import path from "node:path";

const EVAL_RESULTS_DIRS = [
  path.join(process.cwd(), "eval-results"),
  path.join(process.cwd(), "v1.8-results"),
];

const KEEP_FILES = new Set([
  "metadata.json",
  "report.md",
  "summary.json",
  "submission.json",
]);

function hasFlag(flag: string): boolean {
  return process.argv.slice(2).includes(flag);
}

async function pathExists(p: string): Promise<boolean> {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function isDirectory(p: string): Promise<boolean> {
  try {
    const stat = await fs.lstat(p);
    return stat.isDirectory();
  } catch {
    return false;
  }
}

async function removePath(p: string, apply: boolean): Promise<void> {
  if (!apply) return;
  await fs.rm(p, { recursive: true, force: true });
}

async function cleanRunDir(runDir: string, apply: boolean): Promise<string[]> {
  const removals: string[] = [];
  const entries = await fs.readdir(runDir, { withFileTypes: true });

  for (const entry of entries) {
    // Safety: do not follow symlinks.
    if (entry.isSymbolicLink()) continue;

    const entryPath = path.join(runDir, entry.name);

    if (entry.isFile()) {
      if (!KEEP_FILES.has(entry.name)) {
        removals.push(entryPath);
        await removePath(entryPath, apply);
      }
      continue;
    }

    if (entry.isDirectory()) {
      // Always remove directories (e.g. raw logs/artifacts) unless user wants otherwise.
      removals.push(entryPath + path.sep);
      await removePath(entryPath, apply);
      continue;
    }

    // Other types (FIFO, socket, etc.) are unexpected; remove to keep the folder minimal.
    removals.push(entryPath);
    await removePath(entryPath, apply);
  }

  return removals;
}

async function main(): Promise<void> {
  const apply = hasFlag("--apply");
  const dryRun = !apply;

  console.log(
    dryRun
      ? "Dry run: no files will be deleted. Pass --apply to delete."
      : "Applying deletions...",
  );

  let totalRemoved = 0;

  for (const evalResultsDir of EVAL_RESULTS_DIRS) {
    if (!(await pathExists(evalResultsDir))) continue;
    if (!(await isDirectory(evalResultsDir))) continue;

    const dirName = path.relative(process.cwd(), evalResultsDir);

    const runIds = (await fs.readdir(evalResultsDir, { withFileTypes: true }))
      .filter((e) => e.isDirectory() && !e.isSymbolicLink())
      .map((e) => e.name)
      .sort((a, b) => a.localeCompare(b));

    if (runIds.length === 0) {
      console.log(`No run folders found in ${dirName}/.`);
      continue;
    }

    for (const runId of runIds) {
      const runDir = path.join(evalResultsDir, runId);
      const removals = await cleanRunDir(runDir, apply);
      if (removals.length === 0) continue;

      totalRemoved += removals.length;
      console.log(`\n${dirName}/${runId}:`);
      for (const removal of removals) {
        console.log(`  - ${path.relative(process.cwd(), removal)}`);
      }
    }
  }

  console.log(
    `\nDone. ${dryRun ? "Would remove" : "Removed"} ${totalRemoved} path(s).`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
