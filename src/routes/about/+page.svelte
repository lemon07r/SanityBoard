<script>
    import { Mail, MessageCircle, Heart } from 'lucide-svelte';
    import SpotlightCard from '$lib/components/core/SpotlightCard.svelte';
    import Seo from '$lib/components/core/Seo.svelte';
</script>

<Seo 
    title="About"
    description="Learn about SanityHarness - providing high-signal, agent-agnostic evaluation for AI coding agents. Support the project or get in touch."
    openGraph={{
        title: 'About SanityHarness',
        description: 'High-signal, agent-agnostic evaluation for AI coding agents. Support our mission or contact us.'
    }}
    jsonLd={{
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About SanityHarness',
        description: 'Learn about SanityHarness and its mission to provide high-signal, agent-agnostic evaluation for AI coding agents.',
        url: 'https://sanityboard.lr7.dev/about',
        mainEntity: {
            '@type': 'Organization',
            name: 'SanityHarness',
            url: 'https://sanityboard.lr7.dev',
            sameAs: ['https://github.com/lemon07r/SanityHarness']
        }
    }}
/>

<div class="max-w-3xl mx-auto px-6 py-12 space-y-16 text-center">
    
    <div class="space-y-6">
        <h1 class="text-4xl font-bold text-foreground dark:text-white">The Mission</h1>
        <p class="text-xl text-muted-foreground dark:text-white/60 leading-relaxed font-light">
            SanityHarness exists to provide <strong class="text-foreground dark:text-white font-medium">high-signal, agent-agnostic evaluation</strong> for AI Agents. 
            In a sea of noise and cherry-picked benchmarks, we strive for isolation, weight, and clarity.
        </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SpotlightCard>
            <div class="p-8 space-y-4 h-full flex flex-col">
                <h2 class="text-lg font-bold text-foreground dark:text-white">Sponsors & Support</h2>
                <p class="text-muted-foreground dark:text-white/50 text-sm">
                    Running comprehensive evals is expensive. We appreciate API credits (GPT-5, Opus, etc) or donations to sustain the harness.
                </p>
                <div class="pt-4 border-t border-border/40 dark:border-white/5 grid grid-cols-1 gap-3 mt-auto">
                     <a href="https://github.com/sponsors/lemon07r" target="_blank" class="px-4 py-2 bg-foreground/5 dark:bg-pink-500/10 text-foreground dark:text-pink-300 border border-border/40 dark:border-pink-500/20 rounded-lg text-sm font-medium hover:bg-foreground/10 dark:hover:bg-pink-500/20 transition-colors flex items-center justify-center gap-2">
                        <Heart size={16} />
                        GitHub Sponsors
                    </a>
                     <a href="https://ko-fi.com/lemon07r" target="_blank" class="px-4 py-2 bg-foreground/5 dark:bg-blue-500/10 text-foreground dark:text-blue-300 border border-border/40 dark:border-blue-500/20 rounded-lg text-sm font-medium hover:bg-foreground/10 dark:hover:bg-blue-500/20 transition-colors flex items-center justify-center gap-2">
                        <Heart size={16} />
                        Ko-fi
                    </a>
                     <a href="https://paypal.me/lemon07r" target="_blank" class="px-4 py-2 bg-foreground/5 dark:bg-indigo-500/10 text-foreground dark:text-indigo-300 border border-border/40 dark:border-indigo-500/20 rounded-lg text-sm font-medium hover:bg-foreground/10 dark:hover:bg-indigo-500/20 transition-colors flex items-center justify-center gap-2">
                        <Heart size={16} />
                        PayPal
                    </a>
                </div>
            </div>
        </SpotlightCard>

        <SpotlightCard>
            <div class="p-8 space-y-4 h-full flex flex-col">
                <h2 class="text-lg font-bold text-foreground dark:text-white">Contact</h2>
                <div class="space-y-2 text-sm text-muted-foreground dark:text-white/50 flex-1">
                    <div class="flex items-center justify-center gap-2">
                        <MessageCircle size={14} />
                        <span>mim7 on Discord</span>
                    </div>
                    <div class="flex items-center justify-center gap-2">
                        <Mail size={14} />
                        <a href="mailto:lemon07r@lr7.dev" class="hover:text-foreground dark:hover:text-white transition-colors">lemon07r@lr7.dev</a>
                    </div>
                </div>
                
                <div class="pt-4 border-t border-border/40 dark:border-white/5">
                     <div class="p-4 bg-foreground/5 dark:bg-indigo-500/5 border border-border/40 dark:border-indigo-500/10 rounded-xl text-xs text-muted-foreground dark:text-indigo-200/80 leading-relaxed text-left">
                        <strong class="text-foreground dark:text-indigo-200 block mb-1">Have spare API keys?</strong> 
                        Temporary or unused keys for top-tier models (Opus 4.5, GPT-5.2) are extremely helpful for testing more agents, models and running more evals.
                        <br/><br/>
                        Please DM <span class="font-mono text-foreground dark:text-white/80 bg-foreground/10 dark:bg-white/5 px-1 rounded">mim7</span> on Discord or contact me by email.
                    </div>
                </div>
            </div>
        </SpotlightCard>
    </div>

</div>
