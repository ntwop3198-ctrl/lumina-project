import { isBlogTopicId, type BlogTopicId } from "@/lib/blog/topics"

export type SpotlightFilter = "all" | "dawn" | "morning" | "field" | "expansion"

export type BlogListContext = {
  topic: BlogTopicId | null
  spotlight: SpotlightFilter
}

export function resolveSpotlightFilter(raw: string | undefined): SpotlightFilter {
  if (raw === "dawn" || raw === "morning" || raw === "field" || raw === "expansion") return raw
  return "all"
}

export function resolveBlogListContext(searchParams: { topic?: string; spotlight?: string } | undefined): BlogListContext {
  const topic = typeof searchParams?.topic === "string" && isBlogTopicId(searchParams.topic) ? searchParams.topic : null
  const spotlight = resolveSpotlightFilter(searchParams?.spotlight)
  return { topic, spotlight }
}

export function buildBlogHref({ topic, spotlight }: { topic?: BlogTopicId | null; spotlight?: SpotlightFilter }): string {
  const query = new URLSearchParams()
  if (topic) query.set("topic", topic)
  if (spotlight && spotlight !== "all") query.set("spotlight", spotlight)
  const qs = query.toString()
  return qs ? `/blog?${qs}` : "/blog"
}

export function buildPostHref(
  slug: string,
  { topic, spotlight }: { topic?: BlogTopicId | null; spotlight?: SpotlightFilter },
): string {
  const query = new URLSearchParams()
  if (topic) query.set("topic", topic)
  if (spotlight && spotlight !== "all") query.set("spotlight", spotlight)
  const qs = query.toString()
  return qs ? `/blog/${slug}?${qs}` : `/blog/${slug}`
}
