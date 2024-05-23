import React from 'react'
import { render } from '@testing-library/react'
import MyLibraryPage from '../my-library'
import { SIDEBAR_NAVIGATION_TEST_ID as sidebarNavigationTestId } from 'src/ui/SidebarNavigation'
import { asMock, buildEmailTemplateIndex, buildUseQueryResult, urlFor } from 'src/testHelpers'
import { useEmailTemplates } from 'src/network/useEmailTemplates'
import { EmailTemplateIndex } from 'src/network/useEmailTemplates'
import { faker } from '@faker-js/faker'

jest.mock('src/network/useEmailTemplates', () => {
  return {
    useEmailTemplates: jest.fn(),
  }
})

describe('My Library page', () => {
  it('is displayed in a layout', () => {
    const query = buildUseQueryResult<EmailTemplateIndex[]>({ isLoading: true, data: undefined })
    asMock(useEmailTemplates).mockReturnValue(query)
    const { baseElement } = render(<MyLibraryPage />)
    expect(baseElement.querySelector('.layout')).not.toBeNull()
  })

  it('displays the sidebar navigation', () => {
    const query = buildUseQueryResult<EmailTemplateIndex[]>({ isLoading: true, data: undefined })
    asMock(useEmailTemplates).mockReturnValue(query)
    const { queryByTestId } = render(<MyLibraryPage />)
    expect(queryByTestId(sidebarNavigationTestId)).not.toBeNull()
  })

  describe('when loading', () => {
    it('displays an loading spinner', () => {
      const query = buildUseQueryResult<EmailTemplateIndex[]>({ isLoading: true, data: undefined })
      asMock(useEmailTemplates).mockReturnValue(query)
      const { queryByText } = render(<MyLibraryPage />)
      expect(queryByText('Loading your email templates')).not.toBeNull()
    })
  })

  describe('when successful and the user has saved templates', () => {
    it("displays the user's email templates", () => {
      const emailTemplates = [buildEmailTemplateIndex(), buildEmailTemplateIndex()]
      const [emailTemplate1, emailTemplate2] = emailTemplates
      const query = buildUseQueryResult({ data: emailTemplates })
      asMock(useEmailTemplates).mockReturnValue(query)

      const { queryByText } = render(<MyLibraryPage />)

      const firstLink: HTMLAnchorElement | null = queryByText(emailTemplate1.name) as any
      expect(firstLink).not.toBeNull()
      expect(firstLink!.href).toEqual(urlFor(`/email-templates/${emailTemplate1.id}`))

      const secondLink: HTMLAnchorElement | null = queryByText(emailTemplate2.name) as any
      expect(secondLink).not.toBeNull()
      expect(secondLink!.href).toEqual(urlFor(`/email-templates/${emailTemplate2.id}`))
    })
  })

  describe('when successful and the user lacks saved templates', () => {
    it('displays an empty message', () => {
      const query = buildUseQueryResult<EmailTemplateIndex[]>({ data: [] })
      asMock(useEmailTemplates).mockReturnValue(query)
      const { baseElement } = render(<MyLibraryPage />)
      expect(baseElement).toHaveTextContent("Looks like you don't have any saved templates yet")
    })
  })

  describe('when there is an error', () => {
    it('displays an error', () => {
      const error = new Error(faker.lorem.sentence())
      const query = buildUseQueryResult<EmailTemplateIndex[]>({ error, isError: true })
      asMock(useEmailTemplates).mockReturnValue(query)
      const { queryByText } = render(<MyLibraryPage />)
      expect(queryByText(error.message)).not.toBeNull()
    })
  })
})
