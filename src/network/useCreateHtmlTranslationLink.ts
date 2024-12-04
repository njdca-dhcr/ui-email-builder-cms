import { useMutation } from '@tanstack/react-query'
import { Language } from 'src/appTypes'
import { useAuthedFetch } from './useAuthedFetch'

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
}

export const useCreateHtmlTranslationLink = () => {
  const authedFetch = useAuthedFetch()

  return useMutation<CreateHtmlTranslationLinkResponse, Error, Variables>({
    mutationFn: async (options) => {
      const result = await authedFetch<CreateHtmlTranslationLinkResponse>({
        body: options,
        method: 'POST',
        path: '/html-translations-link',
      })
      return result.json!
    },
  })
}
