import { useQuery } from '@tanstack/react-query'
import { useAuthedFetch } from '../useAuthedFetch'

export interface MembershipsIndex {
  id: string
  groupId: string
  userId: string
}

export const QUERY_KEY = 'useMemberships'

export const useMemberships = () => {
  const authedFetch = useAuthedFetch()

  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: async () => {
      const result = await authedFetch<{ memberships: MembershipsIndex[] }>({
        path: '/memberships',
        method: 'GET',
      })
      return result.json!.memberships
    },
  })
}
