import React from 'react'
import { render } from '@testing-library/react'
import { buildUniqueEmailSubComponent } from 'src/testHelpers'
import { EmailTemplate } from 'src/appTypes'
import { EmailSubComponentFloatingControls } from '../EmailSubcomponentFloatingControls'
import { EmailPartsContent } from 'src/templates/EmailPartsContent'

describe('EmailSubcomponentFloatingControls', () => {
  const itRendersNothing = (subcomponentKind: EmailTemplate.Kinds.SubComponent) => {
    it(`renders nothing for ${subcomponentKind}`, () => {
      const { baseElement } = render(
        <EmailSubComponentFloatingControls
          emailSubComponent={buildUniqueEmailSubComponent({
            kind: subcomponentKind,
          })}
          nextEmailSubComponent={undefined}
        />,
      )
      expect(baseElement.innerHTML).toEqual('<div></div>')
    })
  }

  itRendersNothing('Title')
  itRendersNothing('ProgramName')
  itRendersNothing('DateRange')
  itRendersNothing('DepartmentSeal')
  itRendersNothing('Intro')
  itRendersNothing('RulesRightsRegulations')
  itRendersNothing('SupplementalContent')
  itRendersNothing('Directive')
  itRendersNothing('LoginDetails')
  itRendersNothing('InformationalBox')
  itRendersNothing('AdditionalContent')

  describe('Status', () => {
    let status: EmailTemplate.Unique.SubComponent
    let directive: EmailTemplate.Unique.SubComponent

    beforeEach(() => {
      status = buildUniqueEmailSubComponent({
        kind: 'Status',
      })
      directive = buildUniqueEmailSubComponent({ kind: 'Directive' })
    })

    it('renders the StatusFloatingControls when the Status is followed by Directive and both are visible', () => {
      const { queryByText, queryByRole } = render(
        <EmailPartsContent
          initialData={{ [status.id]: { visible: true }, [directive.id]: { visible: true } }}
        >
          <EmailSubComponentFloatingControls
            emailSubComponent={status}
            nextEmailSubComponent={directive}
          />
        </EmailPartsContent>,
      )
      expect(queryByText('Spacing')).not.toBeNull()
      expect(queryByRole('radio', { name: 'Small' })).not.toBeNull()
      expect(queryByRole('radio', { name: 'Large' })).not.toBeNull()
    })

    it('does not render the StatusFloatingControls when the Status is followed by Directive but the Directive is hidden', () => {
      const { baseElement } = render(
        <EmailPartsContent
          initialData={{ [status.id]: { visible: true }, [directive.id]: { visible: false } }}
        >
          <EmailSubComponentFloatingControls
            emailSubComponent={status}
            nextEmailSubComponent={directive}
          />
        </EmailPartsContent>,
      )
      expect(baseElement.innerHTML).toEqual('<div></div>')
    })

    it('does not render the StatusFloatingControls when the Status is followed by a subcomponent other than Directive', () => {
      const loginDetails = buildUniqueEmailSubComponent({ kind: 'LoginDetails' })
      const { baseElement } = render(
        <EmailPartsContent
          initialData={{ [status.id]: { visible: true }, [loginDetails.id]: { visible: true } }}
        >
          <EmailSubComponentFloatingControls
            emailSubComponent={status}
            nextEmailSubComponent={loginDetails}
          />
        </EmailPartsContent>,
      )
      expect(baseElement.innerHTML).toEqual('<div></div>')
    })

    it('does not render the StatusFloatingControls when the Status is followed by nothing', () => {
      const { baseElement } = render(
        <EmailPartsContent initialData={{ [status.id]: { visible: true } }}>
          <EmailSubComponentFloatingControls
            emailSubComponent={status}
            nextEmailSubComponent={undefined}
          />
        </EmailPartsContent>,
      )
      expect(baseElement.innerHTML).toEqual('<div></div>')
    })
  })

  describe('when the subcomponent is not being shown', () => {
    it('renders nothing', () => {
      const emailSubComponent = buildUniqueEmailSubComponent({
        kind: 'Status',
      })
      const { baseElement } = render(
        <EmailPartsContent initialData={{ [emailSubComponent.id]: { visible: false } }}>
          <EmailSubComponentFloatingControls
            emailSubComponent={emailSubComponent}
            nextEmailSubComponent={undefined}
          />
        </EmailPartsContent>,
      )
      expect(baseElement.innerHTML).toEqual('<div></div>')
    })
  })
})
