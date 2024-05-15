import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEY as USE_USER_QUERY_KEY } from './useUser'
import { useAuthedFetch } from './useAuthedFetch'
import { BannerValue } from 'src/appTypes'

export const useUpdateBanner = () => {
  const client = useQueryClient()
  const authedFetch = useAuthedFetch()

  return useMutation({
    mutationFn: async (banner: BannerValue) => {
      const result = await authedFetch<{ banner: BannerValue }>({
        body: { banner },
        method: 'PATCH',
        path: '/users/banner',
      })
      return result.json?.banner
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [USE_USER_QUERY_KEY] })
    },
  })
}
