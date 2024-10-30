import React from 'react'
import { EditEmailSubComponent } from '../EditEmailSubComponent'
import { EmailTemplate } from 'src/appTypes'
import { render } from '@testing-library/react'
import { buildUniqueEmailSubComponent, emailPartWrapper } from 'src/testHelpers'
import { EmailPartsContent } from 'src/templates/EmailPartsContent'

describe('EditEmailSubComponent', () => {
  let emailSubComponent: EmailTemplate.Unique.SubComponent

  beforeEach(() => {
    emailSubComponent = buildUniqueEmailSubComponent({ kind: 'Title' })
  })

  it('does not display anything when the subcomponent is toggled off', () => {
    const { baseElement } = render(
      <EmailPartsContent initialData={{ [emailSubComponent.id]: { visible: false } }}>
        <EditEmailSubComponent emailSubComponent={emailSubComponent} />
      </EmailPartsContent>,
      { wrapper: emailPartWrapper },
    )
    const tbody = baseElement.querySelector('tbody')
    expect(tbody).not.toBeNull()
    expect(tbody).toBeEmptyDOMElement()
  })

  it('can render Title', () => {
    emailSubComponent = buildUniqueEmailSubComponent({ kind: 'Title' })
    const { queryByLabelText } = render(
      <EditEmailSubComponent emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )
    expect(queryByLabelText('Title')).not.toBeNull()
  })

  it('can render ProgramName', () => {
    emailSubComponent = buildUniqueEmailSubComponent({ kind: 'ProgramName' })
    const { queryByLabelText } = render(
      <EditEmailSubComponent emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )
    expect(queryByLabelText('Program name')).not.toBeNull()
  })

  it('can render DirectiveButton', () => {
    emailSubComponent = buildUniqueEmailSubComponent({ kind: 'DirectiveButton' })
    const { queryByRole } = render(
      <EditEmailSubComponent emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )
    expect(queryByRole('link')).not.toBeNull()
  })

  it('can render AdditionalContent', () => {
    emailSubComponent = buildUniqueEmailSubComponent({ kind: 'AdditionalContent' })
    const { queryByLabelText } = render(
      <EditEmailSubComponent emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )
    expect(queryByLabelText('Additional content')).not.toBeNull()
  })

  it('can render Intro', () => {
    emailSubComponent = buildUniqueEmailSubComponent({ kind: 'Intro' })
    const { queryByLabelText } = render(
      <EditEmailSubComponent emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )
    expect(queryByLabelText('Introduction')).not.toBeNull()
  })

  it('can render Status', () => {
    emailSubComponent = buildUniqueEmailSubComponent({ kind: 'Status' })
    const { queryByLabelText } = render(
      <EditEmailSubComponent emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )
    expect(queryByLabelText('Status title')).not.toBeNull()
  })

  it('can render SupplementalContent', () => {
    emailSubComponent = buildUniqueEmailSubComponent({ kind: 'SupplementalContent' })
    const { queryByLabelText } = render(
      <EditEmailSubComponent emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )
    expect(queryByLabelText('Supplemental content title')).not.toBeNull()
  })

  it('can render RulesRightsRegulations', () => {
    emailSubComponent = buildUniqueEmailSubComponent({ kind: 'RulesRightsRegulations' })
    const { queryByLabelText } = render(
      <EditEmailSubComponent emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )
    expect(queryByLabelText('Reminder title')).not.toBeNull()
  })

  it('can render LoginDetails', () => {
    emailSubComponent = buildUniqueEmailSubComponent({ kind: 'LoginDetails' })
    const { queryByLabelText } = render(
      <EditEmailSubComponent emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )
    expect(queryByLabelText('Login details title')).not.toBeNull()
  })

  it('can render DepartmentSeal', () => {
    emailSubComponent = buildUniqueEmailSubComponent({ kind: 'DepartmentSeal' })
    const { queryByTestId } = render(
      <EditEmailSubComponent emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )
    expect(queryByTestId('department-seal')).not.toBeNull()
  })

  it('can render InformationalBox', () => {
    emailSubComponent = buildUniqueEmailSubComponent({ kind: 'InformationalBox' })
    const { queryByLabelText } = render(
      <EditEmailSubComponent emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )
    expect(queryByLabelText('Informational box title')).not.toBeNull()
  })
})
