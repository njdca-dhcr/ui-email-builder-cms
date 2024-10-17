import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthedFetch } from '../useAuthedFetch'
import { MembershipShow } from './useCreateMembership'
import { useRef } from 'react'
import { buildUseGroupQueryKey } from '../groups'
import { buildUseUserQueryKey } from '../useUser'

export const useDestroyMembership = () => {
  const client = useQueryClient()
  const authedFetch = useAuthedFetch()
  const membershipRef = useRef<MembershipShow>()

  return useMutation({
    mutationFn: async (membership: MembershipShow): Promise<{ id: string }> => {
      membershipRef.current = membership
      const result = await authedFetch({
        path: `/memberships/${membership.id}`,
        method: 'DELETE',
      })
      return result.json as any
    },
    onSuccess: () => {
      if (membershipRef.current) {
        client.invalidateQueries({
          queryKey: [buildUseGroupQueryKey(membershipRef.current.groupId)],
        })
        client.invalidateQueries({
          queryKey: [buildUseUserQueryKey(membershipRef.current.userId)],
        })
      }
    },
  })
}
