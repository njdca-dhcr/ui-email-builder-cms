import { useMutation } from '@tanstack/react-query'
import { useAuthedFetch } from './useAuthedFetch'

export const useExportImage = () => {
  const authedFetch = useAuthedFetch('blob', false)

  return useMutation({
    mutationFn: async (html: string) => {
      const result = await authedFetch({
        body: { html },
        method: 'POST',
        path: '/image-export',
      })
      return result.blob
    },
  })
}
