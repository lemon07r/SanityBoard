<script lang="ts">
    import { theme } from '$lib/stores/theme.svelte';
    import { Moon, Sun } from 'lucide-svelte';

    function toggleTheme() {
        if (!document.startViewTransition) {
            theme.toggle();
            return;
        }

        document.startViewTransition(() => {
            theme.toggle();
        });
    }
</script>

<button
    onclick={toggleTheme}
    class="relative p-2 rounded-full hover:bg-foreground/5 dark:hover:bg-white/5 transition-colors text-muted-foreground dark:text-white/60 hover:text-foreground dark:hover:text-white"
    aria-label="Toggle theme"
>
    <div class="relative w-5 h-5">
        <div
            class="absolute inset-0 transition-all duration-300 transform {theme.current === 'dark' ? 'rotate-90 opacity-0 scale-0' : 'rotate-0 opacity-100 scale-100'}"
        >
            <Sun size={20} />
        </div>
        <div
            class="absolute inset-0 transition-all duration-300 transform {theme.current === 'dark' ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-0'}"
        >
            <Moon size={20} />
        </div>
    </div>
</button>
