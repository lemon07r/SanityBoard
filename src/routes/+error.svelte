<script lang="ts">
  import { page } from '$app/state';
</script>

<svelte:head>
  <title>Error {page.status} | SanityHarness</title>
</svelte:head>

<div class="min-h-[60vh] flex items-center justify-center">
  <div class="text-center space-y-4">
    <h1 class="text-6xl font-bold text-foreground/80 dark:text-white/80">{page.status}</h1>
    <p class="text-xl text-muted-foreground dark:text-white/50">{page.error?.message || 'Something went wrong'}</p>
    <a
      href="/"
      class="inline-block mt-4 px-6 py-3 bg-foreground/10 dark:bg-white/10 hover:bg-foreground/20 dark:hover:bg-white/20 rounded-lg transition-colors text-foreground dark:text-white"
    >
      Back to Leaderboard
    </a>
  </div>
</div>
