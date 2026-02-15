<script lang="ts">
    import Hero from '$lib/components/leaderboard/Hero.svelte';
    import ControlBar from '$lib/components/leaderboard/ControlBar.svelte';
    import SpotlightGrid from '$lib/components/core/SpotlightGrid.svelte';
    import LeaderboardRow from '$lib/components/leaderboard/LeaderboardRow.svelte';
    import Seo from '$lib/components/core/Seo.svelte';
    import { SPONSORS } from '$lib/data/sponsors';
    import { filters, type SortOption } from '$lib/stores/filter.svelte';
    import { fade } from 'svelte/transition';
    import { Github, MessageCircle, Heart, ArrowUp, ArrowDown, Bot, FlaskConical, Box, Code } from 'lucide-svelte';

    let { data } = $props();

    // Derived unique options for filters
    let availableProviders = $derived([...new Set(data.runs.map(r => r.metadata['Model Provider']))].sort());
    let availableModels = $derived([...new Set(data.runs.map(r => r.metadata['Model Name']))].sort());
    let availableAgents = $derived([...new Set(data.runs.map(r => r.metadata['Agent Name']))].sort());

    // Derived filtered list
    let filteredRuns = $derived(
        data.runs.filter(run => {
            // Category Filter
            const isVerified = run.metadata.verified === true;
            if (filters.filterType === 'verified' && !isVerified) return false;
            if (filters.filterType === 'community' && isVerified) return false;

            // Search Filter
            if (filters.searchQuery) {
                const q = filters.searchQuery.toLowerCase();
                const match = 
                    run.metadata['Agent Name'].toLowerCase().includes(q) ||
                    run.metadata['Model Provider'].toLowerCase().includes(q) ||
                    run.metadata['Model Name'].toLowerCase().includes(q);
                if (!match) return false;
            }

            // Provider Filter
            if (filters.selectedProviders.length > 0) {
                if (!filters.selectedProviders.includes(run.metadata['Model Provider'])) return false;
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
                const hasMcp = run.metadata['MCP tools available'] === true;
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
                    const type = (run.metadata['Model Type'] === 'Open Source' || run.metadata['Model Type'] === 'Open Weight') ? 'open' : 'proprietary';
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
                        diff = a.metadata['Model Provider'].localeCompare(b.metadata['Model Provider']);
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
                description: `${run.metadata['Model Name']} via ${run.metadata['Model Provider']} - Score: ${run.stats?.weighted_score?.toFixed(2) ?? 'N/A'}`
            }))
        }
    }}
/>

