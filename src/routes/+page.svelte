<script lang="ts">
    import Hero from '$lib/components/leaderboard/Hero.svelte';
    import ControlBar from '$lib/components/leaderboard/ControlBar.svelte';
    import SpotlightGrid from '$lib/components/core/SpotlightGrid.svelte';
    import LeaderboardRow from '$lib/components/leaderboard/LeaderboardRow.svelte';
    import { filters } from '$lib/stores/filter.svelte';
    import { flip } from 'svelte/animate';
    import { fade } from 'svelte/transition';

    let { data } = $props();

    // Derived filtered list
    let visibleRuns = $derived(
        data.runs.filter(run => {
            if (filters.verifiedOnly) {
                return run.metadata.verified === 'yes';
            }
            return true;
        })
    );
</script>

<svelte:head>
    <title>SanityHarness Leaderboard</title>
</svelte:head>

<div class="flex flex-col min-h-screen">
    <Hero />
    
    <ControlBar />

    <main class="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 py-12">
        
        <SpotlightGrid>
            <!-- Header Row -->
            <div class="grid grid-cols-12 gap-4 px-4 py-3 text-xs font-bold uppercase tracking-widest text-white/30 border-b border-white/5">
                <div class="col-span-1 text-center">Rank</div>
                <div class="col-span-3">Agent</div>
                <div class="col-span-2">Model</div>
                <div class="col-span-2">Provider</div>
                <div class="col-span-2">Score (W)</div>
                <div class="col-span-1 text-center">Pass %</div>
                <div class="col-span-1 text-center">MCP</div>
            </div>

            <!-- Rows -->
            {#each visibleRuns as run, index (run.id)}
                <div animate:flip={{duration: 300}} in:fade>
                    <LeaderboardRow {run} rank={index + 1} />
                </div>
            {/each}

            {#if visibleRuns.length === 0}
                <div class="p-12 text-center text-white/30 font-mono">
                    No agents found matching criteria.
                </div>
            {/if}
        </SpotlightGrid>

    </main>

    <!-- Footer -->
    <footer class="border-t border-white/5 bg-black/40 py-12 text-center">
        <div class="text-white/40 text-sm">
            &copy; 2026 SanityHarness. <a href="https://github.com/lemon07r/SanityHarness" class="hover:text-white underline">GitHub</a>
        </div>
    </footer>
</div>
