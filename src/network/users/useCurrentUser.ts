import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { useIsSignedIn } from 'src/utils/AuthContext'
import { useAuthedFetch } from '../useAuthedFetch'
import { UserRole } from 'src/appTypes'

export interface CurrentUserEmailConfig {
  banner?: object
  departmentSeal?: object
  stateSeal?: object
  disclaimer?: object
}

export interface CurrentUser extends CurrentUserEmailConfig {
  role?: UserRole
  id: string
  email: string
}

export const USE_CURRENT_USER_QUERY_KEY = 'useCurrentUser'

export const useCurrentUser = (): UseQueryResult<CurrentUser> & { enabled: boolean } => {
  const enabled = useIsSignedIn()
  const authedFetch = useAuthedFetch()

  const result = useQuery({
    queryKey: [USE_CURRENT_USER_QUERY_KEY],
    queryFn: async () => {
      const result = await authedFetch<{ user: CurrentUser }>({
        path: '/users/current',
        method: 'GET',
      })
      return result.json!.user
    },
    enabled,
  })
  return { ...result, enabled }
}
