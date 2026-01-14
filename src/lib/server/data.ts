import fs from 'node:fs';
import path from 'node:path';
import { z } from 'zod';

const DATA_DIR = path.join(process.cwd(), 'eval-results');

export const MetadataSchema = z.object({
    'Agent Name': z.string(),
    'Agent Version': z.string(),
    'Model Name': z.string(),
    'Provider Name': z.string(),
    'Run Date': z.string(),
    'MCP tools available': z.string().optional()
});

export const SummarySchema = z.object({
    passed: z.number().optional(),
    total: z.number().optional(),
    pass_rate: z.number().optional(),
    weighted_score: z.number().optional(),
    duration_seconds: z.number().optional(),
    by_language: z.record(z.any()).optional(),
    by_tier: z.record(z.any()).optional()
}).passthrough();

export type Metadata = z.infer<typeof MetadataSchema>;
export type Summary = z.infer<typeof SummarySchema>;

export interface RunData {
    id: string;
    metadata: Metadata;
    summary: Summary | null;
}

export function getRunIds(): string[] {
    if (!fs.existsSync(DATA_DIR)) return [];
    
    return fs.readdirSync(DATA_DIR).filter(file => {
        return fs.statSync(path.join(DATA_DIR, file)).isDirectory();
    });
}

export function getRunData(runId: string): RunData {
    const runPath = path.join(DATA_DIR, runId);
    
    if (!fs.existsSync(runPath)) {
        throw new Error(`Run ID ${runId} not found`);
    }

    const readJson = <T>(filename: string, schema: z.ZodType<T>): T | null => {
        const filePath = path.join(runPath, filename);
        if (!fs.existsSync(filePath)) return null;
        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            return schema.parse(JSON.parse(content));
        } catch (e) {
            console.error(`Error parsing ${filename} for ${runId}:`, e);
            throw e; 
        }
    };

    return {
        id: runId,
        metadata: readJson('metadata.json', MetadataSchema)!, 
        summary: readJson('summary.json', SummarySchema),
    };
}

export function getAllRuns(): RunData[] {
    const ids = getRunIds();
    return ids.map(id => getRunData(id)).sort((a, b) => {
        // Sort by score desc, then date desc
        const scoreA = a.summary?.weighted_score || 0;
        const scoreB = b.summary?.weighted_score || 0;
        if (scoreA !== scoreB) return scoreB - scoreA;
        
        return new Date(b.metadata['Run Date']).getTime() - new Date(a.metadata['Run Date']).getTime();
    });
}
