<script lang="ts">
  import type { Snippet } from 'svelte';

  let container: HTMLDivElement;
  let frameId: number;
  let { children }: { children: Snippet } = $props();

  function handleMouseMove(e: MouseEvent) {
    if (!container) return;
    
    // Throttle with rAF
    if (frameId) cancelAnimationFrame(frameId);
    
    frameId = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        container.style.setProperty('--mouse-x', `${x}px`);
        container.style.setProperty('--mouse-y', `${y}px`);
    });
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div 
  bind:this={container}
  onmousemove={handleMouseMove}
  class="relative group rounded-xl border border-border/40 dark:border-white/5 bg-card/80 dark:bg-black/40 overflow-hidden"
>
  <!-- Content -->
  <div class="relative z-10 flex flex-col divide-y divide-border/40 dark:divide-white/5">
     {@render children()}
  </div>

  <!-- Spotlight Overlay -->
  <div 
    class="pointer-events-none absolute inset-0 z-20 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
    style="
      background: radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06), transparent 40%);
    "
  ></div>
  
  <!-- Border Beam Mask -->
  <div 
    class="pointer-events-none absolute inset-0 z-30 border border-border/40 dark:border-white/10 rounded-xl"
    style="
      -webkit-mask-image: radial-gradient(200px circle at var(--mouse-x) var(--mouse-y), black, transparent);
      mask-image: radial-gradient(200px circle at var(--mouse-x) var(--mouse-y), black, transparent);
    "
  ></div>
</div>
