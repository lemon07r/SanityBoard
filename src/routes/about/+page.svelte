<script>
    import { Mail, MessageCircle, Heart } from 'lucide-svelte';
</script>

<svelte:head>
    <title>About - SanityHarness</title>
</svelte:head>

<div class="max-w-3xl mx-auto px-6 py-12 space-y-16 text-center">
    
    <div class="space-y-6">
        <h1 class="text-4xl font-bold text-white">The Mission</h1>
        <p class="text-xl text-white/60 leading-relaxed font-light">
            SanityHarness exists to provide <strong class="text-white font-medium">high-signal, deterministic evaluation</strong> for AI Agents. 
            In a sea of noise and cherry-picked benchmarks, we strive for isolation, weight, and clarity.
        </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="p-8 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
            <h2 class="text-lg font-bold text-white">Sponsors & Support</h2>
            <p class="text-white/50 text-sm">
                Running comprehensive evals is expensive. We appreciate API credits (GPT-5, Opus, etc) or donations to sustain the harness.
            </p>
            <button class="mt-4 px-4 py-2 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-lg text-sm font-medium hover:bg-indigo-500/20 transition-colors flex items-center justify-center gap-2 w-full">
                <Heart size={16} />
                Sponsor Project
            </button>
        </div>

        <div class="p-8 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
            <h2 class="text-lg font-bold text-white">Contact</h2>
            <div class="space-y-2 text-sm text-white/50">
                <div class="flex items-center justify-center gap-2">
                    <MessageCircle size={14} />
                    <span>mim7 on Discord</span>
                </div>
                <div class="flex items-center justify-center gap-2">
                    <Mail size={14} />
                    <span>lemon07r@gmail.com</span>
                </div>
            </div>
        </div>
    </div>

</div>
