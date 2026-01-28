<script lang="ts">
    import { FileArchive, CheckCircle, Copy, Terminal, Send, Link as LinkIcon, Server, Cpu, Box } from 'lucide-svelte';
    import { slide } from 'svelte/transition';
    import SpotlightCard from '$lib/components/core/SpotlightCard.svelte';
    import Seo from '$lib/components/core/Seo.svelte';

    let formData = $state({
        agentName: '',
        agentVersion: '',
        model: '',
        provider: '',
        mcp: 'no',
        resultsLink: '',
        comments: ''
    });

    let copied = $state(false);
    let submitting = $state(false);
    let success = $state(false);
    let error = $state('');

    function copyCommand() {
        navigator.clipboard.writeText('./sanity eval --agent <youragentnamehere> --model <yourmodelidhere> --tier all --keep-workspaces');
        copied = true;
        setTimeout(() => copied = false, 2000);
    }

    async function handleSubmit(e: Event) {
        e.preventDefault();
        submitting = true;
        error = '';

        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: 'b1ba487a-5bc8-4bcf-b0c9-ef851d7141c7',
                    subject: `Submission: ${formData.agentName} ${formData.agentVersion}`,
                    ...formData
                })
            });

            const result = await res.json();
            if (result.success) {
                success = true;
            } else {
                error = 'Submission failed. Please try again or email lemon07r@lr7.dev';
            }
        } catch {
            error = 'Connection error. Please try again';
        } finally {
            submitting = false;
        }
    }
</script>

<Seo 
    title="Submit Agent"
    description="Submit your AI coding agent for evaluation on the SanityHarness benchmark. Run the harness, archive results, and submit for leaderboard inclusion."
    openGraph={{
        title: 'Submit Your Agent',
        description: 'Submit your AI coding agent to the SanityHarness leaderboard. Get ranked on standardized, isolated benchmarks.'
    }}
    jsonLd={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Submit Your AI Agent',
        description: 'Submit your AI coding agent for evaluation on the SanityHarness benchmark. Run the harness, archive results, and submit for leaderboard inclusion.',
        url: 'https://sanityboard.lr7.dev/submit',
        isPartOf: {
            '@type': 'WebSite',
            name: 'SanityHarness',
            url: 'https://sanityboard.lr7.dev'
        },
        mainEntity: {
            '@type': 'ContactPage',
            name: 'Agent Submission Form',
            description: 'Form to submit AI coding agents for benchmark evaluation'
        }
    }}
/>

