import fs from 'node:fs';
import path from 'node:path';
import { z } from 'zod';

const DATA_DIR = path.join(process.cwd(), 'eval-results');

const LanguageStatsSchema = z.object({
    passed: z.number(),
    failed: z.number(),
    total: z.number(),
    pass_rate: z.number()
});

const StatsSchema = z.object({
    by_language: z.record(z.any()).optional() // Looser check first
}).passthrough();

function check() {
    const runs = fs.readdirSync(DATA_DIR).filter(f => fs.statSync(path.join(DATA_DIR, f)).isDirectory());
    
    for (const run of runs) {
        const p = path.join(DATA_DIR, run, 'submission.json');
        if (fs.existsSync(p)) {
            console.log(`Checking ${run}/submission.json...`);
            const content = JSON.parse(fs.readFileSync(p, 'utf-8'));
            
            if (content.by_language) {
                for (const [key, val] of Object.entries(content.by_language)) {
                    const parsed = LanguageStatsSchema.safeParse(val);
                    if (!parsed.success) {
                        console.error(`[${run}] submission.json invalid language stats for ${key}:`, val);
                        console.error(parsed.error);
                    }
                }
            }
        }

        const s = path.join(DATA_DIR, run, 'summary.json');
        if (fs.existsSync(s)) {
            console.log(`Checking ${run}/summary.json...`);
            const content = JSON.parse(fs.readFileSync(s, 'utf-8'));
            
            if (content.by_language) {
                for (const [key, val] of Object.entries(content.by_language)) {
                    const parsed = LanguageStatsSchema.safeParse(val);
                    if (!parsed.success) {
                        console.error(`[${run}] summary.json invalid language stats for ${key}:`, val);
                        console.error(parsed.error);
                    }
                }
            }
        }
    }
}

check();
