import { renderHook } from '@testing-library/react'
import React from 'react'
import { CurrentUser, useCurrentUser } from 'src/network/useCurrentUser'
import { asMock, buildUseQueryResult, userIsNotSignedIn, userIsSignedIn } from 'src/testHelpers'
import { AuthProvider } from '../AuthContext'
import { useCurrentRole } from '../useCurrentRole'

jest.mock('src/network/useCurrentUser', () => {
  return { useCurrentUser: jest.fn() }
})

describe('useCurrentRole', () => {
  const renderPage = () => {
    return renderHook(() => useCurrentRole(), {
      wrapper: ({ children }) => {
        return <AuthProvider>{children}</AuthProvider>
      },
    })
  }

  describe('when signed in and an admin', () => {
    beforeEach(() => {
      userIsSignedIn()
      const queryResult = {
        ...buildUseQueryResult<CurrentUser>({ data: { role: 'admin' } }),
        enabled: true,
      }
      asMock(useCurrentUser).mockReturnValue(queryResult)
    })

    it('is "admin"', () => {
      const { result } = renderPage()
      expect(result.current.role).toEqual('admin')
      expect(result.current.isAdmin).toEqual(true)
    })
  })

  describe('when signed in and a member', () => {
    beforeEach(() => {
      userIsSignedIn()
      const queryResult = {
        ...buildUseQueryResult<CurrentUser>({ data: { role: 'member' } }),
        enabled: true,
      }
      asMock(useCurrentUser).mockReturnValue(queryResult)
    })

    it('is "member"', () => {
      const { result } = renderPage()
      expect(result.current.role).toEqual('member')
      expect(result.current.isAdmin).toEqual(false)
    })
  })

  describe('when signed in but current user is not available (loading, error, etc)', () => {
    beforeEach(() => {
      userIsSignedIn()
      const queryResult = {
        ...buildUseQueryResult<CurrentUser>({ data: undefined, isLoading: true }),
        enabled: true,
      }
      asMock(useCurrentUser).mockReturnValue(queryResult)
    })

    it('is "member"', () => {
      const { result } = renderPage()
      expect(result.current.role).toEqual('member')
      expect(result.current.isAdmin).toEqual(false)
    })
  })

  describe('when not signed in', () => {
    beforeEach(() => {
      userIsNotSignedIn()
      const queryResult = {
        ...buildUseQueryResult<CurrentUser>({ data: undefined }),
        enabled: false,
      }
      asMock(useCurrentUser).mockReturnValue(queryResult)
    })

    it('is "member"', () => {
      const { result } = renderPage()
      expect(result.current.role).toEqual('member')
      expect(result.current.isAdmin).toEqual(false)
    })
  })
})
