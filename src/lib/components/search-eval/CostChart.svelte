<script lang="ts">
  import { profiles, PROVIDER_COLORS, usd } from "$lib/data/search-eval-v2";

  const maxCost = Math.max(...profiles.map((profile) => profile.usd_per_query));
</script>

<div
  class="rounded-2xl border border-border/60 bg-card p-5 text-foreground dark:border-white/10 dark:bg-white/[0.025] dark:text-white sm:p-6"
>
  <h3 class="font-semibold">Provider cost per query</h3>
  <p class="mt-1 text-sm text-muted-foreground dark:text-white/55">
    Exa is metered; other prices are estimates. Model spend is separate.
  </p>
  <div class="mt-6 space-y-4">
    {#each profiles as profile (profile.arm)}
      <div>
        <div class="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
          <span>{profile.provider}</span>
          <span class="tabular-nums"
            >{usd(profile.usd_per_query)}
            <span class="text-[11px] text-muted-foreground dark:text-white/50"
              >{profile.usd_basis}</span
            ></span
          >
        </div>
        <svg viewBox="0 0 450 8" class="h-2 w-full" aria-hidden="true">
          <rect
            width="450"
            height="8"
            rx="4"
            class="fill-muted/60 dark:fill-white/5"
          />
          <rect
            width={(profile.usd_per_query / maxCost) * 450}
            height="8"
            rx="4"
            fill={PROVIDER_COLORS[profile.arm]}
          />
        </svg>
      </div>
    {/each}
  </div>
</div>
