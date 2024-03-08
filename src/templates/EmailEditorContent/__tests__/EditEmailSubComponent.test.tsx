import React from 'react'
import { EditEmailSubComponent } from '../EditEmailSubComponent'
import { EmailTemplate } from 'src/appTypes'
import { ShouldShowEmailPart } from 'src/templates/ShouldShowEmailPart'
import { render } from '@testing-library/react'
import { buildUniqueEmailSubComponent, emailPartWrapper } from 'src/testHelpers'

describe('EditEmailSubComponent', () => {
  let emailSubComponent: EmailTemplate.UniqueSubComponent

  beforeEach(() => {
    emailSubComponent = buildUniqueEmailSubComponent('Header', { kind: 'Title' })
  })

  it('does not display anything when the subcomponent is toggled off', () => {
    const { baseElement } = render(
      <ShouldShowEmailPart initialData={{ [emailSubComponent.id]: false }}>
        <EditEmailSubComponent emailSubComponent={emailSubComponent} />
      </ShouldShowEmailPart>,
      { wrapper: emailPartWrapper },
    )
    const tbody = baseElement.querySelector('tbody')
    expect(tbody).not.toBeNull()
    expect(tbody).toBeEmptyDOMElement()
  })

  it('can render Title', () => {
    emailSubComponent = buildUniqueEmailSubComponent('Header', { kind: 'Title' })
    const { queryByLabelText } = render(
      <EditEmailSubComponent emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )
    expect(queryByLabelText('Title')).not.toBeNull()
  })

  it('can render ProgramName', () => {
    emailSubComponent = buildUniqueEmailSubComponent('Header', { kind: 'ProgramName' })
    const { queryByLabelText } = render(
      <EditEmailSubComponent emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )
    expect(queryByLabelText('Program name')).not.toBeNull()
  })

  it('can render DirectiveButton', () => {
    emailSubComponent = buildUniqueEmailSubComponent('Header', { kind: 'DirectiveButton' })
    const { queryByRole } = render(
      <EditEmailSubComponent emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )
    expect(queryByRole('link')).not.toBeNull()
  })

  it('can render AdditionalContent', () => {
    emailSubComponent = buildUniqueEmailSubComponent('Footer', { kind: 'AdditionalContent' })
    const { queryByLabelText } = render(
      <EditEmailSubComponent emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )
    expect(queryByLabelText('Additional content')).not.toBeNull()
  })

  it('can render Intro', () => {
    emailSubComponent = buildUniqueEmailSubComponent('Body', { kind: 'Intro' })
    const { queryByLabelText } = render(
      <EditEmailSubComponent emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )
    expect(queryByLabelText('Introduction')).not.toBeNull()
  })

  it('can render Status', () => {
    emailSubComponent = buildUniqueEmailSubComponent('Body', { kind: 'Status' })
    const { queryByLabelText } = render(
      <EditEmailSubComponent emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )
    expect(queryByLabelText('Status title')).not.toBeNull()
  })

  it('can render SupplementalContent', () => {
    emailSubComponent = buildUniqueEmailSubComponent('Body', { kind: 'SupplementalContent' })
    const { queryByLabelText } = render(
      <EditEmailSubComponent emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )
    expect(queryByLabelText('Supplemental content title')).not.toBeNull()
  })

  it('can render RulesRightsRegulations', () => {
    emailSubComponent = buildUniqueEmailSubComponent('Body', { kind: 'RulesRightsRegulations' })
    const { queryByLabelText } = render(
      <EditEmailSubComponent emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )
    expect(queryByLabelText('Reminder title')).not.toBeNull()
  })

  it('can render LoginDetails', () => {
    emailSubComponent = buildUniqueEmailSubComponent('Body', { kind: 'LoginDetails' })
    const { queryByLabelText } = render(
      <EditEmailSubComponent emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )
    expect(queryByLabelText('Login details title')).not.toBeNull()
  })

  it('can render DepartmentSeal', () => {
    emailSubComponent = buildUniqueEmailSubComponent('Header', { kind: 'DepartmentSeal' })
    const { queryByTestId } = render(
      <EditEmailSubComponent emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )
    expect(queryByTestId('department-seal')).not.toBeNull()
  })

  it('can render InformationalBox', () => {
    emailSubComponent = buildUniqueEmailSubComponent('Body', { kind: 'InformationalBox' })
    const { queryByLabelText } = render(
      <EditEmailSubComponent emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )
    expect(queryByLabelText('Informational box title')).not.toBeNull()
  })
})
