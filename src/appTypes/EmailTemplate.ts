import { AppMode } from 'src/utils/appMode'
import { Tag } from './Tag'
import { EmailTranslation } from './EmailTranslation'

export namespace EmailTemplate {
  export namespace Base {
    export interface Config {
      name: string
      description?: string
      translations?: EmailTranslation.Base[]
      appModes?: AppMode[]
    }
  }

  export namespace Unique {
    export interface Config {
      id?: string
      name: string
      description?: string
      translations?: EmailTranslation.Unique[]
      tags?: Tag[]
      tagNames?: string[]
      versionTimestamp: string
      groupId?: string
    }
  }
}
