import { useMutation } from '@tanstack/react-query'
import { useAuthedFetch } from './useAuthedFetch'

export const useExportImage = () => {
  const authedFetch = useAuthedFetch('blob', false)

  return useMutation({
    mutationFn: async (html: string) => {
      const requestImage = () => {
        return authedFetch({
          body: { html },
          method: 'POST',
          path: '/image-export',
        })
      }

      const result = await requestImage()

      if (result.statusCode === 201) {
        return result.blob
      } else {
        return (await requestImage()).blob ?? new Blob([])
      }
    },
  })
}
