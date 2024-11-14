import { EmailParts, EmailTemplate } from 'src/appTypes'

export const getSubComponentByKind = <T extends EmailParts.Kinds.SubComponent>(
  emailTemplate: EmailTemplate.Unique.Config,
  subComponentKind: T,
): EmailParts.Unique.SubComponent<T> | null => {
  const subComponents = (emailTemplate.components ?? []).flatMap(
    ({ subComponents }) => subComponents ?? [],
  )

  return (
    (subComponents.find(({ kind }) => kind === subComponentKind) as
      | EmailParts.Unique.SubComponent<T>
      | undefined) ?? null
  )
}
