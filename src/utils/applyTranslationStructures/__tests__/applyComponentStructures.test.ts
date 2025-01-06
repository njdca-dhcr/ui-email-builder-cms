import { asMock, buildUniqueEmailComponent, buildUniqueEmailSubComponent } from 'src/testHelpers'
import {
  applyTranslationLinksStructure,
  applyBodyStructure,
  applyFooterStructure,
  applyHeaderStructure,
  applyNameStructure,
} from '../applyComponentStructures'
import { applyTitleStructure } from '../applySubComponentStructures'

jest.mock('../applySubComponentStructures')

describe('applyTranslationLinksStructure', () => {
  it('applies the non-text values of the first to the second', async () => {
    const englishComponent = buildUniqueEmailComponent('TranslationLinks', {
      defaultValue: {
        visible: false,
        languages: { english: { text: 'English' }, spanish: { text: 'Español' } } as any,
      },
    })
    const spanishComponent = buildUniqueEmailComponent('TranslationLinks', {
      defaultValue: {
        visible: true,
        languages: { english: { text: 'Inglés' }, spanish: { text: 'English' } } as any,
      },
    })

    expect(applyTranslationLinksStructure(englishComponent, spanishComponent)).toEqual({
      ...spanishComponent,
      defaultValue: {
        visible: false,
        languages: { english: { text: 'Inglés' }, spanish: { text: 'English' } } as any,
      },
    })
  })
})

describe('applyBodyStructure', () => {
  it('applies the non-text values of the first to the second', async () => {
    const englishComponent = buildUniqueEmailComponent('Body', { defaultValue: { visible: true } })
    const spanishComponent = buildUniqueEmailComponent('Body', { defaultValue: { visible: false } })

    expect(applyBodyStructure(englishComponent, spanishComponent)).toEqual({
      ...spanishComponent,
      defaultValue: { visible: true },
      subComponents: [],
    })
  })

  it('applies changes to subcomponents', async () => {
    asMock(applyTitleStructure).mockImplementation(
      jest.requireActual('../applySubComponentStructures').applyTitleStructure,
    )

    const title = buildUniqueEmailSubComponent({ kind: 'Title' })
    const englishComponent = buildUniqueEmailComponent('Body', {
      defaultValue: { visible: true },
      subComponents: [
        {
          ...title,
          defaultValue: { visible: true, title: 'english' },
        },
      ],
    })
    const spanishComponent = buildUniqueEmailComponent('Body', {
      defaultValue: { visible: false },
      subComponents: [
        {
          ...title,
          defaultValue: { visible: false, title: 'spanish' },
        },
      ],
    })

    expect(applyBodyStructure(englishComponent, spanishComponent)).toEqual({
      ...spanishComponent,
      defaultValue: { visible: true },
      subComponents: [
        {
          ...title,
          defaultValue: { visible: true, title: 'spanish' },
        },
      ],
    })
  })
})

describe('applyFooterStructure', () => {
  it('applies the non-text values of the first to the second', async () => {
    const englishComponent = buildUniqueEmailComponent('Footer', {
      defaultValue: { visible: true },
    })
    const spanishComponent = buildUniqueEmailComponent('Footer', {
      defaultValue: { visible: false },
    })

    expect(applyFooterStructure(englishComponent, spanishComponent)).toEqual({
      ...spanishComponent,
      defaultValue: { visible: true },
      subComponents: [],
    })
  })

  it('applies changes to subcomponents', async () => {
    asMock(applyTitleStructure).mockImplementation(
      jest.requireActual('../applySubComponentStructures').applyTitleStructure,
    )

    const title = buildUniqueEmailSubComponent({ kind: 'Title' })
    const englishComponent = buildUniqueEmailComponent('Footer', {
      defaultValue: { visible: true },
      subComponents: [
        {
          ...title,
          defaultValue: { visible: true, title: 'english' },
        },
      ],
    })
    const spanishComponent = buildUniqueEmailComponent('Footer', {
      defaultValue: { visible: false },
      subComponents: [
        {
          ...title,
          defaultValue: { visible: false, title: 'spanish' },
        },
      ],
    })

    expect(applyFooterStructure(englishComponent, spanishComponent)).toEqual({
      ...spanishComponent,
      defaultValue: { visible: true },
      subComponents: [
        {
          ...title,
          defaultValue: { visible: true, title: 'spanish' },
        },
      ],
    })
  })
})

describe('applyHeaderStructure', () => {
  it('applies the non-text values of the first to the second', async () => {
    const englishComponent = buildUniqueEmailComponent('Header', {
      defaultValue: { visible: true },
    })
    const spanishComponent = buildUniqueEmailComponent('Header', {
      defaultValue: { visible: false },
    })

    expect(applyHeaderStructure(englishComponent, spanishComponent)).toEqual({
      ...spanishComponent,
      defaultValue: { visible: true },
      subComponents: [],
    })
  })

  it('applies changes to subcomponents', async () => {
    asMock(applyTitleStructure).mockImplementation(
      jest.requireActual('../applySubComponentStructures').applyTitleStructure,
    )

    const title = buildUniqueEmailSubComponent({ kind: 'Title' })
    const englishComponent = buildUniqueEmailComponent('Header', {
      defaultValue: { visible: true },
      subComponents: [
        {
          ...title,
          defaultValue: { visible: true, title: 'english' },
        },
      ],
    })
    const spanishComponent = buildUniqueEmailComponent('Header', {
      defaultValue: { visible: false },
      subComponents: [
        {
          ...title,
          defaultValue: { visible: false, title: 'spanish' },
        },
      ],
    })

    expect(applyHeaderStructure(englishComponent, spanishComponent)).toEqual({
      ...spanishComponent,
      defaultValue: { visible: true },
      subComponents: [
        {
          ...title,
          defaultValue: { visible: true, title: 'spanish' },
        },
      ],
    })
  })
})

describe('applyNameStructure', () => {
  it('applies the non-text values of the first to the second', async () => {
    const englishComponent = buildUniqueEmailComponent('Name', {
      defaultValue: { visible: true, name: 'english name' },
    })
    const spanishComponent = buildUniqueEmailComponent('Name', {
      defaultValue: { visible: false, name: 'spanish name' },
    })

    expect(applyNameStructure(englishComponent, spanishComponent)).toEqual({
      ...spanishComponent,
      defaultValue: { visible: true, name: 'spanish name' },
    })
  })
})
