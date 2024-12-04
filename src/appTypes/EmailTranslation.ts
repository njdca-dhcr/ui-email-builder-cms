import { EmailParts } from './EmailParts'
import { Language } from './Languages'

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
