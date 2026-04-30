import Link from "next/link";
import { getAllPostsMeta } from "@/lib/blog";

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
] as const;

const fieldRank = new Map<string, number>(FIELD_SERIES_SLUGS.map((slug, index) => [slug, index]));

export function FieldSeriesPreviewSection() {
  const posts = getAllPostsMeta()
    .filter((post) => fieldRank.has(post.slug))
    .sort((a, b) => (fieldRank.get(a.slug) ?? 99) - (fieldRank.get(b.slug) ?? 99))
    .slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section
      aria-label="0430 실전 연재 미리보기"
      className="mx-auto mt-14 w-full max-w-6xl px-5 sm:px-8 lg:px-10"
    >
      <div className="rounded-2xl border border-[#e0ab69]/35 bg-[linear-gradient(145deg,rgba(224,171,105,0.14),rgba(224,171,105,0.04))] p-5 sm:p-7">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#f1d7b4]/92">0430 Field Series</p>
            <h2 className="mt-2 text-[1.35rem] text-white sm:text-[1.5rem]">실전 연재</h2>
            <p className="mt-2 text-sm text-white/72">현장 시행착오에서 건진 핵심 기록을 묶었습니다.</p>
            <p className="mt-1 text-[12px] text-[#f1d7b4]/78">{`총 ${FIELD_SERIES_SLUGS.length}편 중 ${posts.length}편 미리보기`}</p>
          </div>
          <Link
            href="/blog?spotlight=field"
            className="rounded-full border border-[#e0ab69]/45 bg-[#e0ab69]/14 px-4 py-1.5 text-xs text-[#f4ddc0] transition-colors hover:bg-[#e0ab69]/22 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0ab69]/55"
          >
            실전 칼럼 전체보기
          </Link>
        </div>

        <ul className="mt-5 grid gap-3 sm:grid-cols-3">
          {posts.map((post, index) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}?spotlight=field`}
                className="group block rounded-xl border border-[#e0ab69]/26 bg-[#0e1624]/45 p-4 transition-colors hover:border-[#e0ab69]/42 hover:bg-[#0e1624]/62 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0ab69]/55"
              >
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#eecfa8]/86">{`0430 FIELD · ${(index + 1).toString().padStart(2, "0")}`}</p>
                <h3 className="mt-2 line-clamp-2 text-[1.02rem] leading-snug text-white group-hover:text-[#fff6ea]">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-white/66">{post.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
