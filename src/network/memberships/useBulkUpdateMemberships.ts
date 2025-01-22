import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthedFetch } from '../useAuthedFetch'
import { buildUseGroupQueryKey, QUERY_KEY as useGroupsQueryKey } from '../groups'

interface Options {
  userIdsToAdd: string[]
  membershipIdsToDelete: string[]
  groupId: string
}

export const useBulkUpdateMemberships = () => {
  const client = useQueryClient()
  const authedFetch = useAuthedFetch()

  return useMutation({
    mutationFn: async ({ userIdsToAdd, membershipIdsToDelete, groupId }: Options) => {
      const promises = [
        ...userIdsToAdd.map((userId) => {
          return authedFetch({
            path: '/memberships',
            method: 'POST',
            body: { membership: { userId, groupId } },
          })
        }),

        ...membershipIdsToDelete.map((membershipId) => {
          return authedFetch({
            path: `/memberships/${membershipId}`,
            method: 'DELETE',
          })
        }),
      ]

      await Promise.all(promises)
      return groupId
    },
    onSuccess: (groupId) => {
      client.invalidateQueries({ queryKey: [buildUseGroupQueryKey(groupId)] })
      client.invalidateQueries({ queryKey: [useGroupsQueryKey] })
    },
  })
}
