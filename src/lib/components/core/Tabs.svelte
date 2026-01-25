<script lang="ts">
    import { FileText, Database } from 'lucide-svelte';
    
    let { activeTab = $bindable('report') } = $props();

    const tabs = [
        { id: 'report', label: 'Flight Report', icon: FileText },
        { id: 'matrix', label: 'Task Matrix', icon: Database },
    ];
</script>

<div class="flex items-center gap-2 p-1 bg-foreground/5 dark:bg-white/5 rounded-lg border border-border/40 dark:border-white/5 mb-8 w-fit">
    {#each tabs as tab (tab.id)}
        {@const Icon = tab.icon}
        <button
            class="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all {activeTab === tab.id ? 'bg-foreground dark:bg-white text-background dark:text-black shadow-lg' : 'text-muted-foreground dark:text-white/60 hover:text-foreground dark:hover:text-white hover:bg-foreground/5 dark:hover:bg-white/5'}"
            onclick={() => activeTab = tab.id}
        >
            <Icon size={16} />
            {tab.label}
        </button>
    {/each}
</div>
