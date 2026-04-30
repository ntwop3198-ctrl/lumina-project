/**
 * God-Class Alchemical Copy · Linguistic-Bridge
 * 의학·효능 직설(멈춤, 기적, 재생 등)을 인문학적 은유(기록, 심연, 리추얼)로 선치환.
 * 세부 컴플라이언스는 risk-analyzer가 이어서 처리합니다.
 */

const ORDERED_REPLACEMENTS: Array<{ pattern: RegExp; replacement: string }> = [
  {
    pattern: /피부 시간을 멈추는 블랙 오닉스의 기적/gi,
    replacement:
      "시간의 흐름조차 숨을 죽이는 블랙 오닉스의 심연, 당신의 정점을 영원으로 기록하는 고결한 리추얼",
  },
  {
    pattern: /피부 시간을 멈추는/gi,
    replacement: "시간의 결을 고요히 기록하는 듯한 정점을 향한",
  },
  {
    pattern: /시간을 멈추(?:는|었|어|였)/gi,
    replacement: "순간을 깊게 새기듯 이어지는",
  },
  {
    pattern: /멈추는 기적/gi,
    replacement: "고요히 가라앉는 아우라",
  },
  {
    pattern: /완전한 재생/gi,
    replacement: "리듬을 부드럽게 되찾는 케어",
  },
  {
    pattern: /세포(?:가|를)?\s*재생/gi,
    replacement: "피부 컨디션을 조율하는 데 도움을 주는",
  },
  {
    pattern: /재생시키(?:다|는|켜)/gi,
    replacement: "건강해 보이는 결을 가꾸는 데 도움을 주도록 설계된",
  },
]

export function applyLinguisticBridge(text: string): string {
  let out = text
  for (const { pattern, replacement } of ORDERED_REPLACEMENTS) {
    out = out.replace(pattern, replacement)
  }
  return out
}

/** Visual-Text Synchro-Shield: ‘시간’ 서사가 있을 때 배경 아우라를 켤지 판별 */
export function detectTemporalMetaphor(text: string): boolean {
  return /시간|영원|순간|리추얼|심연|기록|시계|멈춤|느려지|아우라|오닉스|정점|고결|숨을 죽이/.test(
    text,
  )
}
