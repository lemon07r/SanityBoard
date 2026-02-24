<script>
    import Seo from '$lib/components/core/Seo.svelte';

    let { data } = $props();
</script>

<Seo 
    title="Vector DB Benchmark"
    description="Embedded vector database benchmark comparing LanceDB, DuckDB+VSS+FTS, and SQLite+FTS5+sqlite-vec for hybrid semantic search."
/>

<div class="max-w-5xl mx-auto px-6 py-12">
    <a href="/evals" class="text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 inline-block">&larr; Back to Evals</a>
    <article class="prose max-w-none">
        {@html data.html}
    </article>
</div>
