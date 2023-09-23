import React from 'react'
import { render } from '@testing-library/react'
import { EmailTemplate } from 'src/appTypes'
import userEvent from '@testing-library/user-event'
import { navigate } from 'gatsby'
import { EmailEditorHeadingAndSelect } from '../EmailEditorHeadingAndSelect'
import { buildEmailTemplateConfig } from 'src/testHelpers'

describe('EmailEditorSidebar', () => {
  let emailTemplate: EmailTemplate.Config

  beforeEach(() => {
    emailTemplate = buildEmailTemplateConfig({ name: 'Email Template' })
  })

  it('displays the name of the email template', () => {
    const { baseElement } = render(<EmailEditorHeadingAndSelect emailTemplate={emailTemplate} />)
    const h1 = baseElement.querySelector('h1')
    expect(h1).not.toBeNull()
    expect(h1).toHaveTextContent(emailTemplate.name)
  })

  it('can navigate to any other template through a select', async () => {
    const user = userEvent.setup()
    const { getByLabelText } = render(<EmailEditorHeadingAndSelect emailTemplate={emailTemplate} />)
    const select = getByLabelText('Go to')

    expect(navigate).not.toHaveBeenCalled()
    await user.selectOptions(select, ['Another Email Template'])
    expect(navigate).toHaveBeenCalledWith('/email-templates/another-email-template')
  })

  it('does not include the current email template in the list of options', () => {
    const { getByLabelText } = render(<EmailEditorHeadingAndSelect emailTemplate={emailTemplate} />)
    const select = getByLabelText('Go to')

    const options = select.querySelectorAll('option')
    expect(options.length).toEqual(2)
  })
})
