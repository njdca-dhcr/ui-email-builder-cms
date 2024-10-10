import { useQuery } from '@tanstack/react-query'
import { useAuthedFetch } from '../useAuthedFetch'
import { UserRole } from 'src/appTypes'

export interface GroupShow {
  id: string
  name: string
  description: string
  users: {
    id: string
    email: string
    role: UserRole
  }[]
}

export const buildUseGroupQueryKey = (id: string): string => `useGroup('${id}')`

export const useGroup = (id: string) => {
  const authedFetch = useAuthedFetch()

  return useQuery({
    queryKey: [buildUseGroupQueryKey(id)],
    queryFn: async () => {
      const result = await authedFetch<{ group: GroupShow }>({
        path: `/groups/${id}`,
        method: 'GET',
      })
      return result.json!.group
    },
  })
}
