import React from 'react'
import { faker } from '@faker-js/faker'
import { render } from '@testing-library/react'
import { buildUniqueEmailSubComponent } from 'src/testHelpers'
import { EmailSubComponentControls } from '..'
import { ShouldShowEmailPart } from 'src/templates/ShouldShowEmailPart'

describe('EmailSubComponentControls', () => {
  let componentId: string
  let id: string

  beforeEach(() => {
    componentId = faker.lorem.words(2)
    id = faker.lorem.words(3)
  })

  it('renders nothing for Title', () => {
    const { baseElement } = render(
      <EmailSubComponentControls
        emailSubComponent={buildUniqueEmailSubComponent('Header', { kind: 'Title' })}
        componentId={componentId}
        id={id}
      />,
    )
    expect(baseElement.innerHTML).toEqual('<div></div>')
  })

  it('renders the ProgramNameControls', () => {
    const { queryByText } = render(
      <EmailSubComponentControls
        emailSubComponent={buildUniqueEmailSubComponent('Header', { kind: 'ProgramName' })}
        componentId={componentId}
        id={id}
      />,
    )
    expect(queryByText('Background Color')).not.toBeNull()
  })

  it('renders nothing for AdditionalContent', () => {
    const { baseElement } = render(
      <EmailSubComponentControls
        emailSubComponent={buildUniqueEmailSubComponent('Footer', { kind: 'AdditionalContent' })}
        componentId={componentId}
        id={id}
      />,
    )
    expect(baseElement.innerHTML).toEqual('<div></div>')
  })

  it('renders nothing for Intro', () => {
    const { baseElement } = render(
      <EmailSubComponentControls
        emailSubComponent={buildUniqueEmailSubComponent('Body', { kind: 'Intro' })}
        componentId={componentId}
        id={id}
      />,
    )
    expect(baseElement.innerHTML).toEqual('<div></div>')
  })

  it('renders the SupplementalContentControls', () => {
    const { queryByText } = render(
      <EmailSubComponentControls
        emailSubComponent={buildUniqueEmailSubComponent('Body', { kind: 'SupplementalContent' })}
        componentId={componentId}
        id={id}
      />,
    )
    expect(queryByText('Supplemental Content variant')).not.toBeNull()
  })

  it('renders the StatusControls', () => {
    const { queryByText } = render(
      <EmailSubComponentControls
        emailSubComponent={buildUniqueEmailSubComponent('Body', { kind: 'Status' })}
        componentId={componentId}
        id={id}
      />,
    )
    expect(queryByText('Status variant')).not.toBeNull()
  })

  it('renders the RulesRightsRegulationsControls', () => {
    const { queryByText } = render(
      <EmailSubComponentControls
        emailSubComponent={buildUniqueEmailSubComponent('Body', {
          kind: 'RulesRightsRegulations',
        })}
        componentId={componentId}
        id={id}
      />,
    )
    expect(queryByText('Rules, Rights, and Regulations variant')).not.toBeNull()
  })

  it('renders the LoginDetailsControls', () => {
    const { queryByText } = render(
      <EmailSubComponentControls
        emailSubComponent={buildUniqueEmailSubComponent('Body', {
          kind: 'LoginDetails',
        })}
        componentId={componentId}
        id={id}
      />,
    )
    expect(queryByText('Icon')).not.toBeNull()
  })

  it('renders the InformationalBoxControls', () => {
    const { queryByText } = render(
      <EmailSubComponentControls
        emailSubComponent={buildUniqueEmailSubComponent('Body', { kind: 'InformationalBox' })}
        componentId={componentId}
        id={id}
      />,
    )
    expect(queryByText('Box Color')).not.toBeNull()
  })

  describe('when the component is not being shown', () => {
    it('renders nothing', () => {
      const { baseElement } = render(
        <ShouldShowEmailPart initialData={{ [componentId]: false }}>
          <EmailSubComponentControls
            emailSubComponent={buildUniqueEmailSubComponent('Body', {
              kind: 'RulesRightsRegulations',
            })}
            componentId={componentId}
            id={id}
          />
        </ShouldShowEmailPart>,
      )
      expect(baseElement.innerHTML).toEqual('<div></div>')
    })
  })

  describe('when the subcomponent is not being shown', () => {
    it('renders nothing', () => {
      const { baseElement } = render(
        <ShouldShowEmailPart initialData={{ [id]: false }}>
          <EmailSubComponentControls
            emailSubComponent={buildUniqueEmailSubComponent('Body', {
              kind: 'RulesRightsRegulations',
            })}
            componentId={componentId}
            id={id}
          />
        </ShouldShowEmailPart>,
      )
      expect(baseElement.innerHTML).toEqual('<div></div>')
    })
  })
})
