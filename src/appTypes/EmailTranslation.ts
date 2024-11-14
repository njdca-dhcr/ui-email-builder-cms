import { EmailParts } from './EmailParts'

export const LANGUAGES = ['english', 'spanish'] as const

type Language = (typeof LANGUAGES)[number]

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
