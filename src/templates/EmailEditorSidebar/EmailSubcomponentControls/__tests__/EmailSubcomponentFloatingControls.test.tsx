import React from 'react'
import { faker } from '@faker-js/faker'
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
    it(`renders nothing for ${4}`, () => {
      const { baseElement } = render(
        <EmailSubComponentFloatingControls
          emailSubComponent={buildUniqueEmailSubComponent(componentKind, {
            kind: subcomponentKind,
          })}
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

  it('renders the StatusFloatingControls', () => {
    const { queryByText, queryByRole } = render(
      <EmailSubComponentFloatingControls
        emailSubComponent={buildUniqueEmailSubComponent('Body', {
          kind: 'Status',
        })}
      />,
    )
    expect(queryByText('Spacing')).not.toBeNull()
    expect(queryByRole('radio', { name: 'Small' })).not.toBeNull()
    expect(queryByRole('radio', { name: 'Large' })).not.toBeNull()
  })

  describe('when the subcomponent is not being shown', () => {
    it('renders nothing', () => {
      const emailSubComponent = buildUniqueEmailSubComponent('Body', {
        kind: 'Status',
      })
      const { baseElement } = render(
        <ShouldShowEmailPart initialData={{ [emailSubComponent.id]: false }}>
          <EmailSubComponentFloatingControls emailSubComponent={emailSubComponent} />
        </ShouldShowEmailPart>,
      )
      expect(baseElement.innerHTML).toEqual('<div></div>')
    })
  })
})
