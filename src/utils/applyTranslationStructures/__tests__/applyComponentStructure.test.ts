import { asMock, buildUniqueEmailComponent } from 'src/testHelpers'
import {
  applyTranslationLinksStructure,
  applyBodyStructure,
  applyFooterStructure,
  applyHeaderStructure,
  applyNameStructure,
} from '../applyComponentStructures'
import { applyComponentStructure } from '../applyComponentStructure'

jest.mock('../applyComponentStructures')

describe('applyComponentStructure', () => {
  it('works with TranslationLinks', async () => {
    asMock(applyTranslationLinksStructure).mockReturnValue('applyTranslationLinksStructure' as any)
    const componentA = buildUniqueEmailComponent('TranslationLinks')
    const componentB = buildUniqueEmailComponent('TranslationLinks')
    expect(applyComponentStructure(componentA, componentB)).toEqual(
      'applyTranslationLinksStructure',
    )
    expect(applyTranslationLinksStructure).toHaveBeenCalledWith(componentA, componentB)
  })

  it('works with Body', async () => {
    asMock(applyBodyStructure).mockReturnValue('applyBodyStructure' as any)
    const componentA = buildUniqueEmailComponent('Body')
    const componentB = buildUniqueEmailComponent('Body')
    expect(applyComponentStructure(componentA, componentB)).toEqual('applyBodyStructure')
    expect(applyBodyStructure).toHaveBeenCalledWith(componentA, componentB)
  })

  it('works with Footer', async () => {
    asMock(applyFooterStructure).mockReturnValue('applyFooterStructure' as any)
    const componentA = buildUniqueEmailComponent('Footer')
    const componentB = buildUniqueEmailComponent('Footer')
    expect(applyComponentStructure(componentA, componentB)).toEqual('applyFooterStructure')
    expect(applyFooterStructure).toHaveBeenCalledWith(componentA, componentB)
  })

  it('works with Header', async () => {
    asMock(applyHeaderStructure).mockReturnValue('applyHeaderStructure' as any)
    const componentA = buildUniqueEmailComponent('Header')
    const componentB = buildUniqueEmailComponent('Header')
    expect(applyComponentStructure(componentA, componentB)).toEqual('applyHeaderStructure')
    expect(applyHeaderStructure).toHaveBeenCalledWith(componentA, componentB)
  })

  it('works with Name', async () => {
    asMock(applyNameStructure).mockReturnValue('applyNameStructure' as any)
    const componentA = buildUniqueEmailComponent('Name')
    const componentB = buildUniqueEmailComponent('Name')
    expect(applyComponentStructure(componentA, componentB)).toEqual('applyNameStructure')
    expect(applyNameStructure).toHaveBeenCalledWith(componentA, componentB)
  })

  it('works with Disclaimer', async () => {
    const componentA = buildUniqueEmailComponent('Disclaimer')
    const componentB = buildUniqueEmailComponent('Disclaimer')
    expect(applyComponentStructure(componentA, componentB)).toEqual(componentB)
  })

  it('works with StateSeal', async () => {
    const componentA = buildUniqueEmailComponent('StateSeal')
    const componentB = buildUniqueEmailComponent('StateSeal')
    expect(applyComponentStructure(componentA, componentB)).toEqual(componentB)
  })

  it('works with Banner', async () => {
    const componentA = buildUniqueEmailComponent('Banner')
    const componentB = buildUniqueEmailComponent('Banner')
    expect(applyComponentStructure(componentA, componentB)).toEqual(componentB)
  })
})
