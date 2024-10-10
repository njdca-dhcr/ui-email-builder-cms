import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import React from 'react'
import { SIDEBAR_NAVIGATION_TEST_ID as sidebarNavigationTestId } from 'src/ui/SidebarNavigation'
import NewGroupPage from '../new'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { buildUseMutationResult } from 'src/factories'
import { faker } from '@faker-js/faker'
import { asMock, userIsSignedIn } from 'src/testHelpers'
import { useCreateGroup } from 'src/network/groups'
import { navigate } from 'gatsby'
import { AuthProvider } from 'src/utils/AuthContext'

jest.mock('src/network/groups', () => {
  return { useCreateGroup: jest.fn() }
})

describe('New Group Page', () => {
  let user: UserEvent

  beforeEach(async () => {
    user = userEvent.setup()
    userIsSignedIn()
    const mutationResult = buildUseMutationResult<ReturnType<typeof useCreateGroup>>()
    asMock(useCreateGroup).mockReturnValue(mutationResult)
  })

  const renderPage = () => {
    return render(
      <AuthProvider>
        <QueryClientProvider client={new QueryClient()}>
          <NewGroupPage />
        </QueryClientProvider>
      </AuthProvider>,
    )
  }

  it('is displayed in a layout', () => {
    const { baseElement } = renderPage()
    expect(baseElement.querySelector('.layout')).not.toBeNull()
  })

  it('displays the sidebar navigation', () => {
    const { queryByTestId } = renderPage()
    expect(queryByTestId(sidebarNavigationTestId)).not.toBeNull()
  })

  it('displays a loading spinner while saving', async () => {
    const mutationResult = buildUseMutationResult<ReturnType<typeof useCreateGroup>>({
      isPending: true,
    })
    asMock(useCreateGroup).mockReturnValue(mutationResult)
    const { queryByText } = renderPage()
    expect(queryByText('Creating group')).not.toBeNull()
  })

  describe('successful mutation', () => {
    it('creates a group', async () => {
      const mutate = jest.fn()
      const mutationResult = buildUseMutationResult<ReturnType<typeof useCreateGroup>>({
        mutateAsync: mutate,
      })
      asMock(useCreateGroup).mockReturnValue(mutationResult)
      const { getByRole, getByLabelText } = await renderPage()

      expect(mutate).not.toHaveBeenCalled()

      const groupName = faker.lorem.words(3)
      const groupDescription = faker.lorem.sentence()
      await user.type(getByLabelText('Name'), groupName)
      await user.type(getByLabelText('Description'), groupDescription)
      await user.click(getByRole('button', { name: 'Create' }))

      expect(mutate).toHaveBeenCalledWith({
        name: groupName,
        description: groupDescription,
      })
    })

    it('navigates to the groups page', async () => {
      const mutationResult = buildUseMutationResult<ReturnType<typeof useCreateGroup>>({
        mutateAsync: jest.fn().mockResolvedValue({ id: '123' }),
      })
      asMock(useCreateGroup).mockReturnValue(mutationResult)
      const { getByRole } = await renderPage()

      expect(navigate).not.toHaveBeenCalled()
      await user.click(getByRole('button', { name: 'Create' }))
      expect(navigate).toHaveBeenCalledWith('/groups')
    })
  })

  describe('unsuccessful mutation', () => {
    it('displays an error message when the request goes wrong', async () => {
      const error = new Error(faker.lorem.sentence())
      const mutationResult = buildUseMutationResult<ReturnType<typeof useCreateGroup>>({
        error,
      })
      asMock(useCreateGroup).mockReturnValue(mutationResult)
      const { baseElement } = await renderPage()

      expect(baseElement).toHaveTextContent(error.message)
    })

    it('displays an error message when there are validation errors', async () => {
      const errorsResponse = { errors: { name: faker.lorem.sentence() } }
      const mutateAsync = jest.fn().mockResolvedValue(errorsResponse)
      const mutationResult = buildUseMutationResult<ReturnType<typeof useCreateGroup>>({
        mutateAsync,
      })
      asMock(useCreateGroup).mockReturnValue(mutationResult)
      const { baseElement, getByRole } = await renderPage()
      await user.click(getByRole('button', { name: 'Create' }))

      expect(baseElement).toHaveTextContent(errorsResponse.errors.name)
    })
  })
})
