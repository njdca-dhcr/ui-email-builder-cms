import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthedFetch } from '../useAuthedFetch'
import { buildUseGroupQueryKey } from './useGroup'
import { QUERY_KEY } from './useGroups'

interface UpdateGroupSuccessfulResponse {
  group: { id: string }
}

export interface UpdateGroupErrorResponse {
  errors: { name: string; description?: string }
}

type UpdateGroupResponse = UpdateGroupSuccessfulResponse | UpdateGroupErrorResponse

interface GroupAttributes {
  name: string
  description: string
}

export const useUpdateGroup = (id: string) => {
  const client = useQueryClient()
  const authedFetch = useAuthedFetch()

  return useMutation({
    mutationFn: async (group: GroupAttributes) => {
      const result = await authedFetch<UpdateGroupResponse>({
        body: { group },
        method: 'PATCH',
        path: `/groups/${id}`,
      })
      return result.json
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [buildUseGroupQueryKey(id)] })
      client.invalidateQueries({ queryKey: [QUERY_KEY] })
    },
  })
}
