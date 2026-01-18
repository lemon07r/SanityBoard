<script lang="ts">
    import { FileText, Database } from 'lucide-svelte';
    
    let { activeTab = $bindable('report') } = $props();

    const tabs = [
        { id: 'report', label: 'Flight Report', icon: FileText },
        { id: 'matrix', label: 'Task Matrix', icon: Database },
    ];
</script>

<div class="flex items-center gap-2 p-1 bg-white/5 rounded-lg border border-white/5 mb-8 w-fit">
    {#each tabs as tab}
        {@const Icon = tab.icon}
        <button
            class="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all {activeTab === tab.id ? 'bg-white text-black shadow-lg' : 'text-white/60 hover:text-white hover:bg-white/5'}"
            onclick={() => activeTab = tab.id}
        >
            <Icon size={16} />
            {tab.label}
        </button>
    {/each}
</div>
