<script lang="ts">
  import {
    arms,
    outcomeLabel,
    PROVIDER_COLORS,
    searchEval,
    type Product,
  } from "$lib/data/search-eval-v2";

  import ProviderLabel from "./ProviderLabel.svelte";

  let { product }: { product: Product } = $props();
  let tasks = $derived(
    searchEval.agent_matrix.filter((task) => task.product === product),
  );
</script>

<div
  class="min-w-0 rounded-2xl border border-border/60 bg-card p-5 text-foreground dark:border-white/10 dark:bg-white/[0.025] dark:text-white sm:p-6"
>
  <h3 class="font-semibold">Task-by-task outcomes</h3>
  <p class="mt-1 text-sm text-muted-foreground dark:text-white/55">
    One marker per run, in recorded order: quick pass, then confirmation runs
    where available.
  </p>
  <div
    class="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground dark:text-white/60"
  >
    <span
      ><span class="mr-1 text-foreground dark:text-white">●</span>{product ===
      "revera"
        ? "Bug found / clean with no finding"
        : "All tests pass"}</span
    >
    <span
      ><span class="mr-1 text-foreground dark:text-white">○</span>{product ===
      "revera"
        ? "Bug missed"
        : "Task failed"}</span
    >
    {#if product === "revera"}<span
        ><span class="mr-1 text-foreground dark:text-rose-300">×</span>Strict
        clean-control finding</span
      ><span class="inline-flex items-center gap-1.5"
        ><svg
          width="8"
          height="8"
          viewBox="0 0 8 8"
          class="shrink-0"
          aria-hidden="true"
          ><circle
            cx="4"
            cy="4"
            r="2.75"
            class="fill-amber-600 dark:fill-amber-300"
          /></svg
        >
        Small amber dot: an uncertain comment was also filed (not a strict finding)</span
      >{/if}
  </div>
  <!-- Keyboard focus enables native horizontal table scrolling. -->
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <div
    class="mt-4 overflow-x-auto rounded-lg focus-visible:outline-2 focus-visible:outline-foreground dark:focus-visible:outline-cyan-400"
    role="region"
    aria-label={`${product} task outcomes, scroll horizontally`}
    tabindex="0"
  >
    <table class="w-full min-w-[900px] text-left text-xs">
      <caption class="sr-only"
        >{product} task outcomes, including all confirmation runs</caption
      >
      <thead class="border-b border-border/60 dark:border-white/10"
        ><tr
          ><th
            scope="col"
            class="w-64 py-3 pr-4 font-medium text-muted-foreground dark:text-white/50"
            >Task</th
          >{#each arms as arm (arm.arm)}<th
              scope="col"
              class="px-2 py-3 text-center font-medium"
              ><ProviderLabel arm={arm.arm} name={arm.provider} /></th
            >{/each}</tr
        ></thead
      >
      <tbody>
        {#each tasks as task (task.id)}
          <tr
            class="border-b border-border/40 last:border-0 dark:border-white/5"
          >
            <th scope="row" class="py-4 pr-4 font-normal"
              ><span class="font-medium">{task.id}</span
              >{#if product === "revera"}<span
                  class="ml-2 rounded border border-border/60 px-1.5 py-0.5 text-[10px] text-muted-foreground dark:border-white/10 dark:text-white/50"
                  >{task.clean ? "clean" : "bug"}</span
                >{/if}<span
                class="mt-1 block text-[11px] leading-relaxed text-muted-foreground dark:text-white/50"
                >{task.title}</span
              ></th
            >
            {#each arms as arm (arm.arm)}
              <td class="px-2 py-4">
                <div class="flex items-center justify-center gap-1">
                  {#each task.arms[arm.arm] as run, index (index)}
                    {@const isReview = "bugs_found" in run}
                    {@const strictFp = isReview && run.strict_fps > 0}
                    {@const uncertain = isReview && run.uncertain > 0}
                    {@const success =
                      "all_pass" in run
                        ? run.all_pass
                        : task.clean
                          ? !strictFp
                          : run.bugs_found > 0}
                    <svg
                      width="22"
                      height="24"
                      viewBox="0 0 22 24"
                      class="shrink-0"
                      role="img"
                      aria-label={`${arm.provider}, ${index === 0 ? "quick pass" : `confirmation ${index}`}: ${outcomeLabel(run, task.clean)}`}
                    >
                      <title
                        >{arm.provider}, {index === 0
                          ? "quick pass"
                          : `confirmation ${index}`}: {outcomeLabel(
                          run,
                          task.clean,
                        )}</title
                      >
                      {#if strictFp}
                        <path
                          d="M5 6L15 16M15 6L5 16"
                          stroke-width="2.5"
                          stroke-linecap="round"
                          class="stroke-foreground dark:stroke-rose-300"
                        />
                      {:else}
                        <circle
                          cx="10"
                          cy="11"
                          r="5.5"
                          fill={success ? PROVIDER_COLORS[arm.arm] : "none"}
                          stroke={PROVIDER_COLORS[arm.arm]}
                          stroke-width="1.8"
                          style:--provider-color={PROVIDER_COLORS[arm.arm]}
                          class="stroke-foreground dark:stroke-[var(--provider-color)]"
                        />
                      {/if}
                      {#if uncertain}<circle
                          cx="16"
                          cy="5"
                          r="2.75"
                          stroke-width="1"
                          class="fill-amber-600 stroke-card dark:fill-amber-300 dark:stroke-background"
                        />{/if}
                    </svg>
                  {/each}
                </div>
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
