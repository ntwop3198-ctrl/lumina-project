/** Controlled vocabulary for column / journal grouping (slug inference + optional frontmatter). */

export const BLOG_TOPIC_IDS = ["life_relations", "roots_memory", "world_reading"] as const

export type BlogTopicId = (typeof BLOG_TOPIC_IDS)[number]

export const BLOG_TOPIC_LABEL_KO: Record<BlogTopicId, string> = {
  life_relations: "삶과 인연",
  roots_memory: "뿌리와 기억",
  world_reading: "세상 읽기",
}

const TOPIC_SET = new Set<string>(BLOG_TOPIC_IDS)

export function isBlogTopicId(value: string): value is BlogTopicId {
  return TOPIC_SET.has(value)
}

function dedupeTopics(ids: BlogTopicId[]): BlogTopicId[] {
  const seen = new Set<BlogTopicId>()
  const out: BlogTopicId[] = []
  for (const id of ids) {
    if (seen.has(id)) continue
    seen.add(id)
    out.push(id)
  }
  return out
}

function parseTopicsFromFrontmatter(raw: unknown): BlogTopicId[] | undefined {
  if (!Array.isArray(raw)) return undefined
  const legacyAlias: Record<string, BlogTopicId> = {
    philosophy: "roots_memory",
    story: "roots_memory",
    wellness: "life_relations",
    commerce: "world_reading",
    media_column: "world_reading",
    series_archive: "world_reading",
    transparency: "world_reading",
    misc: "world_reading",
  }
  const out: BlogTopicId[] = []
  for (const item of raw) {
    if (typeof item !== "string") continue
    if (isBlogTopicId(item)) {
      out.push(item)
      continue
    }
    if (legacyAlias[item]) out.push(legacyAlias[item])
  }
  return out.length ? dedupeTopics(out) : undefined
}

/** Slug-based default; refine with optional `topics` in post frontmatter (merged). */
export function inferTopicsFromSlug(slug: string): BlogTopicId[] {
  if (slug === "lumina-origin") return ["roots_memory"]
  if (slug.includes("seven-notes") || slug === "lumina-column-111") return ["roots_memory"]
  if (
    slug.includes("805-story") ||
    slug.includes("kimhaesung") ||
    slug === "lumina-column-0428-ikw-collection"
  ) {
    return ["roots_memory"]
  }
  if (slug.includes("saunamax")) return ["life_relations"]
  if (slug.includes("luminabiz") || slug.includes("spicy")) return ["world_reading"]
  if (/lumina-column-042[0-9]-/.test(slug)) return ["world_reading"]
  if (
    slug === "partner-transparency" ||
    slug.includes("col0") ||
    slug.includes("sawi") ||
    slug.includes("joongang") ||
    slug.includes("ohmynews")
  ) {
    return ["world_reading"]
  }
  if (
    slug.startsWith("lumina-column-doc-") ||
    /^lumina-column-1-[a-f0-9]{8}$/.test(slug) ||
    slug === "lumina-column-10"
  ) {
    return ["roots_memory"]
  }
  return ["world_reading"]
}

export function resolvePostTopics(slug: string, frontmatter: Record<string, unknown>): BlogTopicId[] {
  const inferred = inferTopicsFromSlug(slug)
  const fromFile = parseTopicsFromFrontmatter(frontmatter.topics)
  if (!fromFile?.length) return dedupeTopics(inferred)
  return dedupeTopics([...inferred, ...fromFile])
}

export const BLOG_TOPIC_CHIP_CLASS: Record<BlogTopicId, string> = {
  life_relations: "border-[#86b29d]/35 bg-[#86b29d]/10 text-[#cce1d7]/92 hover:bg-[#86b29d]/14",
  roots_memory: "border-[#c49a6c]/35 bg-[#c49a6c]/10 text-[#ead9c5]/92 hover:bg-[#c49a6c]/14",
  world_reading: "border-[#93a7c5]/35 bg-[#93a7c5]/10 text-[#d4deee]/92 hover:bg-[#93a7c5]/14",
}
