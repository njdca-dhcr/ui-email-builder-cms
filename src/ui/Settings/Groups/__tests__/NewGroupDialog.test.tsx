import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import React from 'react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { buildUseMutationResult } from 'src/factories'
import { asMock, userIsSignedIn } from 'src/testHelpers'
import { useCreateGroup } from 'src/network/groups'
import { AuthProvider } from 'src/utils/AuthContext'
import { NewGroupDialog } from '../NewGroupDialog'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'crypto'
import { navigate } from 'gatsby'

jest.mock('src/network/groups')

describe('NewGroupDialog', () => {
  let user: UserEvent

  beforeEach(async () => {
    user = userEvent.setup()
    userIsSignedIn()
    const mutationResult = buildUseMutationResult<ReturnType<typeof useCreateGroup>>({})
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

  const renderAndCreateGroup = async (options?: { groupName?: string }) => {
    const rendered = await renderAndOpen()

    const { getByLabelText, getByRole } = rendered

    await user.type(getByLabelText('Name'), options?.groupName ?? faker.lorem.word())
    await user.click(getByRole('button', { name: 'Create' }))

    return rendered
  }

  it('displays a button that opens the new group dialog', async () => {
    const { getByRole, baseElement } = renderComponent()
    expect(baseElement.querySelector('[data-state="open"]')).toBeFalsy()
    await user.click(getByRole('button', { name: 'Add New Group +' }))
    expect(baseElement.querySelector('[data-state="open"]')).toBeTruthy()
  })

  describe('the dialog when creating a group', () => {
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

    it('moves on to managing members after creating the group', async () => {
      const groupName = faker.lorem.words(3)
      const mutationResult = buildUseMutationResult<ReturnType<typeof useCreateGroup>>({
        mutateAsync: jest.fn().mockResolvedValue({ group: { id: randomUUID(), name: groupName } }),
      })
      asMock(useCreateGroup).mockReturnValue(mutationResult)

      const { getByLabelText, getByRole, baseElement, debug } = await renderAndOpen()

      await user.type(getByLabelText('Name'), groupName)
      await user.type(getByLabelText('Description'), faker.lorem.sentence())
      await user.click(getByRole('button', { name: 'Create' }))

      expect(baseElement).not.toHaveTextContent('Create a New Group')
      expect(baseElement).toHaveTextContent(groupName)
    })
  })

  describe('the dialog after creating a group', () => {
    let group: { id: string; name: string }

    beforeEach(() => {
      group = { id: randomUUID(), name: faker.lorem.words(3) }
      const mutationResult = buildUseMutationResult<ReturnType<typeof useCreateGroup>>({
        mutateAsync: jest.fn().mockResolvedValue({ group }),
      })
      asMock(useCreateGroup).mockReturnValue(mutationResult)
    })

    it('has a title', async () => {
      const { baseElement } = await renderAndCreateGroup({ groupName: group.name })
      expect(baseElement).toHaveTextContent(`Manage ${group.name} Users`)
    })

    it('displays the manage users form', async () => {
      const { baseElement } = await renderAndCreateGroup({ groupName: group.name })
      expect(baseElement.querySelector('.manage-group-members-form')).toBeTruthy()
    })

    it('can be canceled', async () => {
      const { baseElement, getByRole } = await renderAndCreateGroup({ groupName: group.name })

      expect(baseElement.querySelector('[data-state="open"]')).toBeTruthy()
      await user.click(getByRole('button', { name: 'Cancel' }))
      expect(baseElement.querySelector('[data-state="open"]')).toBeFalsy()
    })

    it('navigates to the group show page when on successful save', async () => {
      const { getByRole } = await renderAndCreateGroup({ groupName: group.name })
      expect(navigate).not.toHaveBeenCalled()
      await user.click(getByRole('button', { name: 'Save' }))
      expect(navigate).toHaveBeenCalledWith(`/settings/groups/${group.id}`)
    })
  })
})
