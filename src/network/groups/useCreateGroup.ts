import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthedFetch } from '../useAuthedFetch'
import { QUERY_KEY as USE_GROUPS_KEY } from './useGroups'

export interface CreateGroupSuccessfulResponse {
  group: { id: string; name: string }
}

export interface CreateGroupErrorResponse {
  errors: { name: string; description?: string }
}

export type CreateGroupResponse = CreateGroupSuccessfulResponse | CreateGroupErrorResponse

export const useCreateGroup = () => {
  const client = useQueryClient()
  const authedFetch = useAuthedFetch()

  return useMutation({
    mutationFn: async (group: { name: string; description: string }) => {
      const result = await authedFetch<CreateGroupResponse>({
        body: { group },
        method: 'POST',
        path: '/groups',
      })
      return result.json
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [USE_GROUPS_KEY] })
    },
  })
}
