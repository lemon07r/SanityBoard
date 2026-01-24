# SanityBoard

A leaderboard frontend for [SanityHarness](https://github.com/lemon07r/SanityHarness) AI coding agent evaluations. Static site deployed to Cloudflare Pages.

## Architecture

SanityBoard is a fully prerendered SvelteKit application. Evaluation data lives as JSON files in `eval-results/`, validated at build time with Zod schemas that serve as both runtime guards and TypeScript type sources. Pages are generated statically, eliminating runtime data fetching entirely and enabling aggressive edge caching.

The data layer reads the filesystem during build, validates each run against strict schemas, and produces typed `RunData` objects consumed by route load functions. This "filesystem as database" approach provides git-native versioning and portable data storage without backend infrastructure.

## Highlights

**Svelte 5 Runes State Management**  
The filtering system uses a class-based reactive store built on `$state` and `$derived` runes. A singleton `FilterStore` class exposes typed state mutations while Svelte's fine-grained reactivity handles dependency tracking automatically. Client-side filtering runs entirely in derived computations with zero network requests.

**WebGL Aurora Background**  
Custom fragment shader using OGL renders a procedural aurora effect with smooth color mixing between deep indigo, faint magma, and toxic teal. The implementation uses single-triangle fullscreen optimization, reduced device pixel ratio for GPU efficiency, and pauses via the Visibility API when the tab loses focus.

**CSS-Driven Spotlight Effects**  
Interactive spotlight cards track cursor position through `requestAnimationFrame`-throttled updates to CSS custom properties. The actual gradient rendering happens purely in CSS via `radial-gradient` positioned at `var(--mouse-x)` and `var(--mouse-y)`, avoiding JavaScript repaints entirely.

**Grid-Based Height Animation**  
Expandable rows animate using the `grid-template-rows: 0fr` to `1fr` technique, enabling smooth height transitions without JavaScript measurement or `max-height` hacks. Content collapses cleanly via `min-height: 0` with proper `prefers-reduced-motion` respect.

**Server-Side Markdown Compilation**  
Flight reports compile at build time through mdsvex with rehype-pretty-code, producing syntax-highlighted HTML using Shiki and the Catppuccin Macchiato theme. Dynamic routes auto-generate via SvelteKit's `entries()` function based on available run IDs.

**In-Browser Data Export**  
Users can download evaluation data as ZIP archives generated client-side with JSZip, requiring no server-side processing.

## Stack

SvelteKit (static adapter), Svelte 5, TailwindCSS v4, Vite, Playwright, Zod, mdsvex, OGL, JSZip

## Performance

- Prerendered pages with Brotli/gzip precompression
- WebGL runs at `dpr: 1` to reduce GPU load
- RAF-throttled mouse tracking prevents layout thrashing
- Animation suspension when tab is hidden
- Derived values recompute only when dependencies change
- Scores 99-100/100 on https://pagespeed.web.dev/analysis/https-sanityboard-lr7-dev/4somzuimw7 across the board on both mobile and desktop for Performance, Best Practices, and SEO (100 for accessibility on desktop, 92 on mobile).

## Usage

```bash
bun install
bun run dev      # http://localhost:5173
bun run build    # production build
bun run preview  # production preview on http://localhost:5173
```

## License

MIT
