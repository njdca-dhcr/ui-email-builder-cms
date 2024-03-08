import { EmailTemplate } from 'src/appTypes'

export const getSubComponentByKind = <T extends EmailTemplate.SubComponentKind>(
  emailTemplate: EmailTemplate.UniqueConfig,
  subComponentKind: T,
): EmailTemplate.UniqueSubComponent<any, T> | null => {
  const subComponents = (emailTemplate.components ?? []).flatMap(
    ({ subComponents }) => subComponents ?? [],
  )

  return (
    (subComponents.find(({ kind }) => kind === subComponentKind) as
      | EmailTemplate.UniqueSubComponent<any, T>
      | undefined) ?? null
  )
}
