import React from 'react'
import userEvent from '@testing-library/user-event'
import copy from 'copy-to-clipboard'
import { render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { EmailTemplate } from 'src/appTypes'
import {
  buildUniqueEmailComponent,
  buildUniqueEmailConfig,
  buildUniqueEmailSubComponent,
  mockAppMode,
} from 'src/testHelpers'
import { EmailEditorContent } from '..'
import { download } from 'src/utils/download'
import { EmailPartsContent } from 'src/templates/EmailPartsContent'
import { PreviewText } from 'src/templates/PreviewText'

jest.mock('src/utils/download', () => {
  return {
    download: jest.fn(),
  }
})

describe('EmailEditorContent', () => {
  let emailTemplate: EmailTemplate.UniqueConfig
  let alertSpy: jest.SpyInstance
  let client: QueryClient

  beforeEach(() => {
    client = new QueryClient()
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
    alertSpy = jest.spyOn(window, 'alert')
    alertSpy.mockReturnValue(false)
  })

  afterEach(() => {
    alertSpy.mockRestore()
  })

  it('can display the email in desktop or mobile', async () => {
    const user = userEvent.setup()
    const { baseElement, getByLabelText } = render(
      <QueryClientProvider client={client}>
        <EmailEditorContent emailTemplate={emailTemplate} />
      </QueryClientProvider>,
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
    const { queryByText } = render(
      <QueryClientProvider client={client}>
        <EmailEditorContent emailTemplate={emailTemplate} />
      </QueryClientProvider>,
    )
    expect(queryByText('Title')).not.toBeNull()
    expect(queryByText('Dependency Benefits')).not.toBeNull()
  })

  it('raises an alert if the user tries to export the email without preview text', async () => {
    const user = userEvent.setup()
    const { getByText } = render(
      <QueryClientProvider client={client}>
        <EmailPartsContent>
          <EmailEditorContent emailTemplate={emailTemplate} />
        </EmailPartsContent>
      </QueryClientProvider>,
    )
    const value = faker.lorem.words(4)
    await user.type(getByText('Title'), value)
    await user.click(getByText('Copy HTML'))
    expect(alertSpy).toHaveBeenCalledWith('Please add Preview Text before exporting HTML')
    expect(alertSpy).toHaveBeenCalledTimes(1)
    expect(copy).not.toHaveBeenCalled()

    await user.click(getByText('Download HTML'))
    expect(alertSpy).toHaveBeenCalledWith('Please add Preview Text before exporting HTML')
    expect(download).not.toHaveBeenCalled()
    expect(alertSpy).toHaveBeenCalledTimes(2)
  })

  it('allows users to copy the current preview into their clipboard', async () => {
    const user = userEvent.setup()

    const { getByText } = render(
      <QueryClientProvider client={client}>
        <PreviewText initialValue="Some preview text">
          <EmailPartsContent>
            <EmailEditorContent emailTemplate={emailTemplate} />
          </EmailPartsContent>
        </PreviewText>
      </QueryClientProvider>,
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
      <QueryClientProvider client={client}>
        <PreviewText initialValue="Some preview text">
          <EmailPartsContent>
            <EmailEditorContent emailTemplate={emailTemplate} />
          </EmailPartsContent>
        </PreviewText>
      </QueryClientProvider>,
    )

    const value = faker.lorem.words(4)
    await user.type(getByText('Title'), value)

    expect(download).not.toHaveBeenCalled()
    await user.click(getByText('Download HTML'))
    expect(download).toHaveBeenCalled()

    const [{ fileData: givenHtml, fileName: givenFileName, fileType: givenType }] = (
      download as jest.Mock
    ).mock.calls[0]
    expect(givenHtml).toContain(`${value}</h1>`)
    expect(givenHtml).toContain(`${value}</title>`)
    expect(givenFileName).toEqual(`${emailTemplate.name}.html`)
    expect(givenType).toEqual('text/html')
  })

  it('displays the edit preview text field', () => {
    const { baseElement } = render(
      <QueryClientProvider client={client}>
        <EmailEditorContent emailTemplate={emailTemplate} />
      </QueryClientProvider>,
    )
    const input = baseElement.querySelector('#edit-preview-text')

    expect(input).not.toBeNull()
  })

  it('renders the preview text', () => {
    const { baseElement } = render(
      <QueryClientProvider client={client}>
        <EmailEditorContent emailTemplate={emailTemplate} />
      </QueryClientProvider>,
    )
    expect(baseElement.querySelector('#preview-text')).not.toBeNull()
  })

  describe('when restricted', () => {
    beforeEach(() => {
      mockAppMode('KY')
    })

    it('does not have a download HTML button', () => {
      const { queryByText } = render(
        <QueryClientProvider client={client}>
          <EmailEditorContent emailTemplate={emailTemplate} />
        </QueryClientProvider>,
      )
      expect(queryByText('Download HTML')).toBeNull()
    })

    it('does not have a copy HTML button', () => {
      const { queryByText } = render(
        <QueryClientProvider client={client}>
          <EmailEditorContent emailTemplate={emailTemplate} />
        </QueryClientProvider>,
      )
      expect(queryByText('Copy HTML')).toBeNull()
    })
  })
})