<div class="max-w-4xl mx-auto px-6 py-12 space-y-16">
    
    <div class="text-center space-y-4">
        <h1 class="text-4xl font-bold text-foreground dark:text-white">Ingestion & Contribution</h1>
        <p class="text-lg text-muted-foreground dark:text-white/50">Follow the steps below to submit your agent for evaluation.</p>
    </div>

    <!-- Option A: Leaderboard Submission -->
    <SpotlightCard>
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-foreground/40 dark:from-indigo-500 to-foreground/10 dark:to-purple-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
        
        <div class="p-8">
            <div class="flex items-start gap-6">
                <div class="p-4 rounded-xl bg-foreground/5 dark:bg-white/5 text-foreground dark:text-indigo-400 hidden md:block">
                    <FileArchive size={32} />
                </div>
                
                <div class="space-y-12 flex-1">
                    <div>
                        <h2 class="text-2xl font-bold text-foreground dark:text-white mb-2">Leaderboard Submission</h2>
                        <p class="text-muted-foreground dark:text-white/60">Generate results, host them, and submit the details.</p>
                    </div>

                    <!-- Step 1: Run Harness -->
                    <div class="space-y-4">
                        <h3 class="text-sm font-bold uppercase tracking-widest text-muted-foreground/50 dark:text-white/40 flex items-center gap-2">
                            <span class="w-6 h-6 rounded-full bg-foreground/10 dark:bg-white/10 flex items-center justify-center text-xs text-foreground dark:text-white">1</span>
                            Run Harness
                        </h3>
                        <div class="bg-muted/50 dark:bg-black/30 rounded-lg p-4 border border-border/40 dark:border-white/5 font-mono text-sm text-muted-foreground dark:text-white/70 space-y-2">
                            <div class="flex justify-between items-center group/cmd">
                                <span class="break-all">./sanity eval --agent &lt;name&gt; --model &lt;id&gt; --tier all --keep-workspaces</span>
                                <button class="p-2 hover:bg-foreground/10 dark:hover:bg-white/10 rounded transition-colors text-muted-foreground dark:text-white/40 hover:text-foreground dark:hover:text-white relative shrink-0" onclick={copyCommand}>
                                    {#if copied}
                                        <CheckCircle size={16} class="text-emerald-400" />
                                    {:else}
                                        <Copy size={16} />
                                    {/if}
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Step 2: Archive -->
                    <div class="space-y-4">
                        <h3 class="text-sm font-bold uppercase tracking-widest text-muted-foreground/50 dark:text-white/40 flex items-center gap-2">
                            <span class="w-6 h-6 rounded-full bg-foreground/10 dark:bg-white/10 flex items-center justify-center text-xs text-foreground dark:text-white">2</span>
                            Archive Results
                        </h3>
                        <p class="text-muted-foreground dark:text-white/60 text-sm">
                            Compress the <code class="bg-foreground/10 dark:bg-white/10 px-1 py-0.5 rounded">eval-results/</code> directory into any popular archive format (zip, 7z, tar.gz, etc).
                        </p>
                    </div>

                    <!-- Step 3: Upload -->
                    <div class="space-y-4">
                        <h3 class="text-sm font-bold uppercase tracking-widest text-muted-foreground/50 dark:text-white/40 flex items-center gap-2">
                            <span class="w-6 h-6 rounded-full bg-foreground/10 dark:bg-white/10 flex items-center justify-center text-xs text-foreground dark:text-white">3</span>
                            Host File
                        </h3>
                        <p class="text-muted-foreground dark:text-white/60 text-sm">
                            Upload the archive to any reliable file hoster (Google Drive, Dropbox, Buzzheavier, Pixeldrain, etc) and get a shareable link.
                        </p>
                    </div>

                    <!-- Step 4: Submit Form -->
                    <div class="space-y-6 pt-4 border-t border-border/40 dark:border-white/5">
                        <h3 class="text-sm font-bold uppercase tracking-widest text-muted-foreground/50 dark:text-white/40 flex items-center gap-2">
                            <span class="w-6 h-6 rounded-full bg-foreground/10 dark:bg-white/10 flex items-center justify-center text-xs text-foreground dark:text-white">4</span>
                            Submit Details
                        </h3>
                        
                        {#if success}
                            <div class="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-center space-y-2" in:slide>
                                <CheckCircle size={32} class="text-emerald-400 mx-auto mb-2" />
                                <h3 class="text-lg font-bold text-foreground dark:text-white">Submission Received!</h3>
                                <p class="text-muted-foreground dark:text-white/60">We will review your results and update the leaderboard shortly.</p>
                                <button class="text-sm text-emerald-400 hover:text-emerald-300 underline mt-2" onclick={() => success = false}>Submit another</button>
                            </div>
                        {:else}
                            <form class="space-y-6" onsubmit={handleSubmit}>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div class="space-y-2">
                                        <label for="agent-name" class="text-xs font-bold uppercase text-muted-foreground/50 dark:text-white/40">Agent Name</label>
                                        <div class="relative">
                                            <Box size={16} class="absolute left-3 top-3 text-muted-foreground/50 dark:text-white/30" />
                                            <input id="agent-name" required bind:value={formData.agentName} type="text" placeholder="e.g. OpenCode" class="w-full bg-muted/50 dark:bg-black/20 border border-border/40 dark:border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-foreground dark:text-white focus:outline-none focus:border-indigo-500/50 transition-colors" />
                                        </div>
                                    </div>
                                    <div class="space-y-2">
                                        <label for="agent-version" class="text-xs font-bold uppercase text-muted-foreground/50 dark:text-white/40">Agent Version</label>
                                        <div class="relative">
                                            <Terminal size={16} class="absolute left-3 top-3 text-muted-foreground/50 dark:text-white/30" />
                                            <input id="agent-version" required bind:value={formData.agentVersion} type="text" placeholder="e.g. v1.1.25" class="w-full bg-muted/50 dark:bg-black/20 border border-border/40 dark:border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-foreground dark:text-white focus:outline-none focus:border-indigo-500/50 transition-colors" />
                                        </div>
                                    </div>
                                    <div class="space-y-2">
                                        <label for="model" class="text-xs font-bold uppercase text-muted-foreground/50 dark:text-white/40">Model</label>
                                        <div class="relative">
                                            <Cpu size={16} class="absolute left-3 top-3 text-muted-foreground/50 dark:text-white/30" />
                                            <input id="model" required bind:value={formData.model} type="text" placeholder="e.g. gpt-5.2" class="w-full bg-muted/50 dark:bg-black/20 border border-border/40 dark:border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-foreground dark:text-white focus:outline-none focus:border-indigo-500/50 transition-colors" />
                                        </div>
                                    </div>
                                    <div class="space-y-2">
                                        <label for="provider" class="text-xs font-bold uppercase text-muted-foreground/50 dark:text-white/40">Provider</label>
                                        <div class="relative">
                                            <Server size={16} class="absolute left-3 top-3 text-muted-foreground/50 dark:text-white/30" />
                                            <input id="provider" required bind:value={formData.provider} type="text" placeholder="e.g. OpenAI" class="w-full bg-muted/50 dark:bg-black/20 border border-border/40 dark:border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-foreground dark:text-white focus:outline-none focus:border-indigo-500/50 transition-colors" />
                                        </div>
                                    </div>
                                </div>

                                <div class="space-y-6 pt-2">
                                    <div class="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6">
                                        <div class="space-y-2">
                                            <label for="results-link" class="text-xs font-bold uppercase text-muted-foreground/50 dark:text-white/40">Results Download Link</label>
                                            <div class="relative">
                                                <LinkIcon size={16} class="absolute left-3 top-3 text-muted-foreground/50 dark:text-white/30" />
                                                <input id="results-link" required bind:value={formData.resultsLink} type="url" placeholder="https://buzzheavier.com/f/..." class="w-full bg-muted/50 dark:bg-black/20 border border-border/40 dark:border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-foreground dark:text-white focus:outline-none focus:border-indigo-500/50 transition-colors" />
                                            </div>
                                        </div>

                                        <div class="flex flex-col">
                                            <span class="text-xs font-bold uppercase text-muted-foreground/50 dark:text-white/40 block text-center md:text-left">MCP Tools?</span>
                                            <div class="relative grid grid-cols-2 bg-muted/50 dark:bg-black/40 border border-border/40 dark:border-white/10 rounded-lg p-1 h-10 isolate w-48 mt-[11px]">
                                                <!-- Sliding Background Pill -->
                                                <div 
                                                    class="absolute top-1 bottom-1 rounded shadow-lg transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] w-[calc(50%-4px)] {formData.mcp === 'yes' ? 'bg-foreground dark:bg-indigo-500' : 'bg-foreground/10 dark:bg-rose-500/20'}"
                                                    style="transform: translateX({formData.mcp === 'yes' ? '4px' : 'calc(100% + 4px)'})"
                                                ></div>

                                                <label class="relative z-10 cursor-pointer flex items-center justify-center group">
                                                    <input type="radio" bind:group={formData.mcp} value="yes" class="sr-only" />
                                                    <span class="text-xs font-bold uppercase tracking-wider transition-colors duration-200 {formData.mcp === 'yes' ? 'text-background dark:text-white' : 'text-muted-foreground dark:text-white/40 group-hover:text-foreground dark:group-hover:text-white/70'}">
                                                        Yes
                                                    </span>
                                                </label>
                                                <label class="relative z-10 cursor-pointer flex items-center justify-center group">
                                                    <input type="radio" bind:group={formData.mcp} value="no" class="sr-only" />
                                                    <span class="text-xs font-bold uppercase tracking-wider transition-colors duration-200 {formData.mcp === 'no' ? 'text-foreground dark:text-rose-200' : 'text-muted-foreground dark:text-white/40 group-hover:text-foreground dark:group-hover:text-white/70'}">
                                                        No
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="space-y-2">
                                    <label for="comments" class="text-xs font-bold uppercase text-muted-foreground/50 dark:text-white/40">Comments / Details <span class="text-muted-foreground/30 dark:text-white/20 ml-1">(Optional)</span></label>
                                    <textarea id="comments" bind:value={formData.comments} rows="3" placeholder="Any additional context about this run..." class="w-full bg-muted/50 dark:bg-black/20 border border-border/40 dark:border-white/10 rounded-lg px-4 py-3 text-foreground dark:text-white focus:outline-none focus:border-indigo-500/50 transition-colors resize-none"></textarea>
                                </div>

                                {#if error}
                                    <div class="text-red-400 text-sm text-center">{error}</div>
                                {/if}

                                <div class="pt-4">
                                    <button 
                                        type="submit"
                                        disabled={submitting}
                                        class="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-foreground dark:bg-white text-background dark:text-black font-semibold rounded-lg hover:bg-foreground/90 dark:hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {#if submitting}
                                            Sending...
                                        {:else}
                                            <Send size={18} />
                                            Submit Run
                                        {/if}
                                    </button>
                                </div>
                            </form>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </SpotlightCard>
</div>
