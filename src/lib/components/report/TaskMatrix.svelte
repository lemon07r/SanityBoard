<script lang="ts">
    import { 
        Search, 
        Filter, 
        CheckCircle2, 
        XCircle, 
        Clock, 
        Code2, 
        Trophy,
        Layers,
        ArrowUp,
        ArrowDown
    } from 'lucide-svelte';
    import { slide } from 'svelte/transition';
    import type { TaskResult as ServerTaskResult } from '$lib/server/data';

    // Extended TaskResult interface for this component
    // The server type has optional status, but we need it for display
    interface TaskResult extends Omit<ServerTaskResult, 'status'> {
        status: string;
        [key: string]: unknown;
    }

    let { results = [] }: { results: ServerTaskResult[] } = $props();

    // Map server results to display results with default status
    let displayResults = $derived(
        results.map(r => ({
            ...r,
            status: r.status ?? (r.passed ? 'pass' : 'fail')
        })) as TaskResult[]
    );

    // State
    let searchQuery = $state('');
    let statusFilter = $state('all'); // all, pass, fail
    let difficultyFilter = $state('all'); // all, basic, expert, ...
    let languageFilter = $state('all'); // all, python, etc.
    
    type SortField = 'task' | 'language' | 'tier' | 'difficulty' | 'duration_seconds' | 'status';
    let sortField = $state<SortField>('task');
    let sortDirection = $state<'asc' | 'desc'>('asc');

    // Derived: Unique Difficulties for Filter Dropdown
    let availableDifficulties = $derived(
        [...new Set(displayResults.map(r => r.difficulty || 'Unknown'))].sort()
    );

    // Derived: Unique Languages for Filter Dropdown
    let availableLanguages = $derived(
        [...new Set(displayResults.map(r => r.language || 'Unknown'))].sort()
    );

    // Derived: Filtered and Sorted Results
    let filteredResults = $derived(
        displayResults
            .filter(r => {
                // Search
                const matchesSearch = r.task.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                    r.language.toLowerCase().includes(searchQuery.toLowerCase());
                
                // Status Filter
                const matchesStatus = statusFilter === 'all' || 
                                    (statusFilter === 'pass' && (r.status === 'pass' || r.status === 'passed')) ||
                                    (statusFilter === 'fail' && (r.status === 'fail' || r.status === 'failed'));
                
                // Difficulty Filter
                const matchesDifficulty = difficultyFilter === 'all' || r.difficulty === difficultyFilter;

                // Language Filter
                const matchesLanguage = languageFilter === 'all' || r.language === languageFilter;

                return matchesSearch && matchesStatus && matchesDifficulty && matchesLanguage;
            })
            .sort((a, b) => {
                const valA = a[sortField] ?? '';
                const valB = b[sortField] ?? '';

                // String comparison
                if (typeof valA === 'string' && typeof valB === 'string') {
                    return sortDirection === 'asc' 
                        ? valA.localeCompare(valB) 
                        : valB.localeCompare(valA);
                }

                // Number comparison
                if (typeof valA === 'number' && typeof valB === 'number') {
                    return sortDirection === 'asc' ? valA - valB : valB - valA;
                }

                return 0;
            })
    );

    // Helpers
    function handleSort(field: SortField) {
        if (sortField === field) {
            sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            sortField = field;
            sortDirection = 'asc';
        }
    }

    function formatDuration(seconds?: number) {
        if (!seconds) return '-';
        if (seconds < 60) return `${seconds.toFixed(1)}s`;
        const m = Math.floor(seconds / 60);
        const s = (seconds % 60).toFixed(0);
        return `${m}m ${s}s`;
    }

    function getDifficultyColor(diff: string) {
        const d = diff.toLowerCase();
        if (d.includes('basic')) return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
        if (d.includes('intermediate')) return 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20';
        if (d.includes('expert') || d.includes('hard')) return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
        return 'text-white/60 bg-white/5 border-white/10';
    }

    function getTierColor(tier: string) {
        // Example tier coloring
        const t = tier.toLowerCase();
        if (t === '1' || t.includes('basic')) return 'text-blue-400';
        if (t === '2' || t.includes('complex')) return 'text-purple-400';
        if (t === '3' || t.includes('advanced')) return 'text-orange-400';
        return 'text-white/50';
    }
