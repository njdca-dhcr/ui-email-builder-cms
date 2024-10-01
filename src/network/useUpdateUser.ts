import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthedFetch } from './useAuthedFetch'
import { UserShow, buildUseUserQueryKey } from './useUser'
import { QUERY_KEY } from './useUsers'

interface UpdateUserSuccessfulResponse {
  user: UserShow
}

export interface UpdateUserErrorResponse {
  errors: { name: string }
}

type UpdateUserResponse = UpdateUserSuccessfulResponse | UpdateUserErrorResponse

interface UserAttributes {
  role: 'admin' | 'member'
}

export const useUpdateUser = (id: string) => {
  const client = useQueryClient()
  const authedFetch = useAuthedFetch()

  return useMutation({
    mutationFn: async (user: UserAttributes) => {
      const result = await authedFetch<UpdateUserResponse>({
        body: { user },
        method: 'PATCH',
        path: `/users/${id}`,
      })
      return result.json
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [buildUseUserQueryKey(id)] })
      client.invalidateQueries({ queryKey: [QUERY_KEY] })
    },
  })
}
