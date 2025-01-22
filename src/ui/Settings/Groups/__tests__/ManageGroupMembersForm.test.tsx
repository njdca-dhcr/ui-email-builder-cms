import React from 'react'
import { ManageGroupMembersForm, Props } from '../ManageGroupMembersForm'
import { render } from '@testing-library/react'
import {
  asMock,
  buildGroupIndex,
  buildMembershipShow,
  buildUseMutationResult,
  buildUseQueryResult,
  buildUserIndex,
} from 'src/testHelpers'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { useBulkUpdateMemberships } from 'src/network/memberships'
import { UsersIndex, useUsers } from 'src/network/users'
import { faker } from '@faker-js/faker'

jest.mock('src/network/memberships')
jest.mock('src/network/users')

describe('ManageGroupMembersForm', () => {
  let user: UserEvent
  let group: { id: string; name: string }
  let existingMemberships: { id: string; userId: string }[]
  let usersWithMemberships: UsersIndex[]
  let usersWithoutMemberships: UsersIndex[]
  let allUsers: UsersIndex[]

  beforeEach(async () => {
    user = userEvent.setup()
    group = buildGroupIndex()
    existingMemberships = [buildMembershipShow(), buildMembershipShow()]
    usersWithMemberships = existingMemberships.map((membership) =>
      buildUserIndex({ id: membership.userId }),
    )

    usersWithoutMemberships = [buildUserIndex(), buildUserIndex()]
    allUsers = [...usersWithMemberships, ...usersWithoutMemberships]

    asMock(useBulkUpdateMemberships).mockReturnValue(buildUseMutationResult())
    asMock(useUsers).mockReturnValue(buildUseQueryResult({ data: allUsers }))
  })

  const renderComponent = (options?: Partial<Props>) => {
    return render(
      <ManageGroupMembersForm group={group} memberships={existingMemberships} {...options} />,
    )
  }

  describe('loading data', () => {
    beforeEach(async () => {
      asMock(useUsers).mockReturnValue(buildUseQueryResult({ isLoading: true }))
    })

    it('displays a loading spinner', async () => {
      const { baseElement } = renderComponent()
      expect(baseElement).toHaveTextContent('Loading members form')
    })
  })

  describe('with loaded data', () => {
    beforeEach(async () => {
      asMock(useUsers).mockReturnValue(buildUseQueryResult({ data: allUsers as any }))
    })

    it('can be canceled', async () => {
      const onCancel = jest.fn()
      const { getByRole } = renderComponent({ onCancel })
      expect(onCancel).not.toHaveBeenCalled()
      await user.click(getByRole('button', { name: 'Cancel' }))
      expect(onCancel).toHaveBeenCalled()
    })
  })

  describe('pending mutation', () => {
    beforeEach(async () => {
      asMock(useBulkUpdateMemberships).mockReturnValue(buildUseMutationResult({ isPending: true }))
    })

    it('displays a loading spinner', async () => {
      const { baseElement } = renderComponent()
      expect(baseElement).toHaveTextContent('Adding and removing members')
    })
  })

  describe('successful submission', () => {
    let mutateAsync: jest.Mock

    beforeEach(async () => {
      mutateAsync = jest.fn()
      asMock(useBulkUpdateMemberships).mockReturnValue(buildUseMutationResult({ mutateAsync }))
    })

    it('creates memberships for all of the checked users', async () => {
      const { getByRole, getByLabelText } = renderComponent()

      const [membershipToRemove, _membershipToRemain] = existingMemberships
      const [userToRemove, userToRemainIncluded] = usersWithMemberships
      const [userToAdd, userToRemainExcluded] = usersWithoutMemberships

      expect(getByLabelText(userToRemove.email)).toBeChecked()
      expect(getByLabelText(userToRemainIncluded.email)).toBeChecked()

      expect(getByLabelText(userToAdd.email)).not.toBeChecked()
      expect(getByLabelText(userToRemainExcluded.email)).not.toBeChecked()

      await user.click(getByLabelText(userToRemove.email))
      await user.click(getByLabelText(userToAdd.email))

      expect(mutateAsync).not.toHaveBeenCalled()

      await user.click(getByRole('button', { name: 'Save' }))

      expect(mutateAsync).toHaveBeenCalledWith({
        userIdsToAdd: [userToAdd.id],
        membershipIdsToDelete: [membershipToRemove.id],
        groupId: group.id,
      })
    })

    it('calls its onSuccess callback', async () => {
      const onSuccess = jest.fn()
      const { getByRole } = renderComponent({ onSuccess })

      expect(onSuccess).not.toHaveBeenCalled()
      await user.click(getByRole('button', { name: 'Save' }))
      expect(onSuccess).toHaveBeenCalled()
    })
  })

  describe('error on submission', () => {
    let error: Error

    beforeEach(async () => {
      error = new Error(faker.lorem.sentence())
      asMock(useBulkUpdateMemberships).mockReturnValue(buildUseMutationResult({ error }))
    })

    it('displays an error', async () => {
      const { baseElement } = renderComponent()
      expect(baseElement).toHaveTextContent(error.message)
    })
  })
})
