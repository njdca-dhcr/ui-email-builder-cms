import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { useIsSignedIn } from 'src/utils/AuthContext'
import { useAuthedFetch } from './useAuthedFetch'

export interface UserShow {
  banner?: object
  departmentSeal?: object
  stateSeal?: object
  disclaimer?: object
}

export const QUERY_KEY = 'useUser'

export const useUser = (): UseQueryResult<UserShow> & { enabled: boolean } => {
  const enabled = useIsSignedIn()
  const authedFetch = useAuthedFetch()

  const result = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: async () => {
      const result = await authedFetch<{ user: UserShow }>({
        path: '/users/current',
        method: 'GET',
      })
      return result.json!.user
    },
    enabled,
  })
  return { ...result, enabled }
}
