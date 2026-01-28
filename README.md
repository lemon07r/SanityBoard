# SanityBoard

![sanity-banner-light](https://github.com/user-attachments/assets/bf4a4c4f-04dd-4a4d-bd43-e6308d79e02a)

A leaderboard frontend for [SanityHarness](https://github.com/lemon07r/SanityHarness) AI coding agent evaluations. Static site deployed to Cloudflare Pages.

## Architecture

SanityBoard is a fully prerendered SvelteKit application. Evaluation data lives as JSON files in `eval-results/`, validated at build time with Zod schemas that serve as both runtime guards and TypeScript type sources. Pages are generated statically, eliminating runtime data fetching entirely and enabling aggressive edge caching.

The data layer reads the filesystem during build, validates each run against strict schemas, and produces typed `RunData` objects consumed by route load functions. This "filesystem as database" approach provides git-native versioning and portable data storage without backend infrastructure.

## Highlights

**Dual Theme System**  
Light mode uses a monochrome/neutral palette with semantic tokens, while dark mode features colorful accents (pink, indigo, cyan, emerald). Theme isolation is strictly enforced - every element requires both base styles and explicit `dark:` overrides. Theme state persists in localStorage with flash prevention via inline script.

**Svelte 5 Runes State Management**  
The filtering system uses a class-based reactive store built on `$state` and `$derived` runes. A singleton `FilterStore` class exposes typed state mutations while Svelte's fine-grained reactivity handles dependency tracking automatically. Client-side filtering runs entirely in derived computations with zero network requests.

**WebGL Aurora Background**  
Custom fragment shader using OGL renders a procedural aurora effect with smooth color mixing between deep indigo, faint magma, and toxic teal. The implementation uses single-triangle fullscreen optimization, reduced device pixel ratio for GPU efficiency, and pauses via the Visibility API when the tab loses focus.

**CSS-Driven Spotlight Effects**  
Interactive spotlight cards track cursor position through `requestAnimationFrame`-throttled updates to CSS custom properties. The actual gradient rendering happens purely in CSS via `radial-gradient` positioned at `var(--mouse-x)` and `var(--mouse-y)`, avoiding JavaScript repaints entirely.

**Grid-Based Height Animation**  
Expandable rows animate using the `grid-template-rows: 0fr` to `1fr` technique, enabling smooth height transitions without JavaScript measurement or `max-height` hacks. Content collapses cleanly via `min-height: 0` with proper `prefers-reduced-motion` respect.

**Server-Side Markdown Compilation**  
Flight reports compile at build time through mdsvex with rehype-pretty-code, producing syntax-highlighted HTML using Shiki and the Catppuccin Macchiato theme. Emoji symbols are automatically converted to Unicode equivalents for consistent cross-platform rendering. Dynamic routes auto-generate via SvelteKit's `entries()` function based on available run IDs.

**In-Browser Data Export**  
Users can download evaluation data as ZIP archives generated client-side with JSZip, requiring no server-side processing.

## Stack

- **Framework:** SvelteKit 2 (static adapter), Svelte 5
- **Styling:** TailwindCSS v4 with CSS custom properties for theming
- **Build:** Vite 7, Bun
- **Validation:** Zod 4
- **Testing:** Playwright
- **Markdown:** mdsvex with rehype-pretty-code
- **Graphics:** OGL (WebGL), JSZip

## File Structure

```
src/
  app.css              # Tailwind config, theme tokens, prose styles
  app.html             # HTML shell with theme init script
  lib/
    components/
      core/            # Navbar, SpotlightCard, Tabs, ThemeToggle, Seo
      leaderboard/     # Hero, LeaderboardRow, RankBadge, ControlBar
      report/          # TaskMatrix, PassRateChart
    server/data.ts     # Zod schemas and data loading
    stores/            # theme.svelte.ts, filter.svelte.ts
    utils.ts           # cn() helper (clsx + tailwind-merge)
  routes/
    +page.svelte       # Home/Leaderboard
    +layout.svelte     # Root layout (Navbar, Footer, background)
    about/             # About page (sponsors, contact)
    report/[id]/       # Report detail (task matrix, flight report)
    submit/            # Submission form
tests/                 # Playwright E2E tests
eval-results/          # Evaluation data (JSON/MD per run)
```

## Data Schema

Evaluation results stored in `eval-results/[run-id]/`:

| File              | Contents                                     |
| ----------------- | -------------------------------------------- |
| `metadata.json`   | Agent info, model, provider, verified status |
| `submission.json` | Stats: scores, pass rates, durations         |
| `summary.json`    | Per-task results array                       |
| `report.md`       | Flight report markdown                       |

All schemas defined with Zod in `src/lib/server/data.ts`.

## Performance

- Prerendered pages with Brotli/gzip precompression
- WebGL runs at `dpr: 1` to reduce GPU load
- RAF-throttled mouse tracking prevents layout thrashing
- Animation suspension when tab is hidden
- Derived values recompute only when dependencies change
- Scores 99-100/100 on PageSpeed Insights across Performance, Best Practices, and SEO (https://pagespeed.web.dev/analysis/https-sanityboard-lr7-dev/4somzuimw7)

## Usage

```bash
bun install              # Install dependencies
bun run dev              # Dev server at localhost:5173
bun run build            # Production build (validates first)
bun run preview          # Preview build at localhost:4173
bun run lint             # Prettier + ESLint
bun run format           # Auto-format
bun run check            # Type check
bun run test             # Playwright tests
```

## Contributing

When making changes:

1. Follow the dual theme system - every styled element needs both light and dark mode styles
2. Use semantic tokens (`bg-card`, `text-foreground`) for light mode, explicit colors with `dark:` prefix for dark mode
3. Test both themes before submitting
4. Run `bun run build` to verify the build passes

## License

MIT

## Contact

Discord: mim7 | Email: lemon07r@lr7.dev | GitHub: [lemon07r/SanityHarness](https://github.com/lemon07r/SanityHarness)
