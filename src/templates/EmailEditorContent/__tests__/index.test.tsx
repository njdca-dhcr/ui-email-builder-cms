import React from 'react'
import userEvent from '@testing-library/user-event'
import copy from 'copy-to-clipboard'
import { render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { EmailTemplate } from 'src/appTypes'
import { buildEmailTemplateConfig } from 'src/testHelpers'
import { EmailEditorContent } from '..'

describe('EmailEditorContent', () => {
  let emailTemplate: EmailTemplate.Config

  beforeEach(() => {
    emailTemplate = buildEmailTemplateConfig()
  })

  it('can display the email in desktop or mobile', async () => {
    const user = userEvent.setup()
    const { baseElement, getByLabelText } = render(
      <EmailEditorContent emailTemplate={emailTemplate} />,
    )

    expect(baseElement.querySelector('.email-preview-desktop')).not.toBeNull()
    expect(baseElement.querySelector('.email-preview-mobile')).toBeNull()

    await user.click(getByLabelText('Mobile'))

    expect(baseElement.querySelector('.email-preview-desktop')).toBeNull()
    expect(baseElement.querySelector('.email-preview-mobile')).not.toBeNull()

    await user.click(getByLabelText('Desktop'))
    expect(baseElement.querySelector('.email-preview-desktop')).not.toBeNull()
    expect(baseElement.querySelector('.email-preview-mobile')).toBeNull()
  })

  it.todo('can display the email')
  it.todo('can edit components of the email')
  it.todo('can edit sub-components of the email')

  xit('allows users to copy the current preview into their clipboard', async () => {
    const user = userEvent.setup()
    const rendered = render(<EmailEditorContent emailTemplate={emailTemplate} />)

    const { getByLabelText, getByText } = rendered

    const input: HTMLInputElement = getByLabelText('Header') as any
    const value = faker.lorem.words(4)
    await user.type(input, value)

    expect(copy).not.toHaveBeenCalled()
    await user.click(getByText('Copy to clipboard'))
    expect(copy).toHaveBeenCalled()

    const lastArgumentToCopy: string = (copy as jest.Mock).mock.calls[0][0]
    expect(lastArgumentToCopy).toContain(value)
  })
})
