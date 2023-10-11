import { labelForSubComponent } from '../labelForSubComponent'

describe('labelForSubComponent', () => {
  it('is the kind attribute of the sub component', () => {
    expect(labelForSubComponent('Intro')).toEqual('Intro')
    expect(labelForSubComponent('Status')).toEqual('Status')
    expect(labelForSubComponent('Title')).toEqual('Title')
  })

  describe('when the subcomponent is ProgramName', () => {
    it('is "Program Name"', () => {
      expect(labelForSubComponent('ProgramName')).toEqual('Program Name')
    })
  })

  describe('when the subcomponent is AdditionalContent', () => {
    it('is "Additional Content"', () => {
      expect(labelForSubComponent('AdditionalContent')).toEqual('Additional Content')
    })
  })

  describe('when the subcomponent is SupplementalContent', () => {
    it('is "Supplemental Content"', () => {
      expect(labelForSubComponent('SupplementalContent')).toEqual('Supplemental Content')
    })
  })

  describe('when the subcomponent is RulesRightsRegulations', () => {
    it('is "Supplemental Content"', () => {
      expect(labelForSubComponent('RulesRightsRegulations')).toEqual(
        'Rules, Rights, and Regulations',
      )
    })
  })
})
