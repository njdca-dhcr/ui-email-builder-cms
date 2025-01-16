import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import React from 'react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { buildUseMutationResult } from 'src/factories'
import { faker } from '@faker-js/faker'
import { asMock, userIsSignedIn } from 'src/testHelpers'
import { useCreateGroup } from 'src/network/groups'
import { navigate } from 'gatsby'
import { AuthProvider } from 'src/utils/AuthContext'
import { NewGroupDialog } from '../NewGroupDialog'

jest.mock('src/network/groups')

describe('NewGroupDialog', () => {
  let user: UserEvent

  beforeEach(async () => {
    user = userEvent.setup()
    userIsSignedIn()
    const mutationResult = buildUseMutationResult<ReturnType<typeof useCreateGroup>>()
    asMock(useCreateGroup).mockReturnValue(mutationResult)
  })

  const renderComponent = () => {
    return render(
      <AuthProvider>
        <QueryClientProvider client={new QueryClient()}>
          <NewGroupDialog />
        </QueryClientProvider>
      </AuthProvider>,
    )
  }

  const renderAndOpen = async () => {
    const rendered = renderComponent()
    await user.click(rendered.getByRole('button'))
    return rendered
  }

  it('displays a button that opens the new group dialog', async () => {
    const { getByRole, baseElement } = renderComponent()
    expect(baseElement.querySelector('[data-state="open"]')).toBeFalsy()
    await user.click(getByRole('button', { name: 'Add New Group +' }))
    expect(baseElement.querySelector('[data-state="open"]')).toBeTruthy()
  })

  describe('the dialog', () => {
    it('has a title', async () => {
      const { baseElement } = await renderAndOpen()
      expect(baseElement).toHaveTextContent('Create a New Group')
    })

    it('can be canceled', async () => {
      const { baseElement, getByRole } = await renderAndOpen()

      expect(baseElement.querySelector('[data-state="open"]')).toBeTruthy()
      await user.click(getByRole('button', { name: 'Cancel' }))
      expect(baseElement.querySelector('[data-state="open"]')).toBeFalsy()
    })
  })

  describe('pending mutation', () => {
    beforeEach(async () => {
      asMock(useCreateGroup).mockReturnValue(buildUseMutationResult({ isPending: true }))
    })

    it('displays a loading spinner', async () => {
      const { baseElement } = await renderAndOpen()
      expect(baseElement).toHaveTextContent('Creating group')
    })
  })

  describe('successful mutation', () => {
    it('creates a group and closes the modal', async () => {
      const mutate = jest.fn().mockReturnValue({})
      const mutationResult = buildUseMutationResult<ReturnType<typeof useCreateGroup>>({
        mutateAsync: mutate,
      })
      asMock(useCreateGroup).mockReturnValue(mutationResult)
      const { getByRole, getByLabelText, baseElement } = await renderAndOpen()

      expect(mutate).not.toHaveBeenCalled()
      expect(baseElement.querySelector('[data-state="open"]')).toBeTruthy()

      const groupName = faker.lorem.words(3)
      const groupDescription = faker.lorem.sentence()

      await user.type(getByLabelText('Name'), groupName)
      await user.type(getByLabelText('Description'), groupDescription)
      await user.click(getByRole('button', { name: 'Create' }))

      expect(mutate).toHaveBeenCalledWith({
        name: groupName,
        description: groupDescription,
      })
      expect(baseElement.querySelector('[data-state="open"]')).toBeFalsy()
    })
  })

  describe('unsuccessful mutation', () => {
    it('displays an error message when the request goes wrong', async () => {
      const error = new Error(faker.lorem.sentence())
      const mutationResult = buildUseMutationResult<ReturnType<typeof useCreateGroup>>({
        error,
      })
      asMock(useCreateGroup).mockReturnValue(mutationResult)
      const { baseElement } = await renderAndOpen()

      expect(baseElement).toHaveTextContent(error.message)
    })

    it('displays an error message when there are validation errors', async () => {
      const errorsResponse = { errors: { name: faker.lorem.sentence() } }
      const mutateAsync = jest.fn().mockResolvedValue(errorsResponse)
      const mutationResult = buildUseMutationResult<ReturnType<typeof useCreateGroup>>({
        mutateAsync,
      })
      asMock(useCreateGroup).mockReturnValue(mutationResult)
      const { baseElement, getByLabelText, getByRole } = await renderAndOpen()
      await user.type(getByLabelText('Name'), faker.lorem.word())
      await user.click(getByRole('button', { name: 'Create' }))

      expect(baseElement).toHaveTextContent(errorsResponse.errors.name)
      expect(navigate).not.toHaveBeenCalled()
    })
  })
})
