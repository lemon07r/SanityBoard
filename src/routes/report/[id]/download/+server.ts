import { getRunIds } from "$lib/server/data";
import fs from "node:fs";
import path from "node:path";
import JSZip from "jszip";

export const prerender = true;

export function entries() {
  return getRunIds().map((id) => ({ id }));
}

export async function GET({ params }: { params: { id: string } }) {
  const runId = params.id;
  const runPath = path.join(process.cwd(), "eval-results", runId);

  if (!fs.existsSync(runPath)) {
    return new Response("Not Found", { status: 404 });
  }

  const zip = new JSZip();
  const files = fs.readdirSync(runPath);

  for (const file of files) {
    const filePath = path.join(runPath, file);
    if (fs.statSync(filePath).isFile()) {
      zip.file(file, fs.readFileSync(filePath));
    }
  }

  const content = await zip.generateAsync({ type: "arraybuffer" });

  return new Response(content, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="sanity-run-${runId}.zip"`,
    },
  });
}
