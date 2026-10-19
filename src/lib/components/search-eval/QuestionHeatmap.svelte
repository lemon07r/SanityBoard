<script lang="ts">
  import { tick } from "svelte";

  import {
    profiles,
    PROVIDER_COLORS,
    searchEval,
  } from "$lib/data/search-eval-v2";

  const filters = [
    { id: "all", label: "All" },
    { id: "revera", label: "Revera-like" },
    { id: "opencode", label: "OpenCode-like" },
    { id: "traps", label: "Traps" },
  ] as const;
  type Filter = (typeof filters)[number]["id"];
  type Question = (typeof searchEval.retrieval.matrix)[number];
  let activeFilter = $state<Filter>("all");
  let selectedId = $state(searchEval.retrieval.matrix[0].id);
  let inlineDetails: HTMLDivElement | undefined = $state();
  let questions = $derived(
    searchEval.retrieval.matrix.filter(
      (row) =>
        activeFilter === "all" ||
        (activeFilter === "traps" ? row.trap : row.slice === activeFilter),
    ),
  );
  let selected = $derived(
    questions.find((row) => row.id === selectedId) ?? questions[0],
  );

  function setFilter(filter: Filter) {
    activeFilter = filter;
  }

  async function revealQuestion(id: string) {
    selectedId = id;
    await tick();
    if (inlineDetails?.getClientRects().length) {
      inlineDetails.scrollIntoView({ block: "nearest", inline: "nearest" });
    }
  }
</script>

