<script lang="ts">
    let { rank } = $props();
</script>

<div class="flex items-center justify-center w-5 h-5 md:w-8 md:h-8 font-mono text-[10px] md:text-sm font-bold text-muted-foreground dark:text-white/50 bg-muted/50 dark:bg-white/5 rounded-full ring-1 ring-border/40 dark:ring-white/10">
    #{rank}
</div>
