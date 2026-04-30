import Link from "next/link"
import type { Metadata } from "next"
import { getAllPostsMeta } from "@/lib/blog"
import {
  BLOG_TOPIC_CHIP_CLASS,
  BLOG_TOPIC_IDS,
  BLOG_TOPIC_LABEL_KO,
  isBlogTopicId,
  type BlogTopicId,
} from "@/lib/blog/topics"
import { buildBlogHref, buildPostHref, resolveSpotlightFilter } from "@/lib/blog/navigation"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "블로그 · LUMINA",
  description: "루미나의 철학, 제품, 파트너 상생에 관한 짧은 기록입니다.",
}

const fontSerif =
  "font-['Nanum_Myeongjo','Noto_Serif_KR',var(--font-serif),Georgia,serif]"
const fontBody = "font-['Pretendard',var(--font-sans),system-ui,sans-serif]"
const curatedGroupLabelBySlug: Record<
  string,
  "Philosophy" | "Practical" | "Series" | "Dawn" | "Morning" | "Field" | "Expansion"
> = {
  "lumina-column-111": "Philosophy",
  "lumina-column-sawitest1-bow-joongang": "Philosophy",
  "lumina-column-sawitest2-3steps-joongang": "Philosophy",
  "lumina-column-seven-notes-2026-04-26": "Philosophy",
  "lumina-column-805-story-eight-records-2026-04-26": "Practical",
  "lumina-column-lumina-kimhaesung-b": "Practical",
  "lumina-column-luminabiz-c01": "Practical",
  "lumina-column-luminabiz-c02": "Practical",
  "lumina-column-0423-c01-c09": "Series",
  "lumina-column-0424-c10-c13": "Series",
  "lumina-column-0425-c14-c16": "Series",
  "lumina-column-0426-c17-c24": "Series",
  "lumina-column-0428-ikw-01-trust-gap": "Dawn",
  "lumina-column-0428-ikw-02-cleaning-peace": "Dawn",
  "lumina-column-0428-ikw-03-choose-new-bond": "Dawn",
  "lumina-column-0428-ikw-04-parents-sword": "Dawn",
  "lumina-column-0428-ikw-05-bitter-laugh": "Dawn",
  "lumina-column-0429-ikw-01-empty-for-fair-value": "Morning",
  "lumina-column-0429-ikw-02-lesson-beside-merchant": "Morning",
  "lumina-column-0429-ikw-03-go-small-go-hard-go-self": "Morning",
  "lumina-column-0429-ikw-04-intangible-is-factory": "Morning",
  "lumina-column-0430-ikw-01-jinho-mail-open": "Field",
  "lumina-column-0430-ikw-02-jeonse-livingroom-warehouse": "Field",
  "lumina-column-0430-ikw-03-two-percent-twenty": "Field",
  "lumina-column-0430-ikw-04-not-me-lost-10b": "Field",
  "lumina-column-0430-ikw-05-man-cosmetics-path": "Field",
  "lumina-column-0430-ikw-06-religion-unity": "Field",
  "lumina-column-0430-ikw-07-crossed-religion-boundary": "Field",
  "lumina-column-0430-ikw-08-makmaekso-philosophy": "Field",
  "lumina-column-0430-ikw-09-new-drinking-culture": "Field",
  "lumina-column-0430-ikw-10-fathers-hurhur": "Field",
  "lumina-column-0430-ikw-11-farted-and-ran": "Field",
  "lumina-column-0430-ikw-12-self-lamp-declaration": "Field",
  "lumina-column-0430-ikw-13-eat-with-my-own-money": "Field",
  "lumina-column-0430-ikw-14-truth-is-practice": "Field",
  "lumina-column-0430-ikw-15-met-buddha-after-breaking-rules": "Field",
  "lumina-column-0430-ikw-16-why-no-alcohol-meat-fight": "Field",
  "lumina-column-0430-ikw-17-buddha-was-not-against-drink": "Field",
  "lumina-column-0501-ikw-01-jikji-bonsim-mission": "Expansion",
  "lumina-column-0501-ikw-02-zero-to-one-partner-rule": "Expansion",
  "lumina-column-0501-ikw-03-hyeonsebo-civic-shift": "Expansion",
  "lumina-column-0501-ikw-04-anti-fear-brand-philosophy": "Expansion",
}
const curatedGroupBadgeClass: Record<
  "Philosophy" | "Practical" | "Series" | "Dawn" | "Morning" | "Field" | "Expansion",
  string
