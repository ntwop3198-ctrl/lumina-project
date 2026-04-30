import { BrandGenesisAtmosphere } from "@/components/landing/brand-genesis-atmosphere"
import { BrandGenesisClinicalProof } from "@/components/landing/brand-genesis-clinical-proof"
import { BrandGenesisNarrative } from "@/components/landing/brand-genesis-narrative"
import { LUMINA_PLAN_STEP_NAV } from "@/lib/lumina/knowledge-engine-plan"
import { cn } from "@/lib/utils"
import Link from "next/link"

const fontSerif =
  "font-['Nanum_Myeongjo','Noto_Serif_KR',var(--font-serif),Georgia,serif]"
const fontSans = "font-['Pretendard',var(--font-sans),system-ui,sans-serif]"

/**
 * 브랜드 제네시스 — 0 to 1 브랜드 설계 (미드나잇 블루 · 리퀴드 실버)
 */
export function BrandGenesisPage() {
  return (
    <div className="relative pt-32 pb-20 md:pt-40 md:pb-28">
      <BrandGenesisAtmosphere />
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 md:px-12 lg:px-16 xl:px-20">
        <div className="max-w-[min(42rem,70vw)] text-left">
          <p
            className={cn(
              "mb-6 text-[10px] uppercase tracking-[0.3em] text-[#C0C0C0]/65 sm:text-[11px]",
              fontSans,
            )}
          >
            Brand Genesis
          </p>
          <h1
            className={cn(
              fontSerif,
              "mb-8 flex flex-col gap-3 text-3xl font-extrabold tracking-[0.06em] text-white sm:gap-3.5 sm:text-4xl md:gap-4 md:text-5xl",
            )}
          >
            <span className="block leading-[1.38] sm:leading-[1.4]">아이디어를 브랜드로</span>
            <span className="block leading-[1.38] sm:leading-[1.4]">0 to 1 설계</span>
          </h1>
          <p
            className={cn(
              "mb-14 max-w-xl text-[15px] leading-[1.9] text-white/65 sm:text-base",
              fontSans,
            )}
          >
            신규 창업은 0 to 1 설계로, 기존 브랜드는{" "}
            <span className="text-white/80">브랜드 진단</span>과{" "}
            <span className="text-white/80">가치 재창조</span>로 고도화합니다. 이름·포지셔닝·톤까지
            AI와 뼈대를 세우고, 분석·제작·마케팅으로 이어집니다.
          </p>

          <div className="grid max-w-2xl gap-8 sm:gap-10">
            {[
              {
                t: "포지션",
                d: "카테고리·타깃·차별점을 한 문장으로 압축해 브랜드 축을 잡습니다.",
              },
              {
                t: "네이밍 & 톤",
                d: "후보 네이밍과 보이스 가이드를 초안으로 정리합니다.",
              },
              {
                t: "런칭 시그널",
                d: "첫 터치포인트에 쓸 카피·슬로건 방향을 제안합니다.",
              },
            ].map((item) => (
              <div
                key={item.t}
                className="border-b border-white/[0.08] pb-8 sm:border sm:border-white/10 sm:bg-white/[0.02] sm:px-6 sm:py-6 sm:backdrop-blur-md sm:pb-6"
              >
                <p
                  className={cn(
                    "mb-2 text-[11px] uppercase tracking-[0.22em] text-[#C0C0C0]/80",
                    fontSans,
                  )}
                >
                  {item.t}
                </p>
                <p className={cn("text-sm leading-relaxed text-white/55 sm:text-[15px]", fontSans)}>
                  {item.d}
                </p>
              </div>
            ))}
          </div>

          <div
            className={cn(
              "relative z-20 mt-10 flex w-full max-w-2xl flex-col items-center sm:mt-12",
              fontSans,
            )}
          >
            <p className="mb-3 text-center text-[11px] uppercase tracking-[0.2em] text-[#C0C0C0]/75">
              Knowledge Engine · 5단계 기획 뼈대
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {LUMINA_PLAN_STEP_NAV.map((step) => (
                <Link
                  key={step.anchorId}
                  href={`/knowledge-engine/plan#${step.anchorId}`}
                  scroll={false}
                  className={cn(
                    "inline-flex min-h-[40px] min-w-[3.25rem] items-center justify-center rounded-full border border-white/18 bg-white/[0.06] px-3.5 py-2 text-[13px] font-medium text-white/90 backdrop-blur-sm transition-colors hover:border-white/35 hover:bg-white/[0.12] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40",
                  )}
                >
                  {step.shortLabelKo}
                </Link>
              ))}
            </div>
            <p className="mt-3 max-w-md text-center text-[13px] leading-relaxed text-white/50 sm:text-sm">
              결핍→소통까지 상세기획서 초안을 만듭니다. 클릭 시 기획서 페이지로 이동합니다.
            </p>
          </div>

          <p
            className={cn(
              "mt-14 max-w-lg text-[13px] leading-relaxed text-white/40",
              fontSans,
            )}
          >
            본 기능은 순차적으로 공개됩니다. 먼저 무료 분석으로 제품·브랜드 맥락을 등록해 주세요.
          </p>
        </div>
      </div>

      <BrandGenesisNarrative />
      <BrandGenesisClinicalProof />
    </div>
  )
}
