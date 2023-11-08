import React from 'react'
import userEvent from '@testing-library/user-event'
import copy from 'copy-to-clipboard'
import { render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { EmailTemplate } from 'src/appTypes'
import {
  buildUniqueEmailComponent,
  buildUniqueEmailConfig,
  buildUniqueEmailSubComponent,
} from 'src/testHelpers'
import { EmailEditorContent } from '..'
import { download } from 'src/utils/download'
import { EmailPartsContent } from 'src/templates/EmailPartsContent'

jest.mock('src/utils/download', () => {
  return {
    download: jest.fn(),
  }
})

describe('EmailEditorContent', () => {
  let emailTemplate: EmailTemplate.UniqueConfig

  beforeEach(() => {
    emailTemplate = buildUniqueEmailConfig({
      components: [
        buildUniqueEmailComponent('Header', {
          subComponents: [
            buildUniqueEmailSubComponent('Header', { kind: 'Title' }),
            buildUniqueEmailSubComponent('Header', { kind: 'ProgramName' }),
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

    const { getByText } = render(
      <EmailPartsContent>
        <EmailEditorContent emailTemplate={emailTemplate} />
      </EmailPartsContent>,
    )

    const value = faker.lorem.words(4)
    await user.type(getByText('Title'), value)

    expect(copy).not.toHaveBeenCalled()
    await user.click(getByText('Copy HTML'))
    expect(copy).toHaveBeenCalled()

    const lastArgumentToCopy: string = (copy as jest.Mock).mock.calls[0][0]
    expect(lastArgumentToCopy).toContain(`${value}</h1>`)
    expect(lastArgumentToCopy).toContain(`${value}</title>`)
  })

  it('allows users to download the current preview', async () => {
    const user = userEvent.setup()

    const { getByText } = render(
      <EmailPartsContent>
        <EmailEditorContent emailTemplate={emailTemplate} />
      </EmailPartsContent>,
    )

    const value = faker.lorem.words(4)
    await user.type(getByText('Title'), value)

    expect(download).not.toHaveBeenCalled()
    await user.click(getByText('Download HTML'))
    expect(download).toHaveBeenCalled()

    const [givenHtml, givenFileName, givenType] = (download as jest.Mock).mock.calls[0]
    expect(givenHtml).toContain(`${value}</h1>`)
    expect(givenHtml).toContain(`${value}</title>`)
    expect(givenFileName).toEqual(`${emailTemplate.name}.html`)
    expect(givenType).toEqual('text/html')
  })

  it('renders the preview text', () => {
    const { baseElement } = render(<EmailEditorContent emailTemplate={emailTemplate} />)
    expect(baseElement.querySelector('#preview-text')).not.toBeNull()
  })
})
