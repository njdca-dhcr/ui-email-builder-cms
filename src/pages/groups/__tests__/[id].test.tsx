import React from 'react'
import { render } from '@testing-library/react'
import GroupShowPage, { Props } from '../[id]'
import {
  asMock,
  buildGroupShow,
  buildUseMutationResult,
  buildUseQueryResult,
  buildUserIndex,
} from 'src/testHelpers'
import { useGroup, GroupShow, useDestroyGroup } from 'src/network/groups'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'crypto'
import { SIDEBAR_NAVIGATION_TEST_ID as sidebarNavigationTestId } from 'src/ui/SidebarNavigation'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useCurrentRole } from 'src/utils/useCurrentRole'

jest.mock('src/network/groups', () => {
  return { useGroup: jest.fn(), useDestroyGroup: jest.fn() }
})

jest.mock('src/utils/useCurrentRole', () => {
  return { useCurrentRole: jest.fn() }
})

describe('Group Show Page', () => {
  beforeEach(async () => {
    const mutationResult = buildUseMutationResult<ReturnType<typeof useDestroyGroup>>({})
    asMock(useDestroyGroup).mockReturnValue(mutationResult)

    asMock(useCurrentRole).mockReturnValue({ role: 'member', isAdmin: false, isLoading: false })
  })

  const renderPage = (props?: Partial<Props>) => {
    return render(
      <QueryClientProvider client={new QueryClient()}>
        <GroupShowPage
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
    const query = buildUseQueryResult<GroupShow>({ isLoading: true, data: undefined })
    asMock(useGroup).mockReturnValue(query)
    const { baseElement } = renderPage()
    expect(baseElement.querySelector('.layout')).not.toBeNull()
  })

  it('displays the sidebar navigation', () => {
    const query = buildUseQueryResult<GroupShow>({ isLoading: true, data: undefined })
    asMock(useGroup).mockReturnValue(query)
    const { queryByTestId } = renderPage()
    expect(queryByTestId(sidebarNavigationTestId)).not.toBeNull()
  })

  it('loads the correct group', () => {
    const groupId = randomUUID()
    const query = buildUseQueryResult<GroupShow>({ isLoading: true, data: undefined })
    asMock(useGroup).mockReturnValue(query)
    renderPage({ params: { id: groupId } })
    expect(useGroup).toHaveBeenCalledWith(groupId)
  })

  describe('when loading', () => {
    it('displays an loading spinner', () => {
      const query = buildUseQueryResult<GroupShow>({ isLoading: true, data: undefined })
      asMock(useGroup).mockReturnValue(query)
      const { queryByText } = renderPage()
      expect(queryByText('Loading group')).not.toBeNull()
    })
  })

  describe('when successful', () => {
    let group: GroupShow

    beforeEach(() => {
      group = buildGroupShow({ users: [buildUserIndex(), buildUserIndex({ role: 'admin' })] })
      const query = buildUseQueryResult({ data: group })
      asMock(useGroup).mockReturnValue(query)
    })

    it('displays the group', () => {
      const { queryByText } = renderPage()
      expect(queryByText(group.name)).not.toBeNull()
      expect(queryByText(group.description)).not.toBeNull()
    })

    it("displays the groups' users", async () => {
      const { queryByText } = renderPage()
      expect(group.users).toHaveLength(2)
      group.users.forEach((user) => {
        expect(queryByText(user.email)).not.toBeNull()
      })
    })

    it('displays a link to the add members page', () => {
      const { queryByRole } = renderPage({ params: { id: group.id } })
      const addLink = queryByRole('link', { name: 'Add Members to this Group' })

      expect(addLink).not.toBeNull()
      expect(addLink).toHaveAttribute('href', `/groups/${group.id}/add-member`)
    })
  })

  describe('when there is an error', () => {
    it('displays an error', () => {
      const error = new Error(faker.lorem.sentence())
      const query = buildUseQueryResult<GroupShow>({ error, isError: true })
      asMock(useGroup).mockReturnValue(query)
      const { queryByText } = renderPage()
      expect(queryByText(error.message)).not.toBeNull()
    })
  })

  describe('destroying a group as a member', () => {
    beforeEach(() => {
      const group = buildGroupShow()
      const query = buildUseQueryResult({ data: group })
      asMock(useGroup).mockReturnValue(query)
      asMock(useCurrentRole).mockReturnValue({ role: 'member', isAdmin: false, isLoading: false })
    })

    it('does not provide a delete button', async () => {
      const { queryByRole } = renderPage()

      expect(queryByRole('button', { name: 'Delete' })).toBeNull()
    })
  })

  describe('destroying a group as an admin', () => {
    it('provides a delete button', async () => {
      const group = buildGroupShow()
      const query = buildUseQueryResult({ data: group })
      asMock(useGroup).mockReturnValue(query)
      asMock(useCurrentRole).mockReturnValue({ role: 'admin', isAdmin: true, isLoading: false })
      const { queryByRole } = renderPage()

      expect(queryByRole('button', { name: 'Delete' })).not.toBeNull()
    })
  })
})
