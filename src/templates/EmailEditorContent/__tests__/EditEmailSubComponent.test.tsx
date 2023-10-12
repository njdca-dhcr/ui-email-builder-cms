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
    const { queryByLabelText } = render(
      <EditEmailSubComponent
        componentId={componentId}
        id={id}
        emailSubComponent={emailSubComponent}
      />,
      { wrapper: emailPartWrapper },
    )
    expect(queryByLabelText('Title')).not.toBeNull()
  })

  it('can render ProgramName', () => {
    emailSubComponent = buildEmailTemplateSubComponent('Header', { kind: 'ProgramName' })
    const { queryByLabelText } = render(
      <EditEmailSubComponent
        componentId={componentId}
        id={id}
        emailSubComponent={emailSubComponent}
      />,
      { wrapper: emailPartWrapper },
    )
    expect(queryByLabelText('Program name')).not.toBeNull()
  })

  it('can render AdditionalContent', () => {
    emailSubComponent = buildEmailTemplateSubComponent('Footer', { kind: 'AdditionalContent' })
    const { queryByLabelText } = render(
      <EditEmailSubComponent
        componentId={componentId}
        id={id}
        emailSubComponent={emailSubComponent}
      />,
      { wrapper: emailPartWrapper },
    )
    expect(queryByLabelText('Additional content')).not.toBeNull()
  })

  it('can render Intro', () => {
    emailSubComponent = buildEmailTemplateSubComponent('Body', { kind: 'Intro' })
    const { queryByLabelText } = render(
      <EditEmailSubComponent
        componentId={componentId}
        id={id}
        emailSubComponent={emailSubComponent}
      />,
      { wrapper: emailPartWrapper },
    )
    expect(queryByLabelText('Introduction')).not.toBeNull()
  })

  it('can render Status', () => {
    emailSubComponent = buildEmailTemplateSubComponent('Body', { kind: 'Status' })
    const { queryByLabelText } = render(
      <EditEmailSubComponent
        componentId={componentId}
        id={id}
        emailSubComponent={emailSubComponent}
      />,
      { wrapper: emailPartWrapper },
    )
    expect(queryByLabelText('Status title')).not.toBeNull()
  })

  it('can render SupplementalContent', () => {
    emailSubComponent = buildEmailTemplateSubComponent('Body', { kind: 'SupplementalContent' })
    const { queryByLabelText } = render(
      <EditEmailSubComponent
        componentId={componentId}
        id={id}
        emailSubComponent={emailSubComponent}
      />,
      { wrapper: emailPartWrapper },
    )
    expect(queryByLabelText('Supplemental content title')).not.toBeNull()
  })

  it('can render RulesRightsRegulations', () => {
    emailSubComponent = buildEmailTemplateSubComponent('Body', { kind: 'RulesRightsRegulations' })
    const { queryByLabelText } = render(
      <EditEmailSubComponent
        componentId={componentId}
        id={id}
        emailSubComponent={emailSubComponent}
      />,
      { wrapper: emailPartWrapper },
    )
    expect(queryByLabelText('Reminder title')).not.toBeNull()
  })

  it('can render LoginDetails', () => {
    emailSubComponent = buildEmailTemplateSubComponent('Body', { kind: 'LoginDetails' })
    const { queryByLabelText } = render(
      <EditEmailSubComponent
        componentId={componentId}
        id={id}
        emailSubComponent={emailSubComponent}
      />,
      { wrapper: emailPartWrapper },
    )
    expect(queryByLabelText('Login details title')).not.toBeNull()
  })
})
