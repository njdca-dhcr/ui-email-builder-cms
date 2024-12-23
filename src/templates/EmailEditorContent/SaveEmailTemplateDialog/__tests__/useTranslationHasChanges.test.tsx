import React from 'react'
import { renderHook } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { EmailPartsContent } from 'src/templates/EmailPartsContent'
import { usePreviewText } from 'src/templates/PreviewText'
import { EmailTemplateState } from 'src/utils/EmailTemplateState'
import { areEmailTranslationsEqual } from 'src/utils/emailPartsComparators'
import { useTranslationHasChanges } from '../useTranslationHasChanges'
import {
  asMock,
  buildEmailTranslation,
  buildUniqueEmailComponent,
  buildUniqueEmailConfig,
} from 'src/testHelpers'
import { mergeTranslationValues } from '../emailTemplateMergeDefaultValues'

jest.mock('src/templates/PreviewText')
jest.mock('src/utils/emailPartsComparators')
jest.mock('../emailTemplateMergeDefaultValues')

describe('useTranslationHasChanges', () => {
  it('is true when the translation has changes', async () => {
    const previewText = faker.lorem.paragraph()
    const nameComponent = buildUniqueEmailComponent('Name', {
      defaultValue: { name: faker.lorem.word() },
    })
    const data = { [nameComponent.id]: { name: faker.lorem.word() } }
    const translation = buildEmailTranslation({
      previewText: 'ignored',
      components: [nameComponent],
    })
    const translationWithChanges = buildEmailTranslation()
    const emailTemplate = buildUniqueEmailConfig({ translations: [translation] })

    asMock(usePreviewText).mockReturnValue([previewText, jest.fn()])
    asMock(mergeTranslationValues).mockReturnValue(translationWithChanges)
    asMock(areEmailTranslationsEqual).mockReturnValue(false)

    const { result } = renderHook(() => useTranslationHasChanges(), {
      wrapper: ({ children }) => {
        return (
          <EmailTemplateState emailTemplate={emailTemplate}>
            {() => <EmailPartsContent initialData={data}>{children}</EmailPartsContent>}
          </EmailTemplateState>
        )
      },
    })

    expect(result.current).toEqual(true)
    expect(mergeTranslationValues).toHaveBeenCalledWith({ translation, previewText, data })
    expect(areEmailTranslationsEqual).toHaveBeenCalledWith(translation, translationWithChanges)
  })

  it('is false when the translation lacks changes', async () => {
    const previewText = faker.lorem.paragraph()
    const nameComponent = buildUniqueEmailComponent('Name', {
      defaultValue: { name: faker.lorem.word() },
    })
    const data = { [nameComponent.id]: { name: faker.lorem.word() } }
    const translation = buildEmailTranslation({
      previewText: 'ignored',
      components: [nameComponent],
    })
    const translationWithChanges = buildEmailTranslation()
    const emailTemplate = buildUniqueEmailConfig({ translations: [translation] })

    asMock(usePreviewText).mockReturnValue([previewText, jest.fn()])
    asMock(mergeTranslationValues).mockReturnValue(translationWithChanges)
    asMock(areEmailTranslationsEqual).mockReturnValue(true)

    const { result } = renderHook(() => useTranslationHasChanges(), {
      wrapper: ({ children }) => {
        return (
          <EmailTemplateState emailTemplate={emailTemplate}>
            {() => <EmailPartsContent initialData={data}>{children}</EmailPartsContent>}
          </EmailTemplateState>
        )
      },
    })

    expect(result.current).toEqual(false)
    expect(mergeTranslationValues).toHaveBeenCalledWith({ translation, previewText, data })
    expect(areEmailTranslationsEqual).toHaveBeenCalledWith(translation, translationWithChanges)
  })
})
