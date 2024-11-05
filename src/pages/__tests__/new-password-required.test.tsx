import { RenderResult, render } from '@testing-library/react'
import React from 'react'
import NewPasswordRequiredPage from '../new-password-required'
import { asMock, currentAuthCredentials, mockBackendUrl, userIsNotSignedIn } from 'src/testHelpers'
import { faker } from '@faker-js/faker'
import { navigate } from 'gatsby'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { newPasswordRequired } from 'src/network/auth'
import { AuthProvider } from 'src/utils/AuthContext'
import { useCurrentRole } from 'src/utils/useCurrentRole'

jest.mock('src/network/auth', () => {
  return {
    newPasswordRequired: jest.fn(),
  }
})

jest.mock('src/utils/useCurrentRole', () => {
  return { useCurrentRole: jest.fn() }
})

describe('New Password Required page', () => {
  let email: string
  let session: string
  let password: string

  const renderNewPasswordRequiredPage = (
    locationState: {} | { username: string; session: string },
  ): RenderResult => {
    return render(
      <AuthProvider>
        <NewPasswordRequiredPage
          pageContext={{}}
          uri=""
          path=""
          location={{ state: locationState } as any}
          pageResources={{} as any}
          params={{}}
          children={undefined}
          data={{}}
          serverData={{}}
        />
      </AuthProvider>,
    )
  }

  beforeEach(() => {
    mockBackendUrl(faker.internet.url())
    userIsNotSignedIn()
    email = faker.internet.email()
    session = faker.lorem.paragraph()
    password = faker.lorem.word()
    asMock(useCurrentRole).mockReturnValue({ isAdmin: false, role: 'member', isLoading: false })
  })

  describe('without the necessary state', () => {
    it('redirects to the sign in page', () => {
      expect(navigate).not.toHaveBeenCalled()
      renderNewPasswordRequiredPage({})
      expect(navigate).toHaveBeenCalledWith('/sign-in')
      expect(navigate).toHaveBeenCalledTimes(1)
    })
  })

  describe('with the necessary state and a not authorized error', () => {
    let errorMessage: string
    let user: UserEvent
    let rendered: RenderResult

    beforeEach(() => {
      errorMessage = faker.lorem.sentence()
      asMock(newPasswordRequired).mockResolvedValue({
        kind: 'NOT_AUTHORIZED',
        error: { name: 'Bad Session', message: errorMessage },
      })
      user = userEvent.setup()
      rendered = renderNewPasswordRequiredPage({
        username: email,
        session,
      })
    })

    const fillOutAndSubmitForm = async () => {
      const { getByLabelText, getByRole } = rendered
      await user.type(getByLabelText('Password'), password)
      await user.type(getByLabelText('Confirm Password'), password)
      await user.click(getByRole('button'))
    }

    it('displays the error', async () => {
      await fillOutAndSubmitForm()
      const { baseElement } = rendered
      expect(baseElement).toHaveTextContent(errorMessage)
    })

    it('does not redirect', async () => {
      await fillOutAndSubmitForm()
      expect(navigate).not.toHaveBeenCalled()
    })
  })

  describe('with the necessary state and an invalid password error from the server', () => {
    let errorMessage: string
    let user: UserEvent
    let rendered: RenderResult

    beforeEach(() => {
      errorMessage = faker.lorem.sentence()
      asMock(newPasswordRequired).mockResolvedValue({
        kind: 'INVALID_PASSWORD',
        error: { name: 'Bad Password', message: errorMessage },
      })
      user = userEvent.setup()
      rendered = renderNewPasswordRequiredPage({
        username: email,
        session,
      })
    })

    const fillOutAndSubmitForm = async () => {
      const { getByLabelText, getByRole } = rendered
      await user.type(getByLabelText('Password'), password)
      await user.type(getByLabelText('Confirm Password'), password)
      await user.click(getByRole('button'))
    }

    it('display an error as part of the input', async () => {
      await fillOutAndSubmitForm()
      const { getByLabelText } = rendered
      expect(getByLabelText('Password')).toHaveAccessibleErrorMessage('is invalid')
    })

    it('displays a general error', async () => {
      await fillOutAndSubmitForm()
      const { baseElement } = rendered
      expect(baseElement).toHaveTextContent('Password is invalid')
    })

    it('does not redirect', async () => {
      await fillOutAndSubmitForm()
      expect(navigate).not.toHaveBeenCalled()
    })
  })

  describe('with the necessary state and the passwords do not match', () => {
    let user: UserEvent
    let rendered: RenderResult

    beforeEach(() => {
      user = userEvent.setup()
      rendered = renderNewPasswordRequiredPage({
        username: email,
        session,
      })
    })

    const fillOutAndSubmitForm = async () => {
      const { getByLabelText, getByRole } = rendered
      await user.type(getByLabelText('Password'), password)
      await user.type(getByLabelText('Confirm Password'), password + 'wrong')
      await user.click(getByRole('button'))
    }

    it('displays the error as part of the input', async () => {
      await fillOutAndSubmitForm()
      const { getByLabelText } = rendered
      expect(getByLabelText('Confirm Password')).toHaveAccessibleErrorMessage('must match password')
    })

    it('displays a general error', async () => {
      await fillOutAndSubmitForm()
      const { baseElement } = rendered
      expect(baseElement).toHaveTextContent('Password and confirmation must match')
    })

    it('does not redirect', async () => {
      await fillOutAndSubmitForm()
      expect(navigate).not.toHaveBeenCalled()
    })
  })

  describe('with the necessary state and no errors', () => {
    let user: UserEvent
    let rendered: RenderResult
    let idToken: string
    let refreshToken: string

    beforeEach(() => {
      idToken = faker.lorem.paragraph()
      refreshToken = faker.lorem.paragraph()
      asMock(newPasswordRequired).mockResolvedValue({
        kind: 'SUCCESS',
        AuthenticationResult: {
          AccessToken: faker.lorem.word(),
          IdToken: idToken,
          RefreshToken: refreshToken,
          TokenType: 'Bearer',
          ExpiresIn: faker.number.int({ min: 1000, max: 4000 }),
        },
      })
      user = userEvent.setup()
      rendered = renderNewPasswordRequiredPage({
        username: email,
        session,
      })
    })

    const fillOutAndSubmitForm = async () => {
      const { getByLabelText, getByRole } = rendered
      await user.type(getByLabelText('Password'), password)
      await user.type(getByLabelText('Confirm Password'), password)
      await user.click(getByRole('button'))
    }

    it('updates the auth info', async () => {
      expect(currentAuthCredentials()).toBeNull()
      await fillOutAndSubmitForm()
      expect(currentAuthCredentials()).toEqual({ idToken, refreshToken })
    })

    it('updates the password', async () => {
      expect(newPasswordRequired).not.toHaveBeenCalled()
      await fillOutAndSubmitForm()
      expect(newPasswordRequired).toHaveBeenCalledWith({ email, password, session })
    })

    it('redirects to the dashboard', async () => {
      await fillOutAndSubmitForm()
      expect(navigate).toHaveBeenCalledWith('/dashboard')
      expect(navigate).toHaveBeenCalledTimes(1)
    })
  })
})
