import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import { resolvePostTopics, type BlogTopicId } from "@/lib/blog/topics"

export type { BlogTopicId } from "@/lib/blog/topics"

const POSTS_DIR = path.join(process.cwd(), "content", "blog")
const CURATED_GROUPS = {
  philosophy: [
    "lumina-column-111",
    "lumina-column-sawitest1-bow-joongang",
    "lumina-column-sawitest2-3steps-joongang",
    "lumina-column-seven-notes-2026-04-26",
  ],
  practical: [
    "lumina-column-805-story-eight-records-2026-04-26",
    "lumina-column-lumina-kimhaesung-b",
    "lumina-column-luminabiz-c01",
    "lumina-column-luminabiz-c02",
  ],
  series: [
    "lumina-column-0423-c01-c09",
    "lumina-column-0424-c10-c13",
    "lumina-column-0425-c14-c16",
    "lumina-column-0426-c17-c24",
  ],
  dawn: [
    "lumina-column-0428-ikw-01-trust-gap",
    "lumina-column-0428-ikw-02-cleaning-peace",
    "lumina-column-0428-ikw-03-choose-new-bond",
    "lumina-column-0428-ikw-04-parents-sword",
    "lumina-column-0428-ikw-05-bitter-laugh",
  ],
  morning: [
    "lumina-column-0429-ikw-01-empty-for-fair-value",
    "lumina-column-0429-ikw-02-lesson-beside-merchant",
    "lumina-column-0429-ikw-03-go-small-go-hard-go-self",
    "lumina-column-0429-ikw-04-intangible-is-factory",
  ],
  field: [
    "lumina-column-0430-ikw-01-jinho-mail-open",
    "lumina-column-0430-ikw-02-jeonse-livingroom-warehouse",
    "lumina-column-0430-ikw-03-two-percent-twenty",
    "lumina-column-0430-ikw-04-not-me-lost-10b",
    "lumina-column-0430-ikw-05-man-cosmetics-path",
    "lumina-column-0430-ikw-06-religion-unity",
    "lumina-column-0430-ikw-07-crossed-religion-boundary",
    "lumina-column-0430-ikw-08-makmaekso-philosophy",
    "lumina-column-0430-ikw-09-new-drinking-culture",
    "lumina-column-0430-ikw-10-fathers-hurhur",
    "lumina-column-0430-ikw-11-farted-and-ran",
    "lumina-column-0430-ikw-12-self-lamp-declaration",
    "lumina-column-0430-ikw-13-eat-with-my-own-money",
    "lumina-column-0430-ikw-14-truth-is-practice",
    "lumina-column-0430-ikw-15-met-buddha-after-breaking-rules",
    "lumina-column-0430-ikw-16-why-no-alcohol-meat-fight",
    "lumina-column-0430-ikw-17-buddha-was-not-against-drink",
  ],
  expansion: [
    "lumina-column-0501-ikw-01-jikji-bonsim-mission",
    "lumina-column-0501-ikw-02-zero-to-one-partner-rule",
    "lumina-column-0501-ikw-03-hyeonsebo-civic-shift",
    "lumina-column-0501-ikw-04-anti-fear-brand-philosophy",
  ],
} as const
const CURATED_HOME_SLUGS = [
  ...CURATED_GROUPS.dawn,
  ...CURATED_GROUPS.morning,
  ...CURATED_GROUPS.field,
  ...CURATED_GROUPS.expansion,
  ...CURATED_GROUPS.philosophy,
  ...CURATED_GROUPS.practical,
  ...CURATED_GROUPS.series,
]
const curatedRankBySlug = new Map<string, number>(CURATED_HOME_SLUGS.map((slug, index) => [slug, index]))

export type BlogFrontmatter = {
  title: string
  excerpt: string
  date: string
  slug: string
  topics: BlogTopicId[]
}

function parseFrontmatter(
  data: Record<string, unknown>,
  fallbackSlug: string,
  topics: BlogTopicId[],
): BlogFrontmatter {
  const title = typeof data.title === "string" ? data.title : "Untitled"
  const excerpt = typeof data.excerpt === "string" ? data.excerpt : ""
  const date = typeof data.date === "string" ? data.date : ""
  const slug = typeof data.slug === "string" ? data.slug : fallbackSlug
  return { title, excerpt, date, slug, topics }
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""))
}

export function getPostBySlug(slug: string): { meta: BlogFrontmatter; content: string } | null {
  const filePath = path.join(POSTS_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(raw)
  const record = data as Record<string, unknown>
  const topics = resolvePostTopics(slug, record)
  const meta = parseFrontmatter(record, slug, topics)
  return { meta, content }
}

export function getAllPostsMeta(): BlogFrontmatter[] {
  const posts = getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => p !== null)
    .map((p) => p.meta)

  return posts.sort((a, b) => {
    const ra = curatedRankBySlug.get(a.slug)
    const rb = curatedRankBySlug.get(b.slug)
    if (ra !== undefined || rb !== undefined) {
      if (ra === undefined) return 1
      if (rb === undefined) return -1
      return ra - rb
    }

    const ta = Date.parse(a.date) || 0
    const tb = Date.parse(b.date) || 0
    if (tb !== ta) return tb - ta
    return a.title.localeCompare(b.title, "ko")
  })
}
