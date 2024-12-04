export const LANGUAGES = ['english', 'spanish', 'not-set'] as const

const [english, spanish] = LANGUAGES

export type Language = (typeof LANGUAGES)[number]

export const AVAILABLE_LANGUAGES = [english, spanish] as const