> = {
  Philosophy: "border-[#C0C0C0]/40 bg-[#C0C0C0]/10 text-[#E3E7ED]/90 group-hover:bg-[#C0C0C0]/14",
  Practical: "border-[#9eb0c4]/40 bg-[#9eb0c4]/10 text-[#c6d5e5]/90 group-hover:bg-[#9eb0c4]/14",
  Series: "border-[#D4AF37]/40 bg-[#D4AF37]/12 text-[#e9d28a]/95 group-hover:bg-[#D4AF37]/16",
  Dawn: "border-[#b58ec6]/40 bg-[#b58ec6]/12 text-[#e3d2eb]/95 group-hover:bg-[#b58ec6]/16",
  Morning: "border-[#8fb5cf]/40 bg-[#8fb5cf]/12 text-[#d4e5f1]/95 group-hover:bg-[#8fb5cf]/16",
  Field: "border-[#e0ab69]/50 bg-[#e0ab69]/16 text-[#f8e6cf] group-hover:bg-[#e0ab69]/22",
  Expansion: "border-[#9e9be8]/45 bg-[#9e9be8]/16 text-[#e2e1fb]/95 group-hover:bg-[#9e9be8]/22",
}
const curatedGroupBadgeText: Record<
  "Philosophy" | "Practical" | "Series" | "Dawn" | "Morning" | "Field" | "Expansion",
  string
> = {
  Philosophy: "철학",
  Practical: "실천",
  Series: "시리즈",
  Dawn: "새벽 칼럼",
  Morning: "아침 칼럼",
  Field: "실전 칼럼",
  Expansion: "철학 확장",
}
const dawnPrefixBySlug: Record<string, string> = {
  "lumina-column-0428-ikw-01-trust-gap": "0428 DAWN · 01",
  "lumina-column-0428-ikw-02-cleaning-peace": "0428 DAWN · 02",
  "lumina-column-0428-ikw-03-choose-new-bond": "0428 DAWN · 03",
  "lumina-column-0428-ikw-04-parents-sword": "0428 DAWN · 04",
  "lumina-column-0428-ikw-05-bitter-laugh": "0428 DAWN · 05",
}
const morningPrefixBySlug: Record<string, string> = {
  "lumina-column-0429-ikw-01-empty-for-fair-value": "0429 MORNING · 01",
  "lumina-column-0429-ikw-02-lesson-beside-merchant": "0429 MORNING · 02",
  "lumina-column-0429-ikw-03-go-small-go-hard-go-self": "0429 MORNING · 03",
  "lumina-column-0429-ikw-04-intangible-is-factory": "0429 MORNING · 04",
}
const fieldPrefixBySlug: Record<string, string> = {
  "lumina-column-0430-ikw-01-jinho-mail-open": "0430 FIELD · 01",
  "lumina-column-0430-ikw-02-jeonse-livingroom-warehouse": "0430 FIELD · 02",
  "lumina-column-0430-ikw-03-two-percent-twenty": "0430 FIELD · 03",
  "lumina-column-0430-ikw-04-not-me-lost-10b": "0430 FIELD · 04",
  "lumina-column-0430-ikw-05-man-cosmetics-path": "0430 FIELD · 05",
  "lumina-column-0430-ikw-06-religion-unity": "0430 FIELD · 06",
  "lumina-column-0430-ikw-07-crossed-religion-boundary": "0430 FIELD · 07",
  "lumina-column-0430-ikw-08-makmaekso-philosophy": "0430 FIELD · 08",
  "lumina-column-0430-ikw-09-new-drinking-culture": "0430 FIELD · 09",
  "lumina-column-0430-ikw-10-fathers-hurhur": "0430 FIELD · 10",
  "lumina-column-0430-ikw-11-farted-and-ran": "0430 FIELD · 11",
  "lumina-column-0430-ikw-12-self-lamp-declaration": "0430 FIELD · 12",
  "lumina-column-0430-ikw-13-eat-with-my-own-money": "0430 FIELD · 13",
  "lumina-column-0430-ikw-14-truth-is-practice": "0430 FIELD · 14",
  "lumina-column-0430-ikw-15-met-buddha-after-breaking-rules": "0430 FIELD · 15",
  "lumina-column-0430-ikw-16-why-no-alcohol-meat-fight": "0430 FIELD · 16",
  "lumina-column-0430-ikw-17-buddha-was-not-against-drink": "0430 FIELD · 17",
}
const expansionPrefixBySlug: Record<string, string> = {
  "lumina-column-0501-ikw-01-jikji-bonsim-mission": "0501 EXPANSION · 01",
  "lumina-column-0501-ikw-02-zero-to-one-partner-rule": "0501 EXPANSION · 02",
  "lumina-column-0501-ikw-03-hyeonsebo-civic-shift": "0501 EXPANSION · 03",
  "lumina-column-0501-ikw-04-anti-fear-brand-philosophy": "0501 EXPANSION · 04",
}

