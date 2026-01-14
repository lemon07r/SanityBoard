<script>
    import { MessageCircle } from 'lucide-svelte';
    import { page } from '$app/stores';
</script>

<nav class="fixed top-6 left-1/2 -translate-x-1/2 z-50">
    <div class="flex items-center gap-1 p-1.5 bg-black/50 backdrop-blur-md border border-white/10 rounded-full shadow-2xl shadow-black/50">
        
        {#each [
            { name: 'Leaderboard', path: '/' },
            { name: 'About', path: '/about' },
            { name: 'Submit', path: '/submit' }
        ] as link}
            <a 
                href={link.path} 
                class="px-4 py-2 rounded-full text-sm font-medium transition-all {$page.url.pathname === link.path ? 'bg-white text-black font-semibold' : 'text-white/60 hover:text-white hover:bg-white/5'}"
            >
                {link.name}
            </a>
        {/each}

        <div class="w-px h-4 bg-white/10 mx-1"></div>

        <a 
            href="https://discord.gg/rXNQXCTWDt" 
            target="_blank"
            class="pl-3 pr-4 py-2 flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
        >
            <MessageCircle size={16} />
            Join Discord
        </a>

    </div>
</nav>
