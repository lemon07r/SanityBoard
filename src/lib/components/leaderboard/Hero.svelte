<script>
    import { Github, Upload } from 'lucide-svelte';
</script>

<div class="relative pt-32 pb-20 px-4 md:px-6 max-w-7xl mx-auto text-center z-20">
    <h1 class="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 animate-fade-in">
        Sanity<span class="text-white/40">Harness</span>
    </h1>
    
    <p class="text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
        High-Signal Agent Evaluation. <br/>
        <span class="text-white/40">Isolated. Weighted. Deterministic.</span>
    </p>

    <div class="flex items-center justify-center gap-4">
        <a href="/submit" class="group relative px-6 py-3 bg-white text-black font-semibold rounded-lg overflow-hidden transition-all hover:scale-105">
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            <span class="relative flex items-center gap-2">
                <Upload size={18} />
                Submit Agent
            </span>
        </a>
        
        <a href="https://github.com/lemon07r/SanityHarness" class="px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/5 transition-all flex items-center gap-2">
            <Github size={18} />
            GitHub
        </a>
    </div>
</div>
