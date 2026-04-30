import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { compileMDX } from "next-mdx-remote/rsc"
import { getPostBySlug, getPostSlugs } from "@/lib/blog"
import { BLOG_TOPIC_CHIP_CLASS, BLOG_TOPIC_LABEL_KO } from "@/lib/blog/topics"
import { buildBlogHref, buildPostHref, resolveBlogListContext } from "@/lib/blog/navigation"
import { cn } from "@/lib/utils"

const fontSerif =
  "font-['Nanum_Myeongjo','Noto_Serif_KR',var(--font-serif),Georgia,serif]"
const fontBody = "font-['Pretendard',var(--font-sans),system-ui,sans-serif]"
const DAWN_SERIES_SLUGS = [
  "lumina-column-0428-ikw-01-trust-gap",
  "lumina-column-0428-ikw-02-cleaning-peace",
  "lumina-column-0428-ikw-03-choose-new-bond",
  "lumina-column-0428-ikw-04-parents-sword",
  "lumina-column-0428-ikw-05-bitter-laugh",
] as const
const MORNING_SERIES_SLUGS = [
  "lumina-column-0429-ikw-01-empty-for-fair-value",
  "lumina-column-0429-ikw-02-lesson-beside-merchant",
  "lumina-column-0429-ikw-03-go-small-go-hard-go-self",
  "lumina-column-0429-ikw-04-intangible-is-factory",
] as const
const FIELD_SERIES_SLUGS = [
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
] as const
const EXPANSION_SERIES_SLUGS = [
  "lumina-column-0501-ikw-01-jikji-bonsim-mission",
  "lumina-column-0501-ikw-02-zero-to-one-partner-rule",
  "lumina-column-0501-ikw-03-hyeonsebo-civic-shift",
  "lumina-column-0501-ikw-04-anti-fear-brand-philosophy",
] as const

type Props = { params: { slug: string }; searchParams?: { topic?: string; spotlight?: string } }

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPostBySlug(params.slug)
  if (!post) return { title: "블로그 · LUMINA" }
  return {
    title: `${post.meta.title} · LUMINA`,
    description: post.meta.excerpt,
  }
}

