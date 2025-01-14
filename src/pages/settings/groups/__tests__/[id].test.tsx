import React from 'react'
import { render } from '@testing-library/react'
import GroupShowPage, { Props } from '../[id]'
import {
  asMock,
  buildGroupShow,
  buildUseMutationResult,
  buildUseQueryResult,
  buildGroupUserIndex,
} from 'src/testHelpers'
import { useGroup, GroupShow, useDestroyGroup } from 'src/network/groups'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'crypto'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useCurrentRole } from 'src/utils/useCurrentRole'

jest.mock('src/network/groups')
jest.mock('src/utils/useCurrentRole')

describe('Group Show Page', () => {
  beforeEach(async () => {
    asMock(useDestroyGroup).mockReturnValue(
      buildUseMutationResult<ReturnType<typeof useDestroyGroup>>({}),
    )

    asMock(useCurrentRole).mockReturnValue({ role: 'member', isAdmin: false, isLoading: false })

    asMock(useGroup).mockReturnValue(
      buildUseQueryResult<GroupShow>({ isLoading: true, data: undefined }),
    )
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
    const { baseElement } = renderPage()
    expect(baseElement.querySelector('.settings-layout')).toBeTruthy()
  })

  it('displays the sidebar navigation', () => {
    const { baseElement } = renderPage()
    expect(baseElement.querySelector('.settings-sidebar')).toBeTruthy()
  })

  it('loads the correct group', () => {
    const groupId = randomUUID()
    renderPage({ params: { id: groupId } })
    expect(useGroup).toHaveBeenCalledWith(groupId)
  })

  describe('when loading', () => {
    beforeEach(async () => {
      asMock(useGroup).mockReturnValue(
        buildUseQueryResult<GroupShow>({ isLoading: true, data: undefined }),
      )
    })

    it('displays an loading spinner', () => {
      const { queryByText } = renderPage()
      expect(queryByText('Loading group')).not.toBeNull()
    })
  })

  describe('when successful', () => {
    let group: GroupShow

    beforeEach(() => {
      group = buildGroupShow({
        users: [buildGroupUserIndex(), buildGroupUserIndex({ role: 'admin' })],
      })
      asMock(useGroup).mockReturnValue(buildUseQueryResult({ data: group }))
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
      const addLink = queryByRole('link', { name: 'Add a Member to this Group' })

      expect(addLink).not.toBeNull()
      expect(addLink).toHaveAttribute('href', `/settings/groups/${group.id}/add-member`)
    })
  })

  describe('when there is an error', () => {
    let error: Error

    beforeEach(async () => {
      error = new Error(faker.lorem.sentence())
      asMock(useGroup).mockReturnValue(buildUseQueryResult<GroupShow>({ error, isError: true }))
    })

    it('displays an error', () => {
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

  describe('as an admin', () => {
    describe('destroying an membership', () => {
      it('provides a delete button', async () => {
        const group = buildGroupShow({ users: [buildGroupUserIndex()] })
        const query = buildUseQueryResult({ data: group })
        asMock(useGroup).mockReturnValue(query)
        asMock(useCurrentRole).mockReturnValue({ role: 'admin', isAdmin: true, isLoading: false })
        const { queryByRole } = renderPage()
        expect(queryByRole('button', { name: 'Remove' })).not.toBeNull()
      })
    })

    describe('destroying a group', () => {
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
})
