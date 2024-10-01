import { useQuery } from '@tanstack/react-query'
import { useAuthedFetch } from './useAuthedFetch'

export interface UserShow {
  id: string
  email: string
  role: 'admin' | 'member'
}

const QUERY_KEY = 'useUser'

export const useUser = (id: string) => {
  const authedFetch = useAuthedFetch()

  return useQuery({
    queryKey: [QUERY_KEY, id],
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