</script>

<div class="w-full space-y-6">
    <!-- Controls Bar -->
    <div class="flex flex-col md:flex-row gap-4 p-4 bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl">
        
        <!-- Search -->
        <div class="relative flex-1 group">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-white transition-colors" size={18} />
            <input 
                type="text" 
                bind:value={searchQuery}
                placeholder="Search tasks or languages..." 
                class="w-full bg-black/40 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:bg-black/60 transition-all"
            />
        </div>

        <!-- Filters -->
        <div class="flex gap-3">
            <!-- Status Filter -->
            <div class="relative">
                <select 
                    bind:value={statusFilter}
                    class="appearance-none bg-black/40 border border-white/10 rounded-lg py-2.5 pl-4 pr-10 text-sm text-white focus:outline-none focus:border-white/30 hover:bg-white/5 transition-all cursor-pointer min-w-[140px]"
                >
                    <option value="all">All Status</option>
                    <option value="pass">Passed</option>
                    <option value="fail">Failed</option>
                </select>
                <Filter class="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" size={14} />
            </div>

            <!-- Difficulty Filter -->
            <div class="relative">
                <select 
                    bind:value={difficultyFilter}
                    class="appearance-none bg-black/40 border border-white/10 rounded-lg py-2.5 pl-4 pr-10 text-sm text-white focus:outline-none focus:border-white/30 hover:bg-white/5 transition-all cursor-pointer min-w-[160px]"
                >
                    <option value="all">All Difficulties</option>
                    {#each availableDifficulties as diff (diff)}
                        <option value={diff}>{diff}</option>
                    {/each}
                </select>
                <Layers class="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" size={14} />
            </div>

            <!-- Language Filter -->
            <div class="relative">
                <select 
                    bind:value={languageFilter}
                    class="appearance-none bg-black/40 border border-white/10 rounded-lg py-2.5 pl-4 pr-10 text-sm text-white focus:outline-none focus:border-white/30 hover:bg-white/5 transition-all cursor-pointer min-w-[160px]"
                >
                    <option value="all">All Languages</option>
                    {#each availableLanguages as lang (lang)}
                        <option value={lang}>{lang}</option>
                    {/each}
                </select>
                <Code2 class="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" size={14} />
            </div>
        </div>
    </div>

    <!-- Data Matrix -->
    <div class="border border-white/10 rounded-xl overflow-hidden bg-black/20 backdrop-blur-sm shadow-xl">
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-white/5 border-b border-white/10 text-xs uppercase tracking-widest text-white/40">
                        <th class="p-4 font-semibold cursor-pointer hover:text-white transition-colors group" onclick={() => handleSort('status')}>
                            <div class="flex items-center gap-2">
                                Status
                                {#if sortField === 'status'}
                                    <div in:slide={{axis: 'x', duration: 200}}>
                                        {#if sortDirection === 'asc'}<ArrowUp size={12}/>{:else}<ArrowDown size={12}/>{/if}
                                    </div>
                                {/if}
                            </div>
                        </th>
                        <th class="p-4 font-semibold cursor-pointer hover:text-white transition-colors group" onclick={() => handleSort('task')}>
                            <div class="flex items-center gap-2">
                                Task Name
                                {#if sortField === 'task'}
                                    <div in:slide={{axis: 'x', duration: 200}}>
                                        {#if sortDirection === 'asc'}<ArrowUp size={12}/>{:else}<ArrowDown size={12}/>{/if}
                                    </div>
                                {/if}
                            </div>
                        </th>
                        <th class="p-4 font-semibold cursor-pointer hover:text-white transition-colors group" onclick={() => handleSort('language')}>
                            <div class="flex items-center gap-2">
                                <Code2 size={14} />
                                Language
                                {#if sortField === 'language'}
                                    <div in:slide={{axis: 'x', duration: 200}}>
                                        {#if sortDirection === 'asc'}<ArrowUp size={12}/>{:else}<ArrowDown size={12}/>{/if}
                                    </div>
                                {/if}
                            </div>
                        </th>
                        <th class="p-4 font-semibold cursor-pointer hover:text-white transition-colors group" onclick={() => handleSort('tier')}>
                            <div class="flex items-center gap-2">
                                <Trophy size={14} />
                                Tier
                                {#if sortField === 'tier'}
                                    <div in:slide={{axis: 'x', duration: 200}}>
                                        {#if sortDirection === 'asc'}<ArrowUp size={12}/>{:else}<ArrowDown size={12}/>{/if}
                                    </div>
                                {/if}
                            </div>
                        </th>
                        <th class="p-4 font-semibold cursor-pointer hover:text-white transition-colors group" onclick={() => handleSort('difficulty')}>
                            <div class="flex items-center gap-2">
                                <Layers size={14} />
                                Difficulty
                                {#if sortField === 'difficulty'}
                                    <div in:slide={{axis: 'x', duration: 200}}>
                                        {#if sortDirection === 'asc'}<ArrowUp size={12}/>{:else}<ArrowDown size={12}/>{/if}
                                    </div>
                                {/if}
                            </div>
                        </th>
                        <th class="p-4 font-semibold cursor-pointer hover:text-white transition-colors group" onclick={() => handleSort('duration_seconds')}>
                            <div class="flex items-center gap-2">
                                <Clock size={14} />
                                Duration
                                {#if sortField === 'duration_seconds'}
                                    <div in:slide={{axis: 'x', duration: 200}}>
                                        {#if sortDirection === 'asc'}<ArrowUp size={12}/>{:else}<ArrowDown size={12}/>{/if}
                                    </div>
                                {/if}
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-white/5">
                    {#each filteredResults as result (result.task + result.language)}
                        <tr class="hover:bg-white/[0.02] transition-colors group">
                            <!-- Status -->
                            <td class="p-4">
                                {#if result.status === 'pass' || result.status === 'passed'}
                                    <div class="flex items-center gap-2 text-emerald-400 font-medium">
                                        <CheckCircle2 size={18} class="fill-emerald-400/10" />
                                        <span class="hidden sm:inline text-xs uppercase tracking-wider">Pass</span>
                                    </div>
                                {:else}
                                    <div class="flex items-center gap-2 text-rose-500 font-medium">
                                        <XCircle size={18} class="fill-rose-500/10" />
                                        <span class="hidden sm:inline text-xs uppercase tracking-wider">Fail</span>
                                    </div>
                                {/if}
                            </td>

                            <!-- Task Name -->
                            <td class="p-4">
                                <div class="font-medium text-white/90 group-hover:text-white transition-colors">{result.task}</div>
                            </td>

                            <!-- Language -->
                            <td class="p-4">
                                <span class="px-2 py-1 rounded text-xs font-mono bg-white/5 text-white/70 border border-white/5 uppercase">
                                    {result.language}
                                </span>
                            </td>

                            <!-- Tier -->
                            <td class="p-4">
                                <span class="{getTierColor(result.tier)} font-mono text-sm font-bold">
                                    {result.tier}
                                </span>
                            </td>

                            <!-- Difficulty -->
                            <td class="p-4">
                                <span class="px-2.5 py-1 rounded-full text-xs font-semibold border {getDifficultyColor(result.difficulty)}">
                                    {result.difficulty}
                                </span>
                            </td>

                            <!-- Duration -->
                            <td class="p-4">
                                <span class="font-mono text-sm text-white/50">
                                    {formatDuration(result.duration_seconds)}
                                </span>
                            </td>
                        </tr>
                    {/each}

                    {#if filteredResults.length === 0}
                        <tr>
                            <td colspan="6" class="p-12 text-center text-white/30 font-mono">
                                No tasks match your filters.
                            </td>
                        </tr>
                    {/if}
                </tbody>
            </table>
        </div>
        
        <!-- Footer Stats -->
        <div class="px-4 py-3 bg-white/[0.02] border-t border-white/5 text-xs text-white/40 flex justify-between items-center">
            <div>
                Showing {filteredResults.length} of {displayResults.length} tasks
            </div>
            {#if displayResults.length > 0}
            <div>
                Pass Rate: {Math.round((filteredResults.filter(r => r.status === 'pass' || r.status === 'passed').length / filteredResults.length) * 100) || 0}%
            </div>
            {/if}
        </div>
    </div>
</div>
