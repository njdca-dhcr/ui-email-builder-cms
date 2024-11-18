import { EmailParts } from './EmailParts'

export const LANGUAGES = ['english', 'spanish', 'not-set'] as const
const [english, spanish] = LANGUAGES

export type Language = (typeof LANGUAGES)[number]

export const AVAILABLE_LANGUAGES = [english, spanish] as const

export namespace EmailTranslation {
  export interface Base {
    language: Language
    components: EmailParts.Base.Component[]
    previewText?: string
  }

  export interface Unique {
    language: Language
    components: EmailParts.Unique.Component[]
    previewText?: string
  }
}
