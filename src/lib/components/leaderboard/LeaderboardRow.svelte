<script lang="ts">
  import type { RunData, LanguageStats } from '$lib/server/data';
  import RankBadge from './RankBadge.svelte';
  import { Check, Box, ExternalLink, Zap } from 'lucide-svelte';
  import { prefersReducedMotion } from 'svelte/motion';

  let { run, rank }: { run: RunData; rank: number } = $props();

  let isOpen = $state(false);

  function toggle() {
    isOpen = !isOpen;
  }

  // Use $derived for stable references from props
  // These are simple passthroughs that avoid deep traversal on toggle
  let meta = $derived(run.metadata);
  let stats = $derived(run.stats);
  let runId = $derived(run.id);

  // Derived values that depend on stats (computed once, cached)
  let score = $derived(stats?.weighted_score?.toFixed(2) || '0.00');
  let passRate = $derived(stats?.pass_rate?.toFixed(1) || '0.0');
  let duration = $derived(stats?.total_duration_seconds ? Math.round(stats.total_duration_seconds / 60) : 0);
  let agentDuration = $derived(stats?.agent_duration_seconds ? Math.round(stats.agent_duration_seconds / 60) : 0);
  
  // Safe extraction without complex casting in derivation
  let languages = $derived(stats?.by_language || {});
  
  // Colors for languages
  const langColors: Record<string, string> = {
      rust: 'bg-orange-500',
      go: 'bg-cyan-500',
      typescript: 'bg-blue-500',
      dart: 'bg-teal-500',
      kotlin: 'bg-purple-500',
      zig: 'bg-yellow-500',
      python: 'bg-green-500'
  };

  function getLangColor(lang: string) {
      return langColors[lang.toLowerCase()] || 'bg-gray-500';
  }

  // Transition class based on reduced motion preference
  let transitionClass = $derived(
    prefersReducedMotion.current 
      ? '' 
      : 'transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]'
  );
</script>

<div class="relative group/row">
  <!-- Main Row (Clickable) -->
  <button 
    class="w-full grid grid-cols-12 gap-2 md:gap-4 p-4 items-center text-left hover:bg-white/[0.02] transition-colors relative z-20 outline-none focus-visible:bg-white/[0.04]"
    onclick={toggle}
  >
    <!-- Rank -->
    <div class="col-span-2 md:col-span-1 flex justify-center">
        <RankBadge {rank} />
    </div>

    <!-- Agent -->
    <div class="col-span-7 md:col-span-3">
        <div class="font-semibold text-white tracking-tight text-sm md:text-base">{meta['Agent Name']}</div>
        <div class="text-[10px] md:text-xs text-white/40 font-mono mt-0.5">{meta['Agent Version']}</div>
    </div>

    <!-- Model -->
    <div class="col-span-2 hidden md:block text-sm text-white/70 truncate" title={meta['Model Name']}>
        {meta['Model Name']}
    </div>

    <!-- Provider -->
    <div class="col-span-2 hidden md:block text-sm text-white/50 truncate" title={meta['Provider Name']}>
        {meta['Provider Name']}
    </div>

    <!-- Score -->
    <div class="col-span-3 md:col-span-2">
        <div class="flex items-center gap-2 justify-end md:justify-start">
            <div class="hidden md:block h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div class="h-full bg-white transition-all duration-1000" style="width: {(stats?.weighted_score || 0) / 32 * 100}%"></div>
            </div>
            <span class="font-mono text-sm font-bold w-12 text-right">{score}</span>
        </div>
    </div>

    <!-- Pass Rate -->
    <div class="col-span-1 hidden md:block text-center font-mono text-sm text-emerald-400">
        {passRate}%
    </div>

    <!-- MCP -->
    <div class="col-span-1 hidden md:flex justify-center">
        {#if meta['MCP tools available'] === 'yes'}
            <Check size={16} class="text-cyan-400" />
        {:else}
            <div class="w-1.5 h-1.5 rounded-full bg-white/10"></div>
        {/if}
    </div>
  </button>

  <!-- Expanded Details (Hydraulic via Grid) -->
  <div 
    class="grid {transitionClass} border-b border-white/5 bg-black/20 will-change-[grid-template-rows] [contain:layout_style_paint] [content-visibility:auto]"
    style="grid-template-rows: {isOpen ? '1fr' : '0fr'}; transform: translateZ(0);"
  >
      <div class="overflow-hidden min-h-0 [transform:translateZ(0)] [backface-visibility:hidden]">
          <div class="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <!-- Col 1: Meta -->
              <div class="space-y-4">
                  <div class="text-xs uppercase tracking-widest text-white/30 font-semibold">Execution</div>
                  <div class="flex items-center gap-4 text-sm text-white/60">
                      <div class="flex items-center gap-2">
                          <Box size={14} />
                          <span>{meta['Run Date']}</span>
                      </div>
                      <div class="flex items-center gap-2" title="Agent Runtime / Total Runtime">
                          <Zap size={14} />
                          <span>{agentDuration}m / {duration}m</span>
                      </div>
                  </div>
              </div>

              <!-- Col 2: Spectrum -->
              <div class="space-y-4 w-full">
                  <div class="text-xs uppercase tracking-widest text-white/30 font-semibold">Language Spectrum</div>
                  <div class="w-full h-3 flex rounded-full overflow-hidden ring-1 ring-white/10">
                      {#each Object.entries(languages) as [lang, langStats] (lang)}
                          {@const stats = langStats as import('$lib/server/data').LanguageStats}
                          <div 
                              class="h-full {getLangColor(lang)} transition-all hover:brightness-110" 
                              style="width: {(stats.total / 26) * 100}%"
                              title="{lang}: {stats.pass_rate.toFixed(0)}% Pass"
                          ></div>
                      {/each}
                  </div>
                  <div class="flex flex-wrap gap-2 text-[10px] text-white/40 uppercase font-mono">
                      {#each Object.entries(languages) as [lang, langStats] (lang)}
                          {@const stats = langStats as import('$lib/server/data').LanguageStats}
                          <div class="flex items-center gap-1">
                              <div class="w-2 h-2 rounded-full {getLangColor(lang)}"></div>
                              {lang} {stats.pass_rate.toFixed(0)}%
                          </div>
                      {/each}
                  </div>
              </div>

              <!-- Col 3: Action -->
              <div class="flex items-center justify-end">
                  <a 
                      href="/report/{runId}" 
                      class="group flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-white/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                      Open Flight Recorder
                      <ExternalLink size={16} class="group-hover:translate-x-0.5 transition-transform" />
                  </a>
              </div>

          </div>
      </div>
  </div>
</div>