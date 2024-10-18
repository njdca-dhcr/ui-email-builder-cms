import React from 'react'
import { render } from '@testing-library/react'
import UserShowPage, { Props } from '../[id]'
import { asMock, buildUseMutationResult, buildUseQueryResult, buildUserShow } from 'src/testHelpers'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'crypto'
import { SIDEBAR_NAVIGATION_TEST_ID as sidebarNavigationTestId } from 'src/ui/SidebarNavigation'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import capitalize from 'lodash.capitalize'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { useCurrentRole } from 'src/utils/useCurrentRole'
import { useCurrentUser, useUpdateUser, UserShow, useUser, useDestroyUser } from 'src/network/users'

jest.mock('src/utils/useCurrentRole', () => {
  return { useCurrentRole: jest.fn() }
})

jest.mock('src/network/users', () => {
  return {
    useCurrentUser: jest.fn(),
    useUpdateUser: jest.fn(),
    useUser: jest.fn(),
    useDestroyUser: jest.fn(),
  }
})

describe('User Show Page', () => {
  beforeEach(() => {
    asMock(useDestroyUser).mockReturnValue(buildUseMutationResult())

    const mutationResult = buildUseMutationResult<ReturnType<typeof useUpdateUser>>({})
    asMock(useUpdateUser).mockReturnValue(mutationResult)
    asMock(useCurrentRole).mockReturnValue({ role: 'member', isAdmin: false, isLoading: false })

    const currentUser = buildUserShow()
    const queryForUseCurrentUser = buildUseQueryResult({ data: currentUser })
    asMock(useCurrentUser).mockReturnValue({ ...queryForUseCurrentUser, enabled: true })
  })

  const renderPage = (props?: Partial<Props>) => {
    return render(
      <QueryClientProvider client={new QueryClient()}>
        <UserShowPage
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
    const query = buildUseQueryResult<UserShow>({ isLoading: true, data: undefined })
    asMock(useUser).mockReturnValue(query)
    const { baseElement } = renderPage()
    expect(baseElement.querySelector('.layout')).not.toBeNull()
  })

  it('displays the sidebar navigation', () => {
    const query = buildUseQueryResult<UserShow>({ isLoading: true, data: undefined })
    asMock(useUser).mockReturnValue(query)
    const { queryByTestId } = renderPage()
    expect(queryByTestId(sidebarNavigationTestId)).not.toBeNull()
  })

  it('loads the correct user', () => {
    const userId = randomUUID()
    const query = buildUseQueryResult<UserShow>({ isLoading: true, data: undefined })
    asMock(useUser).mockReturnValue(query)
    renderPage({ params: { id: userId } })
    expect(useUser).toHaveBeenCalledWith(userId)
  })

  describe('when loading', () => {
    it('displays an loading spinner', () => {
      const query = buildUseQueryResult<UserShow>({ isLoading: true, data: undefined })
      asMock(useUser).mockReturnValue(query)
      const { queryByText } = renderPage()
      expect(queryByText('Loading user')).not.toBeNull()
    })
  })

  describe('when successful', () => {
    let user: UserShow

    beforeEach(() => {
      user = buildUserShow()
      const query = buildUseQueryResult({ data: user })
      asMock(useUser).mockReturnValue(query)
    })

    it('displays the user', () => {
      const { queryByText } = renderPage()
      expect(queryByText(user.email)).not.toBeNull()
      expect(queryByText(capitalize(user.role))).not.toBeNull()
    })
  })

  describe('when there is an error', () => {
    it('displays an error', () => {
      const error = new Error(faker.lorem.sentence())
      const query = buildUseQueryResult<UserShow>({ error, isError: true })
      asMock(useUser).mockReturnValue(query)
      const { queryByText } = renderPage()
      expect(queryByText(error.message)).not.toBeNull()
    })
  })

  describe("editing a user's role as a member", () => {
    let user: UserShow

    beforeEach(() => {
      user = buildUserShow({ role: 'member' })
      const query = buildUseQueryResult({ data: user })
      asMock(useUser).mockReturnValue(query)
      asMock(useCurrentRole).mockReturnValue({ role: 'member', isAdmin: false, isLoading: false })
    })

    it('does not provide an edit button', async () => {
      const { queryByRole } = renderPage()

      expect(queryByRole('button', { name: 'Save' })).toBeNull()
      expect(queryByRole('button', { name: 'Edit role' })).toBeNull()
    })
  })

  describe("editing a user's role as an admin", () => {
    let currentUser: UserEvent
    let user: UserShow

    beforeEach(() => {
      currentUser = userEvent.setup()
      user = buildUserShow({ role: 'member' })
      const query = buildUseQueryResult({ data: user })
      asMock(useUser).mockReturnValue(query)
      asMock(useCurrentRole).mockReturnValue({ role: 'admin', isAdmin: true, isLoading: false })
    })

    it('becomes a dropdown when the edit button is clicked', async () => {
      const { getByRole, queryByRole } = renderPage()

      expect(queryByRole('button', { name: 'Save' })).toBeNull()
      await currentUser.click(getByRole('button', { name: 'Edit role' }))
      expect(queryByRole('button', { name: 'Save' })).not.toBeNull()
    })

    it('can have its changes canceled', async () => {
      const { getByRole, baseElement, queryByLabelText } = renderPage()

      await currentUser.click(getByRole('button', { name: 'Edit role' }))

      const select = baseElement.querySelector('select')!
      expect(select.value).toEqual('member')

      await currentUser.selectOptions(select, 'Admin')
      await currentUser.click(getByRole('button', { name: 'Cancel' }))

      expect(queryByLabelText('Role')).toBeNull()
      expect(baseElement).toHaveTextContent('Member')
      expect(baseElement).not.toHaveTextContent('Admin')
    })

    it('displays the loading overlay while submitting', async () => {
      const mutationResult = buildUseMutationResult<ReturnType<typeof useUpdateUser>>({
        isPending: true,
      })
      asMock(useUpdateUser).mockReturnValue(mutationResult)
      const { queryByText } = renderPage()

      expect(queryByText('Updating user')).not.toBeNull()
    })

    it('can have its changes saved', async () => {
      const mutateAsync = jest.fn()
      const mutationResult = buildUseMutationResult<ReturnType<typeof useUpdateUser>>({
        mutateAsync,
      })
      asMock(useUpdateUser).mockReturnValue(mutationResult)

      expect(mutateAsync).not.toHaveBeenCalled()

      const { getByRole, getByLabelText, baseElement, queryByLabelText } = renderPage()

      await currentUser.click(getByRole('button', { name: 'Edit role' }))
      await currentUser.selectOptions(getByLabelText('Role'), 'Admin')
      await currentUser.click(getByRole('button', { name: 'Save' }))

      expect(queryByLabelText('Role')).toBeNull()
      expect(mutateAsync).toHaveBeenCalledWith({ role: 'admin' })
    })

    it('can display an error', async () => {
      const error = new Error(faker.lorem.sentence())
      const mutationResult = buildUseMutationResult<ReturnType<typeof useUpdateUser>>({
        error,
      })
      asMock(useUpdateUser).mockReturnValue(mutationResult)

      const { baseElement, getByRole } = renderPage()
      await currentUser.click(getByRole('button', { name: 'Edit role' }))

      expect(baseElement).toHaveTextContent(error.message)
    })
  })

  describe('destroying a user as a member', () => {
    let user: UserShow

    beforeEach(() => {
      user = buildUserShow({ role: 'member' })
      const query = buildUseQueryResult({ data: user })
      asMock(useUser).mockReturnValue(query)
      asMock(useCurrentRole).mockReturnValue({ role: 'member', isAdmin: false, isLoading: false })
    })

    it('does not provide a delete button', async () => {
      const { queryByRole } = renderPage()

      expect(queryByRole('button', { name: 'Delete' })).toBeNull()
    })
  })

  describe('destroying a user as an admin', () => {
    it('provides a delete button', async () => {
      const user = buildUserShow({ role: 'member' })
      const query = buildUseQueryResult({ data: user })
      asMock(useUser).mockReturnValue(query)
      asMock(useCurrentRole).mockReturnValue({ role: 'admin', isAdmin: true, isLoading: false })
      const { queryByRole } = renderPage()

      expect(queryByRole('button', { name: 'Delete' })).not.toBeNull()
    })
  })

  describe('destroying yourself as an admin', () => {
    let user: UserShow

    beforeEach(() => {
      user = buildUserShow({ role: 'admin' })
      const queryForUseUser = buildUseQueryResult({ data: user })
      const queryForUseCurrentUser = buildUseQueryResult({ data: user })
      asMock(useUser).mockReturnValue(queryForUseUser)
      asMock(useCurrentUser).mockReturnValue({ ...queryForUseCurrentUser, enabled: true })
      asMock(useCurrentRole).mockReturnValue({ role: 'admin', isAdmin: true, isLoading: false })
    })

    it('does not provide a delete button', async () => {
      const { queryByRole } = renderPage()

      expect(queryByRole('button', { name: 'Delete' })).toBeNull()
    })
  })
})
