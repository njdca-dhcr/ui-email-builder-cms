import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthedFetch } from '../useAuthedFetch'
import { EmailTemplate } from 'src/appTypes'
import { EmailTemplateShow, buildUseEmailTemplateQueryKey } from './useEmailTemplate'
import { QUERY_KEY } from './useEmailTemplates'

interface UpdateEmailTemplateSuccessfulResponse {
  emailTemplate: EmailTemplateShow
}

export interface UpdateEmailTemplateErrorResponse {
  errors: { name: string }
}

type UpdateEmailTemplateResponse =
  | UpdateEmailTemplateSuccessfulResponse
  | UpdateEmailTemplateErrorResponse

export const useUpdateEmailTemplate = (id: string) => {
  const client = useQueryClient()
  const authedFetch = useAuthedFetch()

  return useMutation({
    mutationFn: async (emailTemplate: EmailTemplate.Unique.Config) => {
      const result = await authedFetch<UpdateEmailTemplateResponse>({
        body: { emailTemplate },
        method: 'PATCH',
        path: `/email-templates/${id}`,
      })
      return result.json
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [buildUseEmailTemplateQueryKey(id)] })
      client.invalidateQueries({ queryKey: [QUERY_KEY] })
    },
  })
}
