<script lang="ts">
  import { spring } from 'svelte/motion';
  import { slide } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import type { RunData, LanguageStats } from '$lib/server/data';
  import RankBadge from './RankBadge.svelte';
  import { Check, X, Box, ExternalLink, Zap } from 'lucide-svelte';

  let { run, rank } = $props();

  let isOpen = $state(false);
  
  // Hydraulic Spring
  const height = spring(0, {
    stiffness: 0.08,
    damping: 0.8
  });

  $effect(() => {
    height.set(isOpen ? 100 : 0);
  });

  function toggle() {
    isOpen = !isOpen;
  }

  // Helpers
  let meta = $derived(run.metadata);
  let stats = $derived(run.stats);
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
</script>

<div class="relative group/row">
  <!-- Main Row (Clickable) -->
  <button 
    class="w-full grid grid-cols-12 gap-4 p-4 items-center text-left hover:bg-white/[0.02] transition-colors relative z-20 outline-none focus-visible:bg-white/[0.04]"
    onclick={toggle}
  >
    <!-- Rank -->
    <div class="col-span-1 flex justify-center">
        <RankBadge {rank} />
    </div>

    <!-- Agent -->
    <div class="col-span-3">
        <div class="font-semibold text-white tracking-tight">{meta['Agent Name']}</div>
        <div class="text-xs text-white/40 font-mono mt-0.5">{meta['Agent Version']}</div>
    </div>

    <!-- Model -->
    <div class="col-span-2 text-sm text-white/70 truncate" title={meta['Model Name']}>
        {meta['Model Name']}
    </div>

    <!-- Provider -->
    <div class="col-span-2 text-sm text-white/50 truncate" title={meta['Provider Name']}>
        {meta['Provider Name']}
    </div>

    <!-- Score -->
    <div class="col-span-2">
        <div class="flex items-center gap-2">
            <div class="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div class="h-full bg-white transition-all duration-1000" style="width: {(stats?.weighted_score || 0) / 32 * 100}%"></div>
            </div>
            <span class="font-mono text-sm font-bold w-12 text-right">{score}</span>
        </div>
    </div>

    <!-- Pass Rate -->
    <div class="col-span-1 text-center font-mono text-sm text-emerald-400">
        {passRate}%
    </div>

    <!-- MCP -->
    <div class="col-span-1 flex justify-center">
        {#if meta['MCP tools available'] === 'yes'}
            <Check size={16} class="text-cyan-400" />
        {:else}
            <div class="w-1.5 h-1.5 rounded-full bg-white/10"></div>
        {/if}
    </div>
  </button>

  <!-- Expanded Details (Hydraulic) -->
  {#if isOpen || $height > 0.5}
  <div class="overflow-hidden border-b border-white/5 bg-black/20">
    <div class="p-6 grid grid-cols-1 md:grid-cols-3 gap-8" transition:slide={{ duration: 300, easing: cubicOut }}>
        
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
                {#each Object.entries(languages) as [lang, langStats]}
                    {@const stats = langStats as import('$lib/server/data').LanguageStats}
                    <div 
                        class="h-full {getLangColor(lang)} transition-all hover:brightness-110" 
                        style="width: {(stats.total / 26) * 100}%"
                        title="{lang}: {stats.pass_rate.toFixed(0)}% Pass"
                    ></div>
                {/each}
            </div>
            <div class="flex flex-wrap gap-2 text-[10px] text-white/40 uppercase font-mono">
                {#each Object.entries(languages) as [lang, langStats]}
                    {@const stats = langStats as import('$lib/server/data').LanguageStats}
                    <div class="flex items-center gap-1">
                        <div class="w-2 h-2 rounded-full {getLangColor(lang)}"></div>
                        {lang} {stats.pass_rate.toFixed(0)}%
                    </div>
                {/each}
            </div>
            <div class="flex flex-wrap gap-2 text-[10px] text-white/40 uppercase font-mono">
                {#each Object.entries(languages) as [lang, langStats]}
                    <div class="flex items-center gap-1">
                        <div class="w-2 h-2 rounded-full {getLangColor(lang)}"></div>
                        {lang} {langStats.pass_rate.toFixed(0)}%
                    </div>
                {/each}
            </div>
        </div>

        <!-- Col 3: Action -->
        <div class="flex items-center justify-end">
            <a 
                href="/report/{run.id}" 
                class="group flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-white/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
                Open Flight Recorder
                <ExternalLink size={16} class="group-hover:translate-x-0.5 transition-transform" />
            </a>
        </div>

    </div>
  </div>
  {/if}
</div>