type BlogIndexProps = { searchParams?: { topic?: string; spotlight?: string } }

export default function BlogIndexPage({ searchParams }: BlogIndexProps) {
  const allPosts = getAllPostsMeta()
  const spotlightFilter = resolveSpotlightFilter(searchParams?.spotlight)
  const spotlightLabel =
    spotlightFilter === "dawn"
      ? "새벽 칼럼"
      : spotlightFilter === "morning"
        ? "아침 칼럼"
        : spotlightFilter === "field"
          ? "실전 칼럼"
          : spotlightFilter === "expansion"
            ? "철학 확장"
          : "전체"
  const topicFilter: BlogTopicId | null =
    typeof searchParams?.topic === "string" && isBlogTopicId(searchParams.topic) ? searchParams.topic : null
  const posts = allPosts.filter((p) => {
    if (topicFilter && !p.topics.includes(topicFilter)) return false
    const group = curatedGroupLabelBySlug[p.slug]
    if (spotlightFilter === "dawn") return group === "Dawn"
    if (spotlightFilter === "morning") return group === "Morning"
    if (spotlightFilter === "field") return group === "Field"
    if (spotlightFilter === "expansion") return group === "Expansion"
    return true
  })

  return (
    <main className="mx-auto max-w-3xl px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
      <p className={cn("text-[11px] uppercase tracking-[0.28em] text-[#C0C0C0]/65", fontBody)}>
        LUMINA · Journal
      </p>
      <h1 className={cn("mt-3 text-[1.75rem] text-white sm:text-[2rem]", fontSerif)}>블로그</h1>
      <p className={cn("mt-4 max-w-xl text-[15px] leading-relaxed text-white/58", fontBody)}>
        본질과 실천, 파트너 상생·정산 투명성에 관한 메모입니다. 과장된 수치나 효능 표시는 싣지 않습니다.
      </p>

      <section className="mt-10 border-t border-white/[0.08] pt-7">
      <nav
        className={cn("flex flex-wrap items-center gap-1.5", fontBody)}
        aria-label="주제 필터"
      >
        <span className="mr-1 text-[10px] uppercase tracking-[0.14em] text-white/38">주제</span>
        <Link
          href={buildBlogHref({ spotlight: spotlightFilter })}
          aria-current={!topicFilter ? "page" : undefined}
          className={cn(
            "rounded-full border px-2.5 py-[3px] text-[11px] tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0C0C0]/45",
            !topicFilter
              ? "border-white/25 bg-white/[0.08] text-white/90"
              : "border-white/12 bg-transparent text-white/50 hover:border-white/20 hover:text-white/75",
          )}
        >
          전체
        </Link>
        {BLOG_TOPIC_IDS.map((id) => (
          <Link
            key={id}
            href={buildBlogHref({ topic: id, spotlight: spotlightFilter })}
            aria-current={topicFilter === id ? "page" : undefined}
            className={cn(
              "rounded-full border px-2.5 py-[3px] text-[11px] tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0C0C0]/45",
              BLOG_TOPIC_CHIP_CLASS[id],
              topicFilter === id && "ring-1 ring-white/15",
            )}
          >
            {BLOG_TOPIC_LABEL_KO[id]}
          </Link>
        ))}
      </nav>
      {topicFilter ? (
        <p className={cn("mt-2 text-[12px] text-white/45", fontBody)}>
          「{BLOG_TOPIC_LABEL_KO[topicFilter]}」만 표시 중 ·{" "}
          <Link
            href={buildBlogHref({ spotlight: spotlightFilter })}
            className="text-[#C0C0C0]/85 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0C0C0]/45"
          >
            전체 보기
          </Link>
        </p>
      ) : null}
      <div className="my-2 border-b border-white/[0.06]" />
      <nav className={cn("mt-2 flex flex-wrap items-center gap-1.5", fontBody)} aria-label="타임 필터">
        <span className="mr-1 text-[10px] uppercase tracking-[0.14em] text-white/35">타임</span>
        <Link
          href={buildBlogHref({ topic: topicFilter, spotlight: "all" })}
          aria-current={spotlightFilter === "all" ? "page" : undefined}
          className={cn(
            "rounded-full border px-2.5 py-[3px] text-[11px] tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0C0C0]/45",
            spotlightFilter === "all"
              ? "border-white/25 bg-white/[0.08] text-white/90"
              : "border-white/12 text-white/55 hover:border-white/20 hover:text-white/75",
          )}
        >
          전체
        </Link>
        <Link
          href={buildBlogHref({ topic: topicFilter, spotlight: "dawn" })}
          aria-current={spotlightFilter === "dawn" ? "page" : undefined}
          className={cn(
            "rounded-full border px-2.5 py-[3px] text-[11px] tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b58ec6]/45",
            spotlightFilter === "dawn"
              ? "border-[#b58ec6]/45 bg-[#b58ec6]/15 text-[#eadcf0]"
              : "border-[#b58ec6]/25 text-[#cfb8db]/75 hover:bg-[#b58ec6]/12",
          )}
        >
          새벽 칼럼
        </Link>
        <Link
          href={buildBlogHref({ topic: topicFilter, spotlight: "field" })}
          aria-current={spotlightFilter === "field" ? "page" : undefined}
          className={cn(
            "rounded-full border px-2.5 py-[3px] text-[11px] tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9a15d]/45",
            spotlightFilter === "field"
              ? "border-[#d9a15d]/45 bg-[#d9a15d]/15 text-[#f3ddc4]"
              : "border-[#d9a15d]/25 text-[#e8c59a]/75 hover:bg-[#d9a15d]/12",
          )}
        >
          실전 칼럼
        </Link>
        <Link
          href={buildBlogHref({ topic: topicFilter, spotlight: "expansion" })}
          aria-current={spotlightFilter === "expansion" ? "page" : undefined}
          className={cn(
            "rounded-full border px-2.5 py-[3px] text-[11px] tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9e9be8]/45",
            spotlightFilter === "expansion"
              ? "border-[#9e9be8]/45 bg-[#9e9be8]/15 text-[#e8e7fb]"
              : "border-[#9e9be8]/25 text-[#d1d0f5]/78 hover:bg-[#9e9be8]/12",
          )}
        >
          철학 확장
        </Link>
        <Link
          href={buildBlogHref({ topic: topicFilter, spotlight: "morning" })}
          aria-current={spotlightFilter === "morning" ? "page" : undefined}
          className={cn(
            "rounded-full border px-2.5 py-[3px] text-[11px] tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8fb5cf]/45",
            spotlightFilter === "morning"
              ? "border-[#8fb5cf]/45 bg-[#8fb5cf]/15 text-[#dfecf5]"
              : "border-[#8fb5cf]/25 text-[#c7ddec]/75 hover:bg-[#8fb5cf]/12",
          )}
        >
          아침 칼럼
        </Link>
      </nav>
      {(topicFilter || spotlightFilter !== "all") && (
        <div className={cn("mt-2 flex flex-wrap items-center gap-1.5 text-[11px] text-white/42", fontBody)}>
          <span>필터:</span>
          {spotlightFilter !== "all" ? (
            <Link
              href={buildBlogHref({ topic: topicFilter, spotlight: "all" })}
              className="rounded-full border border-white/15 bg-white/[0.05] px-2 py-[2px] text-white/80 transition-colors hover:border-white/25 hover:bg-white/[0.08]"
            >
              {spotlightLabel} ×
            </Link>
          ) : null}
          {topicFilter ? (
            <Link
              href={buildBlogHref({ spotlight: spotlightFilter })}
              className="rounded-full border border-white/15 bg-white/[0.05] px-2 py-[2px] text-white/80 transition-colors hover:border-white/25 hover:bg-white/[0.08]"
            >
              {BLOG_TOPIC_LABEL_KO[topicFilter]} ×
            </Link>
          ) : null}
          <span className="text-white/58">{`${posts.length}건`}</span>
          <span className="text-white/25">·</span>
          <Link
            href={buildBlogHref({})}
            className="text-[#C0C0C0]/80 underline-offset-4 transition-colors hover:text-[#C0C0C0]/95 hover:underline"
          >
            전체 초기화
          </Link>
        </div>
      )}
      {!topicFilter && spotlightFilter === "all" && (
        <p className={cn("mt-2 text-[11px] text-white/36", fontBody)}>{`전체 ${posts.length}건`}</p>
      )}
      </section>

      <ul className="mt-14 space-y-0 divide-y divide-white/[0.08] border-t border-white/[0.1]">
        {posts.map((post) => {
          const isDawn = curatedGroupLabelBySlug[post.slug] === "Dawn"
          const isMorning = curatedGroupLabelBySlug[post.slug] === "Morning"
          const isField = curatedGroupLabelBySlug[post.slug] === "Field"
          const isExpansion = curatedGroupLabelBySlug[post.slug] === "Expansion"
          const isSpotlight = isDawn || isMorning || isField || isExpansion
          return (
          <li key={post.slug}>
            <div
              className={cn(
                "group py-8 transition-colors hover:bg-white/[0.03]",
                isDawn && "rounded-lg border-l border-[#b58ec6]/35 bg-[#b58ec6]/[0.04] px-4 sm:px-5",
                isMorning && "rounded-lg border-l border-[#8fb5cf]/35 bg-[#8fb5cf]/[0.04] px-4 sm:px-5",
                isField && "rounded-lg border-l border-[#e0ab69]/50 bg-[#e0ab69]/[0.09] px-4 sm:px-5",
                isExpansion && "rounded-lg border-l border-[#9e9be8]/50 bg-[#9e9be8]/[0.09] px-4 sm:px-5",
                fontBody,
              )}
            >
              <div className="flex flex-wrap items-center gap-2">
                <time
                  dateTime={post.date}
                  className={cn(
                    "text-[12px] tracking-[0.12em] text-[#9eb0c4]/85",
                    isDawn && "text-[#c4b2d0]",
                    isMorning && "text-[#b8d2e3]",
                    isField && "text-[#efcfaa]",
                    isExpansion && "text-[#cecdf7]",
                  )}
                >
                  {post.date}
                </time>
                {curatedGroupLabelBySlug[post.slug] ? (
                  <span
                    className={cn(
                      "rounded-full border px-2.5 py-0.5 text-[11px] uppercase tracking-[0.1em]",
                      isSpotlight && "px-3 py-1 text-[11.5px] font-medium tracking-[0.12em]",
                      isDawn && "shadow-[0_0_0_1px_rgba(181,142,198,0.18)]",
                      isMorning && "shadow-[0_0_0_1px_rgba(143,181,207,0.18)]",
                      isField && "shadow-[0_0_0_1px_rgba(224,171,105,0.28)]",
                      isExpansion && "shadow-[0_0_0_1px_rgba(158,155,232,0.26)]",
                      curatedGroupBadgeClass[curatedGroupLabelBySlug[post.slug]],
                    )}
                  >
                    {curatedGroupBadgeText[curatedGroupLabelBySlug[post.slug]]}
                  </span>
                ) : null}
                {post.topics.map((tid) => (
                  <Link
                    key={tid}
                    href={buildBlogHref({ topic: tid, spotlight: spotlightFilter })}
                    className={cn(
                      "rounded-full border px-2 py-0.5 text-[11px] tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0C0C0]/45",
                      BLOG_TOPIC_CHIP_CLASS[tid],
                    )}
                  >
                    {BLOG_TOPIC_LABEL_KO[tid]}
                  </Link>
                ))}
              </div>
              <Link href={buildPostHref(post.slug, { topic: topicFilter, spotlight: spotlightFilter })} className="block">
                {isDawn && dawnPrefixBySlug[post.slug] ? (
                  <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-[#bfa5cd]/80">
                    {dawnPrefixBySlug[post.slug]}
                  </p>
                ) : null}
                {isMorning && morningPrefixBySlug[post.slug] ? (
                  <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-[#aac9dc]/80">
                    {morningPrefixBySlug[post.slug]}
                  </p>
                ) : null}
                {isField && fieldPrefixBySlug[post.slug] ? (
                  <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-[#f2d7b7]/95">
                    {fieldPrefixBySlug[post.slug]}
                  </p>
                ) : null}
                {isExpansion && expansionPrefixBySlug[post.slug] ? (
                  <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-[#d8d6fa]/95">
                    {expansionPrefixBySlug[post.slug]}
                  </p>
                ) : null}
                <h2
                  className={cn(
                    "mt-2 text-[1.15rem] font-medium text-white group-hover:text-[#f0f4fa]",
                    isSpotlight && "mt-3 text-[1.22rem] leading-snug",
                    fontSerif,
                  )}
                >
                  {post.title}
                </h2>
                <p
                  className={cn(
                    "mt-2 text-[14px] leading-relaxed text-white/55",
                    isSpotlight && "mt-2.5",
                    isDawn && "text-white/64",
                    isMorning && "text-[#d8e4ec]/72",
                    isField && "text-[#f6e6d2]/82",
                    isExpansion && "text-[#e3e2fa]/80",
                  )}
                >
                  {post.excerpt}
                </p>
                <span
                  className={cn(
                    "mt-3 inline-block text-[12px] text-[#C0C0C0]/75 underline-offset-4 group-hover:underline",
                    isDawn && "mt-3.5 text-[#d4bfe0]/85",
                    isMorning && "mt-3.5 text-[#bed7e8]/85",
                    isField && "mt-3.5 text-[#f3dbbe]/92",
                    isExpansion && "mt-3.5 text-[#dcdafa]/92",
                  )}
                >
                  읽기 →
                </span>
              </Link>
            </div>
          </li>
          )
        })}
      </ul>

      {posts.length === 0 ? (
        <p className={cn("mt-12 text-[14px] text-white/45", fontBody)}>
          {topicFilter || spotlightFilter !== "all" ? (
            <>
              현재 조건에 맞는 글이 없습니다.{" "}
              {topicFilter ? (
                <Link
                  href={buildBlogHref({ spotlight: spotlightFilter })}
                  className="text-[#C0C0C0]/85 underline-offset-4 hover:underline"
                >
                  주제 해제
                </Link>
              ) : null}
              {topicFilter && spotlightFilter !== "all" ? <span className="text-white/28"> · </span> : null}
              {spotlightFilter !== "all" ? (
                <Link
                  href={buildBlogHref({ topic: topicFilter, spotlight: "all" })}
                  className="text-[#C0C0C0]/85 underline-offset-4 hover:underline"
                >
                  타임 해제
                </Link>
              ) : null}
              {(topicFilter || spotlightFilter !== "all") ? <span className="text-white/28"> · </span> : null}
              <Link href={buildBlogHref({})} className="text-[#C0C0C0]/90 underline-offset-4 hover:underline">
                전체 보기
              </Link>
            </>
          ) : (
            "아직 게시물이 없습니다."
          )}
        </p>
      ) : null}

      <p className={cn("mt-16 text-[13px] text-white/38", fontBody)}>
        <Link href="/" className="text-[#C0C0C0]/80 underline-offset-4 hover:underline">
          ← 홈으로
        </Link>
      </p>
    </main>
  )
}
