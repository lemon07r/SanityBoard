/**
 * Validates evaluation results across all data directories.
 * - Checks that every run directory contains the required metadata.json
 * - Checks for case-insensitive duplicates in filterable fields that would
 *   cause duplicate entries in the UI filters.
 *
 * Run: bun run validate
 */

import fs from "node:fs";
import path from "node:path";

const DATA_DIRS = [
  path.join(process.cwd(), "eval-results"),
  path.join(process.cwd(), "v1.8-results"),
];
const REQUIRED_FILES = ["metadata.json"];
const FILTERABLE_FIELDS = [
  "Agent Name",
  "Model Name",
  "Model Provider",
] as const;

type FilterableField = (typeof FILTERABLE_FIELDS)[number];

interface MetadataEntry {
  runId: string;
  field: FilterableField;
  value: string;
}

interface Inconsistency {
  field: FilterableField;
  values: Map<string, string[]>; // value -> runIds
}

function getRunDirs(dataDir: string): { runId: string; dirPath: string }[] {
  if (!fs.existsSync(dataDir)) return [];

  return fs
    .readdirSync(dataDir)
    .filter((file) => {
      if (file.startsWith(".")) return false;
      const fullPath = path.join(dataDir, file);
      try {
        return fs.statSync(fullPath).isDirectory();
      } catch {
        return false;
      }
    })
    .map((file) => ({ runId: file, dirPath: path.join(dataDir, file) }));
}

function validateRequiredFiles(
  dirs: { runId: string; dirPath: string }[],
  dataDir: string,
): string[] {
  const errors: string[] = [];

  for (const { runId, dirPath } of dirs) {
    for (const file of REQUIRED_FILES) {
      if (!fs.existsSync(path.join(dirPath, file))) {
        errors.push(
          `Missing ${file} in ${path.relative(process.cwd(), dataDir)}/${runId}`,
        );
      }
    }
  }

  return errors;
}

function loadAllMetadata(): MetadataEntry[] {
  const entries: MetadataEntry[] = [];

  for (const dataDir of DATA_DIRS) {
    if (!fs.existsSync(dataDir)) continue;

    const runs = getRunDirs(dataDir);

    for (const { runId, dirPath } of runs) {
      const metadataPath = path.join(dirPath, "metadata.json");

      if (!fs.existsSync(metadataPath)) {
        // Already caught by validateRequiredFiles
        continue;
      }

      try {
        const content = fs.readFileSync(metadataPath, "utf-8");
        const metadata = JSON.parse(content);

        for (const field of FILTERABLE_FIELDS) {
          if (
            typeof metadata[field] === "string" &&
            metadata[field].trim() !== ""
          ) {
            entries.push({
              runId,
              field,
              value: metadata[field],
            });
          }
        }
      } catch (e) {
        console.error(`Error parsing metadata for ${runId}:`, e);
      }
    }
  }

  return entries;
}

function findCaseInconsistencies(entries: MetadataEntry[]): Inconsistency[] {
  const inconsistencies: Inconsistency[] = [];

  for (const field of FILTERABLE_FIELDS) {
    const fieldEntries = entries.filter((e) => e.field === field);

    // Group by lowercase value
    const byLowercase = new Map<string, Map<string, string[]>>();

    for (const entry of fieldEntries) {
      const lower = entry.value.toLowerCase();

      if (!byLowercase.has(lower)) {
        byLowercase.set(lower, new Map());
      }

      const variants = byLowercase.get(lower)!;

      if (!variants.has(entry.value)) {
        variants.set(entry.value, []);
      }

      variants.get(entry.value)!.push(entry.runId);
    }

    // Find entries with multiple case variants
    for (const [, variants] of byLowercase) {
      if (variants.size > 1) {
        inconsistencies.push({
          field,
          values: variants,
        });
      }
    }
  }

  return inconsistencies;
}

function main(): void {
  console.log("Validating evaluation results...\n");

  let hasErrors = false;

  // Check required files in all data directories
  for (const dataDir of DATA_DIRS) {
    if (!fs.existsSync(dataDir)) continue;

    const runs = getRunDirs(dataDir);
    const dirLabel = path.relative(process.cwd(), dataDir);
    console.log(`Checking ${runs.length} runs in ${dirLabel}/`);

    const missingFiles = validateRequiredFiles(runs, dataDir);
    if (missingFiles.length > 0) {
      hasErrors = true;
      console.error("\nMissing required files:");
      for (const msg of missingFiles) {
        console.error(`  - ${msg}`);
      }
      console.error("");
    }
  }

  // Check case consistency
  const entries = loadAllMetadata();
  console.log(`\nLoaded ${entries.length} metadata entries across all directories\n`);

  const inconsistencies = findCaseInconsistencies(entries);

  if (inconsistencies.length > 0) {
    hasErrors = true;
    console.error("Case inconsistencies found:\n");

    for (const inc of inconsistencies) {
      console.error(`  ${inc.field}:`);

      for (const [value, runIds] of inc.values) {
        console.error(`    "${value}" in:`);
        for (const runId of runIds) {
          console.error(`      - ${runId}`);
        }
      }

      console.error("");
    }

    console.error(
      "These values will appear as separate filter options despite being the same.",
    );
    console.error(
      "Please standardize the casing to prevent duplicate filters.\n",
    );
  }

  if (hasErrors) {
    process.exit(1);
  }

  console.log("All validations passed.");
  process.exit(0);
}

main();
