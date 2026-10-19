<script>
  import { Github } from "lucide-svelte";

  import Seo from "$lib/components/core/Seo.svelte";
  import SpotlightCard from "$lib/components/core/SpotlightCard.svelte";

  const evals = [
    {
      title: "Search API Eval v2",
      description:
        "Brave, Exa, Parallel, Firecrawl and Tavily as search tools for a PR reviewer and a coding agent: retrieval accuracy, bug finding, hidden tests, latency and cost.",
      href: "/evals/search-v2",
      github: "https://github.com/lemon07r/SanitySearchEval",
    },
    {
      title: "Vector DB Benchmark",
      description:
        "Compares LanceDB, DuckDB+VSS+FTS, and SQLite+FTS5+sqlite-vec across code search and fantasy book RAG workloads.",
      href: "/evals/vecdb",
      github: "https://github.com/lemon07r/vecdb-bench",
    },
    {
      title: "Web Search API Benchmark",
      description:
        "Benchmarks Brave, Exa, Firecrawl, Mixedbread, and Tavily across search, crawl, and extract scenarios.",
      href: "/evals/web-search",
      github: "https://github.com/lemon07r/SanityWebEval",
    },
  ];
</script>

<Seo
  title="Evals"
  description="Additional benchmarks and evaluations from the Sanity project."
/>

<div
  class="max-w-3xl mx-auto px-6 py-12 space-y-8 text-foreground dark:text-white"
>
  <div class="text-center space-y-2">
    <h1 class="text-3xl font-bold">Evals</h1>
    <p class="text-muted-foreground dark:text-white/60">
      Additional benchmarks and evaluations
    </p>
  </div>

  <div class="grid gap-4">
    {#each evals as item (item.href)}
      <SpotlightCard>
        <div class="p-6">
          <div class="flex items-start justify-between gap-4">
            <a
              href={item.href}
              class="block flex-1 rounded text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground dark:text-white dark:focus-visible:outline-cyan-400"
            >
              <h2 class="text-xl font-semibold mb-2">{item.title}</h2>
              <p class="text-muted-foreground dark:text-white/60 text-sm">
                {item.description}
              </p>
            </a>
            <a
              href={item.github}
              target="_blank"
              rel="noopener noreferrer"
              class="shrink-0 p-2 rounded-lg text-muted-foreground dark:text-white/60 hover:text-foreground dark:hover:text-white hover:bg-foreground/5 dark:hover:bg-white/10 transition-colors"
              aria-label={`View ${item.title} on GitHub`}
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </SpotlightCard>
    {/each}
  </div>
</div>
