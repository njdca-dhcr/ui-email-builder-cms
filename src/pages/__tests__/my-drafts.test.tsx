import React from 'react'
import { render } from '@testing-library/react'
import MyDraftsPage from '../my-drafts'
import { SIDEBAR_NAVIGATION_TEST_ID as sidebarNavigationTestId } from 'src/ui/SidebarNavigation'
import {
  asMock,
  buildEmailTemplateIndexGroup,
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
import { randomUUID } from 'crypto'

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
    const query = buildUseQueryResult<EmailTemplateIndex>({
      isLoading: true,
      data: undefined,
      status: 'pending',
    })
    asMock(useEmailTemplates).mockReturnValue(query)
    const { baseElement } = renderMyDraftsPage()
    expect(baseElement.querySelector('.layout')).not.toBeNull()
  })

  it('displays the sidebar navigation', () => {
    const query = buildUseQueryResult<EmailTemplateIndex>({
      isLoading: true,
      data: undefined,
      status: 'pending',
    })
    asMock(useEmailTemplates).mockReturnValue(query)
    const { queryByTestId } = renderMyDraftsPage()
    expect(queryByTestId(sidebarNavigationTestId)).not.toBeNull()
  })

  describe('when loading', () => {
    it('displays an loading spinner', () => {
      const query = buildUseQueryResult<EmailTemplateIndex>({
        isLoading: true,
        data: undefined,
        status: 'pending',
      })
      asMock(useEmailTemplates).mockReturnValue(query)
      const { queryByText } = renderMyDraftsPage()
      expect(queryByText('Loading your email templates')).not.toBeNull()
    })
  })

  it('has a menu and options to add new drafts', async () => {
    const user = userEvent.setup()
    const query = buildUseQueryResult<EmailTemplateIndex>({ data: { user: [], groups: [] } })
    asMock(useEmailTemplates).mockReturnValue(query)
    const { queryByRole } = renderMyDraftsPage()
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
    it("displays all of the user's email templates by default", () => {
      const emailTemplates = [buildEmailTemplateIndexItem(), buildEmailTemplateIndexItem()]
      const [emailTemplate1, emailTemplate2] = emailTemplates
      const group1 = buildEmailTemplateIndexGroup({ templates: [buildEmailTemplateIndexItem()] })
      const query = buildUseQueryResult({ data: { user: emailTemplates, groups: [group1] } })
      asMock(useEmailTemplates).mockReturnValue(query)

      const { queryByText } = renderMyDraftsPage()

      const firstLink: HTMLAnchorElement | null = queryByText(emailTemplate1.name) as any
      expect(firstLink).not.toBeNull()
      expect(firstLink!.href).toEqual(urlFor(`/email-templates/${emailTemplate1.id}`))

      const secondLink: HTMLAnchorElement | null = queryByText(emailTemplate2.name) as any
      expect(secondLink).not.toBeNull()
      expect(secondLink!.href).toEqual(urlFor(`/email-templates/${emailTemplate2.id}`))

      const groupLink: HTMLAnchorElement | null = queryByText(group1.templates[0].name) as any
      expect(groupLink).not.toBeNull()
      expect(groupLink!.href).toEqual(urlFor(`/email-templates/${group1.templates[0].id}`))
    })

    describe('filtering the list of templates', () => {
      it('displays links to all templates and group templates', async () => {
        const query = buildUseQueryResult({ data: { user: [], groups: [] } })
        asMock(useEmailTemplates).mockReturnValue(query)

        const { queryByLabelText } = renderMyDraftsPage()

        const allLink = queryByLabelText('All')
        expect(allLink).not.toBeNull()

        const groupLink = queryByLabelText('Your Groups')
        expect(groupLink).not.toBeNull()
      })

      it('shows the list of group filters and all group templates when Your Groups is selected', async () => {
        const user = userEvent.setup()
        const userTemplate = buildEmailTemplateIndexItem()
        const groupIds = [randomUUID(), randomUUID()]
        const [groupId1, groupId2] = groupIds
        const groupTemplates = [
          buildEmailTemplateIndexItem({ groupId: groupId1 }),
          buildEmailTemplateIndexItem({ groupId: groupId2 }),
        ]
        const [groupTemplate1, groupTemplate2] = groupTemplates
        const groups = [
          buildEmailTemplateIndexGroup({ id: groupId1, templates: [groupTemplate1] }),
          buildEmailTemplateIndexGroup({ id: groupId2, templates: [groupTemplate2] }),
        ]
        const [group1, group2] = groups
        const query = buildUseQueryResult({
          data: { user: [userTemplate], groups: [group1, group2] },
          status: 'success',
        })
        asMock(useEmailTemplates).mockReturnValue(query)

        const { getByLabelText, queryByLabelText, queryByText } = renderMyDraftsPage()

        await user.click(getByLabelText('Your Groups'))

        expect(queryByLabelText(group1.name)).not.toBeNull()
        expect(queryByLabelText(group2.name)).not.toBeNull()

        expect(queryByText(userTemplate.name)).toBeNull()
        expect(queryByText(groupTemplate1.name)).not.toBeNull()
        expect(queryByText(groupTemplate2.name)).not.toBeNull()
      })

      it('can filter the list of email templates by group', async () => {
        const user = userEvent.setup()
        const groupIds = [randomUUID(), randomUUID()]
        const [groupId1, groupId2] = groupIds
        const groupTemplates = [
          buildEmailTemplateIndexItem({ groupId: groupId1 }),
          buildEmailTemplateIndexItem({ groupId: groupId2 }),
        ]
        const [groupTemplate1, groupTemplate2] = groupTemplates
        const groups = [
          buildEmailTemplateIndexGroup({ id: groupId1, templates: [groupTemplate1] }),
          buildEmailTemplateIndexGroup({ id: groupId2, templates: [groupTemplate2] }),
        ]
        const [group1, group2] = groups
        const query = buildUseQueryResult({
          data: { user: [], groups: [group1, group2] },
          status: 'success',
        })
        asMock(useEmailTemplates).mockReturnValue(query)

        const { getByLabelText, queryByText } = renderMyDraftsPage()

        await user.click(getByLabelText('Your Groups'))
        await user.click(getByLabelText(group1.name))

        expect(queryByText(groupTemplate1.name)).not.toBeNull()
        expect(queryByText(groupTemplate2.name)).toBeNull()
      })

      it('can filter the list of email templates by multiple groups', async () => {
        const user = userEvent.setup()
        const groupIds = [randomUUID(), randomUUID()]
        const [groupId1, groupId2] = groupIds
        const groupTemplates = [
          buildEmailTemplateIndexItem({ groupId: groupId1 }),
          buildEmailTemplateIndexItem({ groupId: groupId2 }),
        ]
        const [groupTemplate1, groupTemplate2] = groupTemplates
        const groups = [
          buildEmailTemplateIndexGroup({ id: groupId1, templates: [groupTemplate1] }),
          buildEmailTemplateIndexGroup({ id: groupId2, templates: [groupTemplate2] }),
        ]
        const [group1, group2] = groups
        const query = buildUseQueryResult({
          data: { user: [], groups: [group1, group2] },
          status: 'success',
        })
        asMock(useEmailTemplates).mockReturnValue(query)

        const { getByLabelText, queryByText } = renderMyDraftsPage()

        await user.click(getByLabelText('Your Groups'))
        await user.click(getByLabelText(group1.name))
        expect(queryByText(groupTemplate1.name)).not.toBeNull()
        expect(queryByText(groupTemplate2.name)).toBeNull()

        await user.click(getByLabelText(group2.name))
        expect(queryByText(groupTemplate1.name)).not.toBeNull()
        expect(queryByText(groupTemplate2.name)).not.toBeNull()
      })
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
      const query = buildUseQueryResult<EmailTemplateIndex>({
        error,
        isError: true,
        status: 'error',
      })
      asMock(useEmailTemplates).mockReturnValue(query)
      const { queryByText } = renderMyDraftsPage()
      expect(queryByText(error.message)).not.toBeNull()
    })
  })
})
