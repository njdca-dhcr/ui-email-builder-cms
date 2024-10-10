import { useQuery } from '@tanstack/react-query'
import { useAuthedFetch } from '../useAuthedFetch'

export interface GroupsIndex {
  id: string
  name: string
  description: string
}

export const QUERY_KEY = 'useGroups'

export const useGroups = () => {
  const authedFetch = useAuthedFetch()

  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: async () => {
      const result = await authedFetch<{ groups: GroupsIndex[] }>({
        path: '/groups',
        method: 'GET',
      })
      return result.json!.groups
    },
  })
}
