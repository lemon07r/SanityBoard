<script lang="ts">
  import { searchEval, usd, type Product } from "$lib/data/search-eval-v2";

  import ProviderLabel from "./ProviderLabel.svelte";

  let { product }: { product: Product } = $props();
  let rows = $derived(searchEval[product].quick_pass);
</script>

<div
  class="min-w-0 rounded-2xl border border-border/60 bg-card p-5 text-foreground dark:border-white/10 dark:bg-white/[0.025] dark:text-white sm:p-6"
>
  <h3 class="font-semibold">Quick pass · equal task counts</h3>
  <p class="mt-1 text-sm text-muted-foreground dark:text-white/55">
    First run only. Costs and wall time are means per {product === "revera"
      ? "review"
      : "task"}; model prices are estimates.
  </p>
  <!-- Keyboard focus enables native horizontal table scrolling. -->
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <div
    class="mt-4 overflow-x-auto rounded-lg focus-visible:outline-2 focus-visible:outline-foreground dark:focus-visible:outline-cyan-400"
    role="region"
    aria-label={`${product} quick pass results, scroll horizontally`}
    tabindex="0"
  >
    <table class="w-full min-w-[740px] text-left text-sm tabular-nums">
      <caption class="sr-only"
        >{product} quick pass results and mean per-run costs</caption
      >
      <thead
        class="border-b border-border/60 text-xs text-muted-foreground dark:border-white/10 dark:text-white/55"
        ><tr
          ><th scope="col" class="py-3 pr-4 font-medium">Provider / profile</th
          ><th scope="col" class="px-3 py-3 text-right font-medium"
            >{product === "revera" ? "Bugs found" : "All pass"}</th
          >{#if product === "revera"}<th
              scope="col"
              class="px-3 py-3 text-right font-medium"
              >Strict clean-<br />control findings</th
            ><th scope="col" class="px-3 py-3 text-right font-medium"
              >Uncertain</th
            >{/if}<th scope="col" class="px-3 py-3 text-right font-medium"
            >Model $</th
          ><th scope="col" class="px-3 py-3 text-right font-medium">Search $</th
          ><th scope="col" class="py-3 pl-3 text-right font-medium">Wall s</th
          ></tr
        ></thead
      >
      <tbody>
        {#each rows as row (row.arm)}
          <tr
            class="border-b border-border/40 last:border-0 dark:border-white/5"
          >
            <th scope="row" class="py-4 pr-4 font-normal"
              ><ProviderLabel
                arm={row.arm}
                name={row.provider}
                profile={row.profile}
              /></th
            >
            <td class="px-3 py-4 text-right font-semibold"
              >{"bugs_found" in row
                ? `${row.bugs_found}/${row.bugs_available}`
                : `${row.all_pass}/${row.tasks}`}</td
            >
            {#if "strict_fps" in row}<td class="px-3 py-4 text-right"
                >{row.strict_fps}</td
              ><td class="px-3 py-4 text-right">{row.uncertain}</td>{/if}
            <td class="px-3 py-4 text-right">{usd(row.model_usd_mean)}</td>
            <td class="px-3 py-4 text-right"
              >{usd(row.search_usd_mean)}<span
                class="mt-0.5 block text-[10px] text-muted-foreground dark:text-white/45"
                >{row.arm === "none" ? "not used" : row.search_usd_basis}</span
              ></td
            >
            <td class="py-4 pl-3 text-right">{row.wall_s_mean.toFixed(1)}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
