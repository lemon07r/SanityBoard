<script>
    import { Upload, GitPullRequest, AlertTriangle, FileArchive, CheckCircle } from 'lucide-svelte';
</script>

<svelte:head>
    <title>Submit Agent - SanityHarness</title>
</svelte:head>

<div class="max-w-4xl mx-auto px-6 py-12 space-y-16">
    
    <div class="text-center space-y-4">
        <h1 class="text-4xl font-bold text-white">Ingestion & Contribution</h1>
        <p class="text-lg text-white/50">Two distinct workflows for expanding the harness.</p>
    </div>

    <!-- Option A: Leaderboard Submission -->
    <div class="group relative rounded-2xl bg-white/[0.02] border border-white/5 p-8 hover:bg-white/[0.04] transition-colors">
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
        
        <div class="flex items-start gap-6">
            <div class="p-4 rounded-xl bg-white/5 text-indigo-400">
                <FileArchive size={32} />
            </div>
            
            <div class="space-y-6 flex-1">
                <div>
                    <h2 class="text-2xl font-bold text-white mb-2">A. Leaderboard Submission</h2>
                    <p class="text-white/60">Upload a run archive to appear on the leaderboard as "Community/Unverified".</p>
                </div>

                <div class="bg-black/30 rounded-lg p-4 border border-white/5 font-mono text-sm text-white/70 space-y-2">
                    <div class="flex items-center gap-2 text-yellow-400/80">
                        <AlertTriangle size={14} />
                        <span>Command Protocol Required:</span>
                    </div>
                    <div class="select-all text-white bg-black/50 p-2 rounded">
                        --keep-workspaces --tier all
                    </div>
                    <div class="text-white/40 text-xs pt-2">
                        Must submit the complete <span class="text-white/60">eval-results</span> folder structure.
                    </div>
                </div>

                <div class="flex gap-4 pt-2">
                    <button class="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-white/90 transition-all flex items-center gap-2">
                        <Upload size={18} />
                        Upload Run Data (.zip)
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Option B: Code Contribution -->
    <div class="group relative rounded-2xl bg-white/[0.02] border border-white/5 p-8 hover:bg-white/[0.04] transition-colors">
        
        <div class="flex items-start gap-6">
            <div class="p-4 rounded-xl bg-white/5 text-emerald-400">
                <GitPullRequest size={32} />
            </div>
            
            <div class="space-y-6 flex-1">
                <div>
                    <h2 class="text-2xl font-bold text-white mb-2">B. Repository Contribution</h2>
                    <p class="text-white/60">Submit logic, tasks, or bug fixes directly to the harness repository.</p>
                </div>

                <ul class="space-y-2 text-sm text-white/50">
                    <li class="flex items-center gap-2"><CheckCircle size={14} class="text-emerald-500/50"/> New Agent Integrations</li>
                    <li class="flex items-center gap-2"><CheckCircle size={14} class="text-emerald-500/50"/> New Task Definitions</li>
                    <li class="flex items-center gap-2"><CheckCircle size={14} class="text-emerald-500/50"/> Harness Core Improvements</li>
                </ul>

                <div class="flex gap-4 pt-2">
                    <a href="https://github.com/lemon07r/SanityHarness/pulls" target="_blank" class="px-6 py-3 border border-white/20 text-white font-medium rounded-lg hover:bg-white/5 transition-all flex items-center gap-2">
                        <GitPullRequest size={18} />
                        Open Code PR
                    </a>
                </div>
            </div>
        </div>
    </div>

</div>
