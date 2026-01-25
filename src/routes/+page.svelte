<script lang="ts">
    import Hero from '$lib/components/leaderboard/Hero.svelte';
    import ControlBar from '$lib/components/leaderboard/ControlBar.svelte';
    import SpotlightGrid from '$lib/components/core/SpotlightGrid.svelte';
    import LeaderboardRow from '$lib/components/leaderboard/LeaderboardRow.svelte';
    import Seo from '$lib/components/core/Seo.svelte';
    import { filters, type SortOption } from '$lib/stores/filter.svelte';
    import { fade } from 'svelte/transition';
    import { Github, ArrowUp, ArrowDown } from 'lucide-svelte';

    let { data } = $props();

    // Derived unique options for filters
    let availableProviders = $derived([...new Set(data.runs.map(r => r.metadata['Provider Name']))].sort());
    let availableModels = $derived([...new Set(data.runs.map(r => r.metadata['Model Name']))].sort());
    let availableAgents = $derived([...new Set(data.runs.map(r => r.metadata['Agent Name']))].sort());

    // Derived filtered list
    let filteredRuns = $derived(
        data.runs.filter(run => {
            // Category Filter
            const isVerified = run.metadata.verified?.toLowerCase() === 'yes';
            if (filters.filterType === 'verified' && !isVerified) return false;
            if (filters.filterType === 'community' && isVerified) return false;

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

            // Agent Type Filter
            if (filters.agentTypeFilter !== 'all') {
                    const type = run.metadata['Agent Type'] === 'Open Source' ? 'open' : 'proprietary';
                    if (filters.agentTypeFilter !== type) return false;
            }

            // Model Type Filter
            if (filters.modelTypeFilter !== 'all') {
                    const type = run.metadata['Model Type'] === 'Open Source' ? 'open' : 'proprietary';
                    if (filters.modelTypeFilter !== type) return false;
            }

            return true;
        })
    );

    // Calculate rank based on weighted score (descending)
    let rankMap = $derived(
        new Map(
            [...filteredRuns]
                .sort((a, b) => {
                    const diff = (b.stats?.weighted_score || 0) - (a.stats?.weighted_score || 0);
                    if (diff === 0) {
                        return new Date(b.metadata['Run Date']).getTime() - new Date(a.metadata['Run Date']).getTime();
                    }
                    return diff;
                })
                .map((run, index) => [run.id, index + 1])
        )
    );

    // Apply sorting for display
    let visibleRuns = $derived(
        [...filteredRuns]
            .sort((a, b) => {
                let diff = 0;
                switch (filters.sortBy) {
                    case 'pass_rate':
                        diff = (a.stats?.pass_rate || 0) - (b.stats?.pass_rate || 0);
                        break;
                    case 'date':
                        diff = new Date(a.metadata['Run Date']).getTime() - new Date(b.metadata['Run Date']).getTime();
                        break;
                    case 'agent':
                        diff = a.metadata['Agent Name'].localeCompare(b.metadata['Agent Name']);
                        break;
                    case 'provider':
                        diff = a.metadata['Provider Name'].localeCompare(b.metadata['Provider Name']);
                        break;
                    case 'model':
                        diff = a.metadata['Model Name'].localeCompare(b.metadata['Model Name']);
                        break;
                    case 'score':
                    default: {
                        diff = (a.stats?.weighted_score || 0) - (b.stats?.weighted_score || 0);
                        if (diff === 0) {
                             // Secondary sort by date
                             return new Date(b.metadata['Run Date']).getTime() - new Date(a.metadata['Run Date']).getTime();
                        }
                        break;
                    }
                }
                
                return filters.sortDirection === 'asc' ? diff : -diff;
            })
    );

    function handleSort(column: SortOption) {
        filters.toggleSort(column);
    }
</script>

<Seo 
    title="SanityHarness Leaderboard"
    description="Compare AI coding agents on standardized, isolated benchmarks. View rankings by weighted score, pass rate, and model across verified and community submissions."
    openGraph={{
        title: 'SanityHarness Leaderboard',
        description: 'High-signal, agent-agnostic evaluation for AI coding agents. Compare rankings by weighted score, pass rate, and model.'
    }}
    jsonLd={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'SanityHarness Leaderboard',
        description: 'AI agent evaluation leaderboard providing high-signal, agent-agnostic benchmarks for coding agents.',
        url: 'https://sanityboard.lr7.dev',
        mainEntity: {
            '@type': 'ItemList',
            name: 'AI Agent Leaderboard',
            numberOfItems: data.runs.length,
            itemListElement: data.runs.slice(0, 10).map((run, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: `${run.metadata['Agent Name']} v${run.metadata['Agent Version']}`,
                description: `${run.metadata['Model Name']} via ${run.metadata['Provider Name']} - Score: ${run.stats?.weighted_score?.toFixed(2) ?? 'N/A'}`
            }))
        }
    }}
