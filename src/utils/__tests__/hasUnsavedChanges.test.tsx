import { buildEmailTranslation } from 'src/factories'
import { hasUnsavedChanges } from '../hasUnsavedChanges'

describe('hasUnsavedChanges', () => {
  it('returns false when there are no differences', () => {
    const emailTemplateA = buildEmailTranslation()
    const emailTemplateB = { ...emailTemplateA }

    expect(hasUnsavedChanges(emailTemplateA, emailTemplateB)).toBe(false)
  })

  it('should return true if there are unsaved changes', () => {
    const emailTemplateA = buildEmailTranslation()
    const emailTemplateB = {
      ...emailTemplateA,
      previewText: 'New Preview Text',
    }

    expect(hasUnsavedChanges(emailTemplateA, emailTemplateB)).toBe(true)
  })
})
