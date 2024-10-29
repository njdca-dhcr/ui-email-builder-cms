import React from 'react'
import { render } from '@testing-library/react'
import { EmailTemplate } from 'src/appTypes'
import userEvent from '@testing-library/user-event'
import { navigate } from 'gatsby'
import { EmailEditorHeadingAndSelect } from '../EmailEditorHeadingAndSelect'
import { buildEmailTemplateConfig } from 'src/testHelpers'

describe('EmailEditorSidebar', () => {
  let emailTemplate: EmailTemplate.Base.Config

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
    const { getByRole } = render(<EmailEditorHeadingAndSelect emailTemplate={emailTemplate} />)

    expect(navigate).not.toHaveBeenCalled()
    await user.click(getByRole('combobox'))
    await user.click(getByRole('option', { name: 'Another Email Template' }))
    expect(navigate).toHaveBeenCalledWith('/email-templates/another-email-template', {
      replace: true,
    })
  })

  it('does not include the current email template in the list of options', async () => {
    const user = userEvent.setup()
    const { queryAllByRole, getByRole } = render(
      <EmailEditorHeadingAndSelect emailTemplate={emailTemplate} />,
    )

    await user.click(getByRole('combobox'))

    expect(queryAllByRole('option').length).toEqual(1)
  })
})
