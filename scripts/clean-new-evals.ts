/**
 * Cleans evaluation result folders by deleting everything except the files
 * needed by SanityBoard.
 *
 * Keeps (per run folder in `eval-results/`):
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

const EVAL_RESULTS_DIR = path.join(process.cwd(), "eval-results");

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

  if (!(await pathExists(EVAL_RESULTS_DIR))) {
    console.error(`eval-results directory not found: ${EVAL_RESULTS_DIR}`);
    process.exit(1);
  }

  if (!(await isDirectory(EVAL_RESULTS_DIR))) {
    console.error(`eval-results is not a directory: ${EVAL_RESULTS_DIR}`);
    process.exit(1);
  }

  const runIds = (await fs.readdir(EVAL_RESULTS_DIR, { withFileTypes: true }))
    .filter((e) => e.isDirectory() && !e.isSymbolicLink())
    .map((e) => e.name)
    .sort((a, b) => a.localeCompare(b));

  if (runIds.length === 0) {
    console.log("No run folders found in eval-results/.");
    return;
  }

  console.log(
    dryRun
      ? "Dry run: no files will be deleted. Pass --apply to delete."
      : "Applying deletions...",
  );

  let totalRemoved = 0;

  for (const runId of runIds) {
    const runDir = path.join(EVAL_RESULTS_DIR, runId);
    const removals = await cleanRunDir(runDir, apply);
    if (removals.length === 0) continue;

    totalRemoved += removals.length;
    console.log(`\n${runId}:`);
    for (const removal of removals) {
      console.log(`  - ${path.relative(process.cwd(), removal)}`);
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
