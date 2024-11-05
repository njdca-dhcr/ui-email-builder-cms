import React, { FC, useEffect, useState } from 'react'
import { HeadFC, navigate, PageProps } from 'gatsby'
import {
  Button,
  Form,
  FormField,
  Heading,
  Layout,
  LoadingOverlay,
  Paragraph,
  SpacedContainer,
} from 'src/ui'
import { formatPageTitle } from 'src/utils/formatPageTitle'
import { newPasswordRequired } from 'src/network/auth'
import { useAuth } from 'src/utils/AuthContext'
import { RedirectIfSignedIn } from './sign-in'
import { appModeAsStateAbbreviation } from 'src/utils/appMode'
import { stateById } from 'src/utils/statesAndTerritories'
import { departmentSealForState } from 'src/ui/Header'
import { buildDepartmentSealUrl } from 'src/utils/siteUrl'
import { StaticImage } from 'gatsby-plugin-image'

type PresentLocationState = { username: string; session: string }
type EmptyLocationState = {}
type LocationState = PresentLocationState | EmptyLocationState
type Props = PageProps<object, object, LocationState>

const NewPasswordRequiredPage: FC<Props> = ({ location }) => {
  const locationState = location.state
  const passwordId = 'password-id'
  const passwordConfirmationId = 'password-confirmation-id'
  const [_auth, setAuth] = useAuth()
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [passwordIsInvalid, setPasswordIsInvalid] = useState(false)
  const [passwordConfirmationIsInvalid, setPasswordConfirmationIsInvalid] = useState(false)

  const stateAbbreviation = appModeAsStateAbbreviation()
  const state = stateById(appModeAsStateAbbreviation() ?? 'US')
  const departmentSeal = departmentSealForState(stateAbbreviation)

  useEffect(() => {
    if (!hasCorrectState(locationState)) {
      navigate('/sign-in')
    }
  }, [locationState])

  return (
    <Layout element="div">
      <RedirectIfSignedIn />
      <main className="page-content homepage">
        <div className="login-pane">
          <div className="login-container">
            <header>
              {departmentSeal && (
                <img
                  alt={departmentSeal.label}
                  src={buildDepartmentSealUrl(`/${departmentSeal.imageName}`)}
                />
              )}
              <div>
                {state && `${state.name} `}
                Email Builder (Beta)
              </div>
            </header>
            <Heading element="h1">New Password Required</Heading>
            <Paragraph>Please replace the administrator set password before continuing</Paragraph>
            <Form
              errorMessage={errorMessage}
              onSubmit={async () => {
                if (!hasCorrectState(locationState)) return
                setErrorMessage('')
                setPasswordIsInvalid(false)
                setPasswordConfirmationIsInvalid(false)
                setLoading(true)

                if (password !== passwordConfirmation) {
                  setPasswordConfirmationIsInvalid(true)
                  setErrorMessage('Password and confirmation must match')
                  setLoading(false)
                  return
                }

                const result = await newPasswordRequired({
                  password,
                  email: locationState.username,
                  session: locationState.session,
                })

                switch (result.kind) {
                  case 'NOT_AUTHORIZED':
                    setErrorMessage(result.error.message)
                    break
                  case 'INVALID_PASSWORD':
                    setPasswordIsInvalid(true)
                    setErrorMessage('Password is invalid')
                    break
                  case 'SUCCESS':
                    setAuth({
                      idToken: result.AuthenticationResult.IdToken,
                      refreshToken: result.AuthenticationResult.RefreshToken,
                    })
                    break
                }

                setLoading(false)
              }}
            >
              <FormField
                type="password"
                id={passwordId}
                label="Password"
                value={password}
                onTextChange={setPassword}
                error={passwordIsInvalid ? 'is invalid' : undefined}
                description="must be at least 8 characters long and contain least one number, one lowercase letter, one uppercase letter, and one symbol"
                required
                minLength={8}
              />
              <FormField
                type="password"
                id={passwordConfirmationId}
                label="Confirm Password"
                value={passwordConfirmation}
                onTextChange={setPasswordConfirmation}
                error={passwordConfirmationIsInvalid ? 'must match password' : undefined}
                description="must match the password"
                required
                minLength={8}
              />
              <Button type="submit">Update Password</Button>
            </Form>
          </div>
        </div>
        <div className="image-pane">
          <SpacedContainer>
            <StaticImage
              src="../images/email-template.png"
              alt="email template"
              placeholder="blurred"
              width={460}
              className="template-desktop"
            />
            <StaticImage
              src="../images/email-template-mobile.png"
              alt="email template mobile"
              placeholder="blurred"
              width={222}
              className="template-mobile"
            />
          </SpacedContainer>
        </div>
        {loading && <LoadingOverlay description="Updating Password" />}
      </main>
    </Layout>
  )
}

const hasCorrectState = (locationState: unknown): locationState is PresentLocationState => {
  if (!locationState) return false

  return typeof locationState === 'object' && 'username' in locationState
}

export default NewPasswordRequiredPage

export const Head: HeadFC = () => <title>{formatPageTitle('New Password Required')}</title>
