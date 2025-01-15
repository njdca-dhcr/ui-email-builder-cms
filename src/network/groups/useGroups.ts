import { useQuery } from '@tanstack/react-query'
import { useAuthedFetch } from '../useAuthedFetch'

export interface GroupIndexUser {
  id: string
  email: string
  membershipId: string
}

export interface GroupsIndex {
  id: string
  name: string
  description: string
  members: GroupIndexUser[]
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
