<script lang="ts">
  import { profiles, searchEval } from "$lib/data/search-eval-v2";

  import ProviderLabel from "./ProviderLabel.svelte";

  const slices = [
    { key: "revera", label: "Revera-like" },
    { key: "opencode", label: "OpenCode-like" },
    { key: "traps", label: "Traps" },
  ] as const;
</script>

<div
  class="min-w-0 rounded-2xl border border-border/60 bg-card p-5 text-foreground dark:border-white/10 dark:bg-white/[0.025] dark:text-white sm:p-6"
>
  <h3 class="font-semibold">Where the difference comes from</h3>
  <p class="mt-1 text-sm text-muted-foreground dark:text-white/55">
    Revera-like lookups separate providers. Traps overlap the two slices.
  </p>
  <!-- Keyboard focus enables native horizontal table scrolling. -->
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <div
    class="mt-4 overflow-x-auto rounded-lg focus-visible:outline-2 focus-visible:outline-foreground dark:focus-visible:outline-cyan-400"
    role="region"
    aria-label="Retrieval results by slice, scroll horizontally"
    tabindex="0"
  >
    <table class="w-full min-w-[460px] text-left text-sm tabular-nums">
      <caption class="sr-only"
        >Evidence@1 / evidence@5 by slice; counts, not percentages</caption
      >
      <thead
        class="border-b border-border/60 text-xs text-muted-foreground dark:border-white/10 dark:text-white/55"
      >
        <tr
          ><th class="py-3 pr-3 font-medium" scope="col">Provider</th
          >{#each slices as slice (slice.key)}<th
              class="px-2 py-3 text-center font-medium"
              scope="col"
              >{slice.label}<span class="block text-[11px]"
                >n = {searchEval.retrieval.slices[slice.key]}</span
              ></th
            >{/each}</tr
        >
      </thead>
      <tbody
        >{#each profiles as profile (profile.arm)}<tr
            class="border-b border-border/40 last:border-0 dark:border-white/5"
            ><th class="py-3 pr-3 font-normal" scope="row"
              ><ProviderLabel arm={profile.arm} name={profile.provider} /></th
            >{#each slices as slice (slice.key)}<td
                class="px-2 py-3 text-center"
                ><span class="text-muted-foreground dark:text-white/55"
                  >{profile.slices[slice.key].evidence1}</span
                >
                /
                <strong class="font-semibold"
                  >{profile.slices[slice.key].evidence5}</strong
                ></td
              >{/each}</tr
          >{/each}</tbody
      >
    </table>
  </div>
  <p class="mt-3 text-xs text-muted-foreground dark:text-white/50">
    Each cell: evidence@1 / evidence@5.
  </p>
</div>
