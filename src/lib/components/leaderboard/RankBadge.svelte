<script lang="ts">
    let { rank } = $props();
</script>

<div class="flex items-center justify-center w-8 h-8 font-mono text-sm font-bold text-muted-foreground dark:text-white/50 bg-muted/50 dark:bg-white/5 rounded-full ring-1 ring-border/40 dark:ring-white/10">
    #{rank}
</div>