<div class="flex flex-col min-h-screen">
    <Hero />

    <!-- Stats Strip -->
    <div class="max-w-7xl mx-auto w-full px-4 md:px-6 -mt-8 mb-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {#each [
                { label: 'Evaluations', value: data.stats.totalEvals, icon: FlaskConical },
                { label: 'Agents', value: data.stats.totalAgents, icon: Bot },
                { label: 'Models', value: data.stats.totalModels, icon: Box },
                { label: 'Languages', value: data.stats.totalLanguages, icon: Code }
            ] as stat (stat.label)}
                <div class="flex items-center gap-3 px-4 py-3 rounded-xl border border-border/40 dark:border-white/5 bg-card/80 dark:bg-white/[0.02]">
                    <div class="p-2 rounded-lg bg-foreground/5 dark:bg-white/5">
                        <stat.icon size={16} class="text-muted-foreground dark:text-white/40" />
                    </div>
                    <div>
                        <div class="text-lg font-bold text-foreground dark:text-white font-mono">{stat.value}</div>
                        <div class="text-[10px] uppercase tracking-widest text-muted-foreground/60 dark:text-white/30 font-semibold">{stat.label}</div>
                    </div>
                </div>
            {/each}
        </div>
    </div>

    <ControlBar {availableProviders} {availableModels} {availableAgents} />

    <main class="flex-1 max-w-7xl mx-auto w-full pl-2 pr-1.5 md:px-6 py-12">
        
        <SpotlightGrid>
            <!-- Header Row -->
            <div class="grid grid-cols-12 gap-1.5 md:gap-4 px-3 md:px-4 py-3 text-xs font-bold uppercase tracking-widest text-muted-foreground/50 dark:text-white/30 border-b border-border/40 dark:border-white/5 items-center">
                <div class="col-span-1 text-center"><span class="hidden md:inline">Rank</span></div>
                
                <!-- Agent -->
                <button class="col-span-5 md:col-span-3 text-left flex items-center gap-1 pl-1 md:pl-0 hover:text-foreground dark:hover:text-white transition-colors group" onclick={() => handleSort('agent')}>
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
                <button class="col-span-4 md:col-span-2 flex items-center gap-1 hover:text-foreground dark:hover:text-white transition-colors group" onclick={() => handleSort('model')}>
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
                <button class="col-span-2 text-right md:text-left flex items-center justify-end md:justify-start gap-1 hover:text-foreground dark:hover:text-white transition-colors group" onclick={() => handleSort('score')}>
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

    <!-- Supporters Section -->
    {#if SPONSORS.length > 0}
        <section class="max-w-7xl mx-auto w-full px-4 md:px-6 py-12">
            <div class="text-center mb-8">
                <div class="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 dark:text-white/30 font-bold mb-2">Supported by</div>
                <div class="w-12 h-px bg-border/60 dark:bg-white/10 mx-auto"></div>
            </div>
            <div class="flex flex-wrap items-center justify-center gap-6 md:gap-8">
                {#each SPONSORS as sponsor (sponsor.github)}
                    <a
                        href={sponsor.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="group flex flex-col items-center gap-2 transition-all hover:scale-105"
                    >
                        <img
                            src={sponsor.avatarUrl}
                            alt={sponsor.name}
                            width="48"
                            height="48"
                            loading="lazy"
                            class="rounded-full ring-2 ring-border/40 dark:ring-white/10 group-hover:ring-foreground/20 dark:group-hover:ring-pink-500/30 transition-all"
                        />
                        <span class="text-xs text-muted-foreground dark:text-white/50 group-hover:text-foreground dark:group-hover:text-white transition-colors font-medium">{sponsor.name}</span>
                    </a>
                {/each}
                <a
                    href="/about"
                    class="flex flex-col items-center gap-2 transition-all hover:scale-105 group"
                >
                    <div class="w-12 h-12 rounded-full border-2 border-dashed border-border/40 dark:border-white/10 flex items-center justify-center group-hover:border-foreground/30 dark:group-hover:border-pink-500/30 transition-colors">
                        <Heart size={16} class="text-muted-foreground/40 dark:text-white/20 group-hover:text-foreground/60 dark:group-hover:text-pink-400/60 transition-colors" />
                    </div>
                    <span class="text-xs text-muted-foreground/60 dark:text-white/30 group-hover:text-foreground dark:group-hover:text-white transition-colors font-medium">Become a sponsor</span>
                </a>
            </div>
        </section>
    {/if}

    <!-- Footer -->
    <footer class="border-t border-border/40 dark:border-white/5 bg-card/80 dark:bg-black/40 py-8">
        <div class="max-w-7xl mx-auto px-4 md:px-6">
            <div class="flex flex-col md:flex-row items-center justify-between gap-6">
                <!-- Left: Copyright & Built by -->
                <div class="flex flex-col items-center md:items-start gap-1 text-sm text-muted-foreground dark:text-white/40">
                    <span>&copy; 2026 LR7</span>
                    <div class="flex items-center gap-1.5">
                        <span>Built by</span>
                        <a href="https://github.com/lemon07r" target="_blank" rel="noreferrer" class="text-muted-foreground dark:text-white/60 hover:text-foreground dark:hover:text-white transition-colors">lemon07r</a>
                    </div>
                </div>

                <!-- Center: Nav Links -->
                <nav class="flex items-center gap-6 text-sm text-muted-foreground dark:text-white/40">
                    <a href="/" class="hover:text-foreground dark:hover:text-white transition-colors">Leaderboard</a>
                    <a href="/about" class="hover:text-foreground dark:hover:text-white transition-colors">About</a>
                    <a href="/submit" class="hover:text-foreground dark:hover:text-white transition-colors">Submit</a>
                </nav>

                <!-- Right: Social Links -->
                <div class="flex items-center gap-4">
                    <a href="https://github.com/lemon07r/SanityHarness" target="_blank" rel="noopener noreferrer" class="text-muted-foreground dark:text-white/40 hover:text-foreground dark:hover:text-white transition-colors">
                        <Github size={18} />
                    </a>
                    <a href="https://discord.gg/rXNQXCTWDt" target="_blank" rel="noopener noreferrer" class="text-muted-foreground dark:text-white/40 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
                        <MessageCircle size={18} />
                    </a>
                </div>
            </div>

            <!-- Inline sponsor avatars in footer -->
            {#if SPONSORS.length > 0}
                <div class="flex items-center justify-center gap-3 mt-6 pt-6 border-t border-border/20 dark:border-white/5">
                    <span class="text-[10px] uppercase tracking-widest text-muted-foreground/40 dark:text-white/20 font-semibold">Sponsors</span>
                    <div class="flex items-center -space-x-1">
                        {#each SPONSORS as sponsor (sponsor.github)}
                            <a href={sponsor.github} target="_blank" rel="noopener noreferrer" title={sponsor.name}>
                                <img
                                    src={sponsor.avatarUrl}
                                    alt={sponsor.name}
                                    width="24"
                                    height="24"
                                    loading="lazy"
                                    class="rounded-full ring-1 ring-card dark:ring-black/40 hover:ring-foreground/20 dark:hover:ring-pink-500/30 transition-all hover:scale-110"
                                />
                            </a>
                        {/each}
                    </div>
                </div>
            {/if}
        </div>
    </footer>
</div>
