import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthedFetch } from './useAuthedFetch'
import { StateSealValue } from 'src/appTypes'
import { QUERY_KEY as USE_USER_QUERY_KEY } from './useUser'

export const useUpdateStateSeal = () => {
  const client = useQueryClient()
  const authedFetch = useAuthedFetch()

  return useMutation({
    mutationFn: async (stateSeal: StateSealValue) => {
      const result = await authedFetch<{ stateSeal: StateSealValue }>({
        body: { stateSeal },
        method: 'PATCH',
        path: '/users/state-seal',
      })
      return result.json?.stateSeal
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [USE_USER_QUERY_KEY] })
    },
  })
}
