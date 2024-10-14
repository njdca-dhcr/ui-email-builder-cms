import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthedFetch } from '../useAuthedFetch'
import { QUERY_KEY as USE_GROUPS_QUERY_KEY } from './useGroups'
import { buildUseGroupQueryKey } from './useGroup'

export const useDestroyGroup = () => {
  const client = useQueryClient()
  const authedFetch = useAuthedFetch()

  return useMutation({
    mutationFn: async (id: string): Promise<{ id: string }> => {
      const result = await authedFetch({
        path: `/groups/${id}`,
        method: 'DELETE',
      })
      const { group } = result.json as any
      return group
    },
    onSuccess: (user) => {
      client.invalidateQueries({ queryKey: [USE_GROUPS_QUERY_KEY] })
      client.invalidateQueries({ queryKey: [buildUseGroupQueryKey(user.id)] })
    },
  })
}
