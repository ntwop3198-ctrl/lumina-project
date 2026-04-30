## [LUMINA - Knowledge Engine] Blog Navigation Handover

Date: 2026-04-29  
Scope: Blog curation UX, series navigation, context-preserving filters, and error-page consistency.

### 1) What Is Implemented

- **Three-axis topic system** in `lib/blog/topics.ts`
  - `life_relations` (삶과 인연)
  - `roots_memory` (뿌리와 기억)
  - `world_reading` (세상 읽기)
- **0428 series split** (5 posts) + spotlight treatment (`Dawn`)
- **0429 series split** (4 posts) + spotlight treatment (`Morning`)
- **Blog home curation order** extended in `lib/blog/index.ts`
  - `philosophy -> practical -> series -> dawn -> morning`
- **Filter system** in `app/blog/page.tsx`
  - Topic filter
  - Time/spotlight filter (`all/dawn/morning`)
  - Filter summary chips with partial clear
  - Empty-result recovery links
  - Result count always visible (filtered/unfiltered)
- **Post page continuity** in `app/blog/[slug]/page.tsx`
  - Breadcrumb return keeps context
  - Topic chips keep context
  - Back-to-list keeps context
  - 0428/0429 series chips keep context
  - Prev/Next links in series blocks
- **Shared blog URL helpers** in `lib/blog/navigation.ts`
  - `resolveSpotlightFilter`
  - `resolveBlogListContext`
  - `buildBlogHref`
  - `buildPostHref`
- **Error-page consistency**
  - Added `pages/404.tsx`
  - Aligned tone for `pages/_error.tsx` and `app/not-found.tsx`

### 2) Key Files

- `app/blog/page.tsx`
- `app/blog/[slug]/page.tsx`
- `lib/blog/index.ts`
- `lib/blog/topics.ts`
- `lib/blog/navigation.ts`
- `pages/404.tsx`
- `pages/_error.tsx`
- `components/landing/global-header-bilingual.tsx`
- `components/landing/header.tsx`

### 3) Operational Notes

- **Windows dev cache can intermittently break** with missing chunk/vendor messages.
- Recovery command:
  - `npm run dev:fresh`
- Prefer opening:
  - `http://127.0.0.1:3001`

### 4) Validation Baseline

- Last known state: build success (`npm run build`)
- Blog routes validated repeatedly:
  - `/blog`
  - `/blog?spotlight=dawn`
  - `/blog?spotlight=morning`
  - `/blog?topic=<id>&spotlight=<mode>`
  - `/blog/<slug>?topic=<id>&spotlight=<mode>`

### 5) Suggested Next Safe Steps

- Apply same spotlight context UX pattern to any future series (0430+).
- Add tiny integration test for query-context preservation:
  - list -> post -> back -> same query retained.
- Optional: unify focus-ring token into one shared UI utility.
