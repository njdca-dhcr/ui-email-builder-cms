import {
  buildEmailTranslation,
  buildUniqueEmailComponent,
  buildUniqueEmailConfig,
  buildUniqueEmailSubComponent,
} from 'src/testHelpers'
import { applyTranslationStructures } from '..'

describe('applyTranslationStructures', () => {
  it("applies the first translation's structure to the other translations", async () => {
    const title = buildUniqueEmailSubComponent({ kind: 'Title' })
    const header = buildUniqueEmailComponent('Header')

    const englishTranslation = buildEmailTranslation({
      language: 'english',
      components: [
        {
          ...header,
          defaultValue: { visible: false },
          subComponents: [{ ...title, defaultValue: { title: 'english', visible: true } }],
        },
      ],
    })
    const spanishTranslation = buildEmailTranslation({
      language: 'spanish',
      components: [
        {
          ...header,
          defaultValue: { visible: true },
          subComponents: [{ ...title, defaultValue: { title: 'spanish', visible: false } }],
        },
      ],
    })

    const emailTemplate = buildUniqueEmailConfig({
      translations: [englishTranslation, spanishTranslation],
    })

    expect(applyTranslationStructures(emailTemplate)).toEqual({
      ...emailTemplate,
      translations: [
        englishTranslation,
        {
          ...spanishTranslation,
          components: [
            {
              ...header,
              defaultValue: { visible: false },
              subComponents: [{ ...title, defaultValue: { visible: true, title: 'spanish' } }],
            },
          ],
        },
      ],
    })
  })
})
