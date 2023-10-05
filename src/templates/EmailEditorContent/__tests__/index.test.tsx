import React from 'react'
import userEvent from '@testing-library/user-event'
import copy from 'copy-to-clipboard'
import { render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { EmailTemplate } from 'src/appTypes'
import {
  buildEmailTemplateComponent,
  buildEmailTemplateConfig,
  buildEmailTemplateSubComponent,
} from 'src/testHelpers'
import { EmailEditorContent } from '..'

describe('EmailEditorContent', () => {
  let emailTemplate: EmailTemplate.Config

  beforeEach(() => {
    emailTemplate = buildEmailTemplateConfig({
      components: [
        buildEmailTemplateComponent('Header', {
          subComponents: [
            buildEmailTemplateSubComponent('Header', { kind: 'Title' }),
            buildEmailTemplateSubComponent('Header', { kind: 'ProgramName' }),
          ],
        }),
      ],
    })
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

  it('can display the email components and subcomponents', () => {
    const { queryByText } = render(<EmailEditorContent emailTemplate={emailTemplate} />)
    expect(queryByText('Title')).not.toBeNull()
    expect(queryByText('Program Name')).not.toBeNull()
  })

  it('allows users to copy the current preview into their clipboard', async () => {
    const user = userEvent.setup()

    const { getByText } = render(<EmailEditorContent emailTemplate={emailTemplate} />)

    const value = faker.lorem.words(4)
    await user.type(getByText('Title'), value)

    expect(copy).not.toHaveBeenCalled()
    await user.click(getByText('Copy HTML'))
    expect(copy).toHaveBeenCalled()

    const lastArgumentToCopy: string = (copy as jest.Mock).mock.calls[0][0]
    expect(lastArgumentToCopy).toContain(value)
  })

  it('renders the preview text', () => {
    const { baseElement } = render(<EmailEditorContent emailTemplate={emailTemplate} />)
    expect(baseElement.querySelector('#preview-text')).not.toBeNull()
  })
})
