<script lang="ts">
    import { filters, type SortOption, type FilterType, type McpFilter } from '$lib/stores/filter.svelte';
    import { ChevronDown, Check, Users, ShieldCheck, Globe, Search, X, ListFilter, ArrowUpDown, Server, Box, Bot, Calendar, Columns3 } from 'lucide-svelte';
    import { scale } from 'svelte/transition';

    let { availableProviders = [], availableModels = [], availableAgents = [], availableDates = [] }: { availableProviders: string[], availableModels: string[], availableAgents: string[], availableDates: string[] } = $props();

    let isFilterOpen = $state(false);
    let isSortOpen = $state(false);
    let isExpanded = $state(false);

    // Date range slider state
    let sortedDates = $derived([...availableDates].sort());
    let minDate = $derived(sortedDates[0] ?? '');
    let maxDate = $derived(sortedDates[sortedDates.length - 1] ?? '');
    let sliderMin = $state(0);
    let sliderMax = $state(0);
    let dateSliderInitialized = $state(false);

    $effect(() => {
        if (sortedDates.length > 0 && !dateSliderInitialized) {
            sliderMin = 0;
            sliderMax = sortedDates.length - 1;
            dateSliderInitialized = true;
        }
    });

    function onSliderMinChange(val: number) {
        sliderMin = Math.min(val, sliderMax);
        filters.dateRangeMin = sliderMin === 0 ? null : sortedDates[sliderMin];
    }

    function onSliderMaxChange(val: number) {
        sliderMax = Math.max(val, sliderMin);
        filters.dateRangeMax = sliderMax === sortedDates.length - 1 ? null : sortedDates[sliderMax];
    }

    function resetDateRange() {
        sliderMin = 0;
        sliderMax = sortedDates.length - 1;
        filters.dateRangeMin = null;
        filters.dateRangeMax = null;
    }

    let dateRangeActive = $derived(sliderMin > 0 || sliderMax < sortedDates.length - 1);

    // Dual-thumb range helpers
    let rangeTrackEl = $state<HTMLDivElement | null>(null);

    function getSliderPercent(val: number): number {
        const max = sortedDates.length - 1;
        return max > 0 ? (val / max) * 100 : 0;
    }

    function handleRangePointerDown(e: PointerEvent) {
        if (!rangeTrackEl) return;
        const rect = rangeTrackEl.getBoundingClientRect();
        const maxIdx = sortedDates.length - 1;

        const calcVal = (ev: PointerEvent) => {
            const pct = Math.max(0, Math.min(100, ((ev.clientX - rect.left) / rect.width) * 100));
            return Math.round((pct / 100) * maxIdx);
        };

        const rawVal = calcVal(e);
        const distMin = Math.abs(rawVal - sliderMin);
        const distMax = Math.abs(rawVal - sliderMax);
        const isMin = distMin <= distMax;

        const update = (ev: PointerEvent) => {
            const val = calcVal(ev);
            if (isMin) {
                onSliderMinChange(val);
            } else {
                onSliderMaxChange(val);
            }
        };

        update(e);

        const onMove = (ev: PointerEvent) => update(ev);
        const onUp = () => {
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onUp);
        };
        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerup', onUp);
    }

    const sortOptions: { label: string; value: SortOption }[] = [
        { label: 'Weighted Score', value: 'score' },
        { label: 'Pass Rate', value: 'pass_rate' },
        { label: 'Run Date', value: 'date' },
        { label: 'Agent Name', value: 'agent' },
        { label: 'Provider', value: 'provider' },
        { label: 'Model', value: 'model' }
    ];

    const filterOptions: { label: string; value: FilterType; icon: typeof Globe }[] = [
        { label: 'All', value: 'all', icon: Globe },
        { label: 'Verified', value: 'verified', icon: ShieldCheck },
        { label: 'Community', value: 'community', icon: Users }
    ];
    
    const mcpOptions: { label: string; value: McpFilter }[] = [
        { label: 'All Agents', value: 'all' },
        { label: 'Enabled', value: 'yes' },
        { label: 'Disabled', value: 'no' }
    ];

    const openSourceOptions: { label: string; value: import('$lib/stores/filter.svelte').OpenSourceFilter }[] = [
        { label: 'All', value: 'all' },
        { label: 'Open', value: 'open' },
        { label: 'Proprietary', value: 'proprietary' }
    ];

    function closeDropdowns() {
        isFilterOpen = false;
        isSortOpen = false;
    }
