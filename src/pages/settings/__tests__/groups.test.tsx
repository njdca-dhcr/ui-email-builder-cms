import React from 'react'
import { render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import GroupsPage from '../groups'
import { asMock, buildGroupIndex, buildUseQueryResult, urlFor } from 'src/testHelpers'
import { useGroups, GroupsIndex } from 'src/network/groups'

jest.mock('src/network/groups')

describe('Groups page', () => {
  const renderPage = () => {
    return render(
      <QueryClientProvider client={new QueryClient()}>
        <GroupsPage />
      </QueryClientProvider>,
    )
  }

  beforeEach(async () => {
    asMock(useGroups).mockReturnValue(
      buildUseQueryResult<GroupsIndex[]>({ isLoading: true, data: undefined }),
    )
  })

  it('is displayed in a layout', () => {
    const { baseElement } = renderPage()
    expect(baseElement.querySelector('.settings-layout')).toBeTruthy()
  })

  it('displays the sidebar navigation', () => {
    const { baseElement } = renderPage()
    expect(baseElement.querySelector('.settings-sidebar')).toBeTruthy()
  })

  describe('when loading', () => {
    beforeEach(async () => {
      asMock(useGroups).mockReturnValue(
        buildUseQueryResult<GroupsIndex[]>({ isLoading: true, data: undefined }),
      )
    })

    it('displays an loading spinner', () => {
      const { queryByText } = renderPage()
      expect(queryByText('Loading groups')).not.toBeNull()
    })
  })

  describe('when successful', () => {
    let groups: GroupsIndex[]

    beforeEach(async () => {
      groups = [buildGroupIndex(), buildGroupIndex()]
      asMock(useGroups).mockReturnValue(buildUseQueryResult({ data: groups }))
    })

    it('displays all of the groups', () => {
      const [group1, group2] = groups

      const { queryByText } = renderPage()

      const firstLink: HTMLAnchorElement | null = queryByText(group1.name) as any
      expect(firstLink).not.toBeNull()
      expect(firstLink!.href).toEqual(urlFor(`/settings/groups/${group1.id}`))

      const secondLink: HTMLAnchorElement | null = queryByText(group2.name) as any
      expect(secondLink).not.toBeNull()
      expect(secondLink!.href).toEqual(urlFor(`/settings/groups/${group2.id}`))
    })
  })

  describe('when there is an error', () => {
    let error: Error

    beforeEach(async () => {
      error = new Error(faker.lorem.sentence())
      asMock(useGroups).mockReturnValue(
        buildUseQueryResult<GroupsIndex[]>({ error, isError: true }),
      )
    })

    it('displays an error', () => {
      const { queryByText } = renderPage()
      expect(queryByText(error.message)).not.toBeNull()
    })
  })
})
