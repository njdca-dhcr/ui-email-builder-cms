import React from 'react'
import { render } from '@testing-library/react'
import GroupsPage from '../groups'
import { SIDEBAR_NAVIGATION_TEST_ID as sidebarNavigationTestId } from 'src/ui/SidebarNavigation'
import { asMock, buildGroupIndex, buildUseQueryResult, urlFor } from 'src/testHelpers'
import { useGroups, GroupsIndex } from 'src/network/groups'
import { faker } from '@faker-js/faker'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

jest.mock('src/network/groups', () => {
  return {
    useGroups: jest.fn(),
  }
})

describe('Groups page', () => {
  const renderPage = () => {
    return render(
      <QueryClientProvider client={new QueryClient()}>
        <GroupsPage />
      </QueryClientProvider>,
    )
  }

  it('is displayed in a layout', () => {
    const query = buildUseQueryResult<GroupsIndex[]>({ isLoading: true, data: undefined })
    asMock(useGroups).mockReturnValue(query)
    const { baseElement } = renderPage()
    expect(baseElement.querySelector('.layout')).not.toBeNull()
  })

  it('displays the sidebar navigation', () => {
    const query = buildUseQueryResult<GroupsIndex[]>({ isLoading: true, data: undefined })
    asMock(useGroups).mockReturnValue(query)
    const { queryByTestId } = renderPage()
    expect(queryByTestId(sidebarNavigationTestId)).not.toBeNull()
  })

  describe('when loading', () => {
    it('displays an loading spinner', () => {
      const query = buildUseQueryResult<GroupsIndex[]>({ isLoading: true, data: undefined })
      asMock(useGroups).mockReturnValue(query)
      const { queryByText } = renderPage()
      expect(queryByText('Loading groups')).not.toBeNull()
    })
  })

  describe('when successful', () => {
    it('displays all of the groups', () => {
      const groups = [buildGroupIndex(), buildGroupIndex()]
      const [group1, group2] = groups
      const query = buildUseQueryResult({ data: groups })
      asMock(useGroups).mockReturnValue(query)

      const { queryByText } = renderPage()

      const firstLink: HTMLAnchorElement | null = queryByText(group1.name) as any
      expect(firstLink).not.toBeNull()
      expect(firstLink!.href).toEqual(urlFor(`/groups/${group1.id}`))

      const secondLink: HTMLAnchorElement | null = queryByText(group2.name) as any
      expect(secondLink).not.toBeNull()
      expect(secondLink!.href).toEqual(urlFor(`/groups/${group2.id}`))
    })
  })

  describe('when there is an error', () => {
    it('displays an error', () => {
      const error = new Error(faker.lorem.sentence())
      const query = buildUseQueryResult<GroupsIndex[]>({ error, isError: true })
      asMock(useGroups).mockReturnValue(query)
      const { queryByText } = renderPage()
      expect(queryByText(error.message)).not.toBeNull()
    })
  })
})
