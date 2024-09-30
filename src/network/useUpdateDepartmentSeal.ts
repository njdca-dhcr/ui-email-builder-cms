import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthedFetch } from './useAuthedFetch'
import { DepartmentSealValue } from 'src/appTypes'
import { QUERY_KEY as USE_USER_QUERY_KEY } from './useCurrentUser'

export const useUpdateDepartmentSeal = (): any => {
  const client = useQueryClient()
  const authedFetch = useAuthedFetch()

  return useMutation({
    mutationFn: async (departmentSeal: DepartmentSealValue) => {
      const result = await authedFetch<{ departmentSeal: DepartmentSealValue }>({
        body: { departmentSeal },
        method: 'PATCH',
        path: '/users/department-seal',
      })
      return result.json?.departmentSeal
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [USE_USER_QUERY_KEY] })
    },
  })
}
