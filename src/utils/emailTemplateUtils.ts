import { EmailParts, EmailTemplate, EmailTranslation } from 'src/appTypes'

export const getSubComponentByKind = <T extends EmailParts.Kinds.SubComponent>(
  emailTranslation: EmailTranslation.Unique,
  subComponentKind: T,
): EmailParts.Unique.SubComponent<T> | null => {
  const subComponents = (emailTranslation.components ?? []).flatMap(
    ({ subComponents }) => subComponents ?? [],
  )

  return (
    (subComponents.find(({ kind }) => kind === subComponentKind) as
      | EmailParts.Unique.SubComponent<T>
      | undefined) ?? null
  )
}
