<script lang="ts">
    import { filters, type SortOption, type FilterType, type McpFilter } from '$lib/stores/filter.svelte';
    import { ChevronDown, Check, Users, ShieldCheck, Globe, Search, X, ListFilter, ArrowUpDown, Server, Box, Bot } from 'lucide-svelte';
    import { scale } from 'svelte/transition';

    let { availableProviders = [], availableModels = [], availableAgents = [] }: { availableProviders: string[], availableModels: string[], availableAgents: string[] } = $props();

    let isFilterOpen = $state(false);
    let isSortOpen = $state(false);

    const sortOptions: { label: string; value: SortOption }[] = [
        { label: 'Weighted Score', value: 'score' },
        { label: 'Pass Rate', value: 'pass_rate' },
        { label: 'Run Date', value: 'date' },
        { label: 'Agent Name', value: 'agent' },
        { label: 'Provider', value: 'provider' },
        { label: 'Model', value: 'model' }
    ];

    const filterOptions: { label: string; value: FilterType; icon: any }[] = [
        { label: 'All', value: 'all', icon: Globe },
        { label: 'Verified', value: 'verified', icon: ShieldCheck },
        { label: 'Community', value: 'community', icon: Users }
    ];
    
    const mcpOptions: { label: string; value: McpFilter }[] = [
        { label: 'All Agents', value: 'all' },
        { label: 'Enabled', value: 'yes' },
        { label: 'Disabled', value: 'no' }
    ];

    function closeDropdowns() {
        isFilterOpen = false;
        isSortOpen = false;
    }
</script>