/>

<div class="flex flex-col min-h-screen">
    <Hero />
    
    <ControlBar {availableProviders} {availableModels} {availableAgents} />

    <main class="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 py-12">
        
        <SpotlightGrid>
            <!-- Header Row -->
            <div class="grid grid-cols-12 gap-2 md:gap-4 px-4 py-3 text-xs font-bold uppercase tracking-widest text-muted-foreground/50 dark:text-white/30 border-b border-border/40 dark:border-white/5 items-center">
                <div class="col-span-2 md:col-span-1 text-center">Rank</div>
                
                <!-- Agent -->
                <button class="col-span-7 md:col-span-3 text-left flex items-center gap-1 hover:text-foreground dark:hover:text-white transition-colors group" onclick={() => handleSort('agent')}>
                    Agent
                    {#if filters.sortBy === 'agent'}
                        {#if filters.sortDirection === 'asc'}
                             <ArrowUp size={12} class="text-emerald-400" />
                        {:else}
                             <ArrowDown size={12} class="text-emerald-400" />
                        {/if}
                    {/if}
                </button>

                <!-- Model -->
                <button class="col-span-2 hidden md:flex items-center gap-1 hover:text-foreground dark:hover:text-white transition-colors group" onclick={() => handleSort('model')}>
                    Model
                    {#if filters.sortBy === 'model'}
                        {#if filters.sortDirection === 'asc'}
                             <ArrowUp size={12} class="text-emerald-400" />
                        {:else}
                             <ArrowDown size={12} class="text-emerald-400" />
                        {/if}
                    {/if}
                </button>

                <!-- Provider -->
                <button class="col-span-2 hidden md:flex items-center gap-1 hover:text-foreground dark:hover:text-white transition-colors group" onclick={() => handleSort('provider')}>
                    Provider
                    {#if filters.sortBy === 'provider'}
                        {#if filters.sortDirection === 'asc'}
                             <ArrowUp size={12} class="text-emerald-400" />
                        {:else}
                             <ArrowDown size={12} class="text-emerald-400" />
                        {/if}
                    {/if}
                </button>

                <!-- Score -->
                <button class="col-span-3 md:col-span-2 text-right md:text-left flex items-center justify-end md:justify-start gap-1 hover:text-foreground dark:hover:text-white transition-colors group" onclick={() => handleSort('score')}>
                    Score
                    {#if filters.sortBy === 'score'}
                        {#if filters.sortDirection === 'asc'}
                             <ArrowUp size={12} class="text-emerald-400" />
                        {:else}
                             <ArrowDown size={12} class="text-emerald-400" />
                        {/if}
                    {/if}
                </button>

                <!-- Pass Rate -->
                <button class="col-span-1 hidden md:flex items-center justify-center gap-1 hover:text-foreground dark:hover:text-white transition-colors group" onclick={() => handleSort('pass_rate')}>
                    Pass %
                    {#if filters.sortBy === 'pass_rate'}
                        {#if filters.sortDirection === 'asc'}
                             <ArrowUp size={12} class="text-emerald-400" />
                        {:else}
                             <ArrowDown size={12} class="text-emerald-400" />
                        {/if}
                    {/if}
                </button>
                
                <!-- MCP (Not sortable) -->
                <div class="col-span-1 text-center hidden md:block">MCP</div>
            </div>

            <!-- Rows -->
            {#each visibleRuns as run (run.id)}
                <div in:fade>
                    <LeaderboardRow {run} rank={rankMap.get(run.id) ?? 0} />
                </div>
            {/each}

            {#if visibleRuns.length === 0}
                <div class="p-12 text-center text-muted-foreground dark:text-white/30 font-mono">
                    No agents found matching criteria.
                </div>
            {/if}
        </SpotlightGrid>

    </main>

    <!-- Footer -->
    <footer class="border-t border-border/40 dark:border-white/5 bg-card/80 dark:bg-black/40 py-8">
        <div class="max-w-7xl mx-auto px-4 md:px-6 relative flex flex-col md:flex-row items-center md:justify-end gap-4 text-muted-foreground dark:text-white/40 text-sm">
            <span class="md:absolute md:left-1/2 md:-translate-x-1/2">&copy; 2026 LR7</span>
            
            <div class="flex items-center gap-6">
                <a href="https://github.com/lemon07r/SanityHarness" class="hover:text-foreground dark:hover:text-white flex items-center gap-2 transition-colors">
                    <Github size={16} />
                    GitHub
                </a>
                
                <div class="flex items-center gap-2">
                    <span>Built by</span>
                    <a href="https://github.com/lemon07r" target="_blank" rel="noreferrer" class="text-muted-foreground dark:text-white/60 hover:text-foreground dark:hover:text-white transition-colors">
                        lemon07r
                    </a>
                </div>
            </div>
        </div>
    </footer>
</div>
