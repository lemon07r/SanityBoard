<script>
    import { Mail, MessageCircle, Heart } from 'lucide-svelte';
    import SpotlightCard from '$lib/components/core/SpotlightCard.svelte';
</script>

<svelte:head>
    <title>About - SanityHarness</title>
</svelte:head>

<div class="max-w-3xl mx-auto px-6 py-12 space-y-16 text-center">
    
    <div class="space-y-6">
        <h1 class="text-4xl font-bold text-white">The Mission</h1>
        <p class="text-xl text-white/60 leading-relaxed font-light">
            SanityHarness exists to provide <strong class="text-white font-medium">high-signal, agent-agnostic evaluation</strong> for AI Agents. 
            In a sea of noise and cherry-picked benchmarks, we strive for isolation, weight, and clarity.
        </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SpotlightCard class="p-8 space-y-4">
            <h2 class="text-lg font-bold text-white">Sponsors & Support</h2>
            <p class="text-white/50 text-sm">
                Running comprehensive evals is expensive. We appreciate API credits (GPT-5, Opus, etc) or donations to sustain the harness.
            </p>
            <div class="pt-4 border-t border-white/5 grid grid-cols-1 gap-3">
                 <a href="https://github.com/sponsors/lemon07r" target="_blank" class="px-4 py-2 bg-pink-500/10 text-pink-300 border border-pink-500/20 rounded-lg text-sm font-medium hover:bg-pink-500/20 transition-colors flex items-center justify-center gap-2">
                    <Heart size={16} />
                    GitHub Sponsors
                </a>
                 <a href="https://ko-fi.com/lemon07r" target="_blank" class="px-4 py-2 bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-lg text-sm font-medium hover:bg-blue-500/20 transition-colors flex items-center justify-center gap-2">
                    <Heart size={16} />
                    Ko-fi
                </a>
                 <a href="https://paypal.me/lemon07r" target="_blank" class="px-4 py-2 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-lg text-sm font-medium hover:bg-indigo-500/20 transition-colors flex items-center justify-center gap-2">
                    <Heart size={16} />
                    PayPal
                </a>
            </div>
        </SpotlightCard>

        <SpotlightCard class="p-8 space-y-4 flex flex-col">
            <h2 class="text-lg font-bold text-white">Contact</h2>
            <div class="space-y-2 text-sm text-white/50 flex-1">
                <div class="flex items-center justify-center gap-2">
                    <MessageCircle size={14} />
                    <span>mim7 on Discord</span>
                </div>
                <div class="flex items-center justify-center gap-2">
                    <Mail size={14} />
                    <a href="mailto:lemon07r@lr7.dev" class="hover:text-white transition-colors">lemon07r@lr7.dev</a>
                </div>
            </div>
            
            <div class="pt-4 border-t border-white/5">
                 <div class="p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-xl text-xs text-indigo-200/80 leading-relaxed text-left">
                    <strong class="text-indigo-200 block mb-1">Have spare API keys?</strong> 
                    Temporary or unused keys for top-tier models (Opus 4.5, GPT-5.2) are extremely helpful for testing more agents, models and running more evals.
                    <br/><br/>
                    Please DM <span class="font-mono text-white/80 bg-white/5 px-1 rounded">mim7</span> on Discord or contact me by email.
                </div>
            </div>
        </SpotlightCard>
    </div>

</div>
