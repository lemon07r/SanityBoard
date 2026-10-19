<script lang="ts">
  import { profiles, PROVIDER_COLORS, seconds } from "$lib/data/search-eval-v2";

  const x = (ms: number) =>
    50 + (Math.log10(ms / 400) / Math.log10(8000 / 400)) * 270;
  const y = (rate: number) => 220 - (rate - 0.5) * 300;
  const labelOffsets: Record<string, { x: number; y: number }> = {
    "exa:auto": { x: 8, y: -12 },
    "parallel:fast": { x: 0, y: -15 },
    "tavily:advanced": { x: 10, y: 22 },
    "brave:web": { x: 8, y: 22 },
    "firecrawl:search": { x: 10, y: 22 },
  };
</script>

<div
  class="min-w-0 rounded-2xl border border-border/60 bg-card p-5 text-foreground dark:border-white/10 dark:bg-white/[0.025] dark:text-white sm:p-6"
>
  <h3 class="font-semibold">Speed without losing evidence</h3>
  <p class="mt-1 text-sm text-muted-foreground dark:text-white/55">
    Search only. Dot = p50; line extends to p90. Upper left is better.
  </p>
  <svg
    viewBox="0 0 360 300"
    class="mx-auto mt-5 w-full max-w-[440px]"
    role="img"
    aria-label="Search latency versus evidence at rank 5. Logarithmic latency axis. Exact values follow in a screen-reader table."
  >
    {#each [0.5, 0.75, 1] as tick (tick)}
      <line
        x1="50"
        x2="330"
        y1={y(tick)}
        y2={y(tick)}
        class="stroke-border/60 dark:stroke-white/10"
      />
      <text
        x="39"
        y={y(tick) + 4}
        text-anchor="end"
        class="fill-muted-foreground text-[12px] dark:fill-white/50"
        >{tick * 100}%</text
      >
    {/each}
    {#each [500, 1000, 2000, 4000, 8000] as tick (tick)}
      <line
        x1={x(tick)}
        x2={x(tick)}
        y1="58"
        y2="230"
        class="stroke-border/60 dark:stroke-white/10"
      />
      <text
        x={x(tick)}
        y="250"
        text-anchor="middle"
        class="fill-muted-foreground text-[12px] dark:fill-white/50"
        >{seconds(tick)} s</text
      >
    {/each}
    <text
      x="50"
      y="25"
      class="fill-muted-foreground text-[12px] dark:fill-white/55"
      >Evidence@5</text
    >
    <text
      x="190"
      y="284"
      text-anchor="middle"
      class="fill-muted-foreground text-[12px] dark:fill-white/55"
      >Search latency · log scale</text
    >
    {#each profiles as profile (profile.arm)}
      {@const pointY = y(profile.evidence[5] / profile.n)}
      {@const offset = labelOffsets[profile.arm]}
      <g
        fill={PROVIDER_COLORS[profile.arm]}
        stroke={PROVIDER_COLORS[profile.arm]}
      >
        <line
          x1={x(profile.search_ms.p50)}
          x2={x(profile.search_ms.p90)}
          y1={pointY}
          y2={pointY}
          stroke-width="3"
          opacity="0.6"
        />
        <line
          x1={x(profile.search_ms.p90)}
          x2={x(profile.search_ms.p90)}
          y1={pointY - 4}
          y2={pointY + 4}
          stroke-width="2"
        />
        <circle cx={x(profile.search_ms.p50)} cy={pointY} r="5" />
      </g>
      <text
        x={x(profile.search_ms.p50) + offset.x}
        y={pointY + offset.y}
        class="fill-foreground text-[13px] font-medium dark:fill-white/90"
        >{profile.provider}</text
      >
    {/each}
  </svg>
  <div class="sr-only">
    <table>
      <caption>Search latency and evidence@5</caption>
      <thead
        ><tr
          ><th>Provider</th><th>Evidence@5</th><th>p50 seconds</th><th
            >p90 seconds</th
          ></tr
        ></thead
      >
      <tbody
        >{#each profiles as profile (profile.arm)}<tr
            ><th>{profile.provider}</th><td
              >{profile.evidence[5]}/{profile.n}</td
            ><td>{seconds(profile.search_ms.p50, 3)}</td><td
              >{seconds(profile.search_ms.p90, 3)}</td
            ></tr
          >{/each}</tbody
      >
    </table>
  </div>
</div>
