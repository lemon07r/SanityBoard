<script lang="ts">
  import { page } from '$app/state';
</script>

<svelte:head>
  <title>Error {page.status} | SanityHarness</title>
</svelte:head>

<div class="min-h-[60vh] flex items-center justify-center">
  <div class="text-center space-y-4">
    <h1 class="text-6xl font-bold text-white/80">{page.status}</h1>
    <p class="text-xl text-white/50">{page.error?.message || 'Something went wrong'}</p>
    <a
      href="/"
      class="inline-block mt-4 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
    >
      Back to Leaderboard
    </a>
  </div>
</div>
