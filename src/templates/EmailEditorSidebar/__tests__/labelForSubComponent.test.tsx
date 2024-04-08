import { labelForSubComponent } from '../labelForSubComponent'

describe('labelForSubComponent', () => {
  it('is the kind attribute of the sub component', () => {
    expect(labelForSubComponent('Intro')).toEqual('Intro')
    expect(labelForSubComponent('Status')).toEqual('Status')
    expect(labelForSubComponent('Title')).toEqual('Title')
  })

  describe('when the subcomponent is DateRange', () => {
    it('is "Program Name"', () => {
      expect(labelForSubComponent('DateRange')).toEqual('Date Range')
    })
  })

  describe('when the subcomponent is LoginDetails', () => {
    it('is "Program Name"', () => {
      expect(labelForSubComponent('LoginDetails')).toEqual('Login Support')
    })
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
    it('is "What else should they know?"', () => {
      expect(labelForSubComponent('RulesRightsRegulations')).toEqual('What else should they know?')
    })
  })

  describe('when the subcomponent is DepartmentSeal', () => {
    it('is "Department Seal"', () => {
      expect(labelForSubComponent('DepartmentSeal')).toEqual('Department Seal')
    })
  })

  describe('when the subcomponent is DirectiveButton', () => {
    it('is "Department Seal"', () => {
      expect(labelForSubComponent('DirectiveButton')).toEqual('Directive Button')
    })
  })

  describe('when the subcomponent is InformationalBox', () => {
    it('is "Department Seal"', () => {
      expect(labelForSubComponent('InformationalBox')).toEqual('Informational Box')
    })
  })
})
