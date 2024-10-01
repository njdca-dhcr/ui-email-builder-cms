import React from 'react'
import { render } from '@testing-library/react'
import UserShowPage, { Props } from '../[id]'
import { asMock, buildUseQueryResult, buildUserShow } from 'src/testHelpers'
import { useUser } from 'src/network/useUser'
import { UserShow } from 'src/network/useUser'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'crypto'
import { SIDEBAR_NAVIGATION_TEST_ID as sidebarNavigationTestId } from 'src/ui/SidebarNavigation'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import capitalize from 'lodash.capitalize'

jest.mock('src/network/useUser', () => {
  return {
    useUser: jest.fn(),
  }
})

describe('User Show Page', () => {
  const renderPage = (props?: Partial<Props>) => {
    return render(
      <QueryClientProvider client={new QueryClient()}>
        <UserShowPage
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
    const query = buildUseQueryResult<UserShow>({ isLoading: true, data: undefined })
    asMock(useUser).mockReturnValue(query)
    const { baseElement } = renderPage()
    expect(baseElement.querySelector('.layout')).not.toBeNull()
  })

  it('displays the sidebar navigation', () => {
    const query = buildUseQueryResult<UserShow>({ isLoading: true, data: undefined })
    asMock(useUser).mockReturnValue(query)
    const { queryByTestId } = renderPage()
    expect(queryByTestId(sidebarNavigationTestId)).not.toBeNull()
  })

  it('loads the correct user', () => {
    const userId = randomUUID()
    const query = buildUseQueryResult<UserShow>({ isLoading: true, data: undefined })
    asMock(useUser).mockReturnValue(query)
    renderPage({ params: { id: userId } })
    expect(useUser).toHaveBeenCalledWith(userId)
  })

  describe('when loading', () => {
    it('displays an loading spinner', () => {
      const query = buildUseQueryResult<UserShow>({ isLoading: true, data: undefined })
      asMock(useUser).mockReturnValue(query)
      const { queryByText } = renderPage()
      expect(queryByText('Loading user')).not.toBeNull()
    })
  })

  describe('when successful', () => {
    let user: UserShow

    beforeEach(() => {
      user = buildUserShow()
      const query = buildUseQueryResult({ data: user })
      asMock(useUser).mockReturnValue(query)
    })

    it('displays the user', () => {
      const { queryByText } = renderPage()
      expect(queryByText(user.email)).not.toBeNull()
      expect(queryByText(capitalize(user.role))).not.toBeNull()
    })
  })

  describe('when there is an error', () => {
    it('displays an error', () => {
      const error = new Error(faker.lorem.sentence())
      const query = buildUseQueryResult<UserShow>({ error, isError: true })
      asMock(useUser).mockReturnValue(query)
      const { queryByText } = renderPage()
      expect(queryByText(error.message)).not.toBeNull()
    })
  })
})
