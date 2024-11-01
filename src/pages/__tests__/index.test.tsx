import React from 'react'
import { render } from '@testing-library/react'
import IndexPage from '../index'
import { currentUrlSearchParamsFor } from 'src/utils/currentUrlSearchParamsFor'
import { asMock, userIsNotSignedIn, userIsSignedIn } from 'src/testHelpers'
import { navigate } from 'gatsby'
import { AuthProvider } from 'src/utils/AuthContext'
import { useExchangeCodeForToken } from 'src/network/useExchangeCodeForToken'

jest.mock('src/utils/currentUrlSearchParamsFor', () => {
  return {
    currentUrlSearchParamsFor: jest.fn(),
  }
})

jest.mock('src/network/useExchangeCodeForToken', () => {
  return {
    useExchangeCodeForToken: jest.fn(),
  }
})

describe('index - Root page', () => {
  beforeEach(() => {
    asMock(useExchangeCodeForToken).mockReturnValue({ loading: false, errorMessage: '' })
  })

  it('displays the layout', () => {
    const { baseElement } = render(<IndexPage />)
    expect(baseElement.querySelector('.layout')).not.toBeNull()
  })

  it('displays the loading overlay', () => {
    const { queryByRole } = render(<IndexPage />)
    const loadingOverlay = queryByRole('alert')
    expect(loadingOverlay).toHaveTextContent('Signing in')
  })

  describe('when the user is signed in', () => {
    it('navigates to /dashboard', () => {
      userIsSignedIn()
      render(
        <AuthProvider>
          <IndexPage />
        </AuthProvider>,
      )
      expect(navigate).toHaveBeenCalledWith('/dashboard')
    })
  })

  describe('when the user is not signed in', () => {
    it('navigates to /sign-in', () => {
      userIsNotSignedIn()
      asMock(currentUrlSearchParamsFor).mockReturnValue(null)
      asMock(navigate).mockImplementation(async () => {
        asMock(currentUrlSearchParamsFor).mockReturnValue(null)
      })
      render(
        <AuthProvider>
          <IndexPage />
        </AuthProvider>,
      )
      expect(navigate).toHaveBeenCalledWith('/sign-in')
    })
  })

  describe('while auth is loading', () => {
    it('does not navigate away from the page', () => {
      asMock(useExchangeCodeForToken).mockReturnValue({ loading: true, errorMessage: '' })
      render(
        <AuthProvider>
          <IndexPage />
        </AuthProvider>,
      )
      expect(navigate).not.toHaveBeenCalled()
    })
  })
})
