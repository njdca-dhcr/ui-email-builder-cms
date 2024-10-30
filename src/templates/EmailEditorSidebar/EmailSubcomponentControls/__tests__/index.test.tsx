import React from 'react'
import { render } from '@testing-library/react'
import { buildUniqueEmailComponent, buildUniqueEmailSubComponent } from 'src/testHelpers'
import { EmailSubComponentControls } from '..'
import { EmailTemplate } from 'src/appTypes'
import { EmailPartsContent } from 'src/templates/EmailPartsContent'

describe('EmailSubComponentControls', () => {
  let component: EmailTemplate.Unique.Component

  beforeEach(() => {
    component = buildUniqueEmailComponent('Body')
  })

  it('renders nothing for Title', () => {
    const { baseElement } = render(
      <EmailSubComponentControls
        emailSubComponent={buildUniqueEmailSubComponent({ kind: 'Title' })}
        component={component}
      />,
    )
    expect(baseElement.innerHTML).toEqual('<div></div>')
  })

  it('renders the ProgramNameControls', () => {
    const { queryByText } = render(
      <EmailSubComponentControls
        emailSubComponent={buildUniqueEmailSubComponent({ kind: 'ProgramName' })}
        component={component}
      />,
    )
    expect(queryByText('Background Color Preset')).not.toBeNull()
  })

  it('renders nothing for AdditionalContent', () => {
    const { baseElement } = render(
      <EmailSubComponentControls
        emailSubComponent={buildUniqueEmailSubComponent({ kind: 'AdditionalContent' })}
        component={component}
      />,
    )
    expect(baseElement.innerHTML).toEqual('<div></div>')
  })

  it('renders nothing for Intro', () => {
    const { baseElement } = render(
      <EmailSubComponentControls
        emailSubComponent={buildUniqueEmailSubComponent({ kind: 'Intro' })}
        component={component}
      />,
    )
    expect(baseElement.innerHTML).toEqual('<div></div>')
  })

  it('renders the SupplementalContentControls', () => {
    const { queryByText } = render(
      <EmailSubComponentControls
        emailSubComponent={buildUniqueEmailSubComponent({ kind: 'SupplementalContent' })}
        component={component}
      />,
    )
    expect(queryByText('Supplemental Content variant')).not.toBeNull()
  })

  it('renders the StatusControls', () => {
    const { queryByText } = render(
      <EmailSubComponentControls
        emailSubComponent={buildUniqueEmailSubComponent({ kind: 'Status' })}
        component={component}
      />,
    )
    expect(queryByText('Status variant')).not.toBeNull()
  })

  it('renders the RulesRightsRegulationsControls', () => {
    const { queryByText } = render(
      <EmailSubComponentControls
        emailSubComponent={buildUniqueEmailSubComponent({
          kind: 'RulesRightsRegulations',
        })}
        component={component}
      />,
    )
    expect(queryByText('Rules, Rights, and Regulations variant')).not.toBeNull()
  })

  it('renders the LoginDetailsControls', () => {
    const { queryByText } = render(
      <EmailSubComponentControls
        emailSubComponent={buildUniqueEmailSubComponent({
          kind: 'LoginDetails',
        })}
        component={component}
      />,
    )
    expect(queryByText('Icon')).not.toBeNull()
  })

  it('renders the InformationalBoxControls', () => {
    const { queryByText } = render(
      <EmailSubComponentControls
        emailSubComponent={buildUniqueEmailSubComponent({ kind: 'InformationalBox' })}
        component={component}
      />,
    )
    expect(queryByText('Box Color')).not.toBeNull()
  })

  describe('when the component is not being shown', () => {
    it('renders nothing', () => {
      const { baseElement } = render(
        <EmailPartsContent initialData={{ [component.id]: { visible: false } }}>
          <EmailSubComponentControls
            emailSubComponent={buildUniqueEmailSubComponent({
              kind: 'RulesRightsRegulations',
            })}
            component={component}
          />
        </EmailPartsContent>,
      )
      expect(baseElement.innerHTML).toEqual('<div></div>')
    })
  })

  describe('when the subcomponent is not being shown', () => {
    it('renders nothing', () => {
      const subcomponent = buildUniqueEmailSubComponent({
        kind: 'RulesRightsRegulations',
      })
      const { baseElement } = render(
        <EmailPartsContent initialData={{ [subcomponent.id]: { visible: false } }}>
          <EmailSubComponentControls emailSubComponent={subcomponent} component={component} />
        </EmailPartsContent>,
      )
      expect(baseElement.innerHTML).toEqual('<div></div>')
    })
  })
})
