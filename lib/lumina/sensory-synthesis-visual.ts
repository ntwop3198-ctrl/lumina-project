/**
 * Synesthesia / Visual Haptics — 이미지·비주얼 엔진 프롬프트
 */

export const LUMINA_SYNESTHESIA_IMAGE_PROMPT_FRAGMENT = [
  "SYNESTHESIA / VISUAL HAPTICS: depict the instant sakura-pink essence is absorbed — not splashed — into skin microtexture; liquid wicks cleanly between stratum corneum ridges with zero tacky residue, readable as safe penetration.",
  "Physics cue: smooth capillary-like draw along skin grain, silver-edge meniscus dissolving into matte dew on epidermis; viewer should feel touch through sight (visual haptic).",
  "TEXTURE DEPTH: inside the pink serum, micro moisture beads and soft colloidal density — 'unwrapped core' vitality, not glitter.",
  "Copy pairing (for layout): alternate lines emphasizing 色 (visual delight) vs 觸 (tactile peace) — sight of sakura purity vs skin breathing ease.",
].join(" ")

export function buildSynesthesiaImagePrompt(): string {
  return LUMINA_SYNESTHESIA_IMAGE_PROMPT_FRAGMENT
}
