import React from 'react'
import { render } from '@testing-library/react'
import AddGroupMemberPage, { Props } from '../add-member'
import {
  asMock,
  buildGroupShow,
  buildUseMutationResult,
  buildUseQueryResult,
  buildUserIndex,
} from 'src/testHelpers'
import { useGroup, GroupShow } from 'src/network/groups'
import { useCreateMembership, useMembershipsForGroup } from 'src/network/memberships'
import { UsersIndex, useUsers } from 'src/network/users'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'crypto'
import { SIDEBAR_NAVIGATION_TEST_ID as sidebarNavigationTestId } from 'src/ui/SidebarNavigation'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { navigate } from 'gatsby'

jest.mock('src/network/users', () => {
  return { useUsers: jest.fn() }
})

jest.mock('src/network/groups', () => {
  return { useGroup: jest.fn() }
})

jest.mock('src/network/memberships', () => {
  return {
    useMembership: jest.fn(),
    useCreateMembership: jest.fn(),
    useMembershipsForGroup: jest.fn(),
  }
})

jest.mock('src/utils/useRedirectIfNotAdmin', () => {
  return { useRedirectIfNotAdmin: jest.fn() }
})

describe('Add Member Page', () => {
  beforeEach(() => {
    const mutationResult = buildUseMutationResult<ReturnType<typeof useCreateMembership>>()
    const query = buildUseQueryResult<GroupShow>({ isLoading: true, data: undefined })
    const usersQuery = buildUseQueryResult<UsersIndex[]>({ isLoading: true, data: undefined })
    const membersQuery = buildUseQueryResult<UsersIndex[]>({ isLoading: true, data: undefined })

    asMock(useCreateMembership).mockReturnValue(mutationResult)
    asMock(useGroup).mockReturnValue(query)
    asMock(useUsers).mockReturnValue(usersQuery)
    asMock(useMembershipsForGroup).mockReturnValue(membersQuery)
  })

  const renderPage = (props?: Partial<Props>) => {
    return render(
      <QueryClientProvider client={new QueryClient()}>
        <AddGroupMemberPage
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
    const { baseElement } = renderPage()
    expect(baseElement.querySelector('.layout')).not.toBeNull()
  })

  it('displays the sidebar navigation', () => {
    const { queryByTestId } = renderPage()
    expect(queryByTestId(sidebarNavigationTestId)).not.toBeNull()
  })

  it('loads the correct group', () => {
    const groupId = randomUUID()
    renderPage({ params: { id: groupId } })
    expect(useGroup).toHaveBeenCalledWith(groupId)
  })

  it('loads all of the users', () => {
    const groupId = randomUUID()
    renderPage({ params: { id: groupId } })
    expect(useUsers).toHaveBeenCalled()
  })

  it('loads the members of the group', () => {
    const groupId = randomUUID()
    renderPage({ params: { id: groupId } })
    expect(useMembershipsForGroup).toHaveBeenCalledWith(groupId)
  })

  describe('during initial loading', () => {
    it('displays an loading spinner', () => {
      const { queryByText } = renderPage()
      expect(queryByText('Loading group')).not.toBeNull()
    })
  })

  it('displays a loading spinner while updating', async () => {
    const mutationResult = buildUseMutationResult<ReturnType<typeof useCreateMembership>>({
      isPending: true,
    })
    asMock(useCreateMembership).mockReturnValue(mutationResult)
    const { queryByText } = renderPage()
    expect(queryByText('Updating group members')).not.toBeNull()
  })

  describe('form fields', () => {
    let user: UserEvent
    let group: GroupShow
    let users: UsersIndex[]
    let members: UsersIndex[]
    let groupMember: UsersIndex

    beforeEach(() => {
      group = buildGroupShow()
      groupMember = buildUserIndex()
      users = [groupMember, buildUserIndex(), buildUserIndex()]
      members = [groupMember]
      const query = buildUseQueryResult<GroupShow>({ isLoading: false, data: group })
      const usersQuery = buildUseQueryResult<UsersIndex[]>({ isLoading: false, data: users })
      const membersQuery = buildUseQueryResult<UsersIndex[]>({ isLoading: false, data: members })
      asMock(useGroup).mockReturnValue(query)
      asMock(useUsers).mockReturnValue(usersQuery)
      asMock(useMembershipsForGroup).mockReturnValue(membersQuery)

      user = userEvent.setup()
    })

    it('uses a select that only shows users that are not group members', async () => {
      const { baseElement } = await renderPage({ params: { id: group.id } })
      expect(baseElement).toHaveTextContent(users[1].email)
      expect(baseElement).not.toHaveTextContent(groupMember.email)
    })

    it('has a cancel button that navigates back to the group page', async () => {
      const { getByRole } = renderPage()
      const button = getByRole('button', { name: 'Cancel' })
      await user.click(button)
      expect(navigate).toHaveBeenCalled()
    })
  })

  describe('when no member has been selected', () => {
    let user: UserEvent
    let users: UsersIndex[]
    let group: GroupShow
    let members: UsersIndex[]

    beforeEach(() => {
      user = userEvent.setup()
      users = [buildUserIndex(), buildUserIndex()]
      group = buildGroupShow()
      members = []

      const query = buildUseQueryResult<GroupShow>({ isLoading: false, data: group })
      const usersQuery = buildUseQueryResult<UsersIndex[]>({ isLoading: false, data: users })
      const membersQuery = buildUseQueryResult<UsersIndex[]>({ isLoading: false, data: members })
      asMock(useGroup).mockReturnValue(query)
      asMock(useUsers).mockReturnValue(usersQuery)
      asMock(useMembershipsForGroup).mockReturnValue(membersQuery)
    })

    it('does not mutate and displays an error after submission', async () => {
      const mutate = jest.fn()
      const mutationResult = buildUseMutationResult<ReturnType<typeof useCreateMembership>>({
        mutateAsync: mutate,
      })
      asMock(useCreateMembership).mockReturnValue(mutationResult)
      const { getByRole, baseElement } = await renderPage({ params: { id: group.id } })

      expect(mutate).not.toHaveBeenCalled()
      expect(baseElement).not.toHaveTextContent('is required')

      await user.click(getByRole('button', { name: 'Add Member' }))

      expect(mutate).not.toHaveBeenCalled()
      expect(baseElement).toHaveTextContent('is required')
    })
  })

  describe('successful mutation', () => {
    let user: UserEvent
    let users: UsersIndex[]
    let group: GroupShow
    let members: UsersIndex[]

    beforeEach(() => {
      user = userEvent.setup()
      users = [buildUserIndex(), buildUserIndex()]
      group = buildGroupShow()
      members = []

      const query = buildUseQueryResult<GroupShow>({ isLoading: false, data: group })
      const usersQuery = buildUseQueryResult<UsersIndex[]>({ isLoading: false, data: users })
      const membersQuery = buildUseQueryResult<UsersIndex[]>({ isLoading: false, data: members })
      asMock(useGroup).mockReturnValue(query)
      asMock(useUsers).mockReturnValue(usersQuery)
      asMock(useMembershipsForGroup).mockReturnValue(membersQuery)
    })

    it('updates the group memberships', async () => {
      const mutate = jest.fn()
      const mutationResult = buildUseMutationResult<ReturnType<typeof useCreateMembership>>({
        mutateAsync: mutate,
      })
      asMock(useCreateMembership).mockReturnValue(mutationResult)
      const { getByRole, getByLabelText } = await renderPage({ params: { id: group.id } })

      expect(mutate).not.toHaveBeenCalled()

      await user.click(getByLabelText('Select member to add'))
      await user.click(getByRole('option', { name: users[1].email }))
      await user.click(getByRole('button', { name: 'Add Member' }))

      expect(mutate).toHaveBeenCalledWith({
        groupId: group.id,
        userId: users[1].id,
      })
    })

    it('navigates to the group page', async () => {
      const mutationResult = buildUseMutationResult<ReturnType<typeof useCreateMembership>>({
        mutateAsync: jest
          .fn()
          .mockResolvedValue({ id: 'newMembership', groupId: group.id, userId: users[1].id }),
      })
      asMock(useCreateMembership).mockReturnValue(mutationResult)
      const { getByRole, getByLabelText } = await renderPage({ params: { id: group.id } })

      expect(navigate).not.toHaveBeenCalled()
      await user.click(getByLabelText('Select member to add'))
      await user.click(getByRole('option', { name: users[1].email }))
      await user.click(getByRole('button', { name: 'Add Member' }))
      expect(navigate).toHaveBeenCalledWith(`/groups/${group.id}`)
    })
  })

  describe('unsuccessful mutation', () => {
    let user: UserEvent
    let users: UsersIndex[]
    let group: GroupShow
    let members: UsersIndex[]

    beforeEach(() => {
      user = userEvent.setup()
      users = [buildUserIndex(), buildUserIndex()]
      group = buildGroupShow()
      members = []

      const query = buildUseQueryResult<GroupShow>({ isLoading: false, data: group })
      const usersQuery = buildUseQueryResult<UsersIndex[]>({ isLoading: false, data: users })
      const membersQuery = buildUseQueryResult<UsersIndex[]>({ isLoading: false, data: members })
      asMock(useGroup).mockReturnValue(query)
      asMock(useUsers).mockReturnValue(usersQuery)
      asMock(useMembershipsForGroup).mockReturnValue(membersQuery)
    })

    it('displays an error message when the request goes wrong', async () => {
      const error = new Error(faker.lorem.sentence())
      const mutationResult = buildUseMutationResult<ReturnType<typeof useCreateMembership>>({
        error,
      })
      asMock(useCreateMembership).mockReturnValue(mutationResult)
      const { baseElement } = await renderPage({ params: { id: group.id } })

      expect(baseElement).toHaveTextContent(error.message)
    })

    it('displays an error message when there are validation errors', async () => {
      const errorsResponse = {
        errors: { user: faker.lorem.sentence(), group: faker.lorem.sentence() },
      }
      const mutateAsync = jest.fn().mockResolvedValue(errorsResponse)
      const mutationResult = buildUseMutationResult<ReturnType<typeof useCreateMembership>>({
        mutateAsync,
      })
      asMock(useCreateMembership).mockReturnValue(mutationResult)
      const { baseElement, getByRole, getByLabelText } = await renderPage()

      await user.click(getByLabelText('Select member to add'))
      await user.click(getByRole('option', { name: users[1].email }))
      await user.click(getByRole('button', { name: 'Add Member' }))

      expect(baseElement).toHaveTextContent(errorsResponse.errors.user)
      expect(baseElement).toHaveTextContent(errorsResponse.errors.group)
      expect(navigate).not.toHaveBeenCalled()
    })
  })
})
