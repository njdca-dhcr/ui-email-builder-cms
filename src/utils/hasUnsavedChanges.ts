import isEqual from 'lodash.isequal'
import { EmailTranslation } from 'src/appTypes'

export const hasUnsavedChanges = (
  emailTranslationA: EmailTranslation.Unique,
  emailTranslationB: EmailTranslation.Unique,
): boolean => {
  return !isEqual(emailTranslationA, emailTranslationB)
}
