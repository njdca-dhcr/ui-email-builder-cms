import { useQuery } from '@tanstack/react-query'
import { useAuthedFetch } from '../useAuthedFetch'
import { UserRole } from 'src/appTypes'

export interface UsersIndex {
  id: string
  email: string
  role: UserRole
}

export const USER_USERS_QUERY_KEY = 'useUsers'

export const useUsers = () => {
  const authedFetch = useAuthedFetch()

  return useQuery({
    queryKey: [USER_USERS_QUERY_KEY],
    queryFn: async () => {
      const result = await authedFetch<{ users: UsersIndex[] }>({
        path: '/users',
        method: 'GET',
      })
      return result
        .json!.users.map((user) => ({ ...user, role: user.role ?? 'member' }))
        .sort((a, b) => a.email.localeCompare(b.email))
    },
  })
}
