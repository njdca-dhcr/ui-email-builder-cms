import React from 'react'
import { buildUserShow, buildUseMutationResult } from 'src/factories'
import { useDestroyUser, UserShow } from 'src/network/users'
import { asMock } from 'src/testHelpers'
import { DestroyUser } from '../DestroyUser'
import { render } from '@testing-library/react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { randomUUID } from 'crypto'
import { faker } from '@faker-js/faker'
import { navigate } from 'gatsby'

jest.mock('src/network/users', () => {
  return { useDestroyUser: jest.fn() }
})

describe('DestroyUser', () => {
  let user: UserEvent
  let id: string
  let userToDestroy: UserShow

  beforeEach(() => {
    user = userEvent.setup()
    id = randomUUID()
    userToDestroy = buildUserShow({ id })
  })

  describe('when closed', () => {
    beforeEach(() => {
      const mutationResult = buildUseMutationResult<ReturnType<typeof useDestroyUser>>()
      asMock(useDestroyUser).mockReturnValue(mutationResult)
    })

    it('can be opened', async () => {
      const { getByRole, queryByRole } = render(<DestroyUser user={userToDestroy} />)
      expect(queryByRole('dialog')).toBeNull()
      await user.click(getByRole('button', { name: `Delete ${userToDestroy.email}` }))
      expect(queryByRole('dialog')).not.toBeNull()
    })
  })

  describe('when open', () => {
    const renderAndOpen = async () => {
      const rendered = render(<DestroyUser user={userToDestroy} />)
      await user.click(rendered.getByRole('button', { name: `Delete ${userToDestroy.email}` }))
      return rendered
    }

    it('confirms and destroys the user successfully, closes the modal, and redirects', async () => {
      const mutateAsync = jest.fn()
      const mutationResult = buildUseMutationResult<ReturnType<typeof useDestroyUser>>({
        mutateAsync,
      })
      asMock(useDestroyUser).mockReturnValue(mutationResult)
      const { getByRole, queryByRole } = await renderAndOpen()

      expect(mutateAsync).not.toHaveBeenCalled()
      expect(navigate).not.toHaveBeenCalled()
      expect(queryByRole('dialog')).not.toBeNull()

      await user.click(getByRole('button', { name: `Delete ${userToDestroy.email}` }))

      expect(mutateAsync).toHaveBeenCalledWith(id)
      expect(queryByRole('dialog')).toBeNull()
      expect(navigate).toHaveBeenCalledWith('/users', { replace: true })
    })

    it('displays a loading spinner when destroying the user', async () => {
      const mutationResult = buildUseMutationResult<ReturnType<typeof useDestroyUser>>({
        isPending: true,
      })
      asMock(useDestroyUser).mockReturnValue(mutationResult)
      const { baseElement } = await renderAndOpen()
      expect(baseElement).toHaveTextContent('Deleting user')
    })

    it('displays an error when destroying the user fails', async () => {
      const errorMessage = faker.lorem.sentence()
      const mutationResult = buildUseMutationResult<ReturnType<typeof useDestroyUser>>({
        error: new Error(errorMessage),
      })
      asMock(useDestroyUser).mockReturnValue(mutationResult)
      const { baseElement } = await renderAndOpen()
      expect(baseElement).toHaveTextContent(errorMessage)
    })
  })
})
