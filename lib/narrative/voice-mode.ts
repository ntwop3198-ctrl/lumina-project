export type VoiceMode = 'confession' | 'neutral'

export const DEFAULT_VOICE_MODE: VoiceMode = 'neutral'

export function isVoiceMode(v: string): v is VoiceMode {
  return v === 'confession' || v === 'neutral'
}
