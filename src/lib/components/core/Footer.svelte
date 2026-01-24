<script>
    import { Github } from 'lucide-svelte';
</script>

<footer class="w-full mt-auto py-8 border-t border-white/5 bg-black/20 backdrop-blur-sm">
    <div class="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
        
        <p>
            © {new Date().getFullYear()} SanityHarness. All rights reserved.
        </p>

        <div class="flex items-center gap-6">
            <a href="https://github.com/lemon07r/SanityHarness" target="_blank" rel="noreferrer" class="flex items-center gap-2 hover:text-white transition-colors">
                <Github size={16} />
                <span>Star on GitHub</span>
            </a>
            
            <div class="flex items-center gap-2">
                <span>Built by</span>
                <a href="https://github.com/lemon07r" target="_blank" rel="noreferrer" class="text-white/60 hover:text-white transition-colors">
                    lemon07r
                </a>
            </div>
        </div>

    </div>
</footer>