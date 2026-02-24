<script>
    import Seo from '$lib/components/core/Seo.svelte';
    import SpotlightCard from '$lib/components/core/SpotlightCard.svelte';
    import { Github } from 'lucide-svelte';

    const evals = [
        {
            title: 'Vector DB Benchmark',
            description: 'Compares LanceDB, DuckDB+VSS+FTS, and SQLite+FTS5+sqlite-vec across code search and fantasy book RAG workloads.',
            href: '/evals/vecdb',
            github: 'https://github.com/lemon07r/vecdb-bench'
        },
        {
            title: 'Web Search API Benchmark',
            description: 'Benchmarks Brave, Exa, Firecrawl, Mixedbread, and Tavily across search, crawl, and extract scenarios.',
            href: '/evals/web-search',
            github: 'https://github.com/lemon07r/SanityWebEval'
        }
    ];
</script>

<Seo 
    title="Evals"
    description="Additional benchmarks and evaluations from the Sanity project."
/>

<div class="max-w-3xl mx-auto px-6 py-12 space-y-8">
    <div class="text-center space-y-2">
        <h1 class="text-3xl font-bold">Evals</h1>
        <p class="text-muted-foreground">Additional benchmarks and evaluations</p>
    </div>

    <div class="grid gap-4">
        {#each evals as item}
            <a href={item.href} class="block">
                <SpotlightCard>
                    <div class="p-6">
                        <div class="flex items-start justify-between gap-4">
                            <div>
                                <h2 class="text-xl font-semibold mb-2">{item.title}</h2>
                                <p class="text-muted-foreground text-sm">{item.description}</p>
                            </div>
                            <a
                                href={item.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                onclick={(e) => e.stopPropagation()}
                                class="shrink-0 p-2 rounded-lg text-muted-foreground hover:text-foreground dark:hover:text-white hover:bg-foreground/5 dark:hover:bg-white/10 transition-colors"
                                aria-label="View on GitHub"
                            >
                                <Github size={20} />
                            </a>
                        </div>
                    </div>
                </SpotlightCard>
            </a>
        {/each}
    </div>
</div>
