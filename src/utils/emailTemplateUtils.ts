import { EmailTemplate } from 'src/appTypes'

export const getSubComponentByKind = <T extends EmailTemplate.Kinds.SubComponent>(
  emailTemplate: EmailTemplate.Unique.Config,
  subComponentKind: T,
): EmailTemplate.Unique.SubComponent<T> | null => {
  const subComponents = (emailTemplate.components ?? []).flatMap(
    ({ subComponents }) => subComponents ?? [],
  )

  return (
    (subComponents.find(({ kind }) => kind === subComponentKind) as
      | EmailTemplate.Unique.SubComponent<T>
      | undefined) ?? null
  )
}
