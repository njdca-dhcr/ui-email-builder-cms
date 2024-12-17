import {
  buildEmailTranslation,
  buildUniqueEmailComponent,
  buildUniqueEmailConfig,
} from 'src/testHelpers'
import { addOrRemoveTranslationLinks } from '../addOrRemoveTranslationLinks'

describe('addOrRemoveTranslationLinks', () => {
  describe('when there are no translation links and multiple translations', () => {
    it('adds the translation links to each translation', async () => {
      const emailTemplate = buildUniqueEmailConfig({
        translations: [
          buildEmailTranslation({
            language: 'english',
            components: [buildUniqueEmailComponent('Banner'), buildUniqueEmailComponent('Header')],
          }),
          buildEmailTranslation({
            language: 'spanish',
            components: [buildUniqueEmailComponent('Banner'), buildUniqueEmailComponent('Header')],
          }),
        ],
      })

      const result = addOrRemoveTranslationLinks(emailTemplate)

      expect(result).toEqual(
        expect.objectContaining({
          translations: [
            expect.objectContaining({
              language: 'english',
              components: expect.arrayContaining([
                expect.objectContaining({ kind: 'TranslationLinks' }),
              ]),
            }),
            expect.objectContaining({
              language: 'spanish',
              components: expect.arrayContaining([
                expect.objectContaining({ kind: 'TranslationLinks' }),
              ]),
            }),
          ],
        }),
      )
    })
  })

  describe('when there are no translation links and one translation', () => {
    it('returns the email template', async () => {
      const emailTemplate = buildUniqueEmailConfig({
        translations: [
          buildEmailTranslation({
            language: 'english',
            components: [buildUniqueEmailComponent('Banner'), buildUniqueEmailComponent('Header')],
          }),
        ],
      })

      const result = addOrRemoveTranslationLinks(emailTemplate)

      expect(result).toEqual(emailTemplate)
    })
  })

  describe('when there are some translation links and multiple translations', () => {
    it('adds the translation links to each translation', async () => {
      const emailTemplate = buildUniqueEmailConfig({
        translations: [
          buildEmailTranslation({
            language: 'english',
            components: [
              buildUniqueEmailComponent('Banner'),
              buildUniqueEmailComponent('TranslationLinks'),
              buildUniqueEmailComponent('Header'),
            ],
          }),
          buildEmailTranslation({
            language: 'spanish',
            components: [buildUniqueEmailComponent('Banner'), buildUniqueEmailComponent('Header')],
          }),
        ],
      })

      const result = addOrRemoveTranslationLinks(emailTemplate)

      expect(result).toEqual(
        expect.objectContaining({
          translations: [
            expect.objectContaining({
              language: 'english',
              components: expect.arrayContaining([
                expect.objectContaining({ kind: 'TranslationLinks' }),
              ]),
            }),
            expect.objectContaining({
              language: 'spanish',
              components: expect.arrayContaining([
                expect.objectContaining({ kind: 'TranslationLinks' }),
              ]),
            }),
          ],
        }),
      )

      const englishTranslationLinks = result.translations![0].components.filter(
        ({ kind }) => kind === 'TranslationLinks',
      )
      expect(englishTranslationLinks).toHaveLength(1)
    })
  })

  describe('when there are some translation links and one translation', () => {
    it('removes the translation links', async () => {
      const emailTemplate = buildUniqueEmailConfig({
        translations: [
          buildEmailTranslation({
            language: 'english',
            components: [
              buildUniqueEmailComponent('Banner'),
              buildUniqueEmailComponent('TranslationLinks'),
              buildUniqueEmailComponent('Header'),
            ],
          }),
        ],
      })

      const result = addOrRemoveTranslationLinks(emailTemplate)

      result.translations?.forEach((translation) => {
        expect(
          translation.components.find(({ kind }) => kind === 'TranslationLinks'),
        ).toBeUndefined()
      })
    })
  })
})
