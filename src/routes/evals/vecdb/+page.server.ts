import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import { marked } from 'marked';
import type { PageServerLoad } from './$types';

const GITHUB_README_URL = 'https://raw.githubusercontent.com/lemon07r/vecdb-bench/refs/heads/main/README.md';

export const load: PageServerLoad = async () => {
    let markdown: string | null = null;

    // Try local file first (for local dev with the repo cloned alongside)
    const readmePath = resolve('..', 'vecdb-bench', 'README.md');
    if (existsSync(readmePath)) {
        markdown = readFileSync(readmePath, 'utf-8');
    } else {
        // Fetch from GitHub
        try {
            const res = await fetch(GITHUB_README_URL);
            if (res.ok) {
                markdown = await res.text();
            }
        } catch {
            // fetch failed, fall through
        }
    }

    if (!markdown) {
        return { html: '<p>README not available.</p>' };
    }

    let html = await marked(markdown);
    // Wrap tables in scrollable containers
    html = html.replace(/<table>/g, '<div class="table-wrapper"><table>').replace(/<\/table>/g, '</table></div>');
    return { html };
};
