"use client"

import { useEffect, useMemo, useRef, type RefObject } from "react"
import { chooseRenderTier } from "@/lib/rendering/smart-loader"
import {
  getRenderConfig,
  type EssenceVisualPreset,
  type RenderConfig,
  type RenderTier,
} from "@/lib/rendering/render-config"
import type { LuminaCognitiveMetrics } from "@/lib/lumina/cognitive-sync-engine"

type SensoryVisualUpgradeProps = {
  /** 배경 위 레이어로만 쓰입니다 */
  className?: string
  /** 제품 배경 이미지 URL (WebGL 텍스처용) */
  imageUrl?: string | null
  /** 브랜드/제품별 고유성 시드 (seeded visual noise) */
  seed?: number
  /** Tier 5(Genesis) 사용 허용 */
  allowGenesis?: boolean
  /** 강제 티어(쇼케이스/비교 UI 전용) */
  forcedTier?: RenderTier
  /** 로그인된 사용자 user_id(선택). 없으면 서버 env 데모 user로 동작합니다. */
  userId?: string | null
  /** 인지 동기화(존/속도) — rAF에서만 읽음, 네트워크 없음 */
  cognitiveMetricsRef?: RefObject<LuminaCognitiveMetrics | null>
  /** Tier 1(Essence)일 때만 적용 — Studio Minimalist = 저채도·저노이즈 WebGL */
  essenceVisualPreset?: EssenceVisualPreset
}

function usePrefersReducedMotion() {
  const prefers = useMemo(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
  }, [])
  return prefers
}

type Vec2 = { x: number; y: number }

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v))
}

function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

type Droplet = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  alpha: number
  grounded: boolean
  groundMode: "floor" | "wall" | null
  wallSide: -1 | 1 | 0
  groundT: number
}

/**
 * Jewel-Tex 스타일의 감각 레이어:
 * - WebGL: 속도 기반 “날카로운 빛 ↔ 은은한 빛”, 미세 범프(프로시저럴 노이즈)
 * - Canvas2D: 점성(Viscosity) 있는 점적(느리고 묵직하게) 시뮬레이션
 */
