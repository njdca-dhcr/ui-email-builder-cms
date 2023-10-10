import React from 'react'
import { faker } from '@faker-js/faker'
import { render } from '@testing-library/react'
import { buildEmailTemplateSubComponent } from 'src/testHelpers'
import { EmailSubComponentControls } from '..'

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
        emailSubComponent={buildEmailTemplateSubComponent('Header', { kind: 'Title' })}
        componentId={componentId}
        id={id}
      />,
    )
    expect(baseElement.innerHTML).toEqual('<div></div>')
  })

  it('renders nothing for ProgramName', () => {
    const { baseElement } = render(
      <EmailSubComponentControls
        emailSubComponent={buildEmailTemplateSubComponent('Header', { kind: 'ProgramName' })}
        componentId={componentId}
        id={id}
      />,
    )
    expect(baseElement.innerHTML).toEqual('<div></div>')
  })

  it('renders nothing for AdditionalContent', () => {
    const { baseElement } = render(
      <EmailSubComponentControls
        emailSubComponent={buildEmailTemplateSubComponent('Footer', { kind: 'AdditionalContent' })}
        componentId={componentId}
        id={id}
      />,
    )
    expect(baseElement.innerHTML).toEqual('<div></div>')
  })

  it('renders nothing for Intro', () => {
    const { baseElement } = render(
      <EmailSubComponentControls
        emailSubComponent={buildEmailTemplateSubComponent('Body', { kind: 'Intro' })}
        componentId={componentId}
        id={id}
      />,
    )
    expect(baseElement.innerHTML).toEqual('<div></div>')
  })

  it('renders nothing for SupplementalContent', () => {
    const { baseElement } = render(
      <EmailSubComponentControls
        emailSubComponent={buildEmailTemplateSubComponent('Body', { kind: 'SupplementalContent' })}
        componentId={componentId}
        id={id}
      />,
    )
    expect(baseElement.innerHTML).toEqual('<div></div>')
  })

  it('renders the StatusControls', () => {
    const { queryByText } = render(
      <EmailSubComponentControls
        emailSubComponent={buildEmailTemplateSubComponent('Body', { kind: 'Status' })}
        componentId={componentId}
        id={id}
      />,
    )
    expect(queryByText('Status variant')).not.toBeNull()
  })
})
