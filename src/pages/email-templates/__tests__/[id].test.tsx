import React from 'react'
import { render } from '@testing-library/react'
import EmailTemplateShowPage, { Props } from '../[id]'
import {
  asMock,
  buildUniqueEmailComponent,
  buildUniqueEmailConfig,
  buildUniqueEmailSubComponent,
  buildUseQueryResult,
} from 'src/testHelpers'
import { useEmailTemplate } from 'src/network/useEmailTemplate'
import { EmailTemplateShow } from 'src/network/useEmailTemplate'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'crypto'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

jest.mock('src/network/useEmailTemplate', () => {
  return {
    useEmailTemplate: jest.fn(),
  }
})

describe('Email Template Show Page', () => {
  const renderEmailTemplateShowPage = (props?: Partial<Props>) => {
    return render(
      <QueryClientProvider client={new QueryClient()}>
        <EmailTemplateShowPage
          pageContext={null}
          uri=""
          path=""
          location={{} as any}
          pageResources={{} as any}
          params={{ id: faker.lorem.word() }}
          children={undefined}
          data={null}
          serverData={{}}
          {...props}
        />
      </QueryClientProvider>,
    )
  }

  it('is displayed in a layout', () => {
    const query = buildUseQueryResult<EmailTemplateShow>({ isLoading: true, data: undefined })
    asMock(useEmailTemplate).mockReturnValue(query)
    const { baseElement } = renderEmailTemplateShowPage()
    expect(baseElement.querySelector('.layout')).not.toBeNull()
  })

  it('loads the correct email template', () => {
    const emailTemplateId = randomUUID()
    const query = buildUseQueryResult<EmailTemplateShow>({ isLoading: true, data: undefined })
    asMock(useEmailTemplate).mockReturnValue(query)
    renderEmailTemplateShowPage({ params: { id: emailTemplateId } })
    expect(useEmailTemplate).toHaveBeenCalledWith(emailTemplateId)
  })

  describe('when loading', () => {
    it('displays an loading spinner', () => {
      const query = buildUseQueryResult<EmailTemplateShow>({ isLoading: true, data: undefined })
      asMock(useEmailTemplate).mockReturnValue(query)
      const { queryByText } = renderEmailTemplateShowPage()
      expect(queryByText('Loading your email template')).not.toBeNull()
    })
  })

  describe('when successful', () => {
    let emailTemplate: EmailTemplateShow
    let title: string

    beforeEach(() => {
      title = faker.lorem.words(3)
      emailTemplate = {
        id: randomUUID(),
        ...buildUniqueEmailConfig({
          components: [
            buildUniqueEmailComponent('Header', {
              subComponents: [
                buildUniqueEmailSubComponent('Header', {
                  kind: 'Title',
                  defaultValue: { title },
                }),
              ],
            }),
          ],
        }),
      }
      const query = buildUseQueryResult({ data: emailTemplate })
      asMock(useEmailTemplate).mockReturnValue(query)
    })

    it('displays the email template', () => {
      const { queryByText } = renderEmailTemplateShowPage()
      expect(queryByText(emailTemplate.name)).not.toBeNull()
    })

    xit('displays the EmailEditorContent', () => {
      const { baseElement } = renderEmailTemplateShowPage()
      const h1 = baseElement.querySelector('h1[contenteditable="true"]')
      expect(h1).not.toBeNull()
      expect(h1).toHaveTextContent(title)
    })

    xit('displays the EmailEditorSidebar', () => {
      const { queryByText } = renderEmailTemplateShowPage()
      expect(queryByText('Back')).not.toBeNull()
    })
  })

  describe('when there is an error', () => {
    it('displays an error', () => {
      const error = new Error(faker.lorem.sentence())
      const query = buildUseQueryResult<EmailTemplateShow>({ error, isError: true })
      asMock(useEmailTemplate).mockReturnValue(query)
      const { queryByText } = renderEmailTemplateShowPage()
      expect(queryByText(error.message)).not.toBeNull()
    })
  })
})
