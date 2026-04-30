"use client"

import { Suspense, useCallback, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import ReactMarkdown from "react-markdown"
import {
  buildLuminaDetailPlanMarkdown,
  buildLuminaPlanDocumentParts,
  type LuminaPlanAlgorithm,
  type LuminaPlanFields,
} from "@/lib/lumina/knowledge-engine-plan"
import {
  buildLuminaMasterExecutionAnnexMarkdown,
  buildLuminaMasterPlanMarkdown,
  type LuminaMasterExtraFields,
} from "@/lib/lumina/knowledge-engine-plan-master"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  algorithmForShowcaseTier,
  SHOWCASE_TIERS,
} from "@/lib/lumina/showcase-tiers"
import { cn } from "@/lib/utils"
import remarkGfm from "remark-gfm"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  LUMINA_PLAN_TRUTH_DIALOG_BODY,
  LUMINA_PLAN_TRUTH_DIALOG_TITLE,
  LUMINA_PLAN_TRUTH_CONFIRM,
  LUMINA_PLAN_TRUTH_LOADING_STEPS,
  LUMINA_PLAN_TRUTH_REVIEW,
  LUMINA_PLAN_TRUTH_STAMP_BODY,
  LUMINA_PLAN_TRUTH_STAMP_FOOTNOTE,
  LUMINA_PLAN_TRUTH_STAMP_HEADING,
  appendNakedTruthStampMarkdown,
} from "@/lib/lumina/knowledge-plan-naked-truth-copy"

type PlanTier = "draft" | "master"

const MD_REMARK = [remarkGfm]

