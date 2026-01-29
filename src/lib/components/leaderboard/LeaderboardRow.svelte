<script lang="ts">
  import type { RunData } from '$lib/server/data';
  import RankBadge from './RankBadge.svelte';
  import { Check, Box, ExternalLink, Zap, Lock, Unlock } from 'lucide-svelte';

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
</script>

<div class="relative group/row">
  <!-- Main Row (Clickable) -->
  <button 
    class="w-full grid grid-cols-12 gap-1.5 md:gap-4 px-3 md:px-4 py-4 items-center text-left hover:bg-foreground/[0.03] dark:hover:bg-white/[0.02] transition-colors relative z-20 outline-none focus-visible:bg-foreground/[0.05] dark:focus-visible:bg-white/[0.04]"
    onclick={toggle}
  >
    <!-- Rank -->
    <div class="col-span-1 flex justify-center">
        <RankBadge {rank} />
    </div>

    <!-- Agent -->
    <div class="col-span-5 md:col-span-3 pl-1 md:pl-0">
        <div class="font-semibold text-foreground dark:text-white tracking-tight text-sm md:text-base flex items-center gap-1.5">
            {#if meta['Agent URL']}
                <a 
                    href={meta['Agent URL']} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onclick={(e) => e.stopPropagation()}
                    class="hover:text-indigo-600 dark:hover:text-pink-400 transition-colors"
                >{meta['Agent Name']}</a>
            {:else}
                {meta['Agent Name']}
            {/if}
            {#if meta['Agent Type'] === 'Proprietary'}
                <div title="Proprietary Agent" class="hidden md:block"><Lock size={12} class="text-muted-foreground/50 dark:text-white/20" /></div>
            {:else}
                <div title="Open Source Agent" class="hidden md:block"><Unlock size={12} class="text-cyan-600/50 dark:text-cyan-400/30" /></div>
            {/if}
        </div>
        <div class="text-[10px] md:text-xs text-muted-foreground dark:text-white/40 font-mono mt-0.5">{meta['Agent Version']}</div>
    </div>

    <!-- Model -->
    <div class="col-span-4 md:col-span-2 flex items-center md:gap-2 overflow-hidden">
        <div class="min-w-0 flex-1">
            <div class="flex items-center gap-1 text-xs md:text-sm text-muted-foreground dark:text-white/70">
                <span class="truncate" title={meta['Model Name']}>{meta['Model Name']}</span>
                {#if meta['Model Type'] === 'Proprietary'}
                    <div title="Proprietary Model" class="hidden md:block"><Lock size={12} class="text-muted-foreground/50 dark:text-white/20 shrink-0" /></div>
                {:else}
                    <div title="Open Weight Model" class="hidden md:block"><Unlock size={12} class="text-cyan-600/50 dark:text-cyan-400/30 shrink-0" /></div>
                {/if}
            </div>
            {#if meta['Variant']}
                <div class="text-[10px] md:text-xs text-muted-foreground/60 dark:text-white/40 truncate" title={meta['Variant']}>{meta['Variant']}</div>
            {/if}
        </div>
    </div>

    <!-- Provider -->
    <div class="col-span-2 hidden md:block text-sm overflow-hidden">
        <span class="text-muted-foreground/70 dark:text-white/50 truncate block" title={meta['Model Provider']}>{meta['Model Provider']}</span>
        {#if meta['Access Provider']}
            <span class="text-xs text-muted-foreground/50 dark:text-white/30 truncate block" title={meta['Access Provider']}>{meta['Access Provider']}</span>
        {/if}
    </div>

    <!-- Score -->
    <div class="col-span-2 md:col-span-2">
        <div class="flex items-center gap-2 justify-end md:justify-start">
            <div class="hidden md:block h-2 w-full bg-border/40 dark:bg-white/10 rounded-full overflow-hidden">
                <div class="h-full bg-foreground dark:bg-white transition-all duration-1000" style="width: {(stats?.weighted_score || 0) / 32 * 100}%"></div>
            </div>
            <span class="font-mono text-sm font-bold w-12 text-right text-foreground dark:text-white">{score}</span>
        </div>
    </div>

    <!-- Pass Rate -->
    <div class="col-span-1 hidden md:block text-center font-mono text-sm text-emerald-600 dark:text-emerald-400">
        {passRate}%
    </div>

    <!-- MCP -->
    <div class="col-span-1 hidden md:flex justify-center">
        {#if meta['MCP tools available'] === true}
            <Check size={16} class="text-cyan-600 dark:text-cyan-400" />
        {:else}
            <div class="w-1.5 h-1.5 rounded-full bg-muted-foreground/30 dark:bg-white/10"></div>
        {/if}
    </div>
  </button>

  <!-- Expanded Details -->
  <div 
    class="row-expansion border-b border-border/40 dark:border-white/5 bg-muted/20 dark:bg-black/20"
    class:row-expansion--open={isOpen}
  >
      <div class="row-expansion__content">
          <div class="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <!-- Col 1: Meta -->
              <div class="space-y-4">
                  <div class="text-xs uppercase tracking-widest text-muted-foreground/50 dark:text-white/30 font-semibold">Execution</div>
                  <div class="flex items-center gap-4 text-sm text-muted-foreground dark:text-white/60">
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
                  <div class="text-xs uppercase tracking-widest text-muted-foreground/50 dark:text-white/30 font-semibold">Language Spectrum</div>
                  <div class="w-full h-3 flex rounded-full overflow-hidden ring-1 ring-border dark:ring-white/10">
                      {#each Object.entries(languages) as [lang, langStats] (lang)}
                          {@const stats = langStats as import('$lib/server/data').LanguageStats}
                          <div 
                              class="h-full {getLangColor(lang)} transition-all hover:brightness-110" 
                              style="width: {(stats.total / 26) * 100}%"
                              title="{lang}: {stats.pass_rate.toFixed(0)}% Pass"
                          ></div>
                      {/each}
                  </div>
                  <div class="flex flex-wrap gap-2 text-[10px] text-muted-foreground/70 dark:text-white/40 uppercase font-mono">
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
                      class="group flex items-center gap-2 px-6 py-3 bg-foreground dark:bg-white text-background dark:text-black font-semibold rounded-lg hover:bg-foreground/90 dark:hover:bg-white/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                      Open Flight Recorder
                      <ExternalLink size={16} class="group-hover:translate-x-0.5 transition-transform" />
                  </a>
              </div>

          </div>
      </div>
  </div>
</div>
