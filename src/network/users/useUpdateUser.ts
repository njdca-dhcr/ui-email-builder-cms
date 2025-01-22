import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthedFetch } from '../useAuthedFetch'
import { UserShow, buildUseUserQueryKey } from './useUser'
import { USE_USERS_QUERY_KEY } from './useUsers'
import { UserRole } from 'src/appTypes'

interface UpdateUserSuccessfulResponse {
  user: UserShow
}

export interface UpdateUserErrorResponse {
  errors: { name: string }
}

type UpdateUserResponse = UpdateUserSuccessfulResponse | UpdateUserErrorResponse

interface UserAttributes {
  role: UserRole
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
      client.invalidateQueries({ queryKey: [USE_USERS_QUERY_KEY] })
    },
  })
}
