import React from 'react'
import { render } from '@testing-library/react'
import { ShouldShowEmailPart } from 'src/templates/ShouldShowEmailPart'
import { buildUniqueEmailSubComponent } from 'src/testHelpers'
import { EmailTemplate } from 'src/appTypes'
import { EmailSubComponentFloatingControls } from '../EmailSubcomponentFloatingControls'

describe('EmailSubcomponentFloatingControls', () => {
  const itRendersNothing = <T extends EmailTemplate.ComponentKind>(
    componentKind: T,
    subcomponentKind: EmailTemplate.SubComponentKind<T>,
  ) => {
    it(`renders nothing for ${subcomponentKind}`, () => {
      const { baseElement } = render(
        <EmailSubComponentFloatingControls
          emailSubComponent={buildUniqueEmailSubComponent(componentKind, {
            kind: subcomponentKind,
          })}
          nextEmailSubComponent={undefined}
        />,
      )
      expect(baseElement.innerHTML).toEqual('<div></div>')
    })
  }

  itRendersNothing('Header', 'Title')
  itRendersNothing('Header', 'ProgramName')
  itRendersNothing('Header', 'DateRange')
  itRendersNothing('Header', 'DepartmentSeal')
  itRendersNothing('Body', 'Intro')
  itRendersNothing('Body', 'RulesRightsRegulations')
  itRendersNothing('Body', 'SupplementalContent')
  itRendersNothing('Body', 'Directive')
  itRendersNothing('Body', 'LoginDetails')
  itRendersNothing('Body', 'BenefitAmount')
  itRendersNothing('Body', 'InformationalBox')
  itRendersNothing('Footer', 'AdditionalContent')

  describe('Status', () => {
    let status: EmailTemplate.UniqueSubComponent
    let directive: EmailTemplate.UniqueSubComponent

    beforeEach(() => {
      status = buildUniqueEmailSubComponent('Body', {
        kind: 'Status',
      })
      directive = buildUniqueEmailSubComponent('Body', { kind: 'Directive' })
    })

    it('renders the StatusFloatingControls when the Status is followed by Directive and both are visible', () => {
      const { queryByText, queryByRole } = render(
        <ShouldShowEmailPart initialData={{ [status.id]: true, [directive.id]: true }}>
          <EmailSubComponentFloatingControls
            emailSubComponent={status}
            nextEmailSubComponent={directive}
          />
        </ShouldShowEmailPart>,
      )
      expect(queryByText('Spacing')).not.toBeNull()
      expect(queryByRole('radio', { name: 'Small' })).not.toBeNull()
      expect(queryByRole('radio', { name: 'Large' })).not.toBeNull()
    })

    it('does not render the StatusFloatingControls when the Status is followed by Directive but the Directive is hidden', () => {
      const { baseElement } = render(
        <ShouldShowEmailPart initialData={{ [status.id]: true, [directive.id]: false }}>
          <EmailSubComponentFloatingControls
            emailSubComponent={status}
            nextEmailSubComponent={directive}
          />
        </ShouldShowEmailPart>,
      )
      expect(baseElement.innerHTML).toEqual('<div></div>')
    })

    it('does not render the StatusFloatingControls when the Status is followed by a subcomponent other than Directive', () => {
      const loginDetails = buildUniqueEmailSubComponent('Body', { kind: 'LoginDetails' })
      const { baseElement } = render(
        <ShouldShowEmailPart initialData={{ [status.id]: true, [loginDetails.id]: true }}>
          <EmailSubComponentFloatingControls
            emailSubComponent={status}
            nextEmailSubComponent={loginDetails}
          />
        </ShouldShowEmailPart>,
      )
      expect(baseElement.innerHTML).toEqual('<div></div>')
    })

    it('does not render the StatusFloatingControls when the Status is followed by nothing', () => {
      const { baseElement } = render(
        <ShouldShowEmailPart initialData={{ [status.id]: true }}>
          <EmailSubComponentFloatingControls
            emailSubComponent={status}
            nextEmailSubComponent={undefined}
          />
        </ShouldShowEmailPart>,
      )
      expect(baseElement.innerHTML).toEqual('<div></div>')
    })
  })

  describe('when the subcomponent is not being shown', () => {
    it('renders nothing', () => {
      const emailSubComponent = buildUniqueEmailSubComponent('Body', {
        kind: 'Status',
      })
      const { baseElement } = render(
        <ShouldShowEmailPart initialData={{ [emailSubComponent.id]: false }}>
          <EmailSubComponentFloatingControls
            emailSubComponent={emailSubComponent}
            nextEmailSubComponent={undefined}
          />
        </ShouldShowEmailPart>,
      )
      expect(baseElement.innerHTML).toEqual('<div></div>')
    })
  })
})
