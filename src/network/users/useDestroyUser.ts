import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthedFetch } from '../useAuthedFetch'
import { USER_USERS_QUERY_KEY as USE_USERS_QUERY_KEY } from './useUsers'
import { buildUseUserQueryKey } from './useUser'

export const useDestroyUser = () => {
  const client = useQueryClient()
  const authedFetch = useAuthedFetch()

  return useMutation({
    mutationFn: async (id: string): Promise<{ id: string }> => {
      const result = await authedFetch({
        path: `/users/${id}`,
        method: 'DELETE',
      })
      const { user } = result.json as any
      return user
    },
    onSuccess: (user) => {
      client.invalidateQueries({ queryKey: [USE_USERS_QUERY_KEY] })
      client.invalidateQueries({ queryKey: [buildUseUserQueryKey(user.id)] })
    },
  })
}
