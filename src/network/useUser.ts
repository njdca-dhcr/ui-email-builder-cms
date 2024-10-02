import { useQuery } from '@tanstack/react-query'
import { useAuthedFetch } from './useAuthedFetch'
import { UserRole } from 'src/appTypes'

export interface UserShow {
  id: string
  email: string
  role: UserRole
}

export const buildUseUserQueryKey = (id: string): string => `useUser('${id}')`

export const useUser = (id: string) => {
  const authedFetch = useAuthedFetch()

  return useQuery({
    queryKey: [buildUseUserQueryKey(id)],
    queryFn: async () => {
      const result = await authedFetch<{ user: UserShow }>({
        path: `/users/${id}`,
        method: 'GET',
      })
      const user = result.json!.user
      return { ...user, role: user.role ?? 'member' }
    },
  })
}
