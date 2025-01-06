import { asMock, buildUniqueEmailSubComponent } from 'src/testHelpers'

import {
  applyIntroStructure,
  applyRulesRightsRegulationsStructure,
  applyStatusStructure,
  applySupplementalContentStructure,
  applyDirectiveStructure,
  applyLoginDetailsStructure,
  applyInformationalBoxStructure,
  applyAdditionalContentStructure,
  applyDateRangeStructure,
  applyTitleStructure,
  applyProgramNameStructure,
  applyDirectiveButtonStructure,
} from '../applySubComponentStructures'
import { applySubComponentStructure } from '../applySubComponentStructure'

jest.mock('../applySubComponentStructures')

describe('applySubComponentStructure', () => {
  it('works with Intro', async () => {
    asMock(applyIntroStructure).mockReturnValue('applyIntroStructure' as any)
    const subcomponentA = buildUniqueEmailSubComponent({ kind: 'Intro' })
    const subcomponentB = buildUniqueEmailSubComponent({ kind: 'Intro' })
    expect(applySubComponentStructure(subcomponentA, subcomponentB)).toEqual('applyIntroStructure')
    expect(applyIntroStructure).toHaveBeenCalledWith(subcomponentA, subcomponentB)
  })

  it('works with RulesRightsRegulations', async () => {
    asMock(applyRulesRightsRegulationsStructure).mockReturnValue(
      'applyRulesRightsRegulationsStructure' as any,
    )
    const subcomponentA = buildUniqueEmailSubComponent({ kind: 'RulesRightsRegulations' })
    const subcomponentB = buildUniqueEmailSubComponent({ kind: 'RulesRightsRegulations' })
    expect(applySubComponentStructure(subcomponentA, subcomponentB)).toEqual(
      'applyRulesRightsRegulationsStructure',
    )
    expect(applyRulesRightsRegulationsStructure).toHaveBeenCalledWith(subcomponentA, subcomponentB)
  })

  it('works with Status', async () => {
    asMock(applyStatusStructure).mockReturnValue('applyStatusStructure' as any)
    const subcomponentA = buildUniqueEmailSubComponent({ kind: 'Status' })
    const subcomponentB = buildUniqueEmailSubComponent({ kind: 'Status' })
    expect(applySubComponentStructure(subcomponentA, subcomponentB)).toEqual('applyStatusStructure')
    expect(applyStatusStructure).toHaveBeenCalledWith(subcomponentA, subcomponentB)
  })

  it('works with SupplementalContent', async () => {
    asMock(applySupplementalContentStructure).mockReturnValue(
      'applySupplementalContentStructure' as any,
    )
    const subcomponentA = buildUniqueEmailSubComponent({ kind: 'SupplementalContent' })
    const subcomponentB = buildUniqueEmailSubComponent({ kind: 'SupplementalContent' })
    expect(applySubComponentStructure(subcomponentA, subcomponentB)).toEqual(
      'applySupplementalContentStructure',
    )
    expect(applySupplementalContentStructure).toHaveBeenCalledWith(subcomponentA, subcomponentB)
  })

  it('works with Directive', async () => {
    asMock(applyDirectiveStructure).mockReturnValue('applyDirectiveStructure' as any)
    const subcomponentA = buildUniqueEmailSubComponent({ kind: 'Directive' })
    const subcomponentB = buildUniqueEmailSubComponent({ kind: 'Directive' })
    expect(applySubComponentStructure(subcomponentA, subcomponentB)).toEqual(
      'applyDirectiveStructure',
    )
    expect(applyDirectiveStructure).toHaveBeenCalledWith(subcomponentA, subcomponentB)
  })

  it('works with LoginDetails', async () => {
    asMock(applyLoginDetailsStructure).mockReturnValue('applyLoginDetailsStructure' as any)
    const subcomponentA = buildUniqueEmailSubComponent({ kind: 'LoginDetails' })
    const subcomponentB = buildUniqueEmailSubComponent({ kind: 'LoginDetails' })
    expect(applySubComponentStructure(subcomponentA, subcomponentB)).toEqual(
      'applyLoginDetailsStructure',
    )
    expect(applyLoginDetailsStructure).toHaveBeenCalledWith(subcomponentA, subcomponentB)
  })

  it('works with InformationalBox', async () => {
    asMock(applyInformationalBoxStructure).mockReturnValue('applyInformationalBoxStructure' as any)
    const subcomponentA = buildUniqueEmailSubComponent({ kind: 'InformationalBox' })
    const subcomponentB = buildUniqueEmailSubComponent({ kind: 'InformationalBox' })
    expect(applySubComponentStructure(subcomponentA, subcomponentB)).toEqual(
      'applyInformationalBoxStructure',
    )
    expect(applyInformationalBoxStructure).toHaveBeenCalledWith(subcomponentA, subcomponentB)
  })

  it('works with AdditionalContent', async () => {
    asMock(applyAdditionalContentStructure).mockReturnValue(
      'applyAdditionalContentStructure' as any,
    )
    const subcomponentA = buildUniqueEmailSubComponent({ kind: 'AdditionalContent' })
    const subcomponentB = buildUniqueEmailSubComponent({ kind: 'AdditionalContent' })
    expect(applySubComponentStructure(subcomponentA, subcomponentB)).toEqual(
      'applyAdditionalContentStructure',
    )
    expect(applyAdditionalContentStructure).toHaveBeenCalledWith(subcomponentA, subcomponentB)
  })

  it('works with DateRange', async () => {
    asMock(applyDateRangeStructure).mockReturnValue('applyDateRangeStructure' as any)
    const subcomponentA = buildUniqueEmailSubComponent({ kind: 'DateRange' })
    const subcomponentB = buildUniqueEmailSubComponent({ kind: 'DateRange' })
    expect(applySubComponentStructure(subcomponentA, subcomponentB)).toEqual(
      'applyDateRangeStructure',
    )
    expect(applyDateRangeStructure).toHaveBeenCalledWith(subcomponentA, subcomponentB)
  })

  it('works with Title', async () => {
    asMock(applyTitleStructure).mockReturnValue('applyTitleStructure' as any)
    const subcomponentA = buildUniqueEmailSubComponent({ kind: 'Title' })
    const subcomponentB = buildUniqueEmailSubComponent({ kind: 'Title' })
    expect(applySubComponentStructure(subcomponentA, subcomponentB)).toEqual('applyTitleStructure')
    expect(applyTitleStructure).toHaveBeenCalledWith(subcomponentA, subcomponentB)
  })

  it('works with ProgramName', async () => {
    asMock(applyProgramNameStructure).mockReturnValue('applyProgramNameStructure' as any)
    const subcomponentA = buildUniqueEmailSubComponent({ kind: 'ProgramName' })
    const subcomponentB = buildUniqueEmailSubComponent({ kind: 'ProgramName' })
    expect(applySubComponentStructure(subcomponentA, subcomponentB)).toEqual(
      'applyProgramNameStructure',
    )
    expect(applyProgramNameStructure).toHaveBeenCalledWith(subcomponentA, subcomponentB)
  })

  it('works with DirectiveButton', async () => {
    asMock(applyDirectiveButtonStructure).mockReturnValue('applyDirectiveButtonStructure' as any)
    const subcomponentA = buildUniqueEmailSubComponent({ kind: 'DirectiveButton' })
    const subcomponentB = buildUniqueEmailSubComponent({ kind: 'DirectiveButton' })
    expect(applySubComponentStructure(subcomponentA, subcomponentB)).toEqual(
      'applyDirectiveButtonStructure',
    )
    expect(applyDirectiveButtonStructure).toHaveBeenCalledWith(subcomponentA, subcomponentB)
  })

  it('works with DepartmentSeal', async () => {
    const subcomponentA = buildUniqueEmailSubComponent({ kind: 'DepartmentSeal' })
    const subcomponentB = buildUniqueEmailSubComponent({ kind: 'DepartmentSeal' })
    expect(applySubComponentStructure(subcomponentA, subcomponentB)).toEqual(subcomponentB)
  })
})