</script>

<div class="sticky top-0 z-50 backdrop-blur-xl border-b border-border dark:border-white/5 bg-background/95 dark:bg-black/40 supports-[backdrop-filter]:bg-background/80 dark:supports-[backdrop-filter]:bg-black/20">
    <div class="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
        
        <!-- Left: Menus & Search -->
        <div class="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
            
            <!-- Filter Menu -->
            <div class="relative">
                <button 
                    class="flex items-center gap-2 text-sm font-medium transition-colors border border-transparent rounded-lg px-2 py-1.5 hover:bg-foreground/5 dark:hover:bg-white/5 {isFilterOpen || filters.selectedProviders.length > 0 || filters.selectedModels.length > 0 || filters.selectedAgents.length > 0 || filters.mcpFilter !== 'all' || filters.agentTypeFilter !== 'all' || filters.modelTypeFilter !== 'all' ? 'text-foreground dark:text-white border-border/40 dark:border-white/10 bg-foreground/5 dark:bg-white/5' : 'text-muted-foreground dark:text-white/60'}"
                    onclick={() => { isFilterOpen = !isFilterOpen; isSortOpen = false; }}
                >
                    <ListFilter size={16} />
                    <span class="hidden sm:inline">Filters</span>
                    {#if filters.selectedProviders.length + filters.selectedModels.length + filters.selectedAgents.length > 0}
                        <span class="flex items-center justify-center w-4 h-4 rounded-full bg-indigo-500 text-[10px] font-bold text-white shadow-lg shadow-indigo-500/20">
                            {filters.selectedProviders.length + filters.selectedModels.length + filters.selectedAgents.length}
                        </span>
                    {/if}
                    <ChevronDown size={14} class="opacity-50 {isFilterOpen ? 'rotate-180' : ''} transition-transform" />
                </button>

                {#if isFilterOpen}
                    <div class="fixed inset-0 z-40 cursor-default" onclick={closeDropdowns} aria-hidden="true"></div>
                    <div 
                        class="absolute top-full left-0 mt-2 bg-popover dark:bg-[#09090b] backdrop-blur-xl border border-border/40 dark:border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden max-h-[80vh] overflow-y-auto ring-1 ring-border/10 dark:ring-white/5 transition-all duration-200 {isExpanded ? 'filter-panel-expanded' : 'w-72'}"
                        transition:scale={{duration: 150, start: 0.95}}
                    >
                        <!-- Toggle Filters: Agent Type, Model Type, MCP/Skills -->
                        <div class="{isExpanded ? 'filter-toggle-grid' : ''}">
                            <!-- Agent Type Filter -->
                            <div class="p-4 border-b border-border/40 dark:border-white/5">
                                {#if isExpanded}
                                <div class="flex items-center justify-between mb-3 px-1">
                                    <div class="text-[10px] font-bold text-muted-foreground/50 dark:text-white/40 uppercase tracking-widest">Agent Type</div>
                                    <span class="invisible text-[10px] px-2 py-1"><Columns3 size={12} /></span>
                                </div>
                                {:else}
                                <div class="text-[10px] font-bold text-muted-foreground/50 dark:text-white/40 uppercase tracking-widest mb-3 px-1 flex items-center justify-between">
                                    <span>Agent Type</span>
                                    <button
                                        class="hidden landscape-expand:flex items-center gap-1.5 font-medium transition-colors rounded-md text-muted-foreground/50 dark:text-white/30 hover:text-muted-foreground dark:hover:text-white/50"
                                        onclick={() => isExpanded = true}
                                    >
                                        <Columns3 size={12} />
                                        Expand
                                    </button>
                                </div>
                                {/if}
                                <div class="grid grid-cols-3 gap-1 bg-muted/40 dark:bg-black/20 rounded-lg p-1 border border-border/40 dark:border-white/5">
                                    {#each openSourceOptions as opt (opt.value)}
                                        <button 
                                            class="text-[11px] py-1.5 rounded-md text-center transition-all {filters.agentTypeFilter === opt.value ? 'bg-card dark:bg-white/15 text-foreground dark:text-white font-medium shadow-sm border border-border/20 dark:border-white/5' : 'text-muted-foreground dark:text-white/40 hover:text-foreground dark:hover:text-white hover:bg-foreground/5 dark:hover:bg-white/5 border border-transparent'}"
                                            onclick={() => filters.agentTypeFilter = opt.value}
                                        >
                                            {opt.label}
                                        </button>
                                    {/each}
                                </div>
                            </div>

                            <!-- Model Type Filter -->
                            <div class="p-4 border-b border-border/40 dark:border-white/5">
                                {#if isExpanded}
                                <div class="flex items-center justify-between mb-3 px-1">
                                    <div class="text-[10px] font-bold text-muted-foreground/50 dark:text-white/40 uppercase tracking-widest">Model Type</div>
                                    <span class="invisible text-[10px] px-2 py-1"><Columns3 size={12} /></span>
                                </div>
                                {:else}
                                <div class="text-[10px] font-bold text-muted-foreground/50 dark:text-white/40 uppercase tracking-widest mb-3 px-1">Model Type</div>
                                {/if}
                                <div class="grid grid-cols-3 gap-1 bg-muted/40 dark:bg-black/20 rounded-lg p-1 border border-border/40 dark:border-white/5">
                                    {#each openSourceOptions as opt (opt.value)}
                                        <button 
                                            class="text-[11px] py-1.5 rounded-md text-center transition-all {filters.modelTypeFilter === opt.value ? 'bg-card dark:bg-white/15 text-foreground dark:text-white font-medium shadow-sm border border-border/20 dark:border-white/5' : 'text-muted-foreground dark:text-white/40 hover:text-foreground dark:hover:text-white hover:bg-foreground/5 dark:hover:bg-white/5 border border-transparent'}"
                                            onclick={() => filters.modelTypeFilter = opt.value}
                                        >
                                            {opt.label}
                                        </button>
                                    {/each}
                                </div>
                            </div>

                            <!-- MCP / Skills Filter -->
                            <div class="p-4 border-b border-border/40 dark:border-white/5">
                                {#if isExpanded}
                                <div class="flex items-center justify-between mb-3 px-1">
                                    <div class="text-[10px] font-bold text-muted-foreground/50 dark:text-white/40 uppercase tracking-widest">MCP / Skills</div>
                                    <button
                                        class="hidden landscape-expand:flex items-center gap-1.5 text-[10px] font-medium transition-colors rounded-md px-2 py-1 text-indigo-500 dark:text-indigo-400 bg-indigo-500/5 dark:bg-indigo-400/5"
                                        onclick={() => isExpanded = false}
                                    >
                                        <Columns3 size={12} />
                                        Collapse
                                    </button>
                                </div>
                                {:else}
                                <div class="text-[10px] font-bold text-muted-foreground/50 dark:text-white/40 uppercase tracking-widest mb-3 px-1">MCP / Skills</div>
                                {/if}
                                <div class="grid grid-cols-3 gap-1 bg-muted/40 dark:bg-black/20 rounded-lg p-1 border border-border/40 dark:border-white/5">
                                    {#each mcpOptions as opt (opt.value)}
                                        <button 
                                            class="text-[11px] py-1.5 rounded-md text-center transition-all {filters.mcpFilter === opt.value ? 'bg-card dark:bg-white/15 text-foreground dark:text-white font-medium shadow-sm border border-border/20 dark:border-white/5' : 'text-muted-foreground dark:text-white/40 hover:text-foreground dark:hover:text-white hover:bg-foreground/5 dark:hover:bg-white/5 border border-transparent'}"
                                            onclick={() => filters.mcpFilter = opt.value}
                                        >
                                            {opt.label}
                                        </button>
                                    {/each}
                                </div>
                            </div>
                        </div>

                        <!-- Date Range -->
                        {#if sortedDates.length > 1}
                        <div class="p-4 border-b border-border/40 dark:border-white/5">
                            <div class="flex items-center justify-between mb-3 px-1">
                                <div class="flex items-center gap-2">
                                    <Calendar size={12} class="text-muted-foreground dark:text-white/40" />
                                    <span class="text-[10px] font-bold text-muted-foreground/50 dark:text-white/40 uppercase tracking-widest">Date Range</span>
                                </div>
                                {#if dateRangeActive}
                                    <button class="text-[10px] text-indigo-500 dark:text-indigo-400 hover:text-indigo-400 dark:hover:text-indigo-300 font-medium transition-colors" onclick={resetDateRange}>Reset</button>
                                {/if}
                            </div>
                            <div class="px-1 space-y-3">
                                <div class="flex items-center justify-between text-xs text-muted-foreground dark:text-white/60 font-mono">
                                    <span>{sortedDates[sliderMin] ?? minDate}</span>
                                    <span class="text-muted-foreground/30 dark:text-white/20">to</span>
                                    <span>{sortedDates[sliderMax] ?? maxDate}</span>
                                </div>
                                <!-- Single track with two thumbs -->
                                <div
                                    class="dual-range-track"
                                    bind:this={rangeTrackEl}
                                    onpointerdown={handleRangePointerDown}
                                    role="slider"
                                    aria-valuemin={0}
                                    aria-valuemax={sortedDates.length - 1}
                                    aria-valuenow={sliderMin}
                                    aria-label="Date range"
                                    tabindex={0}
                                >
                                    <div class="dual-range-bg"></div>
                                    <div
                                        class="dual-range-fill"
                                        style="left: {getSliderPercent(sliderMin)}%; right: {100 - getSliderPercent(sliderMax)}%;"
                                    ></div>
                                    <div
                                        class="dual-range-thumb"
                                        style="left: {getSliderPercent(sliderMin)}%;"
                                    ></div>
                                    <div
                                        class="dual-range-thumb"
                                        style="left: {getSliderPercent(sliderMax)}%;"
                                    ></div>
                                </div>
                            </div>
                        </div>
                        {/if}

                        <!-- Agents / Providers / Models - in expanded mode these go into a 3-col grid -->
                        <div class="{isExpanded ? 'filter-list-grid' : ''}">
                            <!-- Agents -->
                            {#if availableAgents.length > 0}
                            <div class="p-4 border-b border-border/40 dark:border-white/5">
                                <div class="flex items-center justify-between mb-3 px-1">
                                    <div class="flex items-center gap-2">
                                        <Bot size={12} class="text-muted-foreground dark:text-white/40" />
                                        <span class="text-[10px] font-bold text-muted-foreground/50 dark:text-white/40 uppercase tracking-widest">Agents</span>
                                    </div>
                                    {#if filters.selectedAgents.length > 0}
                                        <button class="text-[10px] text-indigo-500 dark:text-indigo-400 hover:text-indigo-400 dark:hover:text-indigo-300 font-medium transition-colors" onclick={() => filters.selectedAgents = []}>Clear</button>
                                    {/if}
                                </div>
                                <div class="space-y-1 overflow-y-auto custom-scrollbar {isExpanded ? 'max-h-72' : 'max-h-48'}">
                                    {#each availableAgents as agent (agent)}
                                        {@const isSelected = filters.selectedAgents.includes(agent)}
                                        <label class="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-foreground/5 dark:hover:bg-white/5 cursor-pointer group transition-colors">
                                            <div class="relative flex items-center justify-center size-4 rounded border transition-all {isSelected ? 'bg-indigo-500 border-indigo-500 shadow-sm shadow-indigo-500/20' : 'border-border dark:border-white/20 bg-card dark:bg-white/5 group-hover:border-foreground/30 dark:group-hover:border-white/30'}">
                                                {#if isSelected}
                                                    <Check size={10} class="text-white" strokeWidth={3} />
                                                {/if}
                                                <input type="checkbox" class="hidden" 
                                                    checked={isSelected}
                                                    onchange={() => filters.toggleAgent(agent)}
                                                />
                                            </div>
                                            <span class="text-sm transition-colors {isSelected ? 'text-foreground dark:text-white' : 'text-muted-foreground dark:text-white/70 group-hover:text-foreground dark:group-hover:text-white'}">{agent}</span>
                                        </label>
                                    {/each}
                                </div>
                            </div>
                            {/if}

                            <!-- Providers -->
                            {#if availableProviders.length > 0}
                            <div class="p-4 border-b border-border/40 dark:border-white/5">
                                <div class="flex items-center justify-between mb-3 px-1">
                                    <div class="flex items-center gap-2">
                                        <Server size={12} class="text-muted-foreground dark:text-white/40" />
                                        <span class="text-[10px] font-bold text-muted-foreground/50 dark:text-white/40 uppercase tracking-widest">Providers</span>
                                    </div>
                                    {#if filters.selectedProviders.length > 0}
                                        <button class="text-[10px] text-indigo-500 dark:text-indigo-400 hover:text-indigo-400 dark:hover:text-indigo-300 font-medium transition-colors" onclick={() => filters.selectedProviders = []}>Clear</button>
                                    {/if}
                                </div>
                                <div class="space-y-1 overflow-y-auto custom-scrollbar {isExpanded ? 'max-h-72' : 'max-h-48'}">
                                    {#each availableProviders as provider (provider)}
                                        {@const isSelected = filters.selectedProviders.includes(provider)}
                                        <label class="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-foreground/5 dark:hover:bg-white/5 cursor-pointer group transition-colors">
                                            <div class="relative flex items-center justify-center size-4 rounded border transition-all {isSelected ? 'bg-indigo-500 border-indigo-500 shadow-sm shadow-indigo-500/20' : 'border-border dark:border-white/20 bg-card dark:bg-white/5 group-hover:border-foreground/30 dark:group-hover:border-white/30'}">
                                                {#if isSelected}
                                                    <Check size={10} class="text-white" strokeWidth={3} />
                                                {/if}
                                                <input type="checkbox" class="hidden" 
                                                    checked={isSelected}
                                                    onchange={() => filters.toggleProvider(provider)}
                                                />
                                            </div>
                                            <span class="text-sm transition-colors {isSelected ? 'text-foreground dark:text-white' : 'text-muted-foreground dark:text-white/70 group-hover:text-foreground dark:group-hover:text-white'}">{provider}</span>
                                        </label>
                                    {/each}
                                </div>
                            </div>
                            {/if}

                            <!-- Models -->
                            {#if availableModels.length > 0}
                            <div class="p-4">
                                <div class="flex items-center justify-between mb-3 px-1">
                                    <div class="flex items-center gap-2">
                                        <Box size={12} class="text-muted-foreground dark:text-white/40" />
                                        <span class="text-[10px] font-bold text-muted-foreground/50 dark:text-white/40 uppercase tracking-widest">Models</span>
                                    </div>
                                    {#if filters.selectedModels.length > 0}
                                        <button class="text-[10px] text-indigo-500 dark:text-indigo-400 hover:text-indigo-400 dark:hover:text-indigo-300 font-medium transition-colors" onclick={() => filters.selectedModels = []}>Clear</button>
                                    {/if}
                                </div>
                                <div class="space-y-1 overflow-y-auto custom-scrollbar {isExpanded ? 'max-h-72' : 'max-h-48'}">
                                    {#each availableModels as model (model)}
                                        {@const isSelected = filters.selectedModels.includes(model)}
                                        <label class="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-foreground/5 dark:hover:bg-white/5 cursor-pointer group transition-colors">
                                            <div class="relative flex items-center justify-center size-4 rounded border transition-all {isSelected ? 'bg-indigo-500 border-indigo-500 shadow-sm shadow-indigo-500/20' : 'border-border dark:border-white/20 bg-card dark:bg-white/5 group-hover:border-foreground/30 dark:group-hover:border-white/30'}">
                                                {#if isSelected}
                                                    <Check size={10} class="text-white" strokeWidth={3} />
                                                {/if}
                                                <input type="checkbox" class="hidden" 
                                                    checked={isSelected}
                                                    onchange={() => filters.toggleModel(model)}
                                                />
                                            </div>
                                            <span class="text-sm transition-colors {isSelected ? 'text-foreground dark:text-white' : 'text-muted-foreground dark:text-white/70 group-hover:text-foreground dark:group-hover:text-white'}">{model}</span>
                                        </label>
                                    {/each}
                                </div>
                            </div>
                            {/if}
                        </div>
                    </div>
                {/if}
            </div>

            <!-- Sort Menu -->
             <div class="relative">
                <button 
                    class="flex items-center gap-2 text-sm font-medium transition-colors border border-transparent rounded-lg px-2 py-1.5 hover:bg-foreground/5 dark:hover:bg-white/5 {isSortOpen ? 'text-foreground dark:text-white border-border/40 dark:border-white/10 bg-foreground/5 dark:bg-white/5' : 'text-muted-foreground dark:text-white/60'}"
                    onclick={() => { isSortOpen = !isSortOpen; isFilterOpen = false; }}
                >
                    <ArrowUpDown size={16} />
                    <span class="hidden sm:inline">Sort</span>
                    <span class="text-muted-foreground/50 dark:text-white/30 text-xs hidden sm:inline">({sortOptions.find(o => o.value === filters.sortBy)?.label})</span>
                    <ChevronDown size={14} class="opacity-50 {isSortOpen ? 'rotate-180' : ''} transition-transform" />
                </button>

                {#if isSortOpen}
                    <div class="fixed inset-0 z-40 cursor-default" onclick={closeDropdowns} aria-hidden="true"></div>
                    <div 
                        class="absolute top-full left-0 mt-2 w-56 bg-popover dark:bg-[#09090b] backdrop-blur-xl border border-border/40 dark:border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden ring-1 ring-border/10 dark:ring-white/5" 
                        transition:scale={{duration: 150, start: 0.95}}
                    >
                         <div class="p-1">
                            <div class="px-3 py-2 text-[10px] font-bold text-muted-foreground/50 dark:text-white/40 uppercase tracking-widest border-b border-border/40 dark:border-white/5 mb-1">
                                Order By
                            </div>
                            {#each sortOptions as option (option.value)}
                                <button
                                    class="w-full text-left px-3 py-2 text-sm rounded-lg flex items-center justify-between group transition-colors {filters.sortBy === option.value ? 'bg-foreground/5 dark:bg-white/10 text-foreground dark:text-white font-medium' : 'text-muted-foreground dark:text-white/60 hover:bg-foreground/5 dark:hover:bg-white/5 hover:text-foreground dark:hover:text-white'}"
                                    onclick={() => {
                                        filters.sortBy = option.value;
                                        isSortOpen = false;
                                    }}
                                >
                                    <span>{option.label}</span>
                                    {#if filters.sortBy === option.value}
                                        <Check size={14} class="text-emerald-500 dark:text-emerald-400" />
                                    {/if}
                                </button>
                            {/each}
                        </div>
                    </div>
                {/if}
            </div>

            <!-- Vertical Divider -->
            <div class="h-6 w-px bg-border/40 dark:bg-white/10 hidden md:block mx-2"></div>

            <!-- Search Input -->
            <div class="relative group flex-1 max-w-sm hidden md:block">
                <Search size={14} class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground dark:text-white/40 group-focus-within:text-foreground dark:group-focus-within:text-white transition-colors" />
                <input 
                    type="text" 
                    placeholder="Search agents, providers..." 
                    bind:value={filters.searchQuery}
                    class="w-full bg-foreground/5 dark:bg-white/5 border border-transparent dark:border-white/5 rounded-lg pl-9 pr-8 py-1.5 text-sm text-foreground dark:text-white placeholder-muted-foreground/70 dark:placeholder-white/30 focus:outline-none focus:bg-foreground/10 dark:focus:bg-white/10 focus:border-border/40 dark:focus:border-white/20 transition-all focus:ring-1 focus:ring-border/40 dark:focus:ring-white/20"
                />
                {#if filters.searchQuery}
                    <button class="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground dark:text-white/40 hover:text-foreground dark:hover:text-white p-1 rounded-full hover:bg-foreground/10 dark:hover:bg-white/10 transition-colors" onclick={() => filters.searchQuery = ''}>
                        <X size={12} />
                    </button>
                {/if}
            </div>

            <!-- Mobile Search Icon -->
            <div class="md:hidden">
                 <Search size={16} class="text-muted-foreground dark:text-white/60" />
            </div>

        </div>

        <!-- Right: Segmented Control (Category) -->
        <div class="flex items-center p-1 bg-muted/40 dark:bg-white/5 rounded-lg border border-border/40 dark:border-white/5 shrink-0">
            {#each filterOptions as option (option.value)}
                <button 
                    class="flex items-center gap-2 text-sm px-3 py-1.5 rounded-md transition-all {filters.filterType === option.value ? 'bg-card dark:bg-white/10 text-foreground dark:text-white shadow-sm border border-border/20 dark:border-white/5' : 'text-muted-foreground dark:text-white/40 hover:text-foreground dark:hover:text-white hover:bg-foreground/5 dark:hover:bg-white/5 border border-transparent'}"
                    onclick={() => filters.setFilter(option.value)}
                >
                    <option.icon size={14} />
                    <span class="hidden sm:inline">{option.label}</span>
                </button>
            {/each}
        </div>
    </div>
</div>

<style>
    /* Custom Scrollbar for dropdowns */
    .custom-scrollbar::-webkit-scrollbar {
        width: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
    }
    :global(.dark) .custom-scrollbar::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.02);
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: hsl(var(--muted-foreground) / 0.2);
        border-radius: 4px;
    }
    :global(.dark) .custom-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.1);
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: hsl(var(--muted-foreground) / 0.4);
    }
    :global(.dark) .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.2);
    }

    /* Dual-range slider */
    .dual-range-track {
        position: relative;
        height: 24px;
        cursor: pointer;
        touch-action: none;
        user-select: none;
    }
    .dual-range-bg {
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 4px;
        transform: translateY(-50%);
        border-radius: 2px;
        background: hsl(var(--border) / 0.4);
    }
    :global(.dark) .dual-range-bg {
        background: rgba(255, 255, 255, 0.1);
    }
    .dual-range-fill {
        position: absolute;
        top: 50%;
        height: 4px;
        transform: translateY(-50%);
        border-radius: 2px;
        background: hsl(var(--foreground) / 0.3);
    }
    :global(.dark) .dual-range-fill {
        background: rgba(129, 140, 248, 0.35);
    }
    .dual-range-thumb {
        position: absolute;
        top: 50%;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        background: hsl(var(--foreground));
        border: 2px solid hsl(var(--background));
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
        pointer-events: none;
        transition: transform 0.1s ease;
    }
    :global(.dark) .dual-range-thumb {
        background: rgb(129 140 248);
        border-color: #09090b;
        box-shadow: 0 0 6px rgba(129, 140, 248, 0.3);
    }
    .dual-range-track:hover .dual-range-thumb {
        transform: translate(-50%, -50%) scale(1.15);
    }

    /* Expanded filter panel */
    .filter-panel-expanded {
        width: 54rem;
    }

    /* In expanded mode, toggle filters in 3 columns */
    .filter-toggle-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0;
        border-bottom: 1px solid hsl(var(--border) / 0.4);
    }
    :global(.dark) .filter-toggle-grid {
        border-bottom-color: rgba(255, 255, 255, 0.05);
    }
    .filter-toggle-grid > :global(div) {
        border-bottom: none !important;
        border-right: 1px solid hsl(var(--border) / 0.4);
    }
    :global(.dark) .filter-toggle-grid > :global(div) {
        border-right-color: rgba(255, 255, 255, 0.05);
    }
    .filter-toggle-grid > :global(div:nth-child(3n)),
    .filter-toggle-grid > :global(div:last-child) {
        border-right: none;
    }

    /* In expanded mode, agents/providers/models in 3 columns */
    .filter-list-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0;
    }
    .filter-list-grid > :global(div) {
        border-bottom: none !important;
        border-right: 1px solid hsl(var(--border) / 0.4);
    }
    :global(.dark) .filter-list-grid > :global(div) {
        border-right-color: rgba(255, 255, 255, 0.05);
    }
    .filter-list-grid > :global(div:nth-child(3n)),
    .filter-list-grid > :global(div:last-child) {
        border-right: none;
    }

    /* Landscape expand: only show on wide landscape screens */
    @media (min-aspect-ratio: 4/3) and (min-width: 1024px) {
        :global(.landscape-expand\:flex) {
            display: flex !important;
        }
    }
</style>
