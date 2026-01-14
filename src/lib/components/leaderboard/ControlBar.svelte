<script lang="ts">
    import { filters } from '$lib/stores/filter.svelte';
    import { Filter } from 'lucide-svelte';
</script>

<div class="sticky top-0 z-50 backdrop-blur-xl border-b border-white/5 bg-black/40 supports-[backdrop-filter]:bg-black/20">
    <div class="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <!-- Left: Label -->
        <div class="flex items-center gap-2 text-sm font-medium text-white/60">
            <Filter size={16} />
            <span>View Options</span>
        </div>

        <!-- Right: Toggles -->
        <div class="flex items-center gap-4">
            <button 
                class="text-sm px-3 py-1.5 rounded-full transition-all border {filters.verifiedOnly ? 'bg-white/10 border-white/20 text-white' : 'border-transparent text-white/40 hover:text-white'}"
                onclick={() => filters.verifiedOnly = true}
            >
                Verified
            </button>
            <button 
                class="text-sm px-3 py-1.5 rounded-full transition-all border {!filters.verifiedOnly ? 'bg-white/10 border-white/20 text-white' : 'border-transparent text-white/40 hover:text-white'}"
                onclick={() => filters.verifiedOnly = false}
            >
                Community
            </button>
        </div>
    </div>
</div>
