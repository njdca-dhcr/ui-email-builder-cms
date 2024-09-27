import React from 'react'
import { act, renderHook } from '@testing-library/react'
import { useExchangeCodeForToken } from '../useExchangeCodeForToken'
import { AuthProvider } from 'src/utils/AuthContext'
import { asMock, currentAuthCredentials, userIsNotSignedIn, userIsSignedIn } from 'src/testHelpers'
import { faker } from '@faker-js/faker'
import { signInWithCode } from '../auth'
import { currentUrlSearchParamsFor } from 'src/utils/currentUrlSearchParamsFor'
import { navigate } from 'gatsby'

jest.mock('src/network/auth', () => {
  return {
    signInWithCode: jest.fn(),
  }
})

jest.mock('src/utils/currentUrlSearchParamsFor', () => {
  return {
    currentUrlSearchParamsFor: jest.fn(),
  }
})

describe('useExchangeCodeForToken', () => {
  const renderUseExchangeCodeForToken = async () => {
    return await act(async () => {
      const hookResult = renderHook(() => useExchangeCodeForToken(), {
        wrapper: ({ children }) => {
          return <AuthProvider>{children}</AuthProvider>
        },
      })
      await new Promise(process.nextTick)
      return hookResult
    })
  }

  beforeEach(() => {
    userIsNotSignedIn()
  })

  describe('with a valid code', () => {
    let idToken: string
    let refreshToken: string
    let code: string

    beforeEach(() => {
      code = faker.lorem.word()
      idToken = faker.lorem.paragraph()
      refreshToken = faker.lorem.paragraph()
      asMock(signInWithCode).mockResolvedValue({
        kind: 'SUCCESS',
        AuthenticationResult: {
          AccessToken: faker.lorem.word(),
          IdToken: idToken,
          RefreshToken: refreshToken,
          TokenType: 'Bearer',
          ExpiresIn: faker.number.int({ min: 1000, max: 4000 }),
        },
      })
      asMock(currentUrlSearchParamsFor).mockReturnValue(code)
      asMock(navigate).mockImplementation(async () => {
        asMock(currentUrlSearchParamsFor).mockReturnValue(null)
      })
    })

    it('removes the code from the current path', async () => {
      await renderUseExchangeCodeForToken()
      expect(navigate).toHaveBeenCalledWith('/', { replace: true })
      expect(navigate).toHaveBeenCalledTimes(1)
    })

    it('signs into the backend', async () => {
      await renderUseExchangeCodeForToken()
      expect(signInWithCode).toHaveBeenCalledWith({ code })
    })

    it('updates the auth info', async () => {
      expect(currentAuthCredentials()).toBeNull()
      await renderUseExchangeCodeForToken()
      expect(currentAuthCredentials()).toEqual({ idToken, refreshToken })
    })
  })

  describe('when exchanging a code with errors', () => {
    beforeEach(() => {
      asMock(signInWithCode).mockResolvedValue({
        kind: 'NOT_AUTHORIZED',
        error: { name: 'Not authorized', message: 'not authorized' },
      })
      asMock(currentUrlSearchParamsFor).mockReturnValue(faker.lorem.word())
    })

    it('displays the error', async () => {
      const rendered = await renderUseExchangeCodeForToken()
      expect(rendered.result.current.errorMessage).toEqual('not authorized')
    })

    it('does not redirect', async () => {
      await renderUseExchangeCodeForToken()
      expect(navigate).not.toHaveBeenCalled()
    })
  })

  describe('when already signed in with a code present', () => {
    beforeEach(() => {
      asMock(navigate).mockClear()
      userIsSignedIn()
      asMock(currentUrlSearchParamsFor).mockReturnValue(faker.lorem.word())
    })

    it('does not try to sign in', async () => {
      await renderUseExchangeCodeForToken()
      expect(signInWithCode).not.toHaveBeenCalled()
    })

    it('removes the code from the current path', async () => {
      await renderUseExchangeCodeForToken()
      expect(navigate).toHaveBeenCalledWith('/', { replace: true })
      expect(navigate).toHaveBeenCalledTimes(1)
    })
  })
})
