import { Language } from 'src/appTypes'
import { htmlTranslationsCdnUrl } from './backendUrl'

interface Options {
  emailTemplateId: string
  userId: string
  versionTimestamp: string
  language: Language
}

export const buildHtmlTranslationUrl = ({
  emailTemplateId,
  userId,
  versionTimestamp,
  language,
}: Options): string => {
  return `${htmlTranslationsCdnUrl()}/${emailTemplateId}/${userId}/${language}/${versionTimestamp}.html`
}
