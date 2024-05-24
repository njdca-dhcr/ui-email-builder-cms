import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthedFetch } from './useAuthedFetch'
import { QUERY_KEY as USE_EMAIL_TEMPLATES_QUERY_KEY } from './useEmailTemplates'

export const useDestroyEmailTemplate = () => {
  const client = useQueryClient()
  const authedFetch = useAuthedFetch()

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await authedFetch({
        path: `/email-templates/${id}`,
        method: 'DELETE',
      })
      return result.json
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [USE_EMAIL_TEMPLATES_QUERY_KEY] })
    },
  })
}
