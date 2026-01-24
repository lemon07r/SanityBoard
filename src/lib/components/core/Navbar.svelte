<script>
    import { MessageCircle, Github } from 'lucide-svelte';
    import { page } from '$app/stores';

    const navLinks = [
        { name: 'Leaderboard', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Submit', path: '/submit' }
    ];
</script>

<nav class="fixed top-6 left-1/2 -translate-x-1/2 z-50 max-w-[calc(100vw-2rem)]">
    <div class="flex items-center gap-1 p-1.5 bg-black/50 backdrop-blur-md border border-white/10 rounded-full shadow-2xl shadow-black/50 overflow-x-auto">
        
        {#each navLinks as link (link.path)}
            <a 
                href={link.path} 
                class="px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-all {$page.url.pathname === link.path ? 'bg-white text-black font-semibold' : 'text-white/60 hover:text-white hover:bg-white/5'} whitespace-nowrap"
            >
                {link.name}
            </a>
        {/each}

        <div class="w-px h-4 bg-white/10 mx-1 shrink-0"></div>

        <a 
            href="https://discord.gg/rXNQXCTWDt" 
            target="_blank"
            rel="noopener noreferrer"
            class="pl-3 pr-2 py-2 flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors whitespace-nowrap"
        >
            <MessageCircle size={16} />
            <span class="hidden sm:inline">Join Discord</span>
        </a>

        <a 
            href="https://github.com/lemon07r/SanityHarness" 
            target="_blank"
            rel="noopener noreferrer"
            class="pl-2 pr-3 sm:pr-4 py-2 flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
            aria-label="GitHub"
        >
            <Github size={18} />
        </a>

    </div>
</nav>
