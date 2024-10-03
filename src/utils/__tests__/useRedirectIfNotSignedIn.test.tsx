import React from 'react'
import { navigate } from 'gatsby'
import { userIsNotSignedIn, userIsSignedIn } from 'src/testHelpers'
import { renderHook } from '@testing-library/react'
import { AuthProvider } from '../AuthContext'
import { useRedirectIfNotSignedIn } from '../useRedirectIfNotSignedIn'

describe('useRedirectIfNotSignedIn', () => {
  const renderPage = () => {
    return renderHook(() => useRedirectIfNotSignedIn(), {
      wrapper: ({ children }) => {
        return <AuthProvider>{children}</AuthProvider>
      },
    })
  }

  describe('when not signed in', () => {
    beforeEach(() => {
      userIsNotSignedIn()
    })

    it('redirects to the root page', async () => {
      expect(navigate).not.toHaveBeenCalled()
      renderPage()
      expect(navigate).toHaveBeenCalledWith('/')
    })
  })

  describe('when signed in', () => {
    beforeEach(() => {
      userIsSignedIn()
    })

    it('does not redirect', async () => {
      expect(navigate).not.toHaveBeenCalled()
      renderPage()
      expect(navigate).not.toHaveBeenCalled()
    })
  })
})
