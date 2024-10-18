import React from 'react'
import { render } from '@testing-library/react'
import capitalize from 'lodash/capitalize'
import UsersPage from '../users'
import { SIDEBAR_NAVIGATION_TEST_ID as sidebarNavigationTestId } from 'src/ui/SidebarNavigation'
import { asMock, buildUserIndex, buildUseQueryResult, urlFor } from 'src/testHelpers'
import { useUsers, UsersIndex } from 'src/network/users'
import { faker } from '@faker-js/faker'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

jest.mock('src/network/users', () => {
  return {
    useUsers: jest.fn(),
  }
})

describe('Users page', () => {
  const renderUsersPage = () => {
    return render(
      <QueryClientProvider client={new QueryClient()}>
        <UsersPage />
      </QueryClientProvider>,
    )
  }

  it('is displayed in a layout', () => {
    const query = buildUseQueryResult<UsersIndex[]>({ isLoading: true, data: undefined })
    asMock(useUsers).mockReturnValue(query)
    const { baseElement } = renderUsersPage()
    expect(baseElement.querySelector('.layout')).not.toBeNull()
  })

  it('displays the sidebar navigation', () => {
    const query = buildUseQueryResult<UsersIndex[]>({ isLoading: true, data: undefined })
    asMock(useUsers).mockReturnValue(query)
    const { queryByTestId } = renderUsersPage()
    expect(queryByTestId(sidebarNavigationTestId)).not.toBeNull()
  })

  describe('when loading', () => {
    it('displays an loading spinner', () => {
      const query = buildUseQueryResult<UsersIndex[]>({ isLoading: true, data: undefined })
      asMock(useUsers).mockReturnValue(query)
      const { queryByText } = renderUsersPage()
      expect(queryByText('Loading the users')).not.toBeNull()
    })
  })

  describe('when successful', () => {
    it('displays the users', () => {
      const users = [buildUserIndex({ role: 'admin' }), buildUserIndex()]
      const [user1, user2] = users
      const query = buildUseQueryResult({ data: users })
      asMock(useUsers).mockReturnValue(query)

      const { queryByText } = renderUsersPage()

      const firstLink: HTMLAnchorElement | null = queryByText(user1.email) as any
      expect(firstLink).not.toBeNull()
      expect(firstLink!.href).toEqual(urlFor(`/users/${user1.id}`))

      const secondLink: HTMLAnchorElement | null = queryByText(user2.email) as any
      expect(secondLink).not.toBeNull()
      expect(secondLink!.href).toEqual(urlFor(`/users/${user2.id}`))

      const firstRole = queryByText(capitalize(user1.role))
      expect(firstRole).not.toBeNull()

      const secondRole = queryByText(capitalize(user2.role))
      expect(secondRole).not.toBeNull()
    })
  })

  describe('when there is an error', () => {
    it('displays an error', () => {
      const error = new Error(faker.lorem.sentence())
      const query = buildUseQueryResult<UsersIndex[]>({ error, isError: true })
      asMock(useUsers).mockReturnValue(query)
      const { queryByText } = renderUsersPage()
      expect(queryByText(error.message)).not.toBeNull()
    })
  })
})
