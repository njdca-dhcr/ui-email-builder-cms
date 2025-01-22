import React from 'react'
import { render } from '@testing-library/react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { faker } from '@faker-js/faker'
import { asMock, buildUserIndex, userIsSignedIn, buildUseMutationResult } from 'src/testHelpers'
import { UsersIndex, useUpdateUser } from 'src/network/users'
import { AuthProvider } from 'src/utils/AuthContext'
import { EditUserDialog } from '../EditUserDialog'

jest.mock('src/network/users')

describe('EditUserDialog', () => {
  let user: UserEvent
  let appUser: UsersIndex

  beforeEach(async () => {
    user = userEvent.setup()
    appUser = buildUserIndex()
    userIsSignedIn()
    const mutationResult = buildUseMutationResult<ReturnType<typeof useUpdateUser>>()
    asMock(useUpdateUser).mockReturnValue(mutationResult)
  })

  const renderComponent = () => {
    return render(
      <AuthProvider>
        <QueryClientProvider client={new QueryClient()}>
          <EditUserDialog user={appUser} />
        </QueryClientProvider>
      </AuthProvider>,
    )
  }

  const renderAndOpen = async () => {
    const rendered = renderComponent()
    await user.click(rendered.getByRole('button'))
    return rendered
  }

  it('displays a button that opens the edit user dialog', async () => {
    const { getByRole, baseElement } = renderComponent()
    expect(baseElement.querySelector('[data-state="open"]')).toBeFalsy()
    await user.click(getByRole('button', { name: `Edit User ${appUser.email}` }))
    expect(baseElement.querySelector('[data-state="open"]')).toBeTruthy()
  })

  describe('the dialog', () => {
    it('has a title', async () => {
      const { baseElement } = await renderAndOpen()
      expect(baseElement).toHaveTextContent('Edit User')
    })

    it('can be canceled', async () => {
      const { baseElement, getByRole } = await renderAndOpen()

      expect(baseElement.querySelector('[data-state="open"]')).toBeTruthy()
      await user.click(getByRole('button', { name: 'Cancel' }))
      expect(baseElement.querySelector('[data-state="open"]')).toBeFalsy()
    })

    it('displays the user email', async () => {
      const { getByRole } = await renderAndOpen()
      const dialog = getByRole('dialog')
      expect(dialog).toHaveTextContent(appUser.email)
    })

    it('displays a dropdown for editing the user role', async () => {
      const { queryByLabelText, queryByRole } = await renderAndOpen()
      const roleSelect = queryByLabelText('Role')
      expect(roleSelect).not.toBeNull()
      await user.click(roleSelect!)
      expect(queryByRole('option', { name: 'Admin' })).not.toBeNull()
      expect(queryByRole('option', { name: 'Member' })).not.toBeNull()
    })
  })

  describe('when submitting', () => {
    beforeEach(async () => {
      asMock(useUpdateUser).mockReturnValue(buildUseMutationResult({ isPending: true }))
    })

    it('displays a loading spinner', async () => {
      const { baseElement } = await renderAndOpen()
      expect(baseElement).toHaveTextContent('Updating User')
    })
  })

  describe('when successful', () => {
    it('updates the role and closes the dialog', async () => {
      const mutate = jest.fn().mockReturnValue({})
      const mutationResult = buildUseMutationResult<ReturnType<typeof useUpdateUser>>({
        mutateAsync: mutate,
      })
      asMock(useUpdateUser).mockReturnValue(mutationResult)

      const { baseElement, getByRole, queryByLabelText, queryByRole } = await renderAndOpen()
      expect(mutate).not.toHaveBeenCalled()
      expect(baseElement.querySelector('[data-state="open"]')).toBeTruthy()
      const roleSelect = queryByLabelText('Role')
      await user.click(roleSelect!)
      await user.click(queryByRole('option', { name: 'Admin' })!)
      await user.click(getByRole('button', { name: 'Save' }))

      expect(mutate).toHaveBeenCalledWith({
        role: 'admin',
      })
      expect(baseElement.querySelector('[data-state="open"]')).toBeFalsy()
    })
  })

  describe('when there is an error', () => {
    it('displays an error message', async () => {
      const error = new Error(faker.lorem.sentence())
      const mutationResult = buildUseMutationResult<ReturnType<typeof useUpdateUser>>({
        error,
      })
      asMock(useUpdateUser).mockReturnValue(mutationResult)
      const { baseElement } = await renderAndOpen()

      expect(baseElement).toHaveTextContent(error.message)
    })
  })
})
