import { useQuery } from '@tanstack/react-query'
import { useAuthedFetch } from './useAuthedFetch'

export interface BatchTagIndex {
  id: string
  name: string
}

export const QUERY_KEY = 'useBatchTags'

export const useBatchTags = (tags: string[]) => {
  const authedFetch = useAuthedFetch()
  const queryEnabled = tags.length > 0

  return useQuery({
    enabled: queryEnabled,
    queryKey: [QUERY_KEY, tags],
    queryFn: async () => {
      const result = await authedFetch<{ tags: BatchTagIndex[] }>({
        path: '/tags/batch',
        method: 'POST',
        body: { tags },
      })
      return result.json!.tags
    },
  })
}
