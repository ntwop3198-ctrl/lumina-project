# 브랜드송 작업 목록 — 2026-08~09 배치

> **정리일** 2026-09-15 · Cursor 멘토  
> **범위** 이 기간에 연 오픈 PR의 Suno 정본만. 인생 앨범·호텔 시리즈·위인 축은 여기 넣지 않는다.  
> **상태** 가사 정본이지 음원 마스터가 아니다. 효능·매출·실시간 수치 없음.

칸을 한 장으로 본다. 청소년 편과 성인 챈트 곡은 **섞어 부르지 않는다.** 상호가 없는 CM은 品牌歌와 **샘플**을 가른다.  
번호 매대: `lumina-suno-shelf-taxonomy.md`

---

## 한 줄 지도

| 칸 | 곡 | 보컬 | BPM | 챈트 | PR | 상태 |
|----|-----|------|-----|------|-----|------|
| **성장·정체성 #8** | 청소년 편 001–015 | 곡마다 여/남 교대 | 76–168 | **없음** | [#5](https://github.com/ntwop3198-ctrl/lumina-project/pull/5) draft | **13곡 v1** · 009 초안 · 015 프레임 |
| **求小 · 온(穩)** | 나는 거북이야 5어 | **남** | 96 | 구소구고구기 · 진공묘유 | [#6](https://github.com/ntwop3198-ctrl/lumina-project/pull/6) draft | **v1 5어** |
| **조선족 티키타카** | 오그랑땡 쌍통망통 5어 | 듀엣 | 116 | 구소구고구기 · 진공묘유 | [#2](https://github.com/ntwop3198-ctrl/lumina-project/pull/2) draft | **v1 5어** · [#1](https://github.com/ntwop3198-ctrl/lumina-project/pull/1)은 ZH 없는 선행 |
| **가면 · Groove** | Real Talk 4어 | **남** | 126 | 구소! 구고! 구기! · 진-공-묘-유 | [#3](https://github.com/ntwop3198-ctrl/lumina-project/pull/3) draft | **v1 4어** · KO 원곡 이 배치에 없음 |
| **가시내 · Chic** | True Beauty 4어 | **여** | 126 | 구소! 구고! 구기! · 진-공-묘-유 | [#4](https://github.com/ntwop3198-ctrl/lumina-project/pull/4) draft | **v1 4어** · KO 원곡 이 배치에 없음 |
| **브랜드곡 샘플** | 당신에게 더하다 | **여** A안 | 118 | 구소구고구기 · 진공묘유 | [#9](https://github.com/ntwop3198-ctrl/lumina-project/pull/9) draft | **v1 KO** · 상호 **대기** |
| **2-4 인생 잠언** | 반팔티만도 못한 헛똑똑이들아 | **남** A안 | 120 | 구소구고구기 · 진공묘유 | [#10](https://github.com/ntwop3198-ctrl/lumina-project/pull/10) draft | **v1 KO** · 品牌歌 **해당 없음** |
| **2-4 인생 잠언** | 강물은 흐르고 싶다 | **남** A안 | 88 | 구소구고구기 · 진공묘유 | [#11](https://github.com/ntwop3198-ctrl/lumina-project/pull/11) draft | **v1 KO** · 이쪽·저쪽 잠금 |

**합계:** 청소년 13 v1 + 거북이 5 + 오그랑땡 5 + Real Talk 4 + True Beauty 4 + 더하다 1 + 반팔티 1 + 강물 1 = **34 v1 트랙.**  
대기: 청소년 009 초안, 015 프레임, 더하다 **상호**.

---

## 공통 Suno 문법 (전 칸)

| 규칙 | 정본 | 금지 |
|------|------|------|
| 섹션 태그 | 영어 `[Intro]` `[Verse 1]` `[Chorus]` … | `[인트로]` `[후렴]` |
| 연주·효과 | `[]` 영어 메타 | `(gentle…)` 한글 지시 |
| Style | **스타일란** 끝 `Korean only` / `Mandarin Chinese only` / `English only` / `Japanese only` / `Vietnamese only` | 가사란 `[Style:]` |
| 가사 구두점 | **없음** (쉼표·느낌표가 숨 끊김) | `I am a turtle,` |
| 효능 | 과정·지금 | 빛나는 내일 · 피어날 테니 · 수명·매출 |

JA 챈트 재생성: **グソグゴグギ** · **クソクゴクギ** 금지.

---

## A. 청소년 편 — 성장·정체성 (#8)

색인: `lumina-youth-identity-series-suno.md`  
붙여넣기: `lumina-youth-identity-series-suno-paste.md` (001–008 · 010–014)  
브랜치: `cursor/youth-not-fully-grown-suno-8bf8`

성인 求小 슬로건을 **넣지 않는다.** 구소는 소매·빈칸·골목 같은 구체다.  
원칙: 효능 단정 금지 · 자립≠고립 · 어른을 적으로 두지 않음.

| # | 제목 | 보컬 | BPM | 훅 | 상태 | 정본 |
|---|------|------|-----|-----|------|------|
| **001** | 아직 다 자라지 않았을 뿐 | 여 | 94 | 아직 다 자라지 않았을 뿐이야 | v1 | `lumina-youth-not-fully-grown-yet-suno.md` |
| **002** | 반쪽짜리 어른 | 남 | 108 | 내 마음은 아직 빈칸인걸 | v1 | `lumina-youth-half-adult-suno.md` |
| **003** | 나답게라는 숙제 | 여 | 168 | 나답게 산다는 게 뭔데 | v1 | `lumina-youth-be-yourself-homework-suno.md` |
| **004** | 거울 속 낯선 얼굴 | 남 | 82 | 거울 속 낯선 얼굴 너는 누구니 | v1 | `lumina-youth-stranger-in-the-mirror-suno.md` |
| **005** | 열일곱의 나에게 | 여 | 76 | 열일곱의 나에게 말해주고 싶어 | v1 | `lumina-youth-to-myself-at-seventeen-suno.md` |
| **006** | 어제보다 조금 큰 나 | 남 | 128 | 어제보다 딱 일 밀리미터만큼 | v1 | `lumina-youth-a-little-bigger-than-yesterday-suno.md` |
| **007** | 이름표 없는 나 | 여 | 92 | 이름표를 떼어내면 난 누구일까 | v1 | `lumina-youth-no-name-tag-suno.md` |
| **008** | 자라는 중입니다 | 남 | 86 | 아프다고 말해도 돼 | v1 | `lumina-youth-still-growing-suno.md` |
| **009** | 첫 알바비 | 여 | 110 | — | **초안** | `lumina-youth-first-paycheck-suno.md` · 보류 `lumina-youth-unfinished-is-ok-held.md` |
| **010** | 내가 나를 모르겠어 | 남 | 140 | 내가 나를 모르겠어 대체 난 누구니 | v1 | `lumina-youth-i-dont-know-myself-suno.md` |
| **011** | 껍질을 벗는 시간 | 여 | 132 | 지금은 껍질을 벗는 시간 | v1 | `lumina-youth-shedding-the-role-suno.md` |
| **012** | 어른 흉내 | 남 | 104 | 어른 흉내를 내는 내 모습 | v1 | `lumina-youth-playing-adult-suno.md` |
| **013** | 접수창구 | 여 | 90 | 처음 해보는 일은 원래 어색해 | v1 | `lumina-youth-reception-desk-suno.md` |
| **014** | 남의 시계 | 남 | 138 | 남의 시계를 자꾸 들여다봐 | v1 | `lumina-youth-others-clock-suno.md` |
| **015** | 내가 고른 하나 | 여 | 102 | — | **프레임** | `lumina-youth-013-015-redesign-suno.md` |

1388 캡션은 **가사 밖**에만. 해당: 004 · 005 · 008 · 010.

### 제목 폐기 (각도는 살림)

| 폐기 제목 | 자리 | 잠금 |
|-----------|------|------|
| 완성되지 않아도 괜찮아 | 009 | **첫 알바비** · 시간을 판 첫날. 돈을 벌면 어른 금지 |
| 아직 서툰 걸음 | 013 | **접수창구** · 첫 실행. 서툴다/걸음은 001 영역 |
| 나만의 속도로 | 014 | **남의 시계** · 비교의 밤. 천천히/늦은 게 아니야는 001 |
| 다 컸다는 착각 | 015 | **내가 고른 하나**. 002+012와 겹침 |
| 혼자 있는 시간 | 015 후보 | 고립 / 007. 종결로 쓰지 않음 |

### 대기

- **015** 「내가 고른 하나」 멘티 초안 — 구체로 고른 하나. 다 컸다 · 온전한 나 · 혼자 있는 시간 금지.
- **009** 「첫 알바비」 멘티 초안 후 판교. 편의점 심야 · 신분증 · 가짜 시급 · 돈을 벌면 어른 금지.

---

## B. 나는 거북이야 — 求小 · 한 걸음

색인: `lumina-naneun-geobugiya-multilingual-suno.md`  
붙여넣기: `lumina-naneun-geobugiya-suno-paste.md`  
브랜치: `cursor/i-am-a-turtle-suno-8bf8`  
Folk pop · **남성** · 96 bpm · 전어 한글 챈트.

| 언어 | Suno 제목 | 정본 |
|------|-----------|------|
| KO | 나는 거북이야 | `lumina-naneun-geobugiya-suno.md` |
| ZH | 我是乌龟 | `lumina-naneun-geobugiya-chinese-suno.md` |
| EN | I Am a Turtle | `lumina-naneun-geobugiya-english-suno.md` |
| JA | 僕は亀 | `lumina-naneun-geobugiya-japanese-suno.md` |
| VI | Tôi Là Chú Rùa | `lumina-naneun-geobugiya-vietnamese-suno.md` |

훅: **오늘 한 걸음 내일 한 걸음** / One step today one step tomorrow  
종결: **길에 남아 있는 것이 길의 전부야** / Staying on the road is the whole of it

제외: 求素求固求己 · wins in the end · 终点线 · 长寿/lives long · 가사 쉼표 · 🐢

---

## C. 오그랑땡 쌍통망통 — 티키타카 듀엣

색인: `lumina-ogeurangttaeng-ssangtongmangtong-multilingual-suno.md`  
붙여넣기: `lumina-ogeurangttaeng-ssangtongmangtong-suno-paste.md`  
브랜치: `cursor/ogeurangttaeng-ssangtongmangtong-zh-8bf8`  
Korean folk dance pop · 116 bpm.

**정본은 PR #2 (KO·ZH·EN·JA·VI).** PR #1은 ZH 없는 4어 선행 — 병합 시 #2를 따른다.

| 언어 | Suno 제목 | 정본 |
|------|-----------|------|
| KO | 오그랑땡 쌍통망통 | `lumina-ogeurangttaeng-ssangtongmangtong-suno.md` |
| ZH | 哦格朗当 双通忙通 | `lumina-ogeurangttaeng-ssangtongmangtong-chinese-suno.md` |
| EN | Ogeurangttaeng Ssangtongmangtong | `lumina-ogeurangttaeng-ssangtongmangtong-english-suno.md` |
| JA | オグランテン サントンマントン | `lumina-ogeurangttaeng-ssangtongmangtong-japanese-suno.md` |
| VI | Ogeurangttaeng Ssangtongmangtong | `lumina-ogeurangttaeng-ssangtongmangtong-vietnamese-suno.md` |

잠금: 장길·윤주 = 长吉·允珠 / Janggil·Yunju · 새알심 = 汤圆 · 고소하다 = 活该  
제외: 尹珠 · 双通盲通 · オグランテャン · dumpling · クソクゴクギ  
현장 인물 가능 — DistroKid 전 본인 재확인.

---

## D. Real Talk (Groove Dance Ver.)

색인: `lumina-real-talk-groove-dance-multilingual-suno.md`  
붙여넣기: `lumina-real-talk-groove-dance-suno-paste.md`  
브랜치: `cursor/real-talk-groove-dance-suno-8bf8`  
2000s k-pop electro hop · **남** · 126 bpm · **4어** (KO 원곡 이 배치에 없음).

| 언어 | Suno 제목 | 훅 | 정본 |
|------|-----------|-----|------|
| ZH | 真的吗？ | 真的？真的！ | `lumina-real-talk-groove-dance-chinese-suno.md` |
| EN | For Real? | Real? For real! | `lumina-real-talk-groove-dance-english-suno.md` |
| JA | 本気？ | 本気？本気だ！ | `lumina-real-talk-groove-dance-japanese-suno.md` |
| VI | Thật Chứ? | Thật chứ? Thật đấy! | `lumina-real-talk-groove-dance-vietnamese-suno.md` |

가면은 벗는 것이지 폭로가 아니다.  
제외: Seek low · 求卑 · 求所 · True Emptiness를 챈트 자리에 · 가사란 `[구소!]`

---

## E. True Beauty (Chic Dance Ver.)

색인: `lumina-true-beauty-chic-dance-multilingual-suno.md`  
붙여넣기: `lumina-true-beauty-chic-dance-suno-paste.md`  
브랜치: `cursor/true-beauty-chic-dance-suno-8bf8`  
k-pop bright dance pop · **여** · 126 bpm · **4어** (KO 원곡 이 배치에 없음).

| 언어 | Suno 제목 | 인트로 훅 | 정본 |
|------|-----------|-----------|------|
| ZH | 漂亮丫头 | 漂-亮-丫-头! | `lumina-true-beauty-chic-dance-chinese-suno.md` |
| EN | That Pretty Girl | That pret-ty girl! | `lumina-true-beauty-chic-dance-english-suno.md` |
| JA | 綺麗な子 | き-れ-い-な-子! | `lumina-true-beauty-chic-dance-japanese-suno.md` |
| VI | Cô Gái Đẹp | Cô-gái-đẹp! | `lumina-true-beauty-chic-dance-vietnamese-suno.md` |

예쁨은 낮출수록 높아진다 — 외모 효능·성형 약속 아님.  
제외: 俏丫头 · かわい子ちゃん · Pretty Girl 단독 제목 · Seek low

---

## F. 당신에게 더하다 — 브랜드곡 샘플

칸 규칙: `lumina-brand-anthem-shelf-suno.md`  
정본: `lumina-dangsinege-deohada-suno.md`  
붙여넣기: `lumina-dangsinege-deohada-suno-paste.md`

기업→고객 CM 결. **상호는 가사에 없다.** 메인 1-3(위로·치유) 제외. LG유플러스는 슬로건 추측으로 박지 않음.

| 항목 | 잠금 |
|------|------|
| 훅 | 당신에게 더하다 오늘도 곁에서 더하다 |
| Chorus 컷 | 완성되는 → **이어지는 이야기** |
| 칸 | **샘플** · 제안용이면 후렴에 상호 1회 |

---

## G. 반팔티만도 못한 헛똑똑이들아 — 2-4

정본: `lumina-banpalti-heottokttoki-suno.md`  
붙여넣기: `lumina-banpalti-heottokttoki-suno-paste.md`

풍자는 껍질. 메인 **2-4**. 5-2 · 2-2 · 品牌歌 제외.

| 항목 | 잠금 |
|------|------|
| 훅 | 반팔티만도 못한 헛똑똑이들아 |
| 뼈대 | 많이 안다고 다 잡는 게 아니고 |
| 반팔티 | **유형** · 실존 별명이면 공개 전 확인 |

---

## H. 강물은 흐르고 싶다 — 2-4

정본: `lumina-gangmureun-heureugo-sipda-suno.md`  
붙여넣기: `lumina-gangmureun-heureugo-sipda-suno-paste.md`

메인 **2-4**. 4-3 · 메인 6 · 2-3 메인 · 品牌歌 제외. 왼쪽·오른쪽 → **이쪽·저쪽**.

| 항목 | 잠금 |
|------|------|
| 훅 | 강물은 흐르고 싶다 그저 흐르고 싶다 |
| 뼈대 | 누가 옳은지보다 흐르는 게 먼저인데 |
| 갈림 | 상선약수(柔) · 38선(이산) · 선은 선으로(선악) |

---

## 칸 갈림 (같은 동물을 두 번 쓰지 않음)

| | 달팽이의 지혜 | 나는 거북이야 | 청소년 014 남의 시계 |
|--|----------------|----------------|----------------------|
| 축 | 準 · 방향 | 求小 · 한 걸음 | 비교의 밤 → 내 시계 |
| 챈트 | 稳准快 · 南辕北辙 | 구소구고구기 · 진공묘유 | **없음** |
| 토끼·결승 | Bridge에서 이미 물음 | **승부 재진술 금지** | 해당 없음 |
| BPM | 70–80 | **96** | **138** |
| 청자 | 성인 | 성인 | 15–18 |

Real Talk의 **가면**은 감정 칸 #78 전유와 닿는다. 청소년 010에서 가면을 뺀 이유를 유지한다.

---

## 다음

1. 청소년 **015** 초안 수신 → 판교 → v1 · paste pack 편입.  
2. 청소년 **009** 초안 수신 → 판교 → v1.  
3. Real Talk · True Beauty **KO 원곡**을 같은 문법으로 닫을지 여부.  
4. **당신에게 더하다** — 제안 대상 상호 한 줄, 또는 시연용 유지.  
5. **반팔티** — 실존 별명이면 공개 여부 한 줄.  
6. 음원 생성은 정본 붙여넣기 파일로. 이 문서는 목록이다.

---

## 한 줄

> **강물은 2-4다. 왼쪽·오른쪽은 뺐다. 009·015와 더하다 상호가 남았다.**
