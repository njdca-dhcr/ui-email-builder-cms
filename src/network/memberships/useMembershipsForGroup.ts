import { useQuery } from '@tanstack/react-query'
import { useAuthedFetch } from '../useAuthedFetch'
import { UsersIndex } from '../users/useUsers'

export const USER_MEMBERSHIPS_QUERY_KEY = 'useUserMemberships'

export const useMembershipsForGroup = (id: string) => {
  const authedFetch = useAuthedFetch()

  return useQuery({
    queryKey: [USER_MEMBERSHIPS_QUERY_KEY],
    queryFn: async () => {
      const result = await authedFetch<{ users: UsersIndex[] }>({
        path: `/groups/${id}/memberships`,
        method: 'GET',
      })
      return result.json!.users
    },
  })
}
