<script lang="ts">
  let container: HTMLDivElement;
  let frameId: number;
  let { children, class: className = "" } = $props();

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

<div 
  bind:this={container}
  onmousemove={handleMouseMove}
  class="relative group rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden {className}"
>
  <!-- Content -->
  <div class="relative z-10 h-full">
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
    class="pointer-events-none absolute inset-0 z-30 border border-white/10 rounded-2xl"
    style="
      -webkit-mask-image: radial-gradient(200px circle at var(--mouse-x) var(--mouse-y), black, transparent);
      mask-image: radial-gradient(200px circle at var(--mouse-x) var(--mouse-y), black, transparent);
    "
  ></div>
</div>
