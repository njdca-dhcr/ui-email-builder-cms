import React from 'react'
import {
  buildGroupShow,
  buildMembershipShow,
  buildUseMutationResult,
  buildUserIndex,
} from 'src/factories'
import { MembershipShow, useDestroyMembership } from 'src/network/memberships'
import { asMock } from 'src/testHelpers'
import { DestroyMembership } from '../DestroyMembership'
import { render } from '@testing-library/react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { faker } from '@faker-js/faker'
import { navigate } from 'gatsby'
import { GroupShow } from 'src/network/groups'
import { UsersIndex } from 'src/network/useUsers'

jest.mock('src/network/memberships', () => {
  return { useDestroyMembership: jest.fn() }
})

describe('DestroyMembership', () => {
  let user: UserEvent
  let group: GroupShow
  let membership: MembershipShow
  let member: UsersIndex

  beforeEach(() => {
    user = userEvent.setup()
    group = buildGroupShow()
    member = buildUserIndex()
    membership = buildMembershipShow({ userId: member.id, groupId: group.id })
  })

  describe('when closed', () => {
    beforeEach(() => {
      const mutationResult = buildUseMutationResult<ReturnType<typeof useDestroyMembership>>()
      asMock(useDestroyMembership).mockReturnValue(mutationResult)
    })

    it('can be opened', async () => {
      const { getByRole, queryByRole } = render(
        <DestroyMembership group={group} membership={membership} user={member} />,
      )
      expect(queryByRole('dialog')).toBeNull()
      await user.click(getByRole('button', { name: 'Remove' }))
      expect(queryByRole('dialog')).not.toBeNull()
    })
  })

  describe('when open', () => {
    const renderAndOpen = async () => {
      const rendered = render(
        <DestroyMembership group={group} membership={membership} user={member} />,
      )
      await user.click(rendered.getByRole('button', { name: 'Remove' }))
      return rendered
    }

    it('confirms and destroys the membership successfully and closes the modal', async () => {
      const mutateAsync = jest.fn()
      const mutationResult = buildUseMutationResult<ReturnType<typeof useDestroyMembership>>({
        mutateAsync,
      })
      asMock(useDestroyMembership).mockReturnValue(mutationResult)
      const { getByRole, queryByRole } = await renderAndOpen()

      expect(mutateAsync).not.toHaveBeenCalled()
      expect(navigate).not.toHaveBeenCalled()
      expect(queryByRole('dialog')).not.toBeNull()

      await user.click(getByRole('button', { name: 'Remove' }))

      expect(mutateAsync).toHaveBeenCalledWith(membership)
      expect(queryByRole('dialog')).toBeNull()
    })

    it('displays a loading spinner when destroying the membership', async () => {
      const mutationResult = buildUseMutationResult<ReturnType<typeof useDestroyMembership>>({
        isPending: true,
      })
      asMock(useDestroyMembership).mockReturnValue(mutationResult)
      const { baseElement } = await renderAndOpen()
      expect(baseElement).toHaveTextContent('Deleting membership')
    })

    it('displays an error when destroying the membership fails', async () => {
      const errorMessage = faker.lorem.sentence()
      const mutationResult = buildUseMutationResult<ReturnType<typeof useDestroyMembership>>({
        error: new Error(errorMessage),
      })
      asMock(useDestroyMembership).mockReturnValue(mutationResult)
      const { baseElement } = await renderAndOpen()
      expect(baseElement).toHaveTextContent(errorMessage)
    })
  })
})
