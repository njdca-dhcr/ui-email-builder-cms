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
import { NewGroupForm, Props } from '../NewGroupForm'

jest.mock('src/network/groups')

describe('NewGroupForm', () => {
  let user: UserEvent

  beforeEach(async () => {
    user = userEvent.setup()
    userIsSignedIn()
    const mutationResult = buildUseMutationResult<ReturnType<typeof useCreateGroup>>()
    asMock(useCreateGroup).mockReturnValue(mutationResult)
  })

  const renderComponent = (options?: Partial<Props>) => {
    return render(
      <AuthProvider>
        <QueryClientProvider client={new QueryClient()}>
          <NewGroupForm onCancel={jest.fn()} {...options} />
        </QueryClientProvider>
      </AuthProvider>,
    )
  }

  it('can be canceled', async () => {
    const onCancel = jest.fn()
    const { getByRole } = renderComponent({ onCancel })
    expect(onCancel).not.toHaveBeenCalled()
    await user.click(getByRole('button', { name: 'Cancel' }))
    expect(onCancel).toHaveBeenCalled()
  })

  describe('pending mutation', () => {
    beforeEach(async () => {
      asMock(useCreateGroup).mockReturnValue(buildUseMutationResult({ isPending: true }))
    })

    it('displays a loading spinner', async () => {
      const { baseElement } = renderComponent()
      expect(baseElement).toHaveTextContent('Creating group')
    })
  })

  describe('successful mutation', () => {
    it('creates a group', async () => {
      const mutate = jest.fn().mockReturnValue({})
      const mutationResult = buildUseMutationResult<ReturnType<typeof useCreateGroup>>({
        mutateAsync: mutate,
      })
      asMock(useCreateGroup).mockReturnValue(mutationResult)
      const { getByRole, getByLabelText, baseElement } = renderComponent()

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
  })

  describe('unsuccessful mutation', () => {
    it('displays an error message when the request goes wrong', async () => {
      const error = new Error(faker.lorem.sentence())
      const mutationResult = buildUseMutationResult<ReturnType<typeof useCreateGroup>>({
        error,
      })
      asMock(useCreateGroup).mockReturnValue(mutationResult)
      const { baseElement } = renderComponent()

      expect(baseElement).toHaveTextContent(error.message)
    })

    it('displays an error message when there are validation errors', async () => {
      const errorsResponse = { errors: { name: faker.lorem.sentence() } }
      const mutateAsync = jest.fn().mockResolvedValue(errorsResponse)
      const mutationResult = buildUseMutationResult<ReturnType<typeof useCreateGroup>>({
        mutateAsync,
      })
      asMock(useCreateGroup).mockReturnValue(mutationResult)
      const { baseElement, getByLabelText, getByRole } = renderComponent()
      await user.type(getByLabelText('Name'), faker.lorem.word())
      await user.click(getByRole('button', { name: 'Create' }))

      expect(baseElement).toHaveTextContent(errorsResponse.errors.name)
      expect(navigate).not.toHaveBeenCalled()
    })
  })
})
