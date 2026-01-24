/**
 * Validates metadata consistency across all evaluation results.
 * Checks for case-insensitive duplicates in filterable fields that would
 * cause duplicate entries in the UI filters.
 *
 * Run: bun run validate
 */

import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "eval-results");
const FILTERABLE_FIELDS = [
  "Agent Name",
  "Model Name",
  "Provider Name",
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

function loadAllMetadata(): MetadataEntry[] {
  const entries: MetadataEntry[] = [];

  if (!fs.existsSync(DATA_DIR)) {
    console.error(`Data directory not found: ${DATA_DIR}`);
    process.exit(1);
  }

  const runIds = fs.readdirSync(DATA_DIR).filter((file) => {
    return fs.statSync(path.join(DATA_DIR, file)).isDirectory();
  });

  for (const runId of runIds) {
    const metadataPath = path.join(DATA_DIR, runId, "metadata.json");

    if (!fs.existsSync(metadataPath)) {
      console.warn(`Missing metadata.json in ${runId}`);
      continue;
    }

    try {
      const content = fs.readFileSync(metadataPath, "utf-8");
      const metadata = JSON.parse(content);

      for (const field of FILTERABLE_FIELDS) {
        if (metadata[field]) {
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
  console.log("Validating metadata consistency...\n");

  const entries = loadAllMetadata();
  console.log(`Loaded ${entries.length} metadata entries from eval-results/\n`);

  const inconsistencies = findCaseInconsistencies(entries);

  if (inconsistencies.length === 0) {
    console.log("No case inconsistencies found in filterable fields.");
    process.exit(0);
  }

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

  process.exit(1);
}

main();
