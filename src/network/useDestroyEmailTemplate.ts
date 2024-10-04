import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthedFetch } from './useAuthedFetch'
import { QUERY_KEY as USE_EMAIL_TEMPLATES_QUERY_KEY } from './useEmailTemplates'
import { buildUseEmailTemplateQueryKey } from './useEmailTemplate'

export const useDestroyEmailTemplate = () => {
  const client = useQueryClient()
  const authedFetch = useAuthedFetch()

  return useMutation({
    mutationFn: async (id: string): Promise<{ id: string }> => {
      const result = await authedFetch({
        path: `/email-templates/${id}`,
        method: 'DELETE',
      })

      const { emailTemplate } = result.json as any

      return emailTemplate
    },
    onSuccess: (emailTemplate) => {
      client.invalidateQueries({ queryKey: [USE_EMAIL_TEMPLATES_QUERY_KEY] })
      client.invalidateQueries({ queryKey: [buildUseEmailTemplateQueryKey(emailTemplate.id)] })
    },
  })
}
