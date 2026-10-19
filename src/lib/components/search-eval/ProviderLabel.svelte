<script lang="ts">
  import { PROVIDER_COLORS, type Arm } from "$lib/data/search-eval-v2";

  let { arm, name, profile }: { arm: Arm; name: string; profile?: string } =
    $props();
</script>

<span
  class="inline-flex items-center gap-2 whitespace-nowrap text-foreground dark:text-white/90"
>
  <span
    class="h-2 w-2 shrink-0 rounded-full"
    style:background={PROVIDER_COLORS[arm]}
    aria-hidden="true"
  ></span>
  <span class="font-medium">{name}</span>
  {#if profile}<span class="text-xs text-muted-foreground dark:text-white/45"
      >{profile}</span
    >{/if}
</span>
