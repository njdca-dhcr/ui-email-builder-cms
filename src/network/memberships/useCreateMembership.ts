import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthedFetch } from '../useAuthedFetch'
import { buildUseMembershipQueryKey, MembershipShow } from '../memberships'

interface CreateMembershipSuccessfulResponse {
  membership: MembershipShow
}

export interface CreateMembershipErrorResponse {
  errors: { user: string; group?: string }
}

type CreateMembershipResponse = CreateMembershipSuccessfulResponse | CreateMembershipErrorResponse

export const useCreateMembership = () => {
  const client = useQueryClient()
  const authedFetch = useAuthedFetch()

  return useMutation({
    mutationFn: async (membership: {
      userId: string
      groupId: string
    }): Promise<CreateMembershipResponse> => {
      const result = await authedFetch<CreateMembershipResponse>({
        body: { membership },
        method: 'POST',
        path: '/memberships',
      })
      return result.json!
    },
    onSuccess: (result) => {
      if ('membership' in result) {
        const { membership } = result
        client.invalidateQueries({
          queryKey: [buildUseMembershipQueryKey(membership.id)],
        })
      }
    },
  })
}