<div class="sticky top-0 z-50 backdrop-blur-xl border-b border-white/5 bg-black/40 supports-[backdrop-filter]:bg-black/20">
    <div class="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
        
        <!-- Left: Menus & Search -->
        <div class="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
            
            <!-- Filter Menu -->
            <div class="relative">
                <button 
                    class="flex items-center gap-2 text-sm font-medium transition-colors border border-transparent rounded-lg px-2 py-1.5 hover:bg-white/5 {isFilterOpen || filters.selectedProviders.length > 0 || filters.selectedModels.length > 0 || filters.selectedAgents.length > 0 || filters.mcpFilter !== 'all' ? 'text-white border-white/10 bg-white/5' : 'text-white/60'}"
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
                        class="absolute top-full left-0 mt-2 w-72 bg-[#09090b] backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden max-h-[80vh] overflow-y-auto ring-1 ring-white/5"
                        transition:scale={{duration: 150, start: 0.95}}
                    >
                        <!-- MCP Filter -->
                        <div class="p-4 border-b border-white/5">
                            <div class="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3 px-1">MCP Support</div>
                            <div class="grid grid-cols-3 gap-1 bg-black/20 rounded-lg p-1 border border-white/5">
                                {#each mcpOptions as opt}
                                    <button 
                                        class="text-[11px] py-1.5 rounded-md text-center transition-all {filters.mcpFilter === opt.value ? 'bg-white/15 text-white font-medium shadow-sm border border-white/5' : 'text-white/40 hover:text-white hover:bg-white/5 border border-transparent'}"
                                        onclick={() => filters.mcpFilter = opt.value}
                                    >
                                        {opt.label}
                                    </button>
                                {/each}
                            </div>
                        </div>

                        <!-- Agents -->
                        {#if availableAgents.length > 0}
                        <div class="p-4 border-b border-white/5">
                            <div class="flex items-center justify-between mb-3 px-1">
                                <div class="flex items-center gap-2">
                                    <Bot size={12} class="text-white/40" />
                                    <span class="text-[10px] font-bold text-white/40 uppercase tracking-widest">Agents</span>
                                </div>
                                {#if filters.selectedAgents.length > 0}
                                    <button class="text-[10px] text-indigo-400 hover:text-indigo-300 font-medium transition-colors" onclick={() => filters.selectedAgents = []}>Clear</button>
                                {/if}
                            </div>
                            <div class="space-y-1 max-h-48 overflow-y-auto custom-scrollbar">
                                {#each availableAgents as agent}
                                    {@const isSelected = filters.selectedAgents.includes(agent)}
                                    <label class="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/5 cursor-pointer group transition-colors">
                                        <div class="relative flex items-center justify-center size-4 rounded border transition-all {isSelected ? 'bg-indigo-500 border-indigo-500 shadow-sm shadow-indigo-500/20' : 'border-white/20 bg-white/5 group-hover:border-white/30'}">
                                            {#if isSelected}
                                                <Check size={10} class="text-white" strokeWidth={3} />
                                            {/if}
                                            <input type="checkbox" class="hidden" 
                                                checked={isSelected}
                                                onchange={() => filters.toggleAgent(agent)}
                                            />
                                        </div>
                                        <span class="text-sm transition-colors {isSelected ? 'text-white' : 'text-white/70 group-hover:text-white'}">{agent}</span>
                                    </label>
                                {/each}
                            </div>
                        </div>
                        {/if}

                        <!-- Providers -->
                        {#if availableProviders.length > 0}
                        <div class="p-4 border-b border-white/5">
                            <div class="flex items-center justify-between mb-3 px-1">
                                <div class="flex items-center gap-2">
                                    <Server size={12} class="text-white/40" />
                                    <span class="text-[10px] font-bold text-white/40 uppercase tracking-widest">Providers</span>
                                </div>
                                {#if filters.selectedProviders.length > 0}
                                    <button class="text-[10px] text-indigo-400 hover:text-indigo-300 font-medium transition-colors" onclick={() => filters.selectedProviders = []}>Clear</button>
                                {/if}
                            </div>
                            <div class="space-y-1 max-h-48 overflow-y-auto custom-scrollbar">
                                {#each availableProviders as provider}
                                    {@const isSelected = filters.selectedProviders.includes(provider)}
                                    <label class="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/5 cursor-pointer group transition-colors">
                                        <div class="relative flex items-center justify-center size-4 rounded border transition-all {isSelected ? 'bg-indigo-500 border-indigo-500 shadow-sm shadow-indigo-500/20' : 'border-white/20 bg-white/5 group-hover:border-white/30'}">
                                            {#if isSelected}
                                                <Check size={10} class="text-white" strokeWidth={3} />
                                            {/if}
                                            <input type="checkbox" class="hidden" 
                                                checked={isSelected}
                                                onchange={() => filters.toggleProvider(provider)}
                                            />
                                        </div>
                                        <span class="text-sm transition-colors {isSelected ? 'text-white' : 'text-white/70 group-hover:text-white'}">{provider}</span>
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
                                    <Box size={12} class="text-white/40" />
                                    <span class="text-[10px] font-bold text-white/40 uppercase tracking-widest">Models</span>
                                </div>
                                {#if filters.selectedModels.length > 0}
                                    <button class="text-[10px] text-indigo-400 hover:text-indigo-300 font-medium transition-colors" onclick={() => filters.selectedModels = []}>Clear</button>
                                {/if}
                            </div>
                            <div class="space-y-1 max-h-48 overflow-y-auto custom-scrollbar">
                                {#each availableModels as model}
                                    {@const isSelected = filters.selectedModels.includes(model)}
                                    <label class="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/5 cursor-pointer group transition-colors">
                                        <div class="relative flex items-center justify-center size-4 rounded border transition-all {isSelected ? 'bg-indigo-500 border-indigo-500 shadow-sm shadow-indigo-500/20' : 'border-white/20 bg-white/5 group-hover:border-white/30'}">
                                            {#if isSelected}
                                                <Check size={10} class="text-white" strokeWidth={3} />
                                            {/if}
                                            <input type="checkbox" class="hidden" 
                                                checked={isSelected}
                                                onchange={() => filters.toggleModel(model)}
                                            />
                                        </div>
                                        <span class="text-sm transition-colors {isSelected ? 'text-white' : 'text-white/70 group-hover:text-white'}">{model}</span>
                                    </label>
                                {/each}
                            </div>
                        </div>
                        {/if}
                    </div>
                {/if}
            </div>

            <!-- Sort Menu -->
             <div class="relative">
                <button 
                    class="flex items-center gap-2 text-sm font-medium transition-colors border border-transparent rounded-lg px-2 py-1.5 hover:bg-white/5 {isSortOpen ? 'text-white border-white/10 bg-white/5' : 'text-white/60'}"
                    onclick={() => { isSortOpen = !isSortOpen; isFilterOpen = false; }}
                >
                    <ArrowUpDown size={16} />
                    <span class="hidden sm:inline">Sort</span>
                    <span class="text-white/30 text-xs hidden sm:inline">({sortOptions.find(o => o.value === filters.sortBy)?.label})</span>
                    <ChevronDown size={14} class="opacity-50 {isSortOpen ? 'rotate-180' : ''} transition-transform" />
                </button>

                {#if isSortOpen}
                    <div class="fixed inset-0 z-40 cursor-default" onclick={closeDropdowns} aria-hidden="true"></div>
                    <div 
                        class="absolute top-full left-0 mt-2 w-56 bg-[#09090b] backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden ring-1 ring-white/5" 
                        transition:scale={{duration: 150, start: 0.95}}
                    >
                         <div class="p-1">
                            <div class="px-3 py-2 text-[10px] font-bold text-white/40 uppercase tracking-widest border-b border-white/5 mb-1">
                                Order By
                            </div>
                            {#each sortOptions as option (option.value)}
                                <button
                                    class="w-full text-left px-3 py-2 text-sm rounded-lg flex items-center justify-between group transition-colors {filters.sortBy === option.value ? 'bg-white/10 text-white font-medium' : 'text-white/60 hover:bg-white/5 hover:text-white'}"
                                    onclick={() => {
                                        filters.sortBy = option.value;
                                        isSortOpen = false;
                                    }}
                                >
                                    <span>{option.label}</span>
                                    {#if filters.sortBy === option.value}
                                        <Check size={14} class="text-emerald-400" />
                                    {/if}
                                </button>
                            {/each}
                        </div>
                    </div>
                {/if}
            </div>

            <!-- Vertical Divider -->
            <div class="h-6 w-px bg-white/10 hidden md:block mx-2"></div>

            <!-- Search Input (Moved to Right) -->
            <div class="relative group flex-1 max-w-sm hidden md:block">
                <Search size={14} class="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-white transition-colors" />
                <input 
                    type="text" 
                    placeholder="Search agents, providers..." 
                    bind:value={filters.searchQuery}
                    class="w-full bg-white/5 border border-white/5 rounded-lg pl-9 pr-8 py-1.5 text-sm text-white placeholder-white/30 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all focus:ring-1 focus:ring-white/20"
                />
                {#if filters.searchQuery}
                    <button class="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors" onclick={() => filters.searchQuery = ''}>
                        <X size={12} />
                    </button>
                {/if}
            </div>

            <!-- Mobile Search Icon -->
            <div class="md:hidden">
                 <Search size={16} class="text-white/60" />
            </div>

        </div>

        <!-- Right: Segmented Control (Category) -->
        <div class="flex items-center p-1 bg-white/5 rounded-lg border border-white/5 shrink-0">
            {#each filterOptions as option (option.value)}
                <button 
                    class="flex items-center gap-2 text-sm px-3 py-1.5 rounded-md transition-all {filters.filterType === option.value ? 'bg-white/10 text-white shadow-sm border border-white/5' : 'text-white/40 hover:text-white hover:bg-white/5 border border-transparent'}"
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
        background: rgba(255, 255, 255, 0.02);
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.2);
    }
</style>
