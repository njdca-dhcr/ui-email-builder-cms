import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthedFetch } from '../useAuthedFetch'
import { EmailTemplate } from 'src/appTypes'
import { QUERY_KEY as USE_EMAIL_TEMPLATES_QUERY_KEY } from './useEmailTemplates'
import { EmailTemplateShow } from './useEmailTemplate'

interface CreateEmailTemplateSuccessfulResponse {
  emailTemplate: EmailTemplateShow
}

export interface CreateEmailTemplateErrorResponse {
  errors: { name: string }
}

type CreateEmailTemplateResponse =
  | CreateEmailTemplateSuccessfulResponse
  | CreateEmailTemplateErrorResponse

export const useCreateEmailTemplate = () => {
  const client = useQueryClient()
  const authedFetch = useAuthedFetch()

  return useMutation({
    mutationFn: async (emailTemplate: EmailTemplate.Unique.Config) => {
      const result = await authedFetch<CreateEmailTemplateResponse>({
        body: { emailTemplate },
        method: 'POST',
        path: '/email-templates',
      })
      return result.json
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [USE_EMAIL_TEMPLATES_QUERY_KEY] })
    },
  })
}
