import { useQuery } from '@tanstack/react-query'
import { EmailTemplate } from 'src/appTypes'
import { useAuthedFetch } from './useAuthedFetch'

export interface EmailTemplateShow extends EmailTemplate.UniqueConfig {
  id: string
}

export const buildUseEmailTemplateQueryKey = (id: string): string => `useEmailTemplate('${id}')`

export const useEmailTemplate = (id: string) => {
  const authedFetch = useAuthedFetch()

  return useQuery({
    queryKey: [buildUseEmailTemplateQueryKey(id)],
    queryFn: async () => {
      const result = await authedFetch<{ emailTemplate: EmailTemplateShow }>({
        path: `/email-templates/${id}`,
        method: 'GET',
      })
      return result.json?.emailTemplate
    },
  })
}
