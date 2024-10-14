import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthedFetch } from '../useAuthedFetch'
import { buildUseUserQueryKey } from '../useUser'
import { buildUseGroupQueryKey } from '../groups'

export interface MembershipShow {
  id: string
  groupId: string
  userId: string
}

interface CreateGroupSuccessfulResponse {
  membership: MembershipShow
}

export interface CreateGroupErrorResponse {
  errors: { name: string; description?: string }
}

type CreateGroupResponse = CreateGroupSuccessfulResponse | CreateGroupErrorResponse

export const useCreateMembership = () => {
  const client = useQueryClient()
  const authedFetch = useAuthedFetch()

  return useMutation({
    mutationFn: async (membership: {
      userId: string
      groupId: string
    }): Promise<CreateGroupResponse> => {
      const result = await authedFetch<CreateGroupResponse>({
        body: { membership },
        method: 'POST',
        path: '/memberships',
      })
      return result.json!
    },
    onSuccess: (result) => {
      if ('membership' in result) {
        const { membership } = result
        client.invalidateQueries({ queryKey: [buildUseUserQueryKey(membership.userId)] })
        client.invalidateQueries({ queryKey: [buildUseGroupQueryKey(membership.groupId)] })
      }
    },
  })
}
