import React from 'react'
import { render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { asMock, buildUseQueryResult, buildUserShow } from 'src/testHelpers'
import { CurrentUser, useCurrentUser } from 'src/network/users'
import EmailSettingsPage from '../email'

jest.mock('src/network/users')

describe('EmailSettingsPage', () => {
  const renderPage = () => {
    return render(
      <QueryClientProvider client={new QueryClient()}>
        <EmailSettingsPage />
      </QueryClientProvider>,
    )
  }

  beforeEach(async () => {
    asMock(useCurrentUser).mockReturnValue({ ...buildUseQueryResult(), enabled: true })
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
      asMock(useCurrentUser).mockReturnValue({
        ...buildUseQueryResult<CurrentUser>({ isLoading: true }),
        enabled: true,
      })
    })

    it('displays a spinner', async () => {
      const { baseElement } = renderPage()
      expect(baseElement).toHaveTextContent('Loading email settings')
    })
  })

  describe('when the current user is loaded', () => {
    beforeEach(async () => {
      asMock(useCurrentUser).mockReturnValue({
        ...buildUseQueryResult<CurrentUser>({ data: buildUserShow() }),
        enabled: true,
      })
    })

    it('displays EditBanner', () => {
      const { queryByRole } = renderPage()
      expect(queryByRole('heading', { name: 'Banner' })).toBeTruthy()
    })

    it('displays EditDisclaimer', () => {
      const { queryByRole } = renderPage()
      expect(queryByRole('heading', { name: 'Disclaimer' })).toBeTruthy()
    })

    it('displays EditStateSeal', () => {
      const { queryByRole } = renderPage()
      expect(queryByRole('heading', { name: 'State Seal' })).toBeTruthy()
    })

    it('displays EditDepartmentSeal', () => {
      const { queryByRole } = renderPage()
      expect(queryByRole('heading', { name: 'Department Seal' })).toBeTruthy()
    })
  })

  describe('with an error', () => {
    let error: Error

    beforeEach(async () => {
      error = new Error(faker.lorem.sentence())

      asMock(useCurrentUser).mockReturnValue({
        ...buildUseQueryResult<CurrentUser>({ error }),
        enabled: true,
      })
    })

    it('displays the error message', async () => {
      const { baseElement } = renderPage()
      expect(baseElement).toHaveTextContent(error.message)
    })
  })
})