function downloadTextFile(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function scrollToStep(anchorId: string) {
  const el = document.getElementById(anchorId)
  el?.scrollIntoView({ behavior: "smooth", block: "start" })
}

function KnowledgeEnginePlanPageInner() {
  const searchParams = useSearchParams()
  const [planTier, setPlanTier] = useState<PlanTier>("draft")
  /** God-Class 쇼케이스 `?tier=` 딥링크 */
  const [showcaseTierId, setShowcaseTierId] = useState<number | null>(null)
  const [algorithm, setAlgorithm] = useState<LuminaPlanAlgorithm>("essence")
  const [fields, setFields] = useState<LuminaPlanFields>({
    brandName: "",
    targetAudience: "",
    priceRange: "",
    channel: "",
    products: "",
    differentiator: "",
  })
  const [masterExtra, setMasterExtra] = useState<LuminaMasterExtraFields>({
    manufacturingNotes: "",
    costSimulationNotes: "",
    complianceGlobalNotes: "",
    marketingLaunchNotes: "",
    roadmap90: "",
  })

  const [truthDialogOpen, setTruthDialogOpen] = useState(false)
  const [truthRunning, setTruthRunning] = useState(false)
  const [truthStepIndex, setTruthStepIndex] = useState(0)
  const [truthCompleted, setTruthCompleted] = useState(false)
  const [truthRefId, setTruthRefId] = useState<string | null>(null)
  const [truthAtIso, setTruthAtIso] = useState<string | null>(null)

  const markdown = useMemo(() => {
    if (planTier === "draft") {
      return buildLuminaDetailPlanMarkdown(fields, { algorithm })
    }
    return buildLuminaMasterPlanMarkdown(fields, masterExtra, { algorithm })
  }, [fields, algorithm, planTier, masterExtra])

  const masterAnnexPreview = useMemo(
    () => buildLuminaMasterExecutionAnnexMarkdown(masterExtra),
    [masterExtra],
  )

  const { intro, steps, appendix, serviceScope } = useMemo(
    () => buildLuminaPlanDocumentParts(fields, { algorithm }),
    [fields, algorithm],
  )

  const algorithmLabelKo =
    algorithm === "essence" ? "본질의 길" : "효율의 길"
  const algorithmLabelFull =
    algorithm === "essence"
      ? "본질의 길 (Essence)"
      : "효율의 길 (Efficiency)"

  const openTruthConfirmation = useCallback(() => {
    setTruthDialogOpen(true)
  }, [])

  useEffect(() => {
    if (!searchParams) return
    const plan = searchParams.get("plan")
    if (plan === "master") setPlanTier("master")
    else if (plan === "draft") setPlanTier("draft")

    const tierStr = searchParams.get("tier")
    const tid = tierStr ? parseInt(tierStr, 10) : NaN
    if (!Number.isNaN(tid) && tid >= 1 && tid <= 5) {
      setShowcaseTierId(tid)
      setAlgorithm(algorithmForShowcaseTier(tid))
    } else {
      setShowcaseTierId(null)
    }
  }, [searchParams])

  useEffect(() => {
    setTruthCompleted(false)
    setTruthRefId(null)
    setTruthAtIso(null)
  }, [markdown])

  useEffect(() => {
    const raw = window.location.hash.replace(/^#/, "")
    if (
      !raw ||
      (!raw.startsWith("lumina-step-") && raw !== "lumina-master-annex")
    )
      return
    const id = window.setTimeout(() => {
      document.getElementById(raw)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }, 120)
    return () => window.clearTimeout(id)
  }, [planTier])

  const runTruthExecution = useCallback(async () => {
    if (truthRunning) return
    setTruthRunning(true)
    const steps = LUMINA_PLAN_TRUTH_LOADING_STEPS
    for (let i = 0; i < steps.length; i++) {
      setTruthStepIndex(i)
      await new Promise((r) => setTimeout(r, 950))
    }
    const id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID().replace(/-/g, "").slice(0, 12)
        : `ref_${Date.now().toString(36)}`
    const at = new Date().toISOString()
    setTruthRefId(id)
    setTruthAtIso(at)
    setTruthCompleted(true)
    setTruthRunning(false)
    setTruthStepIndex(0)
    window.requestAnimationFrame(() => {
      document.getElementById("lumina-plan-output")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    })
  }, [truthRunning])

  const onDownload = useCallback(() => {
    const safe = (fields.brandName || "lumina-plan")
      .replace(/[^\w\uAC00-\uD7A3\-]+/g, "_")
      .slice(0, 48)
    const tone = algorithm === "essence" ? "essence" : "efficiency"
    const tier = planTier === "master" ? "master" : "draft"
    const exportedAt = new Date().toISOString()
    let body =
      planTier === "draft"
        ? buildLuminaDetailPlanMarkdown(fields, {
            algorithm,
            generatedAtIso: exportedAt,
          })
        : buildLuminaMasterPlanMarkdown(fields, masterExtra, {
            algorithm,
            generatedAtIso: exportedAt,
          })
    if (truthCompleted && truthRefId && truthAtIso) {
      body = appendNakedTruthStampMarkdown(body, {
        referenceId: truthRefId,
        generatedAtIso: truthAtIso,
      })
    }
    downloadTextFile(`${safe}_plan_${tier}_${tone}.md`, body)
  }, [
    fields,
    algorithm,
    planTier,
    masterExtra,
    truthCompleted,
    truthRefId,
    truthAtIso,
  ])

  return (
    <div className="min-h-screen bg-[#001B3A] text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <header className="mb-8 border-b border-white/10 pb-6">
          <p className="text-xs font-semibold tracking-[0.22em] text-slate-300">
            [LUMINA - Knowledge Engine]
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">
            상세 기획서 산출기
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300">
            <strong className="font-semibold text-white/95">무료 초안</strong>은
            5단계 방향성·준법 톤을 보여 주고,{" "}
            <strong className="font-semibold text-white/95">
              상세(마스터) 플랜
            </strong>
            은 실행·실측 메모를 덧붙인 B2B용 템플릿입니다. 시스템은 근거 없는
            MOQ·마진·물류비 수치를 만들지 않습니다.
          </p>
          {showcaseTierId != null ? (
            <p
              className="mt-4 max-w-3xl rounded-lg border border-amber-500/35 bg-amber-950/25 px-3 py-2.5 text-sm leading-relaxed text-amber-50/95 print:hidden"
              role="status"
            >
              <span className="font-semibold text-amber-100">
                God-Class 쇼케이스
              </span>{" "}
              연동: 티어{" "}
              <span className="font-medium">
                {SHOWCASE_TIERS.find((t) => t.id === showcaseTierId)?.nameKo} (
                {SHOWCASE_TIERS.find((t) => t.id === showcaseTierId)?.nameEn})
              </span>
              · 상세(마스터) 미리보기 (결제 없이 편집·PDF 가능)
            </p>
          ) : null}
        </header>

        <div className="grid gap-8 lg:grid-cols-2">
          <section className="print:hidden" aria-label="입력 폼">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <fieldset className="mb-5 grid gap-2">
                <legend className="text-sm font-medium text-slate-200">
                  문서 종류
                </legend>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setPlanTier("draft")}
                    className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                      planTier === "draft"
                        ? "border-white/40 bg-white text-[#001B3A]"
                        : "border-white/15 bg-transparent text-slate-200 hover:bg-white/10"
                    }`}
                  >
                    무료 초안
                  </button>
                  <button
                    type="button"
                    onClick={() => setPlanTier("master")}
                    className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                      planTier === "master"
                        ? "border-white/40 bg-white text-[#001B3A]"
                        : "border-white/15 bg-transparent text-slate-200 hover:bg-white/10"
                    }`}
                  >
                    상세(마스터) 플랜
                  </button>
                </div>
                <p className="text-xs leading-relaxed text-slate-400">
                  마스터 플랜은 동일 5단계 아래에{" "}
                  <strong className="text-slate-300">실행 시뮬레이션</strong>·
                  공급망·준법·90일 로드맵 블록을 붙입니다. 수치는 직접 기입합니다.
                </p>
              </fieldset>

              <div
                className="mb-5 rounded-xl border border-emerald-500/30 bg-emerald-950/25 px-3 py-3 print:hidden"
                role="region"
                aria-label="진실 확인 실행"
              >
                <p className="mb-2 text-xs leading-relaxed text-emerald-100/90">
                  문구 입력이 끝나면{" "}
                  <strong className="font-semibold text-white">실행</strong>으로
                  진실 확인 팝업을 연 뒤, 미리보기 하단에 Naked Truth 인장을
                  남길 수 있습니다.
                </p>
                <button
                  type="button"
                  disabled={truthRunning}
                  className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-60 sm:w-auto"
                  onClick={openTruthConfirmation}
                >
                  진실 확인 · 실행
                </button>
              </div>

              <fieldset className="mb-5 grid gap-2">
                <legend className="text-sm font-medium text-slate-200">
                  기획 톤 (알고리즘)
                </legend>
                <p className="text-xs leading-relaxed text-slate-400">
                  본질의 길은{" "}
                  <code className="rounded bg-black/30 px-1">
                    LUMINA_AESTHETIC_CORE.md
                  </code>{" "}
                  계열 서술, 효율의 길은 채널·실험·측정 루프 강조 (근거 없는
                  효능·수치는 공통 금지).
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setAlgorithm("essence")}
                    className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                      algorithm === "essence"
                        ? "border-white/40 bg-white text-[#001B3A]"
                        : "border-white/15 bg-transparent text-slate-200 hover:bg-white/10"
                    }`}
                  >
                    본질의 길
                  </button>
                  <button
                    type="button"
                    onClick={() => setAlgorithm("efficiency")}
                    className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                      algorithm === "efficiency"
                        ? "border-white/40 bg-white text-[#001B3A]"
                        : "border-white/15 bg-transparent text-slate-200 hover:bg-white/10"
                    }`}
                  >
                    효율의 길
                  </button>
                </div>
                <p
                  className="text-sm font-semibold text-white/95"
                  role="status"
                  aria-live="polite"
                >
                  현재 선택: {algorithmLabelKo}
                </p>
              </fieldset>

              <div className="grid gap-4">
                <label className="grid gap-1 text-sm">
                  <span className="text-slate-200">브랜드명</span>
                  <input
                    className="rounded-lg border border-white/10 bg-[#001B3A]/60 px-3 py-2 text-sm text-white outline-none ring-0 placeholder:text-slate-500 focus:border-white/25"
                    value={fields.brandName}
                    onChange={(e) =>
                      setFields((s) => ({ ...s, brandName: e.target.value }))
                    }
                    placeholder="예: LUMINA"
                  />
                </label>

                <label className="grid gap-1 text-sm">
                  <span className="text-slate-200">타깃</span>
                  <input
                    className="rounded-lg border border-white/10 bg-[#001B3A]/60 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500 focus:border-white/25"
                    value={fields.targetAudience}
                    onChange={(e) =>
                      setFields((s) => ({
                        ...s,
                        targetAudience: e.target.value,
                      }))
                    }
                    placeholder="예: 30대 민감 피부 인디 브랜드 대표"
                  />
                </label>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-1 text-sm">
                    <span className="text-slate-200">가격대</span>
                    <input
                      className="rounded-lg border border-white/10 bg-[#001B3A]/60 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500 focus:border-white/25"
                      value={fields.priceRange}
                      onChange={(e) =>
                        setFields((s) => ({ ...s, priceRange: e.target.value }))
                      }
                      placeholder="예: 3~6만 원대"
                    />
                  </label>
                  <label className="grid gap-1 text-sm">
                    <span className="text-slate-200">채널</span>
                    <input
                      className="rounded-lg border border-white/10 bg-[#001B3A]/60 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500 focus:border-white/25"
                      value={fields.channel}
                      onChange={(e) =>
                        setFields((s) => ({ ...s, channel: e.target.value }))
                      }
                      placeholder="예: 자사몰 + 인스타그램"
                    />
                  </label>
                </div>

                <label className="grid gap-1 text-sm">
                  <span className="text-slate-200">주력 품목 1~2</span>
                  <textarea
                    className="min-h-[120px] rounded-lg border border-white/10 bg-[#001B3A]/60 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500 focus:border-white/25"
                    value={fields.products}
                    onChange={(e) =>
                      setFields((s) => ({ ...s, products: e.target.value }))
                    }
                    placeholder="예: 고기능 앰플 1종, 세럼 1종 — 핵심 성분/용량/차별점을 짧게"
                  />
                </label>

                <label className="grid gap-1 text-sm">
                  <span className="text-slate-200">차별점(선택)</span>
                  <input
                    className="rounded-lg border border-white/10 bg-[#001B3A]/60 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500 focus:border-white/25"
                    value={fields.differentiator}
                    onChange={(e) =>
                      setFields((s) => ({
                        ...s,
                        differentiator: e.target.value,
                      }))
                    }
                    placeholder="예: 로트 추적 가능한 투명 정산 + 포뮬 QC 로그"
                  />
                </label>
              </div>

              {planTier === "master" ? (
                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="mb-3 text-sm font-medium text-slate-200">
                    [전문] B2B 마스터플랜 — 섹션별 메모
                  </p>
                  <Tabs defaultValue="mfg" className="w-full">
                    <TabsList className="mb-3 flex h-auto min-h-10 w-full flex-wrap gap-1 rounded-lg bg-white/10 p-1">
                      <TabsTrigger
                        value="mfg"
                        className="text-xs text-slate-300 data-[state=active]:bg-white data-[state=active]:text-[#001B3A] sm:text-sm"
                      >
                        제조
                      </TabsTrigger>
                      <TabsTrigger
                        value="cost"
                        className="text-xs text-slate-300 data-[state=active]:bg-white data-[state=active]:text-[#001B3A] sm:text-sm"
                      >
                        원가
                      </TabsTrigger>
                      <TabsTrigger
                        value="legal"
                        className="text-xs text-slate-300 data-[state=active]:bg-white data-[state=active]:text-[#001B3A] sm:text-sm"
                      >
                        인증·유통
                      </TabsTrigger>
                      <TabsTrigger
                        value="mkt"
                        className="text-xs text-slate-300 data-[state=active]:bg-white data-[state=active]:text-[#001B3A] sm:text-sm"
                      >
                        마케팅
                      </TabsTrigger>
                      <TabsTrigger
                        value="road"
                        className="text-xs text-slate-300 data-[state=active]:bg-white data-[state=active]:text-[#001B3A] sm:text-sm"
                      >
                        90일
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="mfg" className="mt-0">
                      <label className="grid gap-1 text-sm">
                        <span className="text-slate-200">
                          OEM/ODM·충진·용기·리드타임
                        </span>
                        <textarea
                          className="min-h-[120px] rounded-lg border border-white/10 bg-[#001B3A]/60 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500 focus:border-white/25"
                          value={masterExtra.manufacturingNotes ?? ""}
                          onChange={(e) =>
                            setMasterExtra((s) => ({
                              ...s,
                              manufacturingNotes: e.target.value,
                            }))
                          }
                          placeholder="제조사 후보, 충진·에어리스/펌프, 예상 리드타임 등"
                        />
                      </label>
                    </TabsContent>
                    <TabsContent value="cost" className="mt-0">
                      <label className="grid gap-1 text-sm">
                        <span className="text-slate-200">
                          MOQ 구간별 단가·용기·부자재·물류·관세
                        </span>
                        <textarea
                          className="min-h-[120px] rounded-lg border border-white/10 bg-[#001B3A]/60 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500 focus:border-white/25"
                          value={masterExtra.costSimulationNotes ?? ""}
                          onChange={(e) =>
                            setMasterExtra((s) => ({
                              ...s,
                              costSimulationNotes: e.target.value,
                            }))
                          }
                          placeholder="견적·실측 단가를 항목별로 기재 (자동 추정 없음)"
                        />
                      </label>
                    </TabsContent>
                    <TabsContent value="legal" className="mt-0">
                      <label className="grid gap-1 text-sm">
                        <span className="text-slate-200">
                          책임판매업·기능성·HS·수출국 인증
                        </span>
                        <textarea
                          className="min-h-[120px] rounded-lg border border-white/10 bg-[#001B3A]/60 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500 focus:border-white/25"
                          value={masterExtra.complianceGlobalNotes ?? ""}
                          onChange={(e) =>
                            setMasterExtra((s) => ({
                              ...s,
                              complianceGlobalNotes: e.target.value,
                            }))
                          }
                          placeholder="국내 행정·수출 HS·중국·동남아 등 (법률 자문 대체 아님)"
                        />
                      </label>
                    </TabsContent>
                    <TabsContent value="mkt" className="mt-0">
                      <label className="grid gap-1 text-sm">
                        <span className="text-slate-200">
                          채널별 런칭·상세페이지·예산
                        </span>
                        <textarea
                          className="min-h-[120px] rounded-lg border border-white/10 bg-[#001B3A]/60 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500 focus:border-white/25"
                          value={masterExtra.marketingLaunchNotes ?? ""}
                          onChange={(e) =>
                            setMasterExtra((s) => ({
                              ...s,
                              marketingLaunchNotes: e.target.value,
                            }))
                          }
                          placeholder="자사몰·입점·SNS·공구 등, 예산 배분은 실측 후"
                        />
                      </label>
                    </TabsContent>
                    <TabsContent value="road" className="mt-0">
                      <label className="grid gap-1 text-sm">
                        <span className="text-slate-200">
                          런칭 전후 90일 로드맵
                        </span>
                        <textarea
                          className="min-h-[120px] rounded-lg border border-white/10 bg-[#001B3A]/60 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500 focus:border-white/25"
                          value={masterExtra.roadmap90 ?? ""}
                          onChange={(e) =>
                            setMasterExtra((s) => ({
                              ...s,
                              roadmap90: e.target.value,
                            }))
                          }
                          placeholder="주차별 담당·마일스톤"
                        />
                      </label>
                    </TabsContent>
                  </Tabs>
                </div>
              ) : null}

              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={truthRunning}
                  className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-60"
                  onClick={openTruthConfirmation}
                >
                  실행
                </button>
                <button
                  type="button"
                  className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#001B3A] hover:bg-slate-100"
                  onClick={onDownload}
                >
                  Markdown 다운로드
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-white/20 bg-transparent px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                  onClick={() => window.print()}
                >
                  인쇄 / PDF 저장
                </button>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-slate-400">
                인쇄 대화상자에서 “PDF로 저장”을 선택하면 PDF로 보관할 수
                있습니다.
              </p>
            </div>

            <AlertDialog open={truthDialogOpen} onOpenChange={setTruthDialogOpen}>
              <AlertDialogContent className="border-white/15 bg-[#0c1829] text-slate-100 sm:max-w-md">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-white">
                    {LUMINA_PLAN_TRUTH_DIALOG_TITLE}
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-left text-sm leading-relaxed text-slate-300">
                    {LUMINA_PLAN_TRUTH_DIALOG_BODY}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="gap-2 sm:gap-2">
                  <AlertDialogCancel className="border-white/20 bg-transparent text-slate-100 hover:bg-white/10 hover:text-white">
                    {LUMINA_PLAN_TRUTH_REVIEW}
                  </AlertDialogCancel>
                  <button
                    type="button"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-emerald-600 px-4 text-sm font-semibold text-white hover:bg-emerald-500"
                    onClick={() => {
                      setTruthDialogOpen(false)
                      void runTruthExecution()
                    }}
                  >
                    {LUMINA_PLAN_TRUTH_CONFIRM}
                  </button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </section>

          <section
            aria-label="미리보기"
            className="min-h-0 lg:sticky lg:top-6 lg:self-start"
          >
            <div className="mb-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur print:hidden">
              <p className="mb-2 text-xs font-medium text-slate-300">
                5단계로 이동
              </p>
              <div className="flex flex-wrap gap-1.5">
                {steps.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    className="rounded-md border border-white/15 bg-[#001B3A]/50 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-white/10"
                    onClick={() => scrollToStep(s.anchorId)}
                  >
                    {s.shortLabelKo}
                  </button>
                ))}
                {planTier === "master" ? (
                  <button
                    type="button"
                    className="rounded-md border border-amber-400/40 bg-amber-950/40 px-2.5 py-1.5 text-xs font-medium text-amber-100 hover:bg-amber-900/50"
                    onClick={() => scrollToStep("lumina-master-annex")}
                  >
                    마스터 보강
                  </button>
                ) : null}
              </div>
            </div>

            <div
              id="lumina-plan-output"
              className="relative max-h-[min(80vh,900px)] overflow-y-auto rounded-2xl border border-white/10 bg-white p-6 text-[#0E192B] shadow-sm print:max-h-none print:overflow-visible print:border-0 print:shadow-none"
            >
              <div
                role="status"
                aria-live="polite"
                className={cn(
                  "not-prose mb-4 rounded-lg border-2 px-3 py-2.5 text-center text-sm font-semibold leading-snug print:mb-3 print:break-inside-avoid",
                  algorithm === "essence"
                    ? "border-slate-400/60 bg-slate-50 text-[#0E192B]"
                    : "border-amber-500/45 bg-amber-50 text-[#0E192B]",
                )}
              >
                적용 중인 기획 톤: {algorithmLabelFull}
                <span className="mt-1 block text-xs font-normal text-[#0E192B]/80">
                  문서:{" "}
                  {planTier === "draft"
                    ? "무료 초안"
                    : "상세(마스터) 플랜 (실행 보강 포함)"}
                </span>
              </div>
              <article
                className={cn(
                  "lumina-plan-prose prose prose-sm max-w-none prose-headings:scroll-mt-6 prose-headings:font-semibold prose-p:leading-relaxed prose-li:leading-relaxed prose-blockquote:border-l-slate-300 prose-blockquote:text-[#0E192B]",
                  "prose-table:w-full prose-th:border prose-th:border-slate-300 prose-th:bg-slate-50 prose-th:px-2 prose-th:py-1.5 prose-th:text-left prose-td:border prose-td:border-slate-200 prose-td:px-2 prose-td:py-1.5 print:prose-table:text-[10pt]",
                )}
              >
                <section className="rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] print:rounded-none print:border-slate-300 print:bg-white print:px-0 print:py-0 print:shadow-none">
                  <ReactMarkdown remarkPlugins={MD_REMARK}>{intro}</ReactMarkdown>
                </section>

                {steps.map((s, i) => (
                  <section
                    key={s.id}
                    id={s.anchorId}
                    className={cn(
                      "scroll-mt-6 mt-4 rounded-xl border px-4 py-4 print:mt-3 print:rounded-none print:border-slate-300 print:bg-white print:px-0 print:py-0",
                      i % 2 === 0
                        ? "border-slate-200 bg-white"
                        : "border-slate-200 bg-slate-50/55",
                    )}
                  >
                    <ReactMarkdown remarkPlugins={MD_REMARK}>
                      {`${s.headingLine}\n\n${s.body}`}
                    </ReactMarkdown>
                  </section>
                ))}

                <section className="mt-6 rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-4 print:break-inside-avoid print:rounded-none print:border-slate-300 print:bg-white print:px-0 print:py-0">
                  <ReactMarkdown remarkPlugins={MD_REMARK}>
                    {appendix}
                  </ReactMarkdown>
                </section>

                <section
                  id="lumina-plan-service-scope"
                  className="mt-6 rounded-xl border border-slate-300 bg-white px-4 py-4 print:break-inside-avoid print:rounded-none print:border-slate-300 print:px-0 print:py-0"
                >
                  <ReactMarkdown remarkPlugins={MD_REMARK}>
                    {serviceScope}
                  </ReactMarkdown>
                </section>

                {planTier === "master" ? (
                  <section
                    id="lumina-master-annex"
                    className="mt-8 rounded-xl border-2 border-slate-400 bg-slate-50/70 px-4 py-5 print:break-inside-avoid print:rounded-none print:border-slate-400 print:bg-white print:px-0 print:py-0"
                  >
                    <ReactMarkdown remarkPlugins={MD_REMARK}>
                      {masterAnnexPreview}
                    </ReactMarkdown>
                  </section>
                ) : null}

                {truthCompleted && truthRefId && truthAtIso ? (
                  <section
                    id="lumina-naked-truth-stamp"
                    className="mt-8 border-t-2 border-slate-400/90 bg-slate-50/95 px-3 py-5 print:break-inside-avoid"
                  >
                    <p className="text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                      {LUMINA_PLAN_TRUTH_STAMP_HEADING}
                    </p>
                    <p className="mt-3 text-center text-sm font-medium leading-relaxed text-[#0E192B]">
                      {LUMINA_PLAN_TRUTH_STAMP_BODY}
                    </p>
                    <p className="mt-3 text-center text-xs text-slate-600">
                      참조 ID:{" "}
                      <code className="rounded bg-white/90 px-1.5 py-0.5 text-[0.8rem]">
                        {truthRefId}
                      </code>
                      <span aria-hidden="true"> · </span>
                      생성 시각(UTC): {truthAtIso}
                    </p>
                    <p className="mt-3 text-center text-[11px] leading-relaxed text-slate-500">
                      {LUMINA_PLAN_TRUTH_STAMP_FOOTNOTE}
                    </p>
                  </section>
                ) : null}
              </article>

              {truthRunning ? (
                <div
                  className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl bg-[#0E192B]/55 p-4 backdrop-blur-[1px]"
                  role="status"
                  aria-live="assertive"
                  aria-busy="true"
                >
                  <div className="max-w-md rounded-2xl border border-white/20 bg-[#0a1628] px-6 py-8 text-center text-slate-100 shadow-xl">
                    <p className="text-xs font-semibold tracking-[0.18em] text-emerald-200/90">
                      투명한 진행
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-slate-200">
                      {
                        LUMINA_PLAN_TRUTH_LOADING_STEPS[
                          Math.min(
                            truthStepIndex,
                            LUMINA_PLAN_TRUTH_LOADING_STEPS.length - 1,
                          )
                        ]
                      }
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default function KnowledgeEnginePlanPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#001B3A] px-4 py-10 text-slate-300">
          <p className="text-sm">로딩 중…</p>
        </div>
      }
    >
      <KnowledgeEnginePlanPageInner />
    </Suspense>
  )
}
