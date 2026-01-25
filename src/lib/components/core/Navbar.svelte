<script>
    import { MessageCircle } from 'lucide-svelte';
    import { page } from '$app/stores';
    import ThemeToggle from './ThemeToggle.svelte';

    const navLinks = [
        { name: 'Leaderboard', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Submit', path: '/submit' }
    ];
</script>

<nav class="fixed top-6 left-1/2 -translate-x-1/2 z-50 max-w-[calc(100vw-2rem)]">
    <div class="flex items-center gap-1 p-1.5 bg-muted/80 dark:bg-black/50 backdrop-blur-md border border-border dark:border-white/10 rounded-full shadow-2xl shadow-black/10 dark:shadow-black/50 overflow-x-auto">
        
        {#each navLinks as link (link.path)}
            <a 
                href={link.path} 
                class="px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-all {$page.url.pathname === link.path ? 'bg-foreground text-background dark:bg-white dark:text-black font-semibold' : 'text-muted-foreground dark:text-white/60 hover:text-foreground dark:hover:text-white hover:bg-foreground/5 dark:hover:bg-white/5'} whitespace-nowrap"
            >
                {link.name}
            </a>
        {/each}

        <div class="w-px h-4 bg-border dark:bg-white/10 mx-1 shrink-0"></div>

        <a 
            href="https://discord.gg/rXNQXCTWDt" 
            target="_blank"
            rel="noopener noreferrer"
            class="pl-3 pr-3 sm:pr-4 py-2 flex items-center gap-2 text-sm text-indigo-500 dark:text-indigo-400 hover:text-indigo-400 dark:hover:text-indigo-300 font-medium transition-colors whitespace-nowrap"
        >
            <MessageCircle size={16} />
            <span class="hidden sm:inline">Join Discord</span>
        </a>

        <div class="w-px h-4 bg-border dark:bg-white/10 mx-1 shrink-0"></div>

        <ThemeToggle />

    </div>
</nav>
