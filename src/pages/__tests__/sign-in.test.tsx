import React from 'react'
import { RenderResult, render } from '@testing-library/react'
import SignIn from '../sign-in'
import { SIDEBAR_NAVIGATION_TEST_ID as sidebarNavigationTestId } from 'src/ui/SidebarNavigation'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { faker } from '@faker-js/faker'
import { navigate } from 'gatsby'
import { signIn } from 'src/network/auth'
import {
  asMock,
  currentAuthCredentials,
  mockBackendUrl,
  userIsNotSignedIn,
  userIsSignedIn,
} from 'src/testHelpers'
import { AuthProvider } from 'src/utils/AuthContext'
import { useCurrentRole } from 'src/utils/useCurrentRole'

jest.mock('src/network/auth', () => {
  return {
    signIn: jest.fn(),
  }
})

jest.mock('src/utils/useCurrentRole', () => {
  return { useCurrentRole: jest.fn() }
})

describe('Sign in page', () => {
  let user: UserEvent
  let rendered: RenderResult
  let email: string
  let password: string

  beforeEach(() => {
    user = userEvent.setup()
    email = faker.internet.email()
    password = faker.internet.password({ length: 10 })
    mockBackendUrl(faker.internet.url({ appendSlash: false }))
    userIsNotSignedIn()
    asMock(useCurrentRole).mockReturnValue({ isAdmin: false, role: 'member', isLoading: false })
  })

  const fillOutAndSubmitForm = async () => {
    const { getByLabelText, getByRole } = rendered
    await user.type(getByLabelText('Email'), email)
    await user.type(getByLabelText('Password'), password)
    await user.click(await getByRole('button', { name: 'Sign In' }))
  }

  it('displays the sidebar navigation', () => {
    rendered = render(
      <AuthProvider>
        <SignIn />
      </AuthProvider>,
    )
    const { queryByTestId } = rendered
    expect(queryByTestId(sidebarNavigationTestId)).not.toBeNull()
  })

  describe('when signing in successfully', () => {
    let idToken: string
    let refreshToken: string

    beforeEach(() => {
      idToken = faker.lorem.paragraph()
      refreshToken = faker.lorem.paragraph()
      asMock(signIn).mockResolvedValue({
        kind: 'SUCCESS',
        AuthenticationResult: {
          AccessToken: faker.lorem.word(),
          IdToken: idToken,
          RefreshToken: refreshToken,
          TokenType: 'Bearer',
          ExpiresIn: faker.number.int({ min: 1000, max: 4000 }),
        },
      })
      rendered = render(
        <AuthProvider>
          <SignIn />
        </AuthProvider>,
      )
    })

    it('redirects to the home page', async () => {
      await fillOutAndSubmitForm()
      expect(navigate).toHaveBeenCalledWith('/')
      expect(navigate).toHaveBeenCalledTimes(1)
    })

    it('signs into the backend', async () => {
      await fillOutAndSubmitForm()
      expect(signIn).toHaveBeenCalledWith({ email, password })
    })

    it('updates the auth info', async () => {
      expect(currentAuthCredentials()).toBeNull()
      await fillOutAndSubmitForm()
      expect(currentAuthCredentials()).toEqual({ idToken, refreshToken })
    })
  })

  describe('when signing in and receiving a challenge', () => {
    let session: string

    beforeEach(() => {
      session = faker.lorem.paragraph()
      asMock(signIn).mockResolvedValue({
        kind: 'NEW_PASSWORD_REQUIRED',
        session,
        username: email,
      })
      rendered = render(
        <AuthProvider>
          <SignIn />
        </AuthProvider>,
      )
    })

    it('redirects to the new password required page', async () => {
      await fillOutAndSubmitForm()
      expect(navigate).toHaveBeenCalledTimes(1)
      expect(navigate).toHaveBeenCalledWith('/new-password-required', {
        state: {
          session,
          username: email,
        },
      })
    })
  })

  describe('when signing in with errors', () => {
    beforeEach(() => {
      asMock(signIn).mockResolvedValue({
        kind: 'NOT_AUTHORIZED',
        error: { name: 'Not authorized', message: 'not authorized' },
      })
      rendered = render(
        <AuthProvider>
          <SignIn />
        </AuthProvider>,
      )
    })

    it('displays the error', async () => {
      await fillOutAndSubmitForm()
      const { baseElement } = rendered
      expect(baseElement).toHaveTextContent('not authorized')
    })

    it('does not redirect', async () => {
      await fillOutAndSubmitForm()
      expect(navigate).not.toHaveBeenCalled()
    })
  })

  describe('when already signed in', () => {
    beforeEach(() => {
      mockBackendUrl(faker.internet.url({ appendSlash: false }))
      userIsSignedIn()
      rendered = render(
        <AuthProvider>
          <SignIn />
        </AuthProvider>,
      )
    })

    it('redirects to the home page', async () => {
      expect(navigate).toHaveBeenCalledWith('/')
      expect(navigate).toHaveBeenCalledTimes(1)
    })
  })

  describe('when there is no backend url', () => {
    beforeEach(() => {
      mockBackendUrl(undefined)
      rendered = render(
        <AuthProvider>
          <SignIn />
        </AuthProvider>,
      )
    })

    it('redirects to the home page', async () => {
      expect(navigate).toHaveBeenCalledWith('/')
      expect(navigate).toHaveBeenCalledTimes(1)
    })
  })
})
