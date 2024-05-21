import { useQuery } from '@tanstack/react-query'
import { useAuthedFetch } from './useAuthedFetch'

export const useExportImage = (page: string) => {
  const authedFetch = useAuthedFetch('blob')

  // const hashCode = (str: string): number => {
  //   let hash = 0;
  //   for (let i = 0, len = str.length; i < len; i++) {
  //     let chr = str.charCodeAt(i);
  //     hash = (hash << 5) - hash + chr;
  //     hash |= 0; // Convert to 32bit integer
  //   }
  //   return hash;
  // }

  // const makeQuery = (html: string) => {
  //   return useQuery({
  //     queryKey: ['useExportImage', page, hashCode(html)],
  //     queryFn: async () => {
  //       const result = await authedFetch({
  //         path: '/image-export',
  //         method: 'POST',
  //         body: { html: JSON.stringify({ html }) }
  //       })
  //       return result.blob!
  //     },
  //   })
  // }

  return makeQuery
}