export function SensoryVisualUpgrade({
  className = "",
  imageUrl = null,
  seed = 0,
  allowGenesis = true,
  forcedTier,
  userId = null,
  cognitiveMetricsRef,
  essenceVisualPreset = "default",
}: SensoryVisualUpgradeProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const tier = useMemo<RenderTier>(() => {
    if (forcedTier) return forcedTier
    return chooseRenderTier({ allowGenesis })
  }, [allowGenesis, forcedTier])
  const config = useMemo(() => {
    const preset = tier === 1 ? essenceVisualPreset : "default"
    return getRenderConfig(tier, preset)
  }, [tier, essenceVisualPreset])
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const webglRef = useRef<HTMLCanvasElement | null>(null)
  const dropletRef = useRef<HTMLCanvasElement | null>(null)

  const speedRef = useRef(0)
  const stopRef = useRef(0)
  const pointerRef = useRef<Vec2>({ x: 0.5, y: 0.45 })
  const startedRef = useRef(false)
  const spendOnceRef = useRef(false)
  const chargedTierRef = useRef<number | null>(null)
  const genesisReservationIdRef = useRef<string | null>(null)
  const genesisGrantedRef = useRef(false)
  const genesisGrantPromiseRef = useRef<Promise<boolean> | null>(null)

  useEffect(() => {
    if (prefersReducedMotion) return

    let lastScrollY = window.scrollY
    let lastT = performance.now()
    let smoothedSpeed = 0
    let lastMotionAt = performance.now()

    const onScroll = () => {
      const y = window.scrollY
      const now = performance.now()
      const dy = y - lastScrollY
      const dt = Math.max(1, now - lastT) / 1000
      // px/s (absolute)
      const v = Math.abs(dy) / dt
      smoothedSpeed = smoothedSpeed * 0.84 + v * 0.16
      speedRef.current = smoothedSpeed
      if (v > 12) lastMotionAt = now
      lastScrollY = y
      lastT = now
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()

    let raf = 0
    const loop = () => {
      const now = performance.now()
      const v = speedRef.current
      const isStopped = now - lastMotionAt > 220 && v < 140
      // 0~1로 부드럽게 감쇠
      stopRef.current = isStopped
        ? 1
        : Math.max(0, stopRef.current * (1 - 0.12))
      raf = window.requestAnimationFrame(loop)
    }
    raf = window.requestAnimationFrame(loop)

    return () => {
      window.removeEventListener("scroll", onScroll)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [prefersReducedMotion])

  useEffect(() => {
    if (prefersReducedMotion) return

    const onMove = (e: PointerEvent) => {
      const x = e.clientX / Math.max(1, window.innerWidth)
      const y = e.clientY / Math.max(1, window.innerHeight)
      pointerRef.current = { x: clamp(x, 0, 1), y: clamp(y, 0, 1) }
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  }, [prefersReducedMotion])

  useEffect(() => {
    if (prefersReducedMotion) return

    const wrapper = wrapperRef.current
    if (!wrapper) return

    const idle = window.requestIdleCallback
      ? window.requestIdleCallback
      : (cb: () => void) => window.setTimeout(cb, 120)

    const startIfNeeded = () => {
      if (startedRef.current) return
      startedRef.current = true
      idle(async () => {
        let effectiveConfig = config

        const attemptSpend = async (tierToSpend: RenderTier) => {
          // 컴포넌트 생명주기 동안 "성공한 티어"는 1회만 차감합니다.
          if (spendOnceRef.current && chargedTierRef.current === tierToSpend) return true
          if (spendOnceRef.current) return false

          const spendRes = await fetch("/api/lumi-credits/spend-render", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId,
              tier: tierToSpend,
              operation: "detail_visual",
              referenceId: null,
            }),
          })

          if (!spendRes.ok) return false
          const data: {
            ok: boolean
            balanceAfter?: number
          } = await spendRes.json()

          if (!data.ok) return false
          spendOnceRef.current = true
          chargedTierRef.current = tierToSpend
          return true
        }

        if (effectiveConfig.requiresGenesisReservation) {
          if (!genesisGrantPromiseRef.current) {
            genesisGrantPromiseRef.current = (async () => {
              if (genesisGrantedRef.current && genesisReservationIdRef.current) return true

              try {
                const res = await fetch("/api/genesis-render-queue/request", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ ttlMs: 45_000 }),
                })
                if (!res.ok) return false
                const data: {
                  reservationId: string
                  status: "granted" | "queued" | "expired"
                } = await res.json()

                genesisReservationIdRef.current = data.reservationId

                if (data.status === "granted") {
                  genesisGrantedRef.current = true
                  return true
                }

                const startedAt = Date.now()
                const maxWait = 40_000
                while (Date.now() - startedAt < maxWait) {
                  const st = await fetch(
                    `/api/genesis-render-queue/status?reservationId=${encodeURIComponent(
                      data.reservationId
                    )}`
                  )
                  if (st.ok) {
                    const sdata: {
                      status: "granted" | "queued" | "expired"
                    } = await st.json()
                    if (sdata.status === "granted") {
                      genesisGrantedRef.current = true
                      return true
                    }
                    if (sdata.status === "expired") return false
                  }
                  await new Promise((r) => window.setTimeout(r, 1200))
                }

                return false
              } catch {
                return false
              }
            })()
          }

          const ok = await genesisGrantPromiseRef.current
          if (!ok) effectiveConfig = getRenderConfig(4)
        }

          // Credit charge
          // - Tier 5는 예약이 “확정”된 뒤에 차감합니다. (대기 중 크레딧 소진 방지)
          // - 크레딧 부족이면 Tier 5는 Tier 4로 폴백, 그 외는 Tier 1로 폴백합니다.
        if (effectiveConfig.tier > 1) {
          const charged = await attemptSpend(effectiveConfig.tier)
          if (!charged) {
              effectiveConfig =
                effectiveConfig.tier === 5
                  ? getRenderConfig(4)
                  : getRenderConfig(1, essenceVisualPreset)
          }
        }

        initWebGL(effectiveConfig)
        initDroplets(effectiveConfig)

        if (genesisReservationIdRef.current) {
          void fetch("/api/genesis-render-queue/release", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reservationId: genesisReservationIdRef.current }),
          }).catch(() => {})
        }

        genesisGrantPromiseRef.current = null
        genesisGrantedRef.current = false
        genesisReservationIdRef.current = null
      })
    }

    function initWebGL(cfg: RenderConfig) {
      const canvas = webglRef.current
      if (!canvas) return

      const gl = canvas.getContext("webgl", {
        alpha: true,
        premultipliedAlpha: true,
        antialias: true,
        depth: false,
        stencil: false,
        preserveDrawingBuffer: false,
      })
      if (!gl) return

      const vertSrc = `
        attribute vec2 aPos;
        varying vec2 vUv;
        void main() {
          vUv = aPos * 0.5 + 0.5;
          gl_Position = vec4(aPos, 0.0, 1.0);
        }
      `

      const fragSrc = `
        precision highp float;
        varying vec2 vUv;

        uniform vec2 uResolution;
        uniform float uTime;
        uniform float uSpeed;
        uniform vec2 uPointer;
        uniform float uStop;
        uniform float uSeed;
        uniform sampler2D uTex;
        uniform float uTexEnabled;
        uniform float uCogSapphireMul;
        uniform float uCogMicro;
        uniform float uCogAura;
        uniform float uCogOnyx;
        uniform float uCogSapphire;

        float hash(vec2 p){
          // uSeed를 미세하게 섞어 브랜드별 노이즈 편차를 만듭니다.
          vec2 q = p + vec2(uSeed*0.001, uSeed*0.002);
          return fract(sin(dot(q, vec2(127.1, 311.7))) * 43758.5453123);
        }

        float noise(vec2 p){
          vec2 i = floor(p);
          vec2 f = fract(p);
          float a = hash(i);
          float b = hash(i + vec2(1.0, 0.0));
          float c = hash(i + vec2(0.0, 1.0));
          float d = hash(i + vec2(1.0, 1.0));
          vec2 u = f*f*(3.0-2.0*f);
          return mix(a, b, u.x) + (c - a)*u.y*(1.0-u.x) + (d - b)*u.x*u.y;
        }

        float fbm(vec2 p){
          float v = 0.0;
          float a = 0.55;
          for(int i=0;i<${cfg.fbmOctaves};i++){
            v += a * noise(p);
            p *= 2.02;
            a *= 0.53;
          }
          return v;
        }

        void main() {
          vec2 uv = vUv;
          vec2 p = (uv - 0.5);
          float aspect = uResolution.x / max(1.0, uResolution.y);
          p.x *= aspect;

          // Speed: 빠를수록 날카롭고 강해짐. 멈추면 안정적/은은.
          float s = clamp(uSpeed / 1800.0, 0.0, 1.0);
          // Visual Frequency (시각적 주파수): 광채의 미세 떨림
          float seedMix = 0.86 + 0.18*fract(uSeed*0.0009);
          float freq = mix(0.9, 2.6, s) * (0.85 + 0.15*sin(uTime*0.9)) * seedMix * (0.7 + ${cfg.shimmer}*0.6);
          float sharp = mix(1.3, 4.2, s) + uStop * (0.25 + ${cfg.lightingComplexity}*0.35);
          float glow = mix(0.55, 1.05, s) + uStop * (0.16 + ${cfg.lightingComplexity}*0.25);

          // Pointer light source (viewer makes contact feel).
          vec2 lp = uPointer - 0.5;
          lp.x *= aspect;
          vec2 dir2 = normalize(p - lp + 1e-4);
          float dist = length(p - lp);

          // Procedural bump (Jewel-Tex micro texture).
          float t = uTime * mix(0.06, 0.16, s) * freq;
          float scale = mix(2.0, 3.4, s);
          float n  = fbm(uv * scale + t);
          float n1 = fbm((uv + vec2(0.002, 0.0)) * scale + t);
          float n2 = fbm((uv + vec2(0.0, 0.002)) * scale + t);
          vec3 normal = normalize(vec3((n - n1), (n - n2), 0.35));

          vec3 lightDir = normalize(vec3(dir2, 0.9));
          float ndlRaw = max(dot(normal, lightDir), 0.0);
          float ndl = pow(ndlRaw, 1.0 / max(0.72, uCogMicro));
          float trem = sin(uTime * freq * 3.2 + n * 6.2831) * 0.5 + 0.5;
          float spec = pow(ndl, sharp) * glow * (0.78 + 0.32*trem) * (${cfg.shimmer}*0.6 + 0.4);
          spec *= mix(1.0, uCogMicro, 0.35);
          float cogTrust = max(0.0, uCogSapphireMul - 1.0);
          spec *= (1.0 + cogTrust * (0.28 + 0.22 * uCogSapphire));

          // Soft radial ambience + vignette.
          float r = length(uv - 0.5);
          float vign = smoothstep(0.72, 0.25, r);

          vec3 gold = vec3(0.82, 0.69, 0.37) * (0.96 + 0.08*fract(uSeed*0.0013));
          vec3 cream = vec3(0.97, 0.95, 0.90);
          vec3 cool = vec3(0.72, 0.82, 1.0); // “차갑다” 뉘앙스

          // Chewy-soft: speed dependent color shift between cool ↔ warm gold.
          vec3 tint = mix(cool, gold, 0.35 + 0.45*s);
          tint = mix(tint, vec3(0.58, 0.54, 0.70), 0.16 * uCogOnyx);

          // Tier-별 시각 깊이
          // - Tier 1: 2D 감각(필터/구도)만 남기고 물리/무한줌/입자는 최소화
          // - Tier 3+: 이미지 기반 환상(무한줌) + 에너지 입자 활성
          vec3 texCol = vec3(0.0);
          float texMix = 0.0;
          if (${cfg.tier >= 3 ? 1 : 0} == 1) {
            float z = pow(1.08, uTime*0.12) + uStop * (6.5 + ${cfg.shimmer}*3.5) + uSeed * 0.00012;
            vec2 zUv = fract((uv - 0.5) * z + 0.5);
            texCol = texture2D(uTex, zUv).rgb;
            texMix = uTexEnabled * (0.10 + 0.20*s) * (0.55 + 0.45*uStop);
          }

          // Energy particles (벡터 기반 흐름 느낌)
          float particle = 0.0;
          if (${cfg.tier >= 3 ? 1 : 0} == 1) {
            vec2 gv = uv * vec2(70.0, 95.0);
            vec2 id = floor(gv);
            vec2 fp = fract(gv) - 0.5;
            float h = hash(id);
            float ang = h * 6.2831 + uTime * (0.4 + 1.6*s) + uSeed*0.001;
            vec2 flow = vec2(cos(ang), sin(ang));
            vec2 q = fp - flow * (0.06 + 0.08*s) * (0.4 + 0.6*sin(uTime*0.7 + h*10.0));
            particle = 0.0;
            for(int j=0;j<${cfg.facetShards};j++){
              float jj = float(j);
              vec2 qj = q + vec2(jj*0.018, -jj*0.013);
              particle += 1.0 - smoothstep(0.0, 0.22, length(qj));
            }
            particle /= float(${cfg.facetShards});
          }
          particle *= (1.0 + 0.24 * uCogAura);

          // 계시적 연출: 스크롤 멈춤 찰나 코어에서 빛이 뿜어져 나옴
          float r0 = length(uv - 0.5);
          float core = exp(-r0*r0 * (26.0 + 140.0*uStop)) * (0.55 + 0.45*trem) * (0.8 + 0.4*fract(uSeed*0.0007));
          core *= (1.0 + 0.20 * uCogAura);

          vec3 col = cream * (0.02 + 0.05*vign) * (1.0 - 0.22*uStop);
          col = mix(col, texCol, texMix);
          col += tint * spec * 0.55;
          col += vec3(0.42, 0.58, 0.88) * spec * cogTrust * (0.12 + 0.20 * uCogSapphire);
          col += gold * (n - 0.5) * 0.02 * vign;
          col += gold * particle * (0.05 + 0.12*uStop);

          // Genesis(5): 제형 내부 빛 산란(서브서피스 느낌)
          if (${cfg.tier === 5 ? 1 : 0} == 1) {
            float pointerAt = 1.0 - smoothstep(0.0, 0.65, dist);
            float edge = pow(1.0 - ndl, 2.3);
            float scatter = edge * glow * (0.10 + 0.65*pointerAt) * (0.35 + 0.65*uStop);
            // 미세 진동(마우스/스크롤이 산란 결을 바꿈)
            scatter *= (0.75 + 0.25*sin(uTime*1.6 + n*6.2831));
            col += vec3(0.92,0.82,0.58) * scatter;
          }
          col += vec3(1.0, 0.96, 0.86) * core * (0.35 + 0.55*uStop);

          float alpha = 0.75 * (0.22 + spec);
          gl_FragColor = vec4(col, alpha);
        }
      `

      const compileShader = (type: number, src: string) => {
        const sh = gl.createShader(type)
        if (!sh) return null
        gl.shaderSource(sh, src)
        gl.compileShader(sh)
        if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
          // Fail silently (avoid breaking UI).
          gl.deleteShader(sh)
          return null
        }
        return sh
      }

      const vs = compileShader(gl.VERTEX_SHADER, vertSrc)
      const fs = compileShader(gl.FRAGMENT_SHADER, fragSrc)
      if (!vs || !fs) return

      const prog = gl.createProgram()
      if (!prog) return
      gl.attachShader(prog, vs)
      gl.attachShader(prog, fs)
      gl.linkProgram(prog)
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return

      const posBuf = gl.createBuffer()
      if (!posBuf) return
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuf)
      // full-screen quad
      const verts = new Float32Array([
        -1, -1, 1, -1, -1, 1,
        -1, 1, 1, -1, 1, 1,
      ])
      gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW)

      const aPos = gl.getAttribLocation(prog, "aPos")
      const uResolution = gl.getUniformLocation(prog, "uResolution")
      const uTime = gl.getUniformLocation(prog, "uTime")
      const uSpeed = gl.getUniformLocation(prog, "uSpeed")
      const uPointer = gl.getUniformLocation(prog, "uPointer")
      const uStop = gl.getUniformLocation(prog, "uStop")
      const uSeed = gl.getUniformLocation(prog, "uSeed")
      const uTex = gl.getUniformLocation(prog, "uTex")
      const uTexEnabled = gl.getUniformLocation(prog, "uTexEnabled")
      const uCogSapphireMul = gl.getUniformLocation(prog, "uCogSapphireMul")
      const uCogMicro = gl.getUniformLocation(prog, "uCogMicro")
      const uCogAura = gl.getUniformLocation(prog, "uCogAura")
      const uCogOnyx = gl.getUniformLocation(prog, "uCogOnyx")
      const uCogSapphire = gl.getUniformLocation(prog, "uCogSapphire")

      const seedUnit = ((Math.max(0, seed) % 10000) / 10000) as number

      let texEnabled = 0
      const texture = gl.createTexture()
      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT)
      // 1x1 placeholder pixel (avoid black if image fails)
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        1,
        1,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        new Uint8Array([255, 255, 255, 255])
      )

      if (uTex) gl.uniform1i(uTex, 0)

      if (imageUrl) {
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.src = imageUrl
        img.onload = () => {
          try {
            gl.activeTexture(gl.TEXTURE0)
            gl.bindTexture(gl.TEXTURE_2D, texture)
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
            gl.generateMipmap(gl.TEXTURE_2D)
            texEnabled = 1
          } catch {
            texEnabled = 0
          }
        }
      }

      let webRaf = 0

      const resize = () => {
        const rect = canvas.getBoundingClientRect()
        const isMobile = rect.width < 520
        const dpr = clamp(
          window.devicePixelRatio || 1,
          1,
          isMobile ? 1.5 : 2
        )
        const scaledDpr = dpr * cfg.resolutionScale
        const w = Math.max(1, Math.floor(rect.width * scaledDpr))
        const h = Math.max(1, Math.floor(rect.height * scaledDpr))
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w
          canvas.height = h
        }
        gl.viewport(0, 0, canvas.width, canvas.height)
      }

      resize()
      const onResize = () => resize()
      window.addEventListener("resize", onResize, { passive: true })

      const start = performance.now()
      const draw = () => {
        resize()
        const time = (performance.now() - start) / 1000
        const speed = clamp(speedRef.current, 0, 3500)
        const pointer = pointerRef.current
        const stop = clamp(stopRef.current, 0, 1)

        gl.clearColor(0, 0, 0, 0)
        gl.clear(gl.COLOR_BUFFER_BIT)

        gl.useProgram(prog)
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuf)
        gl.enableVertexAttribArray(aPos)
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

        if (uResolution) gl.uniform2f(uResolution, canvas.width, canvas.height)
        if (uTime) gl.uniform1f(uTime, time)
        if (uSpeed) gl.uniform1f(uSpeed, speed)
        if (uPointer) gl.uniform2f(uPointer, pointer.x, pointer.y)
        if (uStop) gl.uniform1f(uStop, stop)
        if (uSeed) gl.uniform1f(uSeed, seedUnit)
        if (uTexEnabled) gl.uniform1f(uTexEnabled, texEnabled ? 1 : 0)

        const cog = cognitiveMetricsRef?.current
        const mode = cog?.visualMode ?? "neutral"
        if (uCogSapphireMul) gl.uniform1f(uCogSapphireMul, cog?.sapphireTrustMultiplier ?? 1)
        if (uCogMicro) gl.uniform1f(uCogMicro, cog?.microShadowBoost ?? 1)
        if (uCogAura) gl.uniform1f(uCogAura, mode === "aura" ? 1 : 0)
        if (uCogOnyx) gl.uniform1f(uCogOnyx, mode === "onyx" ? 1 : 0)
        if (uCogSapphire) gl.uniform1f(uCogSapphire, mode === "sapphire" ? 1 : 0)

        gl.enable(gl.BLEND)
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
        gl.drawArrays(gl.TRIANGLES, 0, 6)

        webRaf = window.requestAnimationFrame(draw)
      }

      webRaf = window.requestAnimationFrame(draw)

      return () => {
        window.removeEventListener("resize", onResize)
        if (webRaf) window.cancelAnimationFrame(webRaf)
        gl.deleteProgram(prog)
        gl.deleteShader(vs)
        gl.deleteShader(fs)
        if (texture) gl.deleteTexture(texture)
      }
    }

    function initDroplets(cfg: RenderConfig) {
      const canvas = dropletRef.current
      if (!canvas) return
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const droplets: Droplet[] = []
      const rand = mulberry32(Math.max(1, Math.floor(seed)))
      let last = performance.now()
      let raf2 = 0
      let accumulator = 0
      const prefersMobile = window.innerWidth < 520
      const enableWallFlow = cfg.tier === 5

      const resize = () => {
        const rect = canvas.getBoundingClientRect()
        const dpr = clamp(
          window.devicePixelRatio || 1,
          1,
          prefersMobile ? 1.25 : 2
        )
        const scaledDpr = dpr * cfg.resolutionScale
        const w = Math.max(1, Math.floor(rect.width * scaledDpr))
        const h = Math.max(1, Math.floor(rect.height * scaledDpr))
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w
          canvas.height = h
        }
      }

      const spawn = (intensity: number) => {
        const rect = canvas.getBoundingClientRect()
        const isMobile = rect.width < 520
        const baseCount = isMobile ? 1 : 2
        const count = Math.floor((baseCount + intensity * 2) * cfg.dropletQuality)
        const p = pointerRef.current
        const cx = canvas.width * p.x
        for (let i = 0; i < count; i++) {
          const r =
            ((isMobile ? 3.0 : 3.7) + rand() * (isMobile ? 2.5 : 3.2)) *
            (0.82 + cfg.dropletQuality * 0.38)

          const wallSide = enableWallFlow ? (p.x < 0.5 ? -1 : 1) : 0
          const edgeX = wallSide === -1 ? r : canvas.width - r

          droplets.push({
            x: enableWallFlow ? edgeX + (rand() - 0.5) * canvas.width * 0.01 : cx + (rand() - 0.5) * canvas.width * 0.04,
            y: -r - rand() * canvas.height * 0.08,
            vx: enableWallFlow ? (rand() - 0.5) * 1.4 : (rand() - 0.5) * 6,
            vy: 10 + rand() * 20,
            r,
            alpha: 0.8,
            grounded: false,
            groundMode: null,
            wallSide: 0,
            groundT: 0,
          })
        }
      }

      resize()

      // Tier 1 Essence: 물리 시뮬레이션을 배제하고, 감각적인 고정 글린트(2D)만 남깁니다.
      if (cfg.tier === 1) {
        const w = canvas.width
        const h = canvas.height
        ctx.clearRect(0, 0, w, h)
        const p = pointerRef.current

        const count = 5
        for (let i = 0; i < count; i++) {
          const t = i / Math.max(1, count - 1)
          const x = w * (0.22 + 0.56 * rand() + (p.x - 0.5) * 0.08 * t)
          const y = h * (0.18 + 0.64 * rand() + (p.y - 0.45) * 0.06 * t)
          const r = Math.max(10, Math.min(w, h) * (0.06 + 0.05 * rand()))

          const grad = ctx.createRadialGradient(x, y, r * 0.1, x, y, r)
          grad.addColorStop(0, `rgba(201,162,39,${0.12 * (1 - t)})`)
          grad.addColorStop(0.45, `rgba(245,240,230,${0.08 * (1 - t)})`)
          grad.addColorStop(1, "rgba(0,0,0,0)")

          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(x, y, r, 0, Math.PI * 2)
          ctx.fill()
        }
        return
      }
      const onResize = () => resize()
      window.addEventListener("resize", onResize, { passive: true })

      const step = () => {
        const now = performance.now()
        const dt = Math.min(0.032, (now - last) / 1000)
        last = now
        resize()

        const w = canvas.width
        const h = canvas.height

        // Clear with very low alpha for subtle trails.
        ctx.clearRect(0, 0, w, h)

        const m = cognitiveMetricsRef?.current
        const vNorm =
          typeof m?.scrollVelocityNorm === "number"
            ? m.scrollVelocityNorm
            : clamp(speedRef.current / 1800, 0, 1)
        // Viscosity: 느린 스크롤 = 묵직함, 빠른 스크롤 = 퍼짐(동적 점성)
        const viscosity =
          1.25 +
          cfg.dropletQuality * 1.2 +
          (vNorm < 0.22 ? 0.36 : vNorm > 0.55 ? -0.16 : 0) +
          (speedRef.current > 900 ? 0.22 : 0)
        const drag = 0.82 + viscosity * 0.03
        const gravity = 760 / Math.max(1.0, viscosity) // px/s^2

        // Spawn based on scroll speed.
        const s = vNorm
        accumulator += dt * (0.8 + s * 2.2)
        const spawnEvery = 1.0
        if (accumulator >= spawnEvery) {
          accumulator = accumulator % spawnEvery
          spawn(s)
        }

        // Update & draw droplets.
        for (let i = droplets.length - 1; i >= 0; i--) {
          const d = droplets[i]

          if (!d.grounded) {
            d.vx *= Math.pow(drag, dt * 60)
            d.vy += gravity * dt
            d.vy *= Math.pow(drag, dt * 60)
            d.x += d.vx * dt
            d.y += d.vy * dt

            const floorY = h - 16
            if (enableWallFlow) {
              const hitLeft = d.x - d.r <= 0
              const hitRight = d.x + d.r >= w
              if (hitLeft || hitRight) {
                d.grounded = true
                d.groundMode = "wall"
                d.wallSide = hitLeft ? -1 : 1
                d.groundT = 0
                d.vx = 0
                d.vy *= 0.15
              } else if (d.y + d.r >= floorY) {
                d.grounded = true
                d.groundMode = "floor"
                d.wallSide = 0
                d.groundT = 0
                d.vy *= 0.2
              }
            } else if (d.y + d.r >= floorY) {
              d.grounded = true
              d.groundMode = "floor"
              d.wallSide = 0
              d.groundT = 0
              d.vy *= 0.2
            }
          } else {
            d.groundT += dt
            if (d.groundMode === "wall") {
              // Tier 5 Genesis: 용기 벽면을 타고 흐르는 듯한 슬라이드
              const wallSlide = (gravity * 0.22 + s * 420 + 90) * (0.65 + cfg.dropletQuality * 0.35)
              d.y += wallSlide * dt
              d.x = d.wallSide === -1 ? d.r : w - d.r

              const smear = (0.35 + s * 0.75) * d.r
              d.r += dt * smear * (1.0 - clamp(d.groundT / 1.25, 0, 1))
              d.alpha *= Math.pow(0.992, dt * 60)
            } else {
              const spread = (0.6 + s * 0.7) * d.r
              d.r += dt * spread * (1.0 - clamp(d.groundT / 0.9, 0, 1))
              d.alpha *= Math.pow(0.985, dt * 60)
            }
          }

          const cx = d.x
          const isWall = d.grounded && d.groundMode === "wall"
          const cy = isWall ? d.y : d.grounded ? h - 16 : d.y

          // Drop body: slow, heavy, slightly translucent.
          const grad = ctx.createRadialGradient(
            cx - d.r * 0.15,
            cy - d.r * 0.25,
            Math.max(0.5, d.r * 0.1),
            cx,
            cy,
            d.r * 1.15
          )

          const gold = "rgba(217,194,169," + d.alpha * 0.42 + ")"
          const cream = "rgba(245,240,230," + d.alpha * 0.22 + ")"
          grad.addColorStop(0, gold)
          grad.addColorStop(0.5, cream)
          grad.addColorStop(1, "rgba(0,0,0,0)")

          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.ellipse(
            cx,
            cy,
            d.r * (isWall ? 0.52 : 0.62),
            d.r * (isWall ? 1.05 : d.grounded ? 0.38 : 0.95),
            0,
            0,
            Math.PI * 2
          )
          ctx.fill()

          // Spec highlight to feel “soft & cool”.
          ctx.fillStyle = `rgba(245,240,230,${d.alpha * 0.10})`
          ctx.beginPath()
          ctx.arc(cx - d.r * 0.18, cy - d.r * 0.26, d.r * 0.12, 0, Math.PI * 2)
          ctx.fill()

          if (d.grounded) {
            const wallExpired =
              d.groundMode === "wall" &&
              (d.y > h + 60 || d.groundT > 2.3 || d.alpha < 0.02)
            const floorExpired =
              d.groundMode !== "wall" &&
              (d.groundT > 1.2 || d.alpha < 0.02 || d.r > h * 0.12)
            if (wallExpired || floorExpired) droplets.splice(i, 1)
          }
        }

        raf2 = window.requestAnimationFrame(step)
      }

      raf2 = window.requestAnimationFrame(step)

      return () => {
        window.removeEventListener("resize", onResize)
        if (raf2) window.cancelAnimationFrame(raf2)
      }
    }

    const obs = new IntersectionObserver(
      (entries) => {
        const top = entries[0]
        if (top?.isIntersecting) startIfNeeded()
      },
      { threshold: 0.2 }
    )

    obs.observe(wrapper)
    return () => obs.disconnect()
  }, [
    prefersReducedMotion,
    imageUrl,
    seed,
    tier,
    config,
    userId,
    cognitiveMetricsRef,
    essenceVisualPreset,
  ])

  return (
    <div
      ref={wrapperRef}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {/* WebGL light + micro bump */}
      <canvas
        ref={webglRef}
        className="absolute inset-0 w-full h-full mix-blend-overlay opacity-45"
        style={{ opacity: config.layerOpacity }}
      />

      {/* Viscosity droplets (2D) */}
      <canvas
        ref={dropletRef}
        className="absolute inset-0 w-full h-full opacity-70"
        style={{ opacity: Math.min(1, config.layerOpacity + 0.15) }}
      />
    </div>
  )
}

