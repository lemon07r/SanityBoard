<script lang="ts">
    import type { RunData, LanguageStats } from '$lib/server/data';
    
    let { run }: { run: RunData } = $props();
    
    // Sort by pass rate desc
    let chartData = $derived(
        Object.entries(run.stats?.by_language || {})
            .map(([lang, stats]: [string, LanguageStats]) => ({
                lang,
                passRate: stats.pass_rate,
                total: stats.total
            }))
            .sort((a, b) => b.passRate - a.passRate)
    );

    const langColors: Record<string, string> = {
      rust: 'bg-orange-500',
      go: 'bg-cyan-500',
      typescript: 'bg-blue-500',
      dart: 'bg-teal-500',
      kotlin: 'bg-purple-500',
      zig: 'bg-yellow-500',
      python: 'bg-green-500'
    };
</script>

<div class="h-48 flex items-end justify-between gap-2 px-6 py-6 bg-foreground/[0.02] dark:bg-white/[0.02] border border-border/40 dark:border-white/5 rounded-2xl mb-8">
    {#each chartData as item (item.lang)}
        <div class="flex-1 flex flex-col items-center gap-3 group relative h-full justify-end">
            <!-- Tooltip -->
            <div class="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-popover dark:bg-black/90 backdrop-blur text-foreground dark:text-white text-xs px-3 py-1.5 rounded border border-border dark:border-white/10 whitespace-nowrap z-10 shadow-xl pointer-events-none">
                <span class="font-bold capitalize">{item.lang}</span>: {item.passRate.toFixed(1)}% <span class="text-muted-foreground dark:text-white/40">({item.total} tasks)</span>
            </div>
            
            <!-- Bar -->
            <div class="w-full max-w-[48px] bg-foreground/5 dark:bg-white/5 rounded-sm relative h-full flex items-end overflow-hidden ring-1 ring-border dark:ring-white/5 group-hover:ring-foreground/20 dark:group-hover:ring-white/20 transition-all">
                <div 
                    class="w-full {langColors[item.lang.toLowerCase()] || 'bg-gray-500'} opacity-80 group-hover:opacity-100 transition-all duration-1000 ease-out"
                    style="height: {item.passRate}%;"
                ></div>
            </div>
            
            <!-- Label -->
            <div class="text-[10px] uppercase font-bold tracking-wider text-muted-foreground/50 dark:text-white/30 group-hover:text-muted-foreground dark:group-hover:text-white/60 transition-colors truncate w-full text-center">
                {item.lang.slice(0, 3)}
            </div>
        </div>
    {/each}
</div>
