import React from 'react'
import { render } from '@testing-library/react'
import Settings from '../settings'
import { SIDEBAR_NAVIGATION_TEST_ID as sidebarNavigationTestId } from 'src/ui/SidebarNavigation'
import { useCurrentUser, CurrentUser } from 'src/network/useCurrentUser'
import { asMock, buildUseQueryResult } from 'src/testHelpers'
import { faker } from '@faker-js/faker'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

jest.mock('src/network/useCurrentUser', () => {
  return {
    useCurrentUser: jest.fn(),
  }
})

describe('Settings page', () => {
  it('is displayed in a layout', () => {
    const query = { ...buildUseQueryResult<CurrentUser>({ data: {} }), enabled: true }
    asMock(useCurrentUser).mockReturnValue(query)
    const { baseElement } = render(
      <QueryClientProvider client={new QueryClient()}>
        <Settings />
      </QueryClientProvider>,
    )
    expect(baseElement.querySelector('.layout')).not.toBeNull()
  })

  describe('when loading', () => {
    it('displays a loading spinner', () => {
      const query = {
        ...buildUseQueryResult<CurrentUser>({ isLoading: true, data: undefined }),
        enabled: true,
      }
      asMock(useCurrentUser).mockReturnValue(query)
      const { queryByText } = render(
        <QueryClientProvider client={new QueryClient()}>
          <Settings />
        </QueryClientProvider>,
      )
      expect(queryByText('Loading your settings')).not.toBeNull()
    })
  })

  describe('when successful', () => {
    it('displays the sidebar navigation', () => {
      const query = { ...buildUseQueryResult<CurrentUser>({ data: {} }), enabled: true }
      asMock(useCurrentUser).mockReturnValue(query)
      const { queryByTestId } = render(
        <QueryClientProvider client={new QueryClient()}>
          <Settings />
        </QueryClientProvider>,
      )
      expect(queryByTestId(sidebarNavigationTestId)).not.toBeNull()
    })

    it('displays EditBanner', () => {
      const primaryText = faker.lorem.words(3)
      const query = {
        ...buildUseQueryResult<CurrentUser>({ data: { banner: { primaryText } } }),
        enabled: true,
      }
      asMock(useCurrentUser).mockReturnValue(query)
      const { queryByLabelText } = render(
        <QueryClientProvider client={new QueryClient()}>
          <Settings />
        </QueryClientProvider>,
      )
      const input = queryByLabelText('Primary Text')
      expect(input).not.toBeNull()
      expect(input).toHaveTextContent(primaryText)
    })

    it('displays EditDisclaimer', () => {
      const query = { ...buildUseQueryResult<CurrentUser>({ data: {} }), enabled: true }
      asMock(useCurrentUser).mockReturnValue(query)
      const { queryByLabelText } = render(
        <QueryClientProvider client={new QueryClient()}>
          <Settings />
        </QueryClientProvider>,
      )
      expect(queryByLabelText('Disclaimer')).not.toBeNull()
    })
  })

  describe('when there is an error', () => {
    it('displays an error', () => {
      const error = new Error(faker.lorem.sentence())
      const query = { ...buildUseQueryResult<CurrentUser>({ error, isError: true }), enabled: true }
      asMock(useCurrentUser).mockReturnValue(query)
      const { queryByText } = render(
        <QueryClientProvider client={new QueryClient()}>
          <Settings />
        </QueryClientProvider>,
      )
      expect(queryByText(error.message)).not.toBeNull()
    })
  })
})
