const path = require("path")

function supabaseImageHosts() {
  const hosts = new Set()
  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  if (raw) {
    try {
      hosts.add(new URL(raw).hostname)
    } catch {
      // ignore invalid URL
    }
  }
  // DB에 남아 있을 수 있는 과거 프로젝트 호스트(폴백)
  ;["iyyfsdqkyhsuxjdjhbqu.supabase.co"].forEach((h) =>
    hosts.add(h)
  )
  return [...hosts].filter(Boolean).map((hostname) => ({
    protocol: "https",
    hostname,
    pathname: "/**",
  }))
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{ source: "/favicon.ico", destination: "/icon.svg", permanent: false }]
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      ...supabaseImageHosts(),
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' },
    ],
  },
  /**
   * Windows dev — 기본 `npm run dev`는 Webpack (안정).
   * - dev에서 webpack 기본 캐시 유지(청크 ID 불일치 완화).
   * - `.next`는 watch에서 제외하지 않음.
   * - `npm run clean`은 dev 종료 후에만 (포트 3001 먼저 비움 — package.json `clean`).
   * Turbopack(`npm run dev:turbo`)는 `.next`가 불완전할 때
   * `ENOENT ... app-build-manifest.json` / 500 루프가 날 수 있어 옵트인으로 둠.
   */
  webpack: (config, { dev, dir }) => {
    if (dev) {
      const root = path.resolve(dir)
      // 기본(파일시스템) 캐시 유지 — memory-only 캐시는 Windows에서 청크/런타임 불일치(276.js 누락 등)를 유발할 수 있음
      config.watchOptions = {
        ...config.watchOptions,
        followSymlinks: false,
        ...(process.platform === "win32"
          ? { poll: 1000, aggregateTimeout: 400 }
          : {}),
        ignored: [
          "**/node_modules/**",
          "**/.git/**",
          path.join(root, "node_modules"),
          path.join(root, ".git"),
        ],
      }
    }
    return config
  },
}

module.exports = nextConfig