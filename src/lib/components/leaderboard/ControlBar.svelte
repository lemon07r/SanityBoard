<script lang="ts">
    import { filters, type SortOption, type FilterType } from '$lib/stores/filter.svelte';
    import { Filter, ChevronDown, Check, Users, ShieldCheck, Globe } from 'lucide-svelte';
    import { scale } from 'svelte/transition';

    let isOpen = $state(false);

    const sortOptions: { label: string; value: SortOption }[] = [
        { label: 'Weighted Score', value: 'score' },
        { label: 'Pass Rate', value: 'pass_rate' },
        { label: 'Run Date', value: 'date' }
    ];

    type LucideIcon = typeof Globe | typeof ShieldCheck | typeof Users;

    const filterOptions: { label: string; value: FilterType; icon: LucideIcon }[] = [
        { label: 'All', value: 'all', icon: Globe },
        { label: 'Verified', value: 'verified', icon: ShieldCheck },
        { label: 'Community', value: 'community', icon: Users }
    ];
</script>

<div class="sticky top-0 z-50 backdrop-blur-xl border-b border-white/5 bg-black/40 supports-[backdrop-filter]:bg-black/20">
    <div class="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <!-- Left: Filter Menu -->
        <div class="relative">
            <button 
                class="flex items-center gap-2 text-sm font-medium transition-colors {isOpen ? 'text-white' : 'text-white/60 hover:text-white'}"
                onclick={() => isOpen = !isOpen}
            >
                <Filter size={16} />
                <span>View Options</span>
                <ChevronDown size={14} class="opacity-50 {isOpen ? 'rotate-180' : ''} transition-transform" />
            </button>

            <!-- Dropdown -->
            {#if isOpen}
                 <!-- Backdrop -->
                 <div 
                    class="fixed inset-0 z-40 cursor-default" 
                    onclick={() => isOpen = false}
                    aria-hidden="true"
                 ></div>
                 
                 <div 
                    class="absolute top-full left-0 mt-2 w-56 bg-[#111] backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl z-50 overflow-hidden" 
                    transition:scale={{duration: 150, start: 0.95}}
                 >
                    <div class="px-4 py-2.5 text-[10px] font-bold text-white/30 uppercase tracking-widest border-b border-white/5">
                        Sort Order
                    </div>
                    <div class="p-1">
                        {#each sortOptions as option (option.value)}
                            <button
                                class="w-full text-left px-3 py-2 text-sm rounded-md flex items-center justify-between group transition-colors {filters.sortBy === option.value ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'}"
                                onclick={() => {
                                    filters.sortBy = option.value;
                                    isOpen = false;
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

        <!-- Right: Segmented Control -->
        <div class="flex items-center p-1 bg-white/5 rounded-lg border border-white/5">
            {#each filterOptions as option (option.value)}
                <button 
                    class="flex items-center gap-2 text-sm px-3 py-1.5 rounded-md transition-all {filters.filterType === option.value ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white hover:bg-white/5'}"
                    onclick={() => filters.setFilter(option.value)}
                >
                    <option.icon size={14} />
                    <span class="hidden sm:inline">{option.label}</span>
                </button>
            {/each}
        </div>
    </div>
</div>
