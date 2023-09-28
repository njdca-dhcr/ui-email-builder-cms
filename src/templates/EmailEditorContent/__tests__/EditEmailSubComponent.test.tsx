import React from 'react'
import { EditEmailSubComponent } from '../EditEmailSubComponent'
import { EmailTemplate } from 'src/appTypes'
import { ShouldShowEmailPart } from 'src/templates/ShouldShowEmailPart'
import { render } from '@testing-library/react'
import { buildSubComponentKey } from 'src/utils/emailPartKeys'
import { buildEmailTemplateSubComponent, emailPartWrapper } from 'src/testHelpers'
import { faker } from '@faker-js/faker'

describe('EditEmailSubComponent', () => {
  let componentId: string
  let id: string
  let emailSubComponent: EmailTemplate.SubComponent<EmailTemplate.ComponentKind>

  beforeEach(() => {
    componentId = faker.lorem.words(2)
    id = faker.lorem.words(3)
    emailSubComponent = buildEmailTemplateSubComponent('Header', { kind: 'Title' })
  })

  it('does not display anything when the subcomponent is toggled off', () => {
    const key = buildSubComponentKey(componentId, id)
    const { baseElement } = render(
      <ShouldShowEmailPart initialData={{ [key]: false }}>
        <EditEmailSubComponent
          componentId={componentId}
          id={id}
          emailSubComponent={emailSubComponent}
        />
      </ShouldShowEmailPart>,
      { wrapper: emailPartWrapper },
    )
    const tbody = baseElement.querySelector('tbody')
    expect(tbody).not.toBeNull()
    expect(tbody).toBeEmptyDOMElement()
  })

  it('can render Title', () => {
    emailSubComponent = buildEmailTemplateSubComponent('Header', { kind: 'Title' })
    const { queryByText } = render(
      <EditEmailSubComponent
        componentId={componentId}
        id={id}
        emailSubComponent={emailSubComponent}
      />,
      { wrapper: emailPartWrapper },
    )
    expect(queryByText('Title')).not.toBeNull()
  })

  it('can render Label', () => {
    emailSubComponent = buildEmailTemplateSubComponent('Header', { kind: 'Label' })
    const { queryByText } = render(
      <EditEmailSubComponent
        componentId={componentId}
        id={id}
        emailSubComponent={emailSubComponent}
      />,
      { wrapper: emailPartWrapper },
    )
    expect(queryByText('Label')).not.toBeNull()
  })

  it('can render AdditionalContent', () => {
    emailSubComponent = buildEmailTemplateSubComponent('Footer', { kind: 'AdditionalContent' })
    const { queryByText } = render(
      <EditEmailSubComponent
        componentId={componentId}
        id={id}
        emailSubComponent={emailSubComponent}
      />,
      { wrapper: emailPartWrapper },
    )
    expect(queryByText('Additional Content')).not.toBeNull()
  })

  it('can render Breakdown', () => {
    emailSubComponent = buildEmailTemplateSubComponent('Amount', { kind: 'Breakdown' })
    const { queryByText } = render(
      <EditEmailSubComponent
        componentId={componentId}
        id={id}
        emailSubComponent={emailSubComponent}
      />,
    )
    expect(queryByText('Overpayment Total')).not.toBeNull()
  })

  it('can render Intro', () => {
    emailSubComponent = buildEmailTemplateSubComponent('Body', { kind: 'Intro' })
    const { queryByTestId } = render(
      <EditEmailSubComponent
        componentId={componentId}
        id={id}
        emailSubComponent={emailSubComponent}
      />,
      { wrapper: emailPartWrapper },
    )
    expect(queryByTestId('body-intro')).not.toBeNull()
  })

  it('can render Status', () => {
    emailSubComponent = buildEmailTemplateSubComponent('Body', { kind: 'Status' })
    const { queryByTestId } = render(
      <EditEmailSubComponent
        componentId={componentId}
        id={id}
        emailSubComponent={emailSubComponent}
      />,
      { wrapper: emailPartWrapper },
    )
    expect(queryByTestId('body-status-title')).not.toBeNull()
  })
})
