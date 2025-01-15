import React from 'react'
import { render } from '@testing-library/react'
import MyDraftsPage from '../my-drafts'
import { SIDEBAR_NAVIGATION_TEST_ID as sidebarNavigationTestId } from 'src/ui/SidebarNavigation'
import {
  asMock,
  buildEmailTemplateIndex,
  buildEmailTemplateIndexItem,
  buildUseMutationResult,
  buildUseQueryResult,
  urlFor,
} from 'src/testHelpers'
import {
  useEmailTemplates,
  EmailTemplateIndex,
  useDestroyEmailTemplate,
} from 'src/network/emailTemplates'
import { faker } from '@faker-js/faker'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import userEvent from '@testing-library/user-event'

jest.mock('src/network/emailTemplates', () => {
  return {
    useEmailTemplates: jest.fn(),
    useDestroyEmailTemplate: jest.fn(),
  }
})

describe('My Drafts page', () => {
  beforeEach(() => {
    asMock(useDestroyEmailTemplate).mockReturnValue(buildUseMutationResult())
  })

  const renderMyDraftsPage = () => {
    return render(
      <QueryClientProvider client={new QueryClient()}>
        <MyDraftsPage />
      </QueryClientProvider>,
    )
  }

  it('is displayed in a layout', () => {
    const query = buildUseQueryResult<EmailTemplateIndex>({ isLoading: true, data: undefined, status: 'pending' })
    asMock(useEmailTemplates).mockReturnValue(query)
    const { baseElement } = renderMyDraftsPage()
    expect(baseElement.querySelector('.layout')).not.toBeNull()
  })

  it('displays the sidebar navigation', () => {
    const query = buildUseQueryResult<EmailTemplateIndex>({ isLoading: true, data: undefined, status: 'pending' })
    asMock(useEmailTemplates).mockReturnValue(query)
    const { queryByTestId } = renderMyDraftsPage()
    expect(queryByTestId(sidebarNavigationTestId)).not.toBeNull()
  })

  describe('when loading', () => {
    it('displays an loading spinner', () => {
      const query = buildUseQueryResult<EmailTemplateIndex>({ isLoading: true, data: undefined, status: 'pending' })
      asMock(useEmailTemplates).mockReturnValue(query)
      const { queryByText } = renderMyDraftsPage()
      expect(queryByText('Loading your email templates')).not.toBeNull()
    })
  })

  it('has a menu and options to add new drafts', async () => {
    const user = userEvent.setup()
    const query = buildUseQueryResult<EmailTemplateIndex>({ data: { user: [], groups: [] } })
    asMock(useEmailTemplates).mockReturnValue(query)
    const { queryByRole, debug } = renderMyDraftsPage()
    const newDraftButton = queryByRole('button', { name: 'New Draft' })
    expect(newDraftButton).not.toBeNull()
    await user.click(newDraftButton!)
    const blankLink = queryByRole('menuitem', { name: 'Blank' })
    expect(blankLink).not.toBeNull()
    expect(blankLink!).toHaveAttribute('href', '/email-templates/blank-slate/')
    const everythingLink = queryByRole('menuitem', { name: 'Everything' })
    expect(everythingLink).not.toBeNull()
    expect(everythingLink!).toHaveAttribute('href', '/email-templates/everything-bagel/')
    const templateLink = queryByRole('menuitem', { name: 'Select from template' })
    expect(templateLink).not.toBeNull()
    expect(templateLink!).toHaveAttribute('href', '/library')
  })

  describe('when successful and the user has saved templates', () => {
    it("displays the user's email templates", () => {
      const emailTemplates = [buildEmailTemplateIndexItem(), buildEmailTemplateIndexItem()]
      const [emailTemplate1, emailTemplate2] = emailTemplates
      const query = buildUseQueryResult({ data: { user: emailTemplates, groups: [] } })
      asMock(useEmailTemplates).mockReturnValue(query)

      const { queryByText } = renderMyDraftsPage()

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
      const query = buildUseQueryResult<EmailTemplateIndex>({ data: { user: [], groups: [] } })
      asMock(useEmailTemplates).mockReturnValue(query)
      const { queryByText } = renderMyDraftsPage()
      expect(queryByText('Make your first draft using the New Draft button above')).not.toBeNull()
    })
  })

  describe('when there is an error', () => {
    it('displays an error', () => {
      const error = new Error(faker.lorem.sentence())
      const query = buildUseQueryResult<EmailTemplateIndex>({ error, isError: true, status: 'error' })
      asMock(useEmailTemplates).mockReturnValue(query)
      const { queryByText } = renderMyDraftsPage()
      expect(queryByText(error.message)).not.toBeNull()
    })
  })
})
