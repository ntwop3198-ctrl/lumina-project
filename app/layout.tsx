import type { Metadata } from 'next'
import { Inter, Noto_Serif_KR } from 'next/font/google'
import RootProviders from '@/components/root-providers'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const notoSerifKr = Noto_Serif_KR({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
  title: 'LUMINA – 프리미엄 K-뷰티를 위한 브랜딩 플랫폼',
  description:
    '확신(Conviction)을 시장 언어로 번역합니다. 고기능 앰플 등 프리미엄 인디 브랜드를 위한 루미나 브랜딩 팩토리.',
  authors: [{ name: 'Lumina Team' }],
  openGraph: {
    title: 'LUMINA – 범용 브랜딩 OS, 모든 산업을 위한 명품 서사',
    description:
      '어떤 비즈니스든 동일한 OS로 브랜드를 세웁니다. 진단·정체성·상세·영상·런칭·성장까지 한 플랫폼에서 설계하고 실행하세요.',
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LUMINA – Universal Branding OS',
    description:
      '분야를 불문하는 브랜딩 운영체제. 철학과 실행을 시스템으로 증폭하는 LUMINA.',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/*
          Nanum/Playfair/Pretendard: 다수 컴포넌트가 font-['Nanum_Myeongjo'] 등으로 직접 참조.
          점진적으로 next/font 변수로 옮길 때까지 링크 유지.
        */}
        {/* eslint-disable @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@300;400;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,500&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.css"
        />
        {/* eslint-enable @next/next/no-page-custom-font */}
      </head>
      <body className={`${inter.variable} ${notoSerifKr.variable} font-sans antialiased bg-background text-foreground`}>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  )
}
