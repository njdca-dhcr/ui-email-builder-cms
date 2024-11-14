import { AppMode } from 'src/utils/appMode'
import { EmailParts } from './EmailParts'
import { Tag } from './Tag'
import { EmailTranslation } from './EmailTranslation'

export namespace EmailTemplate {
  export namespace Base {
    export interface Config {
      name: string
      description?: string
      previewText?: string
      components?: EmailParts.Base.Component[]
      translations?: EmailTranslation.Base[]
      appModes?: AppMode[]
    }
  }

  export namespace Unique {
    export interface Config {
      id?: string
      name: string
      description?: string
      previewText?: string
      components?: EmailParts.Unique.Component[]
      translations?: EmailTranslation.Unique[]
      tags?: Tag[]
      tagNames?: string[]
    }
  }
}
