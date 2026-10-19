<script lang="ts">
  import { profiles, PROVIDER_COLORS } from "$lib/data/search-eval-v2";
</script>

<div
  class="rounded-2xl border border-border/60 bg-card p-5 text-foreground dark:border-white/10 dark:bg-white/[0.025] dark:text-white sm:p-6"
>
  <h3 class="font-semibold">How often is the evidence there?</h3>
  <p class="mt-1 text-sm text-muted-foreground dark:text-white/55">
    Rank 1 vs. anywhere in the top 5. Whiskers: Wilson 95% interval.
  </p>
  <div
    class="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground dark:text-white/55"
    aria-hidden="true"
  >
    <span class="flex items-center gap-2"
      ><span
        class="h-2 w-4 rounded-sm"
        style:background={PROVIDER_COLORS["exa:auto"]}
      ></span>Evidence@5</span
    >
    <span class="flex items-center gap-2"
      ><span
        class="h-2 w-4 rounded-sm"
        style:background={`color-mix(in srgb, ${PROVIDER_COLORS["exa:auto"]} 35%, white)`}
      ></span>Evidence@1 (lighter inset)</span
    >
  </div>
  <div class="mt-5 space-y-3">
    {#each profiles as profile (profile.arm)}
      <div>
        <div class="mb-1 flex items-center justify-between gap-3 text-xs">
          <span class="font-medium">{profile.provider}</span>
          <span class="tabular-nums"
            ><span class="text-muted-foreground dark:text-white/55"
              >{profile.evidence[1]}</span
            >
            / <strong class="font-semibold">{profile.evidence[5]}</strong><span
              class="ml-1 text-muted-foreground dark:text-white/45"
              >of {profile.n}</span
            ></span
          >
        </div>
        <svg
          viewBox="0 0 302 26"
          preserveAspectRatio="none"
          class="h-[26px] w-full overflow-visible"
          role="img"
          aria-label={`${profile.provider}: evidence at rank 1 in ${profile.evidence[1]} of ${profile.n} questions; at rank 5 in ${profile.evidence[5]} of ${profile.n}.`}
        >
          {#each [0, 0.25, 0.5, 0.75, 1] as tick (tick)}<line
              x1={tick * 302}
              x2={tick * 302}
              y1="0"
              y2="26"
              class="stroke-border/60 dark:stroke-white/10"
            />{/each}
          <rect
            width={(profile.evidence[5] / profile.n) * 302}
            height="26"
            rx="3"
            fill={PROVIDER_COLORS[profile.arm]}
          />
          <rect
            y="16"
            width={(profile.evidence[1] / profile.n) * 302}
            height="8"
            rx="2"
            fill={`color-mix(in srgb, ${PROVIDER_COLORS[profile.arm]} 35%, white)`}
          />
          <g class="stroke-foreground dark:stroke-white/80" stroke-width="1.5">
            <line
              x1={profile.evidence5_wilson[0] * 302}
              x2={profile.evidence5_wilson[1] * 302}
              y1="8"
              y2="8"
            />
            {#each profile.evidence5_wilson as bound (bound)}<line
                x1={bound * 302}
                x2={bound * 302}
                y1="4"
                y2="12"
              />{/each}
          </g>
        </svg>
      </div>
    {/each}
  </div>
  <div
    class="mt-2 flex justify-between text-[11px] text-muted-foreground dark:text-white/50"
    aria-hidden="true"
  >
    <span>0%</span><span>50%</span><span>100%</span>
  </div>
  <div class="sr-only">
    <table>
      <caption
        >Evidence retrieval counts and evidence@5 confidence intervals</caption
      >
      <thead
        ><tr
          ><th>Provider</th><th>Questions</th><th>Evidence@1</th><th
            >Evidence@5</th
          ><th>Wilson 95% interval</th></tr
        ></thead
      >
      <tbody
        >{#each profiles as profile (profile.arm)}<tr
            ><th>{profile.provider}</th><td>{profile.n}</td><td
              >{profile.evidence[1]}</td
            ><td>{profile.evidence[5]}</td><td
              >{profile.evidence5_wilson
                .map((bound) => `${(bound * 100).toFixed(1)}%`)
                .join(" to ")}</td
            ></tr
          >{/each}</tbody
      >
    </table>
  </div>
</div>
