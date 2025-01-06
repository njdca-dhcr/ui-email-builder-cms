import {
  buildEmailTranslation,
  buildUniqueEmailComponent,
  buildUniqueEmailSubComponent,
} from 'src/testHelpers'
import { applyTranslationStructure } from '../index'
import { BoxColor } from 'src/ui'
import { StatusVariant } from 'src/appTypes'

describe('applyTranslationStructure', () => {
  it('applies the non-text values of the first translation to the second (smoke test)', async () => {
    const title = buildUniqueEmailSubComponent({ kind: 'Title' })
    const status = buildUniqueEmailSubComponent({ kind: 'Status' })
    const header = buildUniqueEmailComponent('Header')
    const englishTranslation = buildEmailTranslation({
      language: 'english',
      components: [
        {
          ...header,
          defaultValue: { visible: true },
          subComponents: [
            { ...title, defaultValue: { title: 'english title', visible: false } },
            {
              ...status,
              defaultValue: {
                visible: true,
                variant: StatusVariant.Overview,
                icon: 'AccountBox',
                boxColor: BoxColor.BenefitBlue,
                status: 'english status',
                spaceAfter: true,
              },
            },
          ],
        },
      ],
    })
    const spanishTranslation = buildEmailTranslation({
      language: 'spanish',
      components: [
        {
          ...header,
          defaultValue: { visible: false },
          subComponents: [
            { ...title, defaultValue: { title: 'spanish title', visible: true } },
            {
              ...status,
              defaultValue: {
                visible: false,
                variant: StatusVariant.OverviewWithReason,
                icon: 'Alarm',
                boxColor: BoxColor.GoverningGray,
                status: 'spanish status',
                spaceAfter: false,
              },
            },
          ],
        },
      ],
    })

    const result = applyTranslationStructure(englishTranslation, spanishTranslation)

    expect(result).toEqual({
      ...spanishTranslation,
      components: [
        {
          ...header,
          defaultValue: { visible: true },
          subComponents: [
            { ...title, defaultValue: { title: 'spanish title', visible: false } },
            {
              ...status,
              defaultValue: {
                visible: true,
                variant: StatusVariant.Overview,
                icon: 'AccountBox',
                boxColor: BoxColor.BenefitBlue,
                status: 'spanish status',
                spaceAfter: true,
              },
            },
          ],
        },
      ],
    })
  })
})
