import { renderHook } from '@testing-library/react'
import React from 'react'
import { CurrentUser, useCurrentUser } from 'src/network/users'
import {
  asMock,
  buildUseQueryResult,
  buildUserShow,
  userIsNotSignedIn,
  userIsSignedIn,
} from 'src/testHelpers'
import { AuthProvider } from '../AuthContext'
import { useCurrentRole } from '../useCurrentRole'

jest.mock('src/network/users', () => {
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
        ...buildUseQueryResult<CurrentUser>({ data: buildUserShow({ role: 'admin' }) }),
        enabled: true,
      }
      asMock(useCurrentUser).mockReturnValue(queryResult)
    })

    it('is "admin"', () => {
      const { result } = renderPage()
      expect(result.current.role).toEqual('admin')
      expect(result.current.isAdmin).toEqual(true)
      expect(result.current.isLoading).toEqual(false)
    })
  })

  describe('when current user is loading', () => {
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
      expect(result.current.isLoading).toEqual(true)
    })
  })

  describe('when signed in and a member', () => {
    beforeEach(() => {
      userIsSignedIn()
      const queryResult = {
        ...buildUseQueryResult<CurrentUser>({ data: buildUserShow({ role: 'member' }) }),
        enabled: true,
      }
      asMock(useCurrentUser).mockReturnValue(queryResult)
    })

    it('is "member"', () => {
      const { result } = renderPage()
      expect(result.current.role).toEqual('member')
      expect(result.current.isAdmin).toEqual(false)
      expect(result.current.isLoading).toEqual(false)
    })
  })

  describe('when signed in but current user is not available (loading, error, etc)', () => {
    beforeEach(() => {
      userIsSignedIn()
      const queryResult = {
        ...buildUseQueryResult<CurrentUser>({
          data: undefined,
          isLoading: false,
          error: new Error(),
        }),
        enabled: true,
      }
      asMock(useCurrentUser).mockReturnValue(queryResult)
    })

    it('is "member"', () => {
      const { result } = renderPage()
      expect(result.current.role).toEqual('member')
      expect(result.current.isAdmin).toEqual(false)
      expect(result.current.isLoading).toEqual(false)
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
      expect(result.current.isLoading).toEqual(false)
    })
  })
})
