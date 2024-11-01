import React, { FC, useEffect, useState } from 'react'
import { HeadFC, navigate } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import {
  Heading,
  Layout,
  Paragraph,
  SpacedContainer,
  LoadingOverlay,
  Form,
  FormField,
  Button,
} from 'src/ui'
import { cognitoSigninUrl } from 'src/utils/backendUrl'
import { formatPageTitle } from 'src/utils/formatPageTitle'
import { signIn } from 'src/network/auth'
import { useAuth } from 'src/utils/AuthContext'
import { appModeAsStateAbbreviation } from 'src/utils/appMode'
import { stateById } from 'src/utils/statesAndTerritories'
import { buildDepartmentSealUrl } from 'src/utils/siteUrl'
import { departmentSealForState } from 'src/ui/Header'

import './index.css'

const SignInPage: FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [_auth, setAuth] = useAuth()
  const signInWithCognitoUrl = cognitoSigninUrl()
  const stateAbbreviation = appModeAsStateAbbreviation()
  const state = stateById(appModeAsStateAbbreviation() ?? 'US')
  const departmentSeal = departmentSealForState(stateAbbreviation)

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
            <Heading element="h1">Sign In</Heading>
            <Paragraph>Sign in to save and edit your email templates.</Paragraph>
            <Form
              errorMessage={errorMessage}
              onSubmit={async () => {
                setLoading(true)
                const result = await signIn({ email, password })
                switch (result.kind) {
                  case 'NEW_PASSWORD_REQUIRED':
                    navigate('/new-password-required', {
                      state: { username: result.username, session: result.session },
                    })
                    break
                  case 'SUCCESS':
                    setAuth({
                      idToken: result.AuthenticationResult.IdToken,
                      refreshToken: result.AuthenticationResult.RefreshToken,
                    })
                    break
                  case 'NOT_AUTHORIZED':
                    setErrorMessage(result.error.message)
                    break
                }
                setLoading(false)
              }}
            >
              <FormField
                id="email-field"
                type="email"
                label="Email"
                onTextChange={setEmail}
                value={email}
                required
              />
              <FormField
                id="password-field"
                type="password"
                label="Password"
                onTextChange={setPassword}
                value={password}
                required
              />
              <Button type="submit">Sign In</Button>
            </Form>

            {signInWithCognitoUrl && (
              <>
                <div className="sign-in-or">--or--</div>
                <div>
                  <a href={signInWithCognitoUrl} className="link-button">
                    Sign in with Microsoft
                  </a>
                </div>
              </>
            )}
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
        {loading && <LoadingOverlay description="Signing in" />}
      </main>
    </Layout>
  )
}

const RedirectIfSignedIn: FC = () => {
  const [auth] = useAuth()
  useEffect(() => {
    if (auth) navigate('/dashboard')
  }, [auth])

  return null
}

export default SignInPage

export const Head: HeadFC = () => <title>{formatPageTitle('Sign In')}</title>
