import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthedFetch } from './useAuthedFetch'
import { EmailTemplate } from 'src/appTypes'
import { QUERY_KEY as USE_EMAIL_TEMPLATES_QUERY_KEY } from './useEmailTemplates'

export const useCreateEmailTemplate = () => {
  const client = useQueryClient()
  const authedFetch = useAuthedFetch()

  return useMutation({
    mutationFn: async (emailTemplate: EmailTemplate.UniqueConfig) => {
      const result = await authedFetch<{
        emailTemplate: EmailTemplate.UniqueConfig & { id: string }
      }>({
        body: { emailTemplate },
        method: 'POST',
        path: '/email-templates',
      })
      return result.json?.emailTemplate
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [USE_EMAIL_TEMPLATES_QUERY_KEY] })
    },
  })
}
