import { useQueries } from '@tanstack/react-query'
import { EmailTemplate, Language } from 'src/appTypes'
import { useAuthedFetch } from './useAuthedFetch'
import { renderEmailTranslationToString } from 'src/templates/emailHtmlDocument/renderEmailTranslationToString'
import { useUserInfo } from 'src/utils/UserInfoContext'

interface CreateHtmlTranslationLinkSuccessfulResponse {
  translationUrl: string
}

interface CreateHtmlTranslationLinkErrorResponse {
  error: object
}

type CreateHtmlTranslationLinkResponse =
  | CreateHtmlTranslationLinkSuccessfulResponse
  | CreateHtmlTranslationLinkErrorResponse

interface Variables {
  emailTemplateId: string
  language: Language
  htmlTranslation: string
  versionTimestamp: string
}

export const useKeepHtmlTranslationsLinksPopulated = (
  emailTemplate: EmailTemplate.Unique.Config,
) => {
  const translations = emailTemplate.translations ?? []
  const authedFetch = useAuthedFetch()
  const [userInfo] = useUserInfo()

  return useQueries({
    queries: translations.map((translation) => ({
      queryKey: [emailTemplate.id, translation.language, emailTemplate.versionTimestamp],
      queryFn: async () => {
        const result = await authedFetch<CreateHtmlTranslationLinkResponse, Variables>({
          path: '/html-translations-link',
          method: 'POST',
          body: {
            emailTemplateId: emailTemplate.id!,
            language: translation.language,
            versionTimestamp: emailTemplate.versionTimestamp,
            htmlTranslation: renderEmailTranslationToString({
              emailTemplate,
              translation,
              userInfo,
            }),
          },
        })
        const json = result.json

        if (json && 'translationUrl' in json) {
          json.translationUrl
          return { [translation.language]: json.translationUrl }
        } else {
          return {}
        }
      },
    })),
    combine: (results): { isSuccess: boolean; english?: string; spanish?: string } => {
      let data = {}

      results.forEach((result) => {
        data = { ...data, ...result.data }
      })

      return {
        ...data,
        isSuccess: results.every((result) => result.isSuccess),
      }
    },
  })
}
