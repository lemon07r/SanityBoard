<script lang="ts">
    import Hero from '$lib/components/leaderboard/Hero.svelte';
    import ControlBar from '$lib/components/leaderboard/ControlBar.svelte';
    import SpotlightGrid from '$lib/components/core/SpotlightGrid.svelte';
    import LeaderboardRow from '$lib/components/leaderboard/LeaderboardRow.svelte';
    import { filters } from '$lib/stores/filter.svelte';
    import { fade } from 'svelte/transition';
    import { Github } from 'lucide-svelte';

    let { data } = $props();

    // Derived unique options for filters
    let availableProviders = $derived([...new Set(data.runs.map(r => r.metadata['Provider Name']))].sort());
    let availableModels = $derived([...new Set(data.runs.map(r => r.metadata['Model Name']))].sort());
    let availableAgents = $derived([...new Set(data.runs.map(r => r.metadata['Agent Name']))].sort());

    // Derived filtered list
    let visibleRuns = $derived(
        data.runs
            .filter(run => {
                // Category Filter
                if (filters.filterType === 'verified' && run.metadata.verified !== 'yes') return false;
                if (filters.filterType === 'community' && run.metadata.verified === 'yes') return false;

                // Search Filter
                if (filters.searchQuery) {
                    const q = filters.searchQuery.toLowerCase();
                    const match = 
                        run.metadata['Agent Name'].toLowerCase().includes(q) ||
                        run.metadata['Provider Name'].toLowerCase().includes(q) ||
                        run.metadata['Model Name'].toLowerCase().includes(q);
                    if (!match) return false;
                }

                // Provider Filter
                if (filters.selectedProviders.length > 0) {
                    if (!filters.selectedProviders.includes(run.metadata['Provider Name'])) return false;
                }

                // Model Filter
                if (filters.selectedModels.length > 0) {
                    if (!filters.selectedModels.includes(run.metadata['Model Name'])) return false;
                }
                
                // Agent Filter
                if (filters.selectedAgents.length > 0) {
                    if (!filters.selectedAgents.includes(run.metadata['Agent Name'])) return false;
                }

                // MCP Filter
                if (filters.mcpFilter !== 'all') {
                    const hasMcp = run.metadata['MCP tools available']?.toLowerCase().includes('yes');
                    if (filters.mcpFilter === 'yes' && !hasMcp) return false;
                    if (filters.mcpFilter === 'no' && hasMcp) return false;
                }

                return true;
            })
            .sort((a, b) => {
                switch (filters.sortBy) {
                    case 'pass_rate':
                        return (b.stats?.pass_rate || 0) - (a.stats?.pass_rate || 0);
                    case 'date':
                        return new Date(b.metadata['Run Date']).getTime() - new Date(a.metadata['Run Date']).getTime();
                    case 'agent':
                        return a.metadata['Agent Name'].localeCompare(b.metadata['Agent Name']);
                    case 'provider':
                        return a.metadata['Provider Name'].localeCompare(b.metadata['Provider Name']);
                    case 'model':
                        return a.metadata['Model Name'].localeCompare(b.metadata['Model Name']);
                    case 'score':
                    default: {
                        // Primary: Weighted Score
                        const scoreDiff = (b.stats?.weighted_score || 0) - (a.stats?.weighted_score || 0);
                        if (scoreDiff !== 0) return scoreDiff;
                        // Secondary: Date
                        return new Date(b.metadata['Run Date']).getTime() - new Date(a.metadata['Run Date']).getTime();
                    }
                }
            })
    );
</script>

<svelte:head>
    <title>SanityHarness Leaderboard</title>
</svelte:head>

<div class="flex flex-col min-h-screen">
    <Hero />
    
    <ControlBar {availableProviders} {availableModels} {availableAgents} />

    <main class="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 py-12">
        
        <SpotlightGrid>
            <!-- Header Row -->
            <div class="grid grid-cols-12 gap-2 md:gap-4 px-4 py-3 text-xs font-bold uppercase tracking-widest text-white/30 border-b border-white/5">
                <div class="col-span-2 md:col-span-1 text-center">Rank</div>
                <div class="col-span-7 md:col-span-3">Agent</div>
                <div class="col-span-2 hidden md:block">Model</div>
                <div class="col-span-2 hidden md:block">Provider</div>
                <div class="col-span-3 md:col-span-2 text-right md:text-left">Score</div>
                <div class="col-span-1 text-center hidden md:block">Pass %</div>
                <div class="col-span-1 text-center hidden md:block">MCP</div>
            </div>

            <!-- Rows -->
            {#each visibleRuns as run, index (run.id)}
                <div in:fade>
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
        <div class="text-white/40 text-sm flex items-center justify-center gap-4">
            <span>&copy; 2026 SanityHarness.</span>
            <a href="https://github.com/lemon07r/SanityHarness" class="hover:text-white flex items-center gap-2 transition-colors">
                <Github size={16} />
                GitHub
            </a>
        </div>
    </footer>
</div>
