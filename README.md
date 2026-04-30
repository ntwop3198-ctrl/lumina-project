# 💄 Lumina - AI 기반 화장품 마케팅 솔루션

> 화장품 판매의 시작과 끝, AI로 1분 만에 완성하는 압도적 비주얼

[![Next.js](https://img.shields.io/badge/Next.js-14.0-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-2.39-3ecf8e?logo=supabase)](https://supabase.com/)

## ✨ 프로젝트 개요

Lumina는 화장품 업계 특화 AI 기술로 상세페이지와 홍보영상을 자동 생성하는 혁신적인 마케팅 솔루션입니다. 제품 사진 한 장으로 전문 디자이너 수준의 결과물을 1분 내에 완성합니다.

### 🎯 핵심 가치
- **효율성**: 제작 시간 90% 단축, 비용 80% 절감
- **품질**: 전문 디자이너 수준의 고퀄리티 결과물
- **일관성**: 브랜드 가이드라인 자동 적용
- **확장성**: 멀티 플랫폼 동시 최적화

## 🚀 빠른 시작

### 1️⃣ 프로젝트 클론 및 설치

```bash
# 의존성 설치
npm install

# 또는 yarn 사용
yarn install
```

### 2️⃣ 환경 변수 설정

`.env.local` 파일에서 Supabase 키를 실제 값으로 업데이트:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://nsdixrjwkbrrsjrfohnp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key

# App Configuration
NEXT_PUBLIC_APP_NAME=Lumina
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3️⃣ 데이터베이스 설정

Supabase SQL Editor에서 다음 SQL 실행:

<details>
<summary>📊 데이터베이스 스키마 (클릭하여 펼치기)</summary>

```sql
-- 루미 잔액 테이블
CREATE TABLE lumi_balances (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    balance DECIMAL(15,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 루미 거래 내역 테이블
CREATE TABLE lumi_transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    transaction_type VARCHAR(20) CHECK (transaction_type IN ('earn', 'spend', 'transfer')),
    amount DECIMAL(15,2) NOT NULL,
    description TEXT,
    reference_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 제품 테이블
CREATE TABLE products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price_lumi DECIMAL(15,2) NOT NULL,
    category VARCHAR(100),
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 및 보안 정책 설정
CREATE INDEX idx_lumi_balances_user_id ON lumi_balances(user_id);
CREATE INDEX idx_lumi_transactions_user_id ON lumi_transactions(user_id);
CREATE INDEX idx_products_is_active ON products(is_active);

-- RLS 활성화
ALTER TABLE lumi_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE lumi_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
```

</details>

### 4️⃣ 개발 서버 실행

```bash
npm run dev
```

🎉 **http://localhost:3000**에서 루미나 랜딩 페이지를 확인하세요!

## 📁 프로젝트 구조

```
lumina_project/
├── 📱 app/                    # Next.js App Router
│   ├── layout.tsx            # 루트 레이아웃
│   └── page.tsx              # 메인 랜딩 페이지
├── 🧩 components/            # React 컴포넌트
│   ├── 🎨 ui/               # 재사용 UI 컴포넌트
│   │   ├── button.tsx       # 프리미엄 버튼 컴포넌트
│   │   ├── card.tsx         # 카드 컴포넌트
│   │   ├── input.tsx        # 입력 컴포넌트
│   │   └── badge.tsx        # 배지 컴포넌트
│   └── 🏠 landing/          # 랜딩 페이지 섹션
│       ├── header.tsx       # 네비게이션 헤더
│       ├── hero.tsx         # 히어로 섹션
│       ├── before-after.tsx # Before/After 비교
│       ├── features.tsx     # 핵심 기능 소개
│       ├── pricing.tsx      # 요금제 안내
│       └── footer.tsx       # 푸터
├── 📚 lib/                   # 유틸리티 & 설정
│   ├── supabase.ts          # Supabase 클라이언트
│   ├── utils.ts             # 유틸리티 함수
│   └── types/               # TypeScript 타입
│       └── database.ts      # DB 타입 정의
├── 🎨 styles/               # 스타일링
│   └── globals.css          # 글로벌 CSS (프리미엄 테마)
└── 📄 public/               # 정적 파일
```

## 🛠 기술 스택

### Frontend
- **⚡ Next.js 14** - React 기반 풀스택 프레임워크
- **🔷 TypeScript** - 타입 안전성
- **🎨 Tailwind CSS** - 유틸리티 우선 CSS 프레임워크
- **🧩 Radix UI** - 접근성 우선 UI 컴포넌트

### Backend & Database
- **🗄️ Supabase** - 오픈소스 Firebase 대안
- **🐘 PostgreSQL** - 관계형 데이터베이스
- **🔐 Supabase Auth** - 인증 시스템
- **📡 Real-time API** - 실시간 데이터 동기화

### DevOps & Tools
- **📦 npm/yarn** - 패키지 관리
- **🔧 ESLint** - 코드 품질 관리
- **🎯 PostCSS** - CSS 후처리

## 🎨 디자인 시스템

### 🌈 프리미엄 컬러 팔레트

```css
/* Sand Beige & Rose Gold Theme */
--sand-beige: oklch(0.965 0.008 85);     /* 메인 배경 */
--cream: oklch(0.98 0.006 85);           /* 카드 배경 */
--rose-gold: oklch(0.68 0.09 55);        /* 브랜드 컬러 */
--rose-gold-light: oklch(0.76 0.07 55);  /* 라이트 액센트 */
--charcoal: oklch(0.25 0.01 60);         /* 텍스트 */
--warm-gray: oklch(0.45 0.02 60);        /* 보조 텍스트 */
```

### 🔤 타이포그래피
- **Primary**: Pretendard, Noto Sans KR
- **Mono**: Geist Mono
- **Serif**: Noto Serif KR, Cormorant Garamond

## 🌟 주요 기능

### 🎯 완성된 랜딩 페이지 섹션

1. **🏠 Hero Section**
   - 대형 브랜드 타이포그래피
   - 프리미엄 CTA 버튼
   - 부드러운 애니메이션 효과
   - 신뢰 지표 (99.9% 안정성, 1M+ 사용자)

2. **⚖️ Before & After**
   - 기존 시스템 vs 루미나 비교
   - 시각적 문제점-해결책 매칭
   - 인터랙티브 카드 레이아웃

3. **⚡ Features**
   - AI 기반 스마트 관리
   - 블록체인 보안
   - 프리미엄 파트너십
   - 실시간 거래
   - 통합 대시보드
   - 글로벌 네트워크

4. **💰 Pricing**
   - 3단계 요금제 (스타터/프리미엄/엔터프라이즈)
   - 상세 기능 비교표
   - 인기 플랜 하이라이트

5. **🔗 Header & Footer**
   - 반응형 네비게이션
   - 완전한 사이트맵
   - 소셜 미디어 링크

### 🎨 UI/UX 특징

- **✨ 프리미엄 디자인**: Sand Beige & Rose Gold 테마
- **📱 완전 반응형**: 모바일부터 데스크톱까지
- **🎭 부드러운 애니메이션**: 호버 효과 및 마이크로 인터랙션
- **♿ 접근성 고려**: WCAG 가이드라인 준수
- **🔍 SEO 최적화**: 메타데이터 및 시맨틱 HTML

## 📊 프로젝트 현황

### ✅ 완료된 작업
- [x] 프로젝트 초기 설정
- [x] Next.js 14 + TypeScript 환경 구축
- [x] Tailwind CSS 프리미엄 테마 적용
- [x] Supabase 통합 설정
- [x] 완전한 랜딩 페이지 구현
- [x] 반응형 디자인 완성
- [x] UI 컴포넌트 라이브러리 구축

### 🔄 다음 단계
- [ ] 사용자 인증 시스템 구현
- [ ] 루미 포인트 관리 대시보드
- [ ] 실시간 거래 시스템
- [ ] AI 추천 엔진 통합
- [ ] 파트너 브랜드 연동
- [ ] 모바일 앱 개발

## 🚀 배포 가이드

### Vercel 배포 (권장)

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel

# 환경 변수 설정
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
```

### 기타 플랫폼
- **Netlify**: `npm run build` 후 `out` 폴더 배포
- **AWS Amplify**: GitHub 연동 자동 배포
- **Docker**: `Dockerfile` 포함 (추후 추가 예정)

## 🤝 기여하기

루미나 프로젝트에 기여해주셔서 감사합니다!

### 🔧 개발 환경 설정
1. 이 저장소를 포크합니다
2. 새 브랜치를 생성합니다: `git checkout -b feature/amazing-feature`
3. 변경사항을 커밋합니다: `git commit -m 'Add amazing feature'`
4. 브랜치에 푸시합니다: `git push origin feature/amazing-feature`
5. Pull Request를 생성합니다

### 📝 코딩 컨벤션
- **TypeScript** 우선 사용
- **ESLint** 규칙 준수
- **Prettier** 코드 포맷팅
- **Conventional Commits** 메시지 형식

## 📞 지원 및 문의

- **📧 이메일**: support@lumina.co.kr
- **💬 Discord**: [Lumina 커뮤니티](https://discord.gg/lumina)
- **📚 문서**: [docs.lumina.co.kr](https://docs.lumina.co.kr)
- **🐛 이슈 리포트**: [GitHub Issues](https://github.com/lumina/issues)

## 📄 라이선스

이 프로젝트는 [MIT 라이선스](LICENSE) 하에 배포됩니다.

---

<div align="center">

**🌟 Lumina와 함께 새로운 디지털 경험을 시작하세요! 🌟**

Made with ❤️ by the Lumina Team

</div>