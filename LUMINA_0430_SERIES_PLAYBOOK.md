## [LUMINA - Knowledge Engine] 0430 Series Playbook

Purpose: Keep 0430+ column publishing consistent with current blog UX and context-preserving navigation.

### 1) Slug Convention

- Use this pattern:
  - `lumina-column-0430-ikw-01-<short-key>`
  - `lumina-column-0430-ikw-02-<short-key>`
- Rules:
  - date first (`0430`)
  - author key fixed (`ikw`)
  - sequence fixed 2-digit (`01`, `02`, ...)
  - short-key in lowercase kebab-case

### 2) Frontmatter Baseline

- Required fields:
  - `title`
  - `excerpt`
  - `date`
  - `slug`
  - `topics`
- Topic IDs allowed:
  - `life_relations`
  - `roots_memory`
  - `world_reading`

### 3) Publishing Checklist

1. Create each post file in `content/blog/`.
2. Confirm slug uniqueness.
3. Keep excerpt concise (1 sentence).
4. Use one primary topic (add second only when clearly needed).
5. Verify list and detail routes:
   - `/blog`
   - `/blog/<slug>`
6. If dev chunks break on Windows, run:
   - `npm run dev:fresh`

### 4) Optional Curation Hooks (When Needed)

If 0430 series should be spotlighted like 0428/0429:

1. Add slugs to `CURATED_GROUPS` in `lib/blog/index.ts`.
2. Add label/color/prefix mapping in `app/blog/page.tsx`.
3. Add series slug array + prev/next block in `app/blog/[slug]/page.tsx`.

### 5) Quality Guardrails

- Avoid over-editing author voice.
- Keep legal/risk-sensitive phrasing neutral when naming individuals.
- Preserve partner-safe and transparency-first language in any business claims.
