import { useQuery } from '@tanstack/react-query'
import { useAuthedFetch } from '../useAuthedFetch'

export interface MembershipShow {
  id: string
  groupId: string
  userId: string
}

export const buildUseMembershipQueryKey = (id: string): string => `useMembership('${id}')`

export const useMembership = (id: string) => {
  const authedFetch = useAuthedFetch()

  return useQuery({
    queryKey: [buildUseMembershipQueryKey(id)],
    queryFn: async () => {
      const result = await authedFetch<{ membership: MembershipShow }>({
        path: `/memberships/${id}`,
        method: 'GET',
      })
      return result.json!.membership
    },
  })
}

// Consider whether this should exist since there is no route for it yet