export default async function BlogPostPage({ params, searchParams }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()
  const listContext = resolveBlogListContext(searchParams)
  const dawnIndex = DAWN_SERIES_SLUGS.indexOf(post.meta.slug as (typeof DAWN_SERIES_SLUGS)[number])
  const morningIndex = MORNING_SERIES_SLUGS.indexOf(post.meta.slug as (typeof MORNING_SERIES_SLUGS)[number])
  const fieldIndex = FIELD_SERIES_SLUGS.indexOf(post.meta.slug as (typeof FIELD_SERIES_SLUGS)[number])
  const expansionIndex = EXPANSION_SERIES_SLUGS.indexOf(post.meta.slug as (typeof EXPANSION_SERIES_SLUGS)[number])
  const isDawnPost = dawnIndex !== -1
  const isMorningPost = morningIndex !== -1
  const isFieldPost = fieldIndex !== -1
  const isExpansionPost = expansionIndex !== -1

  const { content } = await compileMDX({
    source: post.content,
    options: {
      parseFrontmatter: false,
    },
  })

  return (
    <article className="mx-auto max-w-3xl px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
      <p className={cn("text-[11px] uppercase tracking-[0.28em] text-[#C0C0C0]/65", fontBody)}>
        <Link href={buildBlogHref(listContext)} className="transition-colors hover:text-white/90">
          Blog
        </Link>
        <span className="mx-2 text-white/25">/</span>
        {post.meta.date}
      </p>
      <h1 className={cn("mt-4 text-[1.85rem] leading-snug text-white sm:text-[2.1rem]", fontSerif)}>
        {post.meta.title}
      </h1>
      <p className={cn("mt-4 text-[15px] leading-relaxed text-white/55", fontBody)}>{post.meta.excerpt}</p>
      <div className={cn("mt-4 flex flex-wrap gap-2", fontBody)}>
        {post.meta.topics.map((tid) => (
          <Link
            key={tid}
            href={buildBlogHref({ topic: tid, spotlight: listContext.spotlight })}
            className={cn(
              "rounded-full border px-2.5 py-0.5 text-[11px] tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0C0C0]/45",
              BLOG_TOPIC_CHIP_CLASS[tid],
            )}
          >
            {BLOG_TOPIC_LABEL_KO[tid]}
          </Link>
        ))}
      </div>

      <div
        className={cn(
          "prose prose-invert mt-12 max-w-none prose-headings:font-serif prose-headings:text-[#f0f4fa]",
          "prose-p:text-white/78 prose-li:text-white/78 prose-strong:text-[#f0f4fa]",
          "prose-a:text-[#C0C0C0] prose-hr:border-white/15",
        )}
      >
        {content}
      </div>

      {isDawnPost ? (
        <section className="mt-14 rounded-xl border border-[#b58ec6]/30 bg-[#b58ec6]/[0.05] p-5 sm:p-6">
          <p className={cn("text-[11px] uppercase tracking-[0.2em] text-[#d7c2e3]/90", fontBody)}>
            0428 Dawn Series
          </p>
          <p className={cn("mt-2 text-[14px] text-white/70", fontBody)}>새벽 칼럼 이어보기</p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {DAWN_SERIES_SLUGS.map((slug, index) => (
              <Link
                key={slug}
                href={buildPostHref(slug, listContext)}
                className={cn(
                  "rounded-full border px-3 py-1 text-[12px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b58ec6]/45",
                  slug === post.meta.slug
                    ? "border-[#d8c0e6]/65 bg-[#b58ec6]/25 text-white"
                    : "border-[#b58ec6]/35 text-[#d8c7e2]/88 hover:bg-[#b58ec6]/15",
                )}
              >
                {(index + 1).toString().padStart(2, "0")}
              </Link>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {dawnIndex > 0 ? (
              <Link
                href={buildPostHref(DAWN_SERIES_SLUGS[dawnIndex - 1], listContext)}
                className={cn(
                  "inline-flex items-center rounded-full border px-3 py-1 text-[12px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b58ec6]/45",
                  "border-[#b58ec6]/35 text-[#d8c7e2]/88 hover:bg-[#b58ec6]/15",
                )}
              >
                ← 이전
              </Link>
            ) : null}
            {dawnIndex < DAWN_SERIES_SLUGS.length - 1 ? (
              <Link
                href={buildPostHref(DAWN_SERIES_SLUGS[dawnIndex + 1], listContext)}
                className={cn(
                  "inline-flex items-center rounded-full border px-3 py-1 text-[12px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b58ec6]/45",
                  "border-[#b58ec6]/35 text-[#d8c7e2]/88 hover:bg-[#b58ec6]/15",
                )}
              >
                다음 →
              </Link>
            ) : null}
          </div>
        </section>
      ) : null}
      {isMorningPost ? (
        <section className="mt-14 rounded-xl border border-[#8fb5cf]/30 bg-[#8fb5cf]/[0.05] p-5 sm:p-6">
          <p className={cn("text-[11px] uppercase tracking-[0.2em] text-[#c1d8e8]/90", fontBody)}>
            0429 Morning Series
          </p>
          <p className={cn("mt-2 text-[14px] text-white/70", fontBody)}>아침 칼럼 이어보기</p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {MORNING_SERIES_SLUGS.map((slug, index) => (
              <Link
                key={slug}
                href={buildPostHref(slug, listContext)}
                className={cn(
                  "rounded-full border px-3 py-1 text-[12px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8fb5cf]/45",
                  slug === post.meta.slug
                    ? "border-[#bdd7e8]/65 bg-[#8fb5cf]/25 text-white"
                    : "border-[#8fb5cf]/35 text-[#c7dce9]/88 hover:bg-[#8fb5cf]/15",
                )}
              >
                {(index + 1).toString().padStart(2, "0")}
              </Link>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {morningIndex > 0 ? (
              <Link
                href={buildPostHref(MORNING_SERIES_SLUGS[morningIndex - 1], listContext)}
                className={cn(
                  "inline-flex items-center rounded-full border px-3 py-1 text-[12px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8fb5cf]/45",
                  "border-[#8fb5cf]/35 text-[#c7dce9]/88 hover:bg-[#8fb5cf]/15",
                )}
              >
                ← 이전
              </Link>
            ) : null}
            {morningIndex < MORNING_SERIES_SLUGS.length - 1 ? (
              <Link
                href={buildPostHref(MORNING_SERIES_SLUGS[morningIndex + 1], listContext)}
                className={cn(
                  "inline-flex items-center rounded-full border px-3 py-1 text-[12px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8fb5cf]/45",
                  "border-[#8fb5cf]/35 text-[#c7dce9]/88 hover:bg-[#8fb5cf]/15",
                )}
              >
                다음 →
              </Link>
            ) : null}
          </div>
        </section>
      ) : null}
      {isFieldPost ? (
        <section className="mt-14 rounded-xl border border-[#e0ab69]/45 bg-[linear-gradient(145deg,rgba(224,171,105,0.16),rgba(224,171,105,0.06))] p-5 shadow-[0_10px_30px_rgba(12,16,28,0.22)] sm:p-6">
          <p className={cn("text-[11px] uppercase tracking-[0.22em] text-[#f3dcbc]/95", fontBody)}>
            0430 Field Series
          </p>
          <p className={cn("mt-2 text-[14px] text-white/78", fontBody)}>실전 칼럼 이어보기</p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {FIELD_SERIES_SLUGS.map((slug, index) => (
              <Link
                key={slug}
                href={buildPostHref(slug, listContext)}
                className={cn(
                  "rounded-full border px-3 py-1 text-[12px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0ab69]/55",
                  slug === post.meta.slug
                    ? "border-[#f3d6ae]/80 bg-[#e0ab69]/30 text-white shadow-[0_0_0_1px_rgba(224,171,105,0.28)]"
                    : "border-[#e0ab69]/42 text-[#f0d7b8]/92 hover:bg-[#e0ab69]/18",
                )}
              >
                {(index + 1).toString().padStart(2, "0")}
              </Link>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {fieldIndex > 0 ? (
              <Link
                href={buildPostHref(FIELD_SERIES_SLUGS[fieldIndex - 1], listContext)}
                className={cn(
                  "inline-flex items-center rounded-full border px-3 py-1 text-[12px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0ab69]/55",
                  "border-[#e0ab69]/42 text-[#f0d7b8]/92 hover:bg-[#e0ab69]/18",
                )}
              >
                ← 이전
              </Link>
            ) : null}
            {fieldIndex < FIELD_SERIES_SLUGS.length - 1 ? (
              <Link
                href={buildPostHref(FIELD_SERIES_SLUGS[fieldIndex + 1], listContext)}
                className={cn(
                  "inline-flex items-center rounded-full border px-3 py-1 text-[12px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0ab69]/55",
                  "border-[#e0ab69]/42 text-[#f0d7b8]/92 hover:bg-[#e0ab69]/18",
                )}
              >
                다음 →
              </Link>
            ) : null}
          </div>
        </section>
      ) : null}
      {isExpansionPost ? (
        <section className="mt-14 rounded-xl border border-[#9e9be8]/45 bg-[linear-gradient(145deg,rgba(158,155,232,0.16),rgba(158,155,232,0.06))] p-5 shadow-[0_10px_30px_rgba(12,16,28,0.22)] sm:p-6">
          <p className={cn("text-[11px] uppercase tracking-[0.22em] text-[#d9d8fb]/95", fontBody)}>
            0501 Expansion Series
          </p>
          <p className={cn("mt-2 text-[14px] text-white/78", fontBody)}>철학 확장 칼럼 이어보기</p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {EXPANSION_SERIES_SLUGS.map((slug, index) => (
              <Link
                key={slug}
                href={buildPostHref(slug, listContext)}
                className={cn(
                  "rounded-full border px-3 py-1 text-[12px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9e9be8]/55",
                  slug === post.meta.slug
                    ? "border-[#d7d6fa]/80 bg-[#9e9be8]/30 text-white shadow-[0_0_0_1px_rgba(158,155,232,0.28)]"
                    : "border-[#9e9be8]/42 text-[#e0def9]/92 hover:bg-[#9e9be8]/18",
                )}
              >
                {(index + 1).toString().padStart(2, "0")}
              </Link>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {expansionIndex > 0 ? (
              <Link
                href={buildPostHref(EXPANSION_SERIES_SLUGS[expansionIndex - 1], listContext)}
                className={cn(
                  "inline-flex items-center rounded-full border px-3 py-1 text-[12px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9e9be8]/55",
                  "border-[#9e9be8]/42 text-[#e0def9]/92 hover:bg-[#9e9be8]/18",
                )}
              >
                ← 이전
              </Link>
            ) : null}
            {expansionIndex < EXPANSION_SERIES_SLUGS.length - 1 ? (
              <Link
                href={buildPostHref(EXPANSION_SERIES_SLUGS[expansionIndex + 1], listContext)}
                className={cn(
                  "inline-flex items-center rounded-full border px-3 py-1 text-[12px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9e9be8]/55",
                  "border-[#9e9be8]/42 text-[#e0def9]/92 hover:bg-[#9e9be8]/18",
                )}
              >
                다음 →
              </Link>
            ) : null}
          </div>
        </section>
      ) : null}

      <p className={cn("mt-16 text-[13px] text-white/38", fontBody)}>
        <Link
          href={buildBlogHref(listContext)}
          className="text-[#C0C0C0]/80 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0C0C0]/45"
        >
          ← 목록으로
        </Link>
      </p>
    </article>
  )
}
