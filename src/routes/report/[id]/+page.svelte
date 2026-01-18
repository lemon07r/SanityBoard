<script lang="ts">
    import { ArrowLeft, Download, Check, X } from 'lucide-svelte';
    import Tabs from '$lib/components/core/Tabs.svelte';
    import TaskMatrix from '$lib/components/report/TaskMatrix.svelte';
    import PassRateChart from '$lib/components/report/PassRateChart.svelte';
    import type { TaskResult } from '$lib/server/data';
    import JSZip from 'jszip';
    
    let { data } = $props();
    let run = $derived(data.run);
    let reportHtml = $derived(data.reportHtml);
    let meta = $derived(run.metadata);
    let stats = $derived(run.stats);
    let results = $derived((run.results?.results || []) as TaskResult[]);

    let passRate = $derived(stats?.pass_rate?.toFixed(1) || 0);
    let isPass = $derived((stats?.pass_rate || 0) > 50); 
    let duration = $derived(stats?.total_duration_seconds ? (stats.total_duration_seconds / 60).toFixed(0) : '0');

    let activeTab = $state('report');
    let downloading = $state(false);

    async function downloadEvalData() {
        downloading = true;
        try {
            const zip = new JSZip();
            
            // Add metadata
            zip.file('metadata.json', JSON.stringify(run.metadata, null, 2));
            
            // Add stats/submission data
            if (run.stats) {
                zip.file('submission.json', JSON.stringify(run.stats, null, 2));
            }
            
            // Add results/summary data
            if (run.results) {
                zip.file('summary.json', JSON.stringify(run.results, null, 2));
            }
            
            // Generate and download
            const blob = await zip.generateAsync({ type: 'blob' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `sanity-eval-${run.id}.zip`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } finally {
            downloading = false;
        }
    }
</script>

<svelte:head>
    <title>{meta['Agent Name']} - Flight Recorder</title>
</svelte:head>

<div class="min-h-screen pb-20">
    <!-- Header -->
    <div class="bg-black/40 border-b border-white/5 backdrop-blur-md sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
            <div class="flex items-center gap-6">
                <a href="/" class="p-2 -ml-2 text-white/40 hover:text-white transition-colors">
                    <ArrowLeft size={24} />
                </a>
                
                <div>
                    <h1 class="text-xl font-bold text-white flex items-center gap-3">
                        {meta['Agent Name']}
                        <span class="px-2 py-0.5 rounded text-xs bg-white/10 text-white/60 font-mono font-normal">{meta['Agent Version']}</span>
                    </h1>
                    <div class="text-xs text-white/40 font-mono flex items-center gap-3 mt-1">
                        <span>{meta['Model Name']}</span>
                        <span>•</span>
                        <span>{meta['Run Date']}</span>
                    </div>
                </div>
            </div>

            <div class="flex items-center gap-4">
                <div class="flex flex-col items-end mr-4">
                    <div class="text-xs text-white/40 uppercase tracking-widest">Score</div>
                    <div class="font-mono text-2xl font-bold text-white">{stats?.weighted_score?.toFixed(2)}</div>
                </div>
                
                <button 
                    onclick={downloadEvalData}
                    disabled={downloading}
                    class="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2 text-sm disabled:opacity-50 disabled:cursor-wait"
                >
                    <Download size={16} class={downloading ? 'animate-pulse' : ''} />
                    {downloading ? 'Preparing...' : 'Download Eval Data'}
                </button>
            </div>
        </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 md:px-6 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        <!-- Left Column: Report -->
        <div class="lg:col-span-3 space-y-8">
            <!-- Pass/Fail Banner -->
            <div class="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br {isPass ? 'from-emerald-950/30 to-black' : 'from-red-950/30 to-black'} p-8">
                <div class="relative z-10 flex items-center gap-6">
                    <div class="p-4 rounded-full {isPass ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}">
                        {#if isPass} <Check size={32} /> {:else} <X size={32} /> {/if}
                    </div>
                    <div>
                        <div class="text-3xl font-bold text-white mb-1">{isPass ? 'PASSED' : 'FAILED'}</div>
                        <div class="text-white/50">Pass Rate: <span class="{isPass ? 'text-emerald-400' : 'text-red-400'} font-mono">{passRate}%</span></div>
                    </div>
                </div>
            </div>

            <!-- Chart -->
            <PassRateChart {run} />

            <!-- Tabs -->
            <Tabs bind:activeTab />

            <!-- Content Area -->
            {#if activeTab === 'report'}
                <div>
                    <article class="prose prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-3xl prose-h2:text-2xl prose-a:text-indigo-400 prose-pre:bg-[#181825] prose-pre:border prose-pre:border-white/10">
                        {@html reportHtml}
                    </article>
                </div>
            {:else if activeTab === 'matrix'}
                <div>
                    <TaskMatrix {results} />
                </div>
            {/if}
        </div>

        <!-- Right Column: Stats Sticky -->
        <div class="lg:col-span-1">
            <div class="sticky top-24 space-y-6">
                <!-- Mini Stats Card -->
                <div class="rounded-xl bg-white/[0.02] border border-white/5 p-6 space-y-6">
                    <h3 class="text-xs font-bold uppercase tracking-widest text-white/30">Run Statistics</h3>
                    
                    <div class="space-y-4">
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-white/50">Tasks Passed</span>
                            <span class="font-mono text-white">{stats?.passed} / {stats?.total}</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-white/50">Duration</span>
                            <span class="font-mono text-white">{duration}m</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-white/50">Cost (Est)</span>
                            <span class="font-mono text-white">-</span>
                        </div>
                    </div>

                    <div class="pt-4 border-t border-white/5">
                        <div class="text-xs font-bold uppercase tracking-widest text-white/30 mb-4">By Language</div>
                        <div class="space-y-3">
                            {#each Object.entries(stats?.by_language || {}) as [lang, s] (lang)}
                                <div>
                                    <div class="flex justify-between text-xs mb-1">
                                        <span class="capitalize text-white/70">{lang}</span>
                                        <span class="font-mono text-white/40">{s.pass_rate.toFixed(0)}%</span>
                                    </div>
                                    <div class="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <div class="h-full bg-indigo-500/50" style="width: {s.pass_rate}%"></div>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>