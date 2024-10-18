import { useCreateEmailTemplate } from './useCreateEmailTemplate'
import { useUpdateEmailTemplate } from './useUpdateEmailTemplate'

export function useCreateOrUpdateEmailTemplate(
  id: undefined | string,
): ReturnType<typeof useCreateEmailTemplate>
export function useCreateOrUpdateEmailTemplate(
  id: string,
): ReturnType<typeof useUpdateEmailTemplate>
export function useCreateOrUpdateEmailTemplate(id: string | undefined) {
  const update = useUpdateEmailTemplate(`${id}`)
  const create = useCreateEmailTemplate()

  switch (typeof id) {
    case 'string':
      return update
    default:
      return create
  }
}
