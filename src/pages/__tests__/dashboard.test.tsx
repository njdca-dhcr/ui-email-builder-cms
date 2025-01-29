import React from 'react'
import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import DashboardPage from '../dashboard'
import {
  EmailTemplateIndex,
  EmailTemplateIndexItem,
  useEmailTemplates,
} from 'src/network/emailTemplates'
import {
  asMock,
  buildEmailTemplateIndexGroup,
  buildEmailTemplateIndexItem,
  buildUseQueryResult,
  urlFor,
} from 'src/testHelpers'
import { SIDEBAR_NAVIGATION_TEST_ID } from 'src/ui'

jest.mock('src/network/emailTemplates', () => {
  return {
    useEmailTemplates: jest.fn(),
  }
})

describe('Dashboard page', () => {
  const renderDashboardPage = () => {
    return render(
      <QueryClientProvider client={new QueryClient()}>
        <DashboardPage />
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
    const { baseElement } = render(<DashboardPage />)
    expect(baseElement.querySelector('.layout')).not.toBeNull()
  })

  it('displays the sidebar navigation', () => {
    const query = buildUseQueryResult<EmailTemplateIndex>({
      isLoading: true,
      data: undefined,
      status: 'pending',
    })
    asMock(useEmailTemplates).mockReturnValue(query)
    const { queryByTestId } = renderDashboardPage()
    expect(queryByTestId(SIDEBAR_NAVIGATION_TEST_ID)).not.toBeNull()
  })

  describe('when the email templates are loading', () => {
    it('shows a loading spinner', () => {
      const query = buildUseQueryResult<EmailTemplateIndex>({
        isLoading: true,
        data: undefined,
        status: 'pending',
      })
      asMock(useEmailTemplates).mockReturnValue(query)
      const { queryByText } = renderDashboardPage()
      expect(queryByText('Loading drafts')).not.toBeNull()
    })
  })

  describe('when the drafts have loaded', () => {
    let templates: EmailTemplateIndexItem[]
    let groupTemplate: EmailTemplateIndexItem

    beforeEach(() => {
      const today = new Date()
      const yesterday = new Date(today.getDate() - 1)
      templates = [
        buildEmailTemplateIndexItem({ updatedAt: today.toISOString() }),
        buildEmailTemplateIndexItem({ updatedAt: yesterday.toISOString() }),
        buildEmailTemplateIndexItem({ updatedAt: today.toISOString() }),
      ]
      groupTemplate = buildEmailTemplateIndexItem({ updatedAt: today.toISOString() })
      const query = buildUseQueryResult<EmailTemplateIndex>({
        isLoading: false,
        data: {
          user: templates,
          groups: [buildEmailTemplateIndexGroup({ templates: [groupTemplate] })],
        },
        status: 'success',
      })
      asMock(useEmailTemplates).mockReturnValue(query)
    })

    it('has a link to view all drafts', async () => {
      const { queryByRole } = renderDashboardPage()
      const link = await queryByRole('link', { name: 'See All Drafts' })
      expect(link).not.toBeNull()
      expect(link).toHaveAttribute('href', '/my-drafts')
    })

    it('shows 3 drafts', () => {
      const { baseElement } = renderDashboardPage()
      expect(baseElement.querySelectorAll('.draft-item')).toHaveLength(3)
    })

    it('displays the drafts in descending order of last updated', () => {
      const { baseElement } = renderDashboardPage()
      const draftItems = baseElement.querySelectorAll('.draft-item')
      expect(draftItems[0].textContent).toContain(groupTemplate.name)
      expect(draftItems[1].textContent).toContain(templates[2].name)
      expect(draftItems[2].textContent).toContain(templates[0].name)
    })

    it('has a link to view the draft', () => {
      const { baseElement } = renderDashboardPage()
      const draftItems = baseElement.querySelectorAll('.draft-item')
      expect(draftItems[0].querySelector('a')).toHaveAttribute(
        'href',
        `/email-templates/${groupTemplate.id}`,
      )
    })
  })

  describe('when the user has no drafts', () => {
    it('shows a message that there are no drafts', () => {
      const query = buildUseQueryResult<EmailTemplateIndex>({
        isLoading: false,
        data: { user: [], groups: [] },
        status: 'success',
      })
      asMock(useEmailTemplates).mockReturnValue(query)
      const { queryByText } = renderDashboardPage()
      expect(queryByText('Start creating an email using the options below.')).not.toBeNull()
    })
  })

  it('has links to create a template', () => {
    const query = buildUseQueryResult<EmailTemplateIndex>({
      isLoading: false,
      data: { user: [], groups: [] },
      status: 'success',
    })
    asMock(useEmailTemplates).mockReturnValue(query)
    const { baseElement } = renderDashboardPage()
    const templateWrappers = baseElement.querySelectorAll('.template-wrapper')
    expect(templateWrappers).toHaveLength(3)
    expect(templateWrappers[0].querySelector('a')).toHaveAttribute(
      'href',
      '/email-templates/blank-slate/',
    )
    expect(templateWrappers[1].querySelector('a')).toHaveAttribute(
      'href',
      '/email-templates/everything-bagel/',
    )
    expect(templateWrappers[2].querySelector('a')).toHaveAttribute('href', '/library/')
  })

  describe('when there is an error loading drafts', () => {
    it('shows an error message', () => {
      const error = new Error(faker.lorem.sentence())
      const query = buildUseQueryResult<EmailTemplateIndex>({
        isLoading: false,
        status: 'error',
        isError: true,
        error,
      })
      asMock(useEmailTemplates).mockReturnValue(query)
      const { queryByText } = renderDashboardPage()
      expect(
        queryByText('There was an error loading your drafts. Please refresh the page.'),
      ).not.toBeNull()
    })
  })
})
