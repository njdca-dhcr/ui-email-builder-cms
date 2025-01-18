import React from 'react'
import { render } from '@testing-library/react'
import { navigate } from 'gatsby'
import UsersPage from '../users'
import {
  asMock,
  buildUserIndex,
  buildUseQueryResult,
  buildUseMutationResult,
  userIsSignedIn,
} from 'src/testHelpers'
import {
  useUsers,
  UsersIndex,
  useCurrentUser,
  useUpdateUser,
  useDestroyUser,
} from 'src/network/users'
import { faker } from '@faker-js/faker'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from 'src/utils/AuthContext'

jest.mock('src/network/users')

describe('Users page', () => {
  const renderPage = () => {
    return render(
      <AuthProvider>
        <QueryClientProvider client={new QueryClient()}>
          <UsersPage />
        </QueryClientProvider>
      </AuthProvider>,
    )
  }

  beforeEach(async () => {
    userIsSignedIn()
    const query = buildUseQueryResult<UsersIndex[]>({ isLoading: true, data: undefined })
    asMock(useUsers).mockReturnValue(query)

    asMock(useCurrentUser).mockReturnValue({ ...buildUseQueryResult({}), enabled: true })
    asMock(useUpdateUser).mockReturnValue({ ...buildUseMutationResult({}), mutateAsync: jest.fn() })
    asMock(useDestroyUser).mockReturnValue({
      ...buildUseMutationResult({}),
      mutateAsync: jest.fn(),
    })
  })

  it('requires an admin role', () => {
    renderPage()
    expect(navigate).toHaveBeenCalledWith('/')
  })

  it('is displayed in a layout', () => {
    const { baseElement } = renderPage()
    expect(baseElement.querySelector('.settings-layout')).toBeTruthy()
  })

  it('displays the sidebar navigation', () => {
    const { baseElement } = renderPage()
    expect(baseElement.querySelector('.settings-sidebar')).toBeTruthy()
  })

  describe('when loading', () => {
    beforeEach(async () => {
      const query = buildUseQueryResult<UsersIndex[]>({ isLoading: true, data: undefined })
      asMock(useUsers).mockReturnValue(query)
    })

    it('displays an loading spinner', () => {
      const { queryByText } = renderPage()
      expect(queryByText('Loading the users')).not.toBeNull()
    })
  })

  describe('when successful', () => {
    it('displays the users and role, with edit and delete buttons', () => {
      const users = [buildUserIndex({ role: 'admin' }), buildUserIndex()]
      const [user1, user2] = users
      const query = buildUseQueryResult({ data: users })
      asMock(useUsers).mockReturnValue(query)

      const { baseElement, queryByRole, queryByText } = renderPage()
      const emails = baseElement.querySelectorAll('.user-email')
      const firstEmail = emails[0]
      expect(firstEmail.innerHTML).toEqual(user1.email)
      const firstRole = queryByText(user1.role)
      expect(firstRole).not.toBeNull()
      const editFirstUser = queryByRole('button', { name: `Edit User ${user1.email}` })
      expect(editFirstUser).not.toBeNull()
      expect(queryByRole('button', { name: `Delete ${user1.email}` })).not.toBeNull()

      const secondEmail = emails[1]
      expect(secondEmail.innerHTML).toEqual(user2.email)
      const secondRole = queryByText(user2.role)
      expect(secondRole).not.toBeNull()
      const editSecondUser = queryByRole('button', { name: `Edit User ${user2.email}` })
      expect(editSecondUser).not.toBeNull()
      expect(queryByRole('button', { name: `Delete ${user2.email}` })).not.toBeNull()
    })
  })

  describe('when there is an error', () => {
    it('displays an error', () => {
      const error = new Error(faker.lorem.sentence())
      const query = buildUseQueryResult<UsersIndex[]>({ error, isError: true })
      asMock(useUsers).mockReturnValue(query)
      const { queryByText } = renderPage()
      expect(queryByText(error.message)).not.toBeNull()
    })
  })
})
