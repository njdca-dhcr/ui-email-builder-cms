import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import React from 'react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { buildUseMutationResult } from 'src/factories'
import { faker } from '@faker-js/faker'
import { asMock, buildGroupShow, userIsSignedIn } from 'src/testHelpers'
import { GroupShow, useUpdateGroup } from 'src/network/groups'
import { navigate } from 'gatsby'
import { AuthProvider } from 'src/utils/AuthContext'
import { EditGroupDialog } from '../EditGroupDialog'

jest.mock('src/network/groups')

describe('EditGroupDialog', () => {
  let user: UserEvent
  let group: GroupShow

  beforeEach(async () => {
    user = userEvent.setup()
    group = buildGroupShow()
    userIsSignedIn()
    const mutationResult = buildUseMutationResult<ReturnType<typeof useUpdateGroup>>()
    asMock(useUpdateGroup).mockReturnValue(mutationResult)
  })

  const renderComponent = () => {
    return render(
      <AuthProvider>
        <QueryClientProvider client={new QueryClient()}>
          <EditGroupDialog group={group} />
        </QueryClientProvider>
      </AuthProvider>,
    )
  }

  const renderAndOpen = async () => {
    const rendered = renderComponent()
    await user.click(rendered.getByRole('button'))
    return rendered
  }

  it('displays a button that opens the edit group dialog', async () => {
    const { getByRole, baseElement } = renderComponent()
    expect(baseElement.querySelector('[data-state="open"]')).toBeFalsy()
    await user.click(getByRole('button', { name: 'Edit' }))
    expect(baseElement.querySelector('[data-state="open"]')).toBeTruthy()
  })

  describe('the dialog', () => {
    it('has a title', async () => {
      const { baseElement } = await renderAndOpen()
      expect(baseElement.querySelector('.dialog-content')).toHaveTextContent('Edit Group')
    })

    it('can be canceled', async () => {
      const { baseElement, getByRole } = await renderAndOpen()

      expect(baseElement.querySelector('[data-state="open"]')).toBeTruthy()
      await user.click(getByRole('button', { name: 'Cancel' }))
      expect(baseElement.querySelector('[data-state="open"]')).toBeFalsy()
    })

    it("is filled out with the group's current information", async () => {
      const { getByLabelText } = await renderAndOpen()
      expect(getByLabelText('Name')).toHaveValue(group.name)
      expect(getByLabelText('Description')).toHaveValue(group.description)
    })
  })

  describe('pending mutation', () => {
    beforeEach(async () => {
      asMock(useUpdateGroup).mockReturnValue(buildUseMutationResult({ isPending: true }))
    })

    it('displays a loading spinner', async () => {
      const { baseElement } = await renderAndOpen()
      expect(baseElement).toHaveTextContent('Saving group')
    })
  })

  describe('successful mutation', () => {
    it('updates the group and closes the modal', async () => {
      const mutate = jest.fn().mockReturnValue({})
      const mutationResult = buildUseMutationResult<ReturnType<typeof useUpdateGroup>>({
        mutateAsync: mutate,
      })
      asMock(useUpdateGroup).mockReturnValue(mutationResult)
      const { getByRole, getByLabelText, baseElement } = await renderAndOpen()

      expect(mutate).not.toHaveBeenCalled()
      expect(baseElement.querySelector('[data-state="open"]')).toBeTruthy()

      const groupName = faker.lorem.words(3)
      const groupDescription = faker.lorem.sentence()

      await user.clear(getByLabelText('Name'))
      await user.clear(getByLabelText('Description'))

      await user.type(getByLabelText('Name'), groupName)
      await user.type(getByLabelText('Description'), groupDescription)

      await user.click(getByRole('button', { name: 'Save' }))

      expect(useUpdateGroup).toHaveBeenCalledWith(group.id)
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
      const mutationResult = buildUseMutationResult<ReturnType<typeof useUpdateGroup>>({
        error,
      })
      asMock(useUpdateGroup).mockReturnValue(mutationResult)
      const { baseElement } = await renderAndOpen()

      expect(baseElement).toHaveTextContent(error.message)
    })

    it('displays an error message when there are validation errors', async () => {
      const errorsResponse = { errors: { name: faker.lorem.sentence() } }
      const mutateAsync = jest.fn().mockResolvedValue(errorsResponse)
      const mutationResult = buildUseMutationResult<ReturnType<typeof useUpdateGroup>>({
        mutateAsync,
      })
      asMock(useUpdateGroup).mockReturnValue(mutationResult)
      const { baseElement, getByLabelText, getByRole } = await renderAndOpen()
      await user.type(getByLabelText('Name'), faker.lorem.word())
      await user.click(getByRole('button', { name: 'Save' }))

      expect(baseElement).toHaveTextContent(errorsResponse.errors.name)
      expect(navigate).not.toHaveBeenCalled()
    })
  })
})
