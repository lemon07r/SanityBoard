<script lang="ts">
    import Seo from '$lib/components/core/Seo.svelte';
    import { X } from 'lucide-svelte';

    let showModal = $state(false);

    function openModal() {
        showModal = true;
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        showModal = false;
        document.body.style.overflow = '';
    }

    function handleKeydown(e: KeyboardEvent) {
        if (e.key === 'Escape' && showModal) closeModal();
    }
</script>

<svelte:window onkeydown={handleKeydown} />

<Seo 
    title="Web Search API Benchmark"
    description="Benchmark comparing web search, crawl, and extract APIs including Brave, Exa, Firecrawl, Mixedbread, and Tavily."
/>

<div class="max-w-3xl mx-auto px-6 py-12 space-y-8">
    <a href="/evals" class="text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 inline-block">&larr; Back to Evals</a>
    <div class="text-center space-y-4">
        <h1 class="text-3xl font-bold text-foreground dark:text-white">Web Search API Benchmark</h1>
        <p class="text-muted-foreground">Benchmarks Brave, Exa, Firecrawl, Mixedbread, and Tavily across search, crawl, and extract scenarios.</p>
        <button
            onclick={openModal}
            class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground dark:bg-white text-background dark:text-black font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer"
        >
            View Full Report
        </button>
    </div>
</div>

{#if showModal}
    <div class="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <div class="relative w-full h-full">
            <button
                onclick={closeModal}
                class="absolute top-4 right-4 z-[101] p-2 rounded-full bg-black/70 text-white hover:bg-black/90 transition-colors cursor-pointer"
                aria-label="Close report"
            >
                <X size={24} />
            </button>
            <iframe 
                src="/evals/web-search-report.html" 
                title="Web Search API Benchmark Report"
                class="w-full h-full border-0"
                style="background: white;"
            ></iframe>
        </div>
    </div>
{/if}
