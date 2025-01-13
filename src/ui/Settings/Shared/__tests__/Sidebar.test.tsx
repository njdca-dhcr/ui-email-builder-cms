import React from 'react'
import { render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { asMock, buildGroupIndex, buildUseQueryResult, buildUserShow } from 'src/testHelpers'
import { CurrentUser, useCurrentUser } from 'src/network/users'
import { Sidebar } from '../Sidebar'

jest.mock('src/network/users')

describe('Sidebar', () => {
  beforeEach(() => {
    asMock(useCurrentUser).mockReturnValue({ ...buildUseQueryResult(), enabled: true })
  })

  const renderComponent = () => {
    return render(<Sidebar />)
  }

  describe('when loading', () => {
    beforeEach(() => {
      asMock(useCurrentUser).mockReturnValue({
        ...buildUseQueryResult({ isLoading: true }),
        enabled: true,
      })
    })

    it('displays a spinner', async () => {
      const { baseElement } = renderComponent()

      expect(baseElement).toHaveTextContent('Loading sidebar')
    })
  })

  describe('with data (no groups)', () => {
    beforeEach(() => {
      asMock(useCurrentUser).mockReturnValue({
        ...buildUseQueryResult({ isLoading: false, data: buildUserShow() }),
        enabled: true,
      })
    })

    it('displays links that do not require server data', async () => {
      const { queryByRole } = renderComponent()

      expect(queryByRole('link', { name: 'Groups' })).toBeTruthy()
      expect(queryByRole('link', { name: 'Users' })).toBeTruthy()
      expect(queryByRole('link', { name: 'Email Settings' })).toBeTruthy()
    })
  })

  describe('with data (including groups)', () => {
    let groups: { name: string; id: string }[]
    let currentUser: CurrentUser

    beforeEach(() => {
      groups = [buildGroupIndex(), buildGroupIndex()]
      currentUser = { ...buildUserShow(), groups }

      asMock(useCurrentUser).mockReturnValue({
        ...buildUseQueryResult({ isLoading: false, data: currentUser }),
        enabled: true,
      })
    })

    it('displays links that do not require server data', async () => {
      const { queryByRole } = renderComponent()

      expect(queryByRole('link', { name: 'Groups' })).toBeTruthy()
      expect(queryByRole('link', { name: 'Users' })).toBeTruthy()
      expect(queryByRole('link', { name: 'Email Settings' })).toBeTruthy()
    })

    it('displays the groups', async () => {
      const { queryByRole } = renderComponent()

      groups.forEach((group) => {
        expect(queryByRole('link', { name: group.name })).toBeTruthy()
      })
    })
  })

  describe('with an error', () => {
    let error: Error

    beforeEach(() => {
      error = new Error(faker.lorem.sentence())

      asMock(useCurrentUser).mockReturnValue({
        ...buildUseQueryResult({ isLoading: false, error }),
        enabled: true,
      })
    })

    it('displays an error message', async () => {
      const { baseElement } = renderComponent()

      expect(baseElement).toHaveTextContent(error.message)
    })

    it('displays links that do not require server data', async () => {
      const { queryByRole } = renderComponent()

      expect(queryByRole('link', { name: 'Groups' })).toBeTruthy()
      expect(queryByRole('link', { name: 'Users' })).toBeTruthy()
      expect(queryByRole('link', { name: 'Email Settings' })).toBeTruthy()
    })
  })
})
