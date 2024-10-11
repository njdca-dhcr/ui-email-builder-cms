import React from 'react'
import { navigate } from 'gatsby'
import { asMock } from 'src/testHelpers'
import { renderHook } from '@testing-library/react'
import { AuthProvider } from '../AuthContext'
import { useRedirectIfNotAdmin } from '../useRedirectIfNotAdmin'
import { useCurrentRole } from '../useCurrentRole'

jest.mock('../useCurrentRole', () => {
  return { useCurrentRole: jest.fn() }
})

describe('useRedirectIfNotAdmin', () => {
  const renderPage = () => {
    return renderHook(() => useRedirectIfNotAdmin(), {
      wrapper: ({ children }) => {
        return <AuthProvider>{children}</AuthProvider>
      },
    })
  }

  describe('when signed in as a member', () => {
    beforeEach(() => {
      asMock(useCurrentRole).mockReturnValue({ isAdmin: false, role: 'member', isLoading: false })
    })

    it('redirects to the homepage', async () => {
      expect(navigate).not.toHaveBeenCalled()
      renderPage()
      expect(navigate).toHaveBeenCalledWith('/')
    })
  })

  describe('when signed in as an admin', () => {
    beforeEach(() => {
      asMock(useCurrentRole).mockReturnValue({ isAdmin: true, role: 'admin', isLoading: false })
    })

    it('does not redirect', async () => {
      expect(navigate).not.toHaveBeenCalled()
      renderPage()
      expect(navigate).not.toHaveBeenCalled()
    })
  })

  describe('when loading', () => {
    beforeEach(() => {
      asMock(useCurrentRole).mockReturnValue({ isAdmin: false, role: 'member', isLoading: true })
    })

    it('does not redirect', async () => {
      expect(navigate).not.toHaveBeenCalled()
      renderPage()
      expect(navigate).not.toHaveBeenCalled()
    })
  })
})
