import { useQuery } from '@tanstack/react-query'
import { useAuthedFetch } from '../useAuthedFetch'
import { GroupsIndex } from '../groups'

export const GROUP_MEMBERSHIPS_QUERY_KEY = 'useGroupMemberships'

export const useGroupMemberships = (id: string) => {
  const authedFetch = useAuthedFetch()

  return useQuery({
    queryKey: [GROUP_MEMBERSHIPS_QUERY_KEY],
    queryFn: async () => {
      const result = await authedFetch<{ groups: GroupsIndex[] }>({
        path: `/users/${id}/memberships`,
        method: 'GET',
      })
      return result.json!.groups
    },
  })
}