{#snippet questionDetails(question: Question)}
  <p
    class="mb-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-medium text-muted-foreground dark:text-white/50"
  >
    <span>{question.id}</span><span
      >{question.category.replaceAll("-", " ")}</span
    ><span class="capitalize">{question.difficulty}</span
    >{#if question.trap}<span>Trap</span>{/if}
  </p>
  <p class="text-sm leading-relaxed">{question.question}</p>
{/snippet}

<div
  class="min-w-0 rounded-2xl border border-border/60 bg-card p-5 text-foreground dark:border-white/10 dark:bg-white/[0.025] dark:text-white sm:p-6"
>
  <div class="flex flex-wrap items-start justify-between gap-4">
    <div>
      <h3 class="font-semibold">Inspect every question</h3>
      <p class="mt-1 text-sm text-muted-foreground dark:text-white/55">
        Hover, focus or select a question to read it in full.
      </p>
    </div>
    <span
      class="rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground dark:border-white/10 dark:text-white/60"
      >{questions.length} questions</span
    >
  </div>
  <div
    class="mt-5 flex flex-wrap gap-2"
    role="group"
    aria-label="Filter retrieval questions"
  >
    {#each filters as filter (filter.id)}
      <button
        type="button"
        aria-pressed={activeFilter === filter.id}
        onclick={() => setFilter(filter.id)}
        class="rounded-lg border px-3 py-2 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground dark:focus-visible:outline-cyan-400 {activeFilter ===
        filter.id
          ? 'border-foreground bg-foreground text-background dark:border-cyan-400/40 dark:bg-cyan-400/10 dark:text-cyan-200'
          : 'border-border/60 bg-card text-muted-foreground hover:bg-muted/50 dark:border-white/10 dark:bg-transparent dark:text-white/60 dark:hover:bg-white/5'}"
        >{filter.label}</button
      >
    {/each}
  </div>
  <div
    id="question-details"
    class="mt-4 hidden min-h-36 rounded-xl border border-border/60 bg-card p-4 dark:border-white/10 dark:bg-background sm:sticky sm:top-28 sm:z-20 sm:block"
    aria-live="polite"
    aria-atomic="true"
  >
    {@render questionDetails(selected)}
  </div>
  <div
    class="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground dark:text-white/55"
  >
    <span>1–5 = first evidence rank; stronger tint = earlier</span><span
      >— = miss</span
    ><span>! = top-result read failed</span>
  </div>
  <p
    class="mt-3 text-[11px] text-muted-foreground dark:text-white/45 sm:hidden"
  >
    Scroll for more providers; the question stays in view.
  </p>
  <!-- Keyboard focus enables native horizontal table scrolling. -->
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <div
    class="@container mt-4 overflow-x-auto rounded-lg focus-visible:outline-2 focus-visible:outline-foreground dark:focus-visible:outline-cyan-400"
    role="region"
    aria-label="Per-question evidence ranks, scroll horizontally"
    tabindex="0"
  >
    <table
      class="w-full min-w-[340px] table-fixed border-separate border-spacing-y-1 text-left text-xs sm:min-w-[760px]"
    >
      <caption class="sr-only"
        >First evidence rank for every retrieval question and provider. A dash
        is a miss. An exclamation mark flags a read error.</caption
      >
      <colgroup>
        <col class="w-[100px] sm:w-64" />
        {#each profiles as profile (profile.arm)}<col
            class="w-12 sm:w-auto"
          />{/each}
      </colgroup>
      <thead class="text-muted-foreground dark:text-white/55"
        ><tr
          ><th
            scope="col"
            class="sticky left-0 z-10 border-r border-border/40 bg-card px-1.5 py-3 font-medium dark:border-white/10 dark:bg-background sm:px-3"
            >Question</th
          >{#each profiles as profile (profile.arm)}<th
              scope="col"
              class="px-0.5 py-3 text-center text-[10px] font-medium [overflow-wrap:anywhere] sm:px-3 sm:text-xs"
              ><span
                class="mx-auto mb-2 block h-1 w-6 rounded-full"
                style:background={PROVIDER_COLORS[profile.arm]}
              ></span>{profile.provider}</th
            >{/each}</tr
        ></thead
      >
      <tbody>
        {#each questions as question (question.id)}
          <tr class="group" onpointerenter={() => (selectedId = question.id)}>
            <th
              scope="row"
              class="sticky left-0 z-10 border-r border-border/40 bg-card pr-1 font-normal dark:border-white/10 dark:bg-background sm:pr-2"
            >
              <button
                type="button"
                aria-pressed={selected.id === question.id}
                aria-describedby="question-details"
                title={question.question}
                onfocus={() => revealQuestion(question.id)}
                onclick={() => revealQuestion(question.id)}
                class="w-full rounded-lg border px-1.5 py-2.5 text-left text-[11px] leading-snug [overflow-wrap:anywhere] transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-foreground dark:focus-visible:outline-cyan-400 sm:px-3 sm:text-xs {selected.id ===
                question.id
                  ? 'border-border bg-muted/60 text-foreground dark:border-white/20 dark:bg-white/10 dark:text-white'
                  : 'border-transparent bg-card text-muted-foreground hover:bg-muted/30 dark:border-transparent dark:bg-transparent dark:text-white/60 dark:hover:bg-white/5'}"
                >{question.id}<span
                  class="mt-1 hidden text-[10px] text-muted-foreground dark:text-white/45 sm:block"
                  >{question.slice === "revera"
                    ? "Revera-like"
                    : "OpenCode-like"}{question.trap ? " · trap" : ""}</span
                ></button
              >
            </th>
            {#each profiles as profile (profile.arm)}
              {@const rank = question.ranks[profile.arm]}
              <td class="px-0.5 text-center sm:px-1">
                <div
                  class="relative overflow-hidden rounded-md border border-border/40 bg-muted/20 py-3 text-foreground dark:border-white/5 dark:bg-white/[0.025] dark:text-white"
                >
                  {#if rank.evidence_rank !== null}<span
                      class="absolute inset-0"
                      style:background={PROVIDER_COLORS[profile.arm]}
                      style:opacity={0.42 - (rank.evidence_rank - 1) * 0.075}
                      aria-hidden="true"
                    ></span>{/if}
                  <span class="relative font-semibold tabular-nums"
                    ><span class="sr-only"
                      >{profile.provider}:
                    </span>{rank.evidence_rank ?? "—"}<span class="sr-only"
                      >{rank.evidence_rank === null
                        ? "miss"
                        : " first evidence rank"}</span
                    >{#if rank.read_error}<span
                        class="ml-1 inline-block rounded bg-foreground px-1 text-[10px] text-background dark:bg-white dark:text-black"
                        aria-label="read error">!</span
                      >{/if}</span
                  >
                </div>
              </td>
            {/each}
          </tr>
          {#if selected.id === question.id}
            <tr class="sm:hidden">
              <td colspan={profiles.length + 1} class="p-0">
                <div
                  id="question-inline-details"
                  bind:this={inlineDetails}
                  class="sticky left-0 mb-3 w-[100cqw] scroll-mt-28 rounded-xl border border-border/60 bg-card p-4 dark:border-white/10 dark:bg-background"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {@render questionDetails(question)}
                </div>
              </td>
            </tr>
          {/if}
        {/each}
      </tbody>
    </table>
  </div>
</div>
