import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEY as USE_USER_QUERY_KEY } from './useCurrentUser'
import { useAuthedFetch } from './useAuthedFetch'
import { DisclaimerValue } from 'src/appTypes'

export const useUpdateDisclaimer = () => {
  const client = useQueryClient()
  const authedFetch = useAuthedFetch()

  return useMutation({
    mutationFn: async (disclaimer: DisclaimerValue) => {
      const result = await authedFetch<{ disclaimer: DisclaimerValue }>({
        body: { disclaimer },
        method: 'PATCH',
        path: '/users/disclaimer',
      })
      return result.json?.disclaimer
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [USE_USER_QUERY_KEY] })
    },
  })
}
