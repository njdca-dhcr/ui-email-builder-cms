import { useQuery } from '@tanstack/react-query'
import { useAuthedFetch } from './useAuthedFetch'

export interface EmailTemplateIndex {
  id: string
  userId: string
  name: string
  description?: string
}

export const useEmailTemplates = () => {
  const authedFetch = useAuthedFetch()

  return useQuery({
    queryKey: ['useEmailTemplates'],
    queryFn: async () => {
      const result = await authedFetch<{ emailTemplates: EmailTemplateIndex[] }>({
        path: '/email-templates',
        method: 'GET',
      })
      return result.json!.emailTemplates
    },
  })
}
