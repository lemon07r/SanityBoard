import { readFileSync } from 'fs';
import { resolve } from 'path';
import { marked } from 'marked';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const readmePath = resolve('..', 'vecdb-bench', 'README.md');
    const markdown = readFileSync(readmePath, 'utf-8');
    let html = await marked(markdown);
    // Wrap tables in scrollable containers
    html = html.replace(/<table>/g, '<div class="table-wrapper"><table>').replace(/<\/table>/g, '</table></div>');
    return { html };
};
