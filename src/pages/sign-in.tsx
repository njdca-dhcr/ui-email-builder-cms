import React, { FC, useEffect, useState } from 'react'
import { HeadFC, Link, navigate } from 'gatsby'
import {
  Heading,
  Layout,
  PageContent,
  Paragraph,
  Sidebar,
  SkipNavContent,
  SpacedContainer,
  SidebarNavigation,
  LoadingOverlay,
  Form,
  FormField,
  Button,
} from 'src/ui'
import { backendUrl, cognitoSigninUrl } from 'src/utils/backendUrl'
import { formatPageTitle } from 'src/utils/formatPageTitle'
import { signIn } from 'src/network/auth'
import { useAuth } from 'src/utils/AuthContext'
import './sign-in.css'

const SignInPage: FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [_auth, setAuth] = useAuth()
  const signInWithCognitoUrl = cognitoSigninUrl()

  useEffect(() => {
    if (!backendUrl()) {
      navigate('/')
    }
  }, [])

  return (
    <Layout element="div">
      <RedirectIfSignedIn />
      <Sidebar>
        <SidebarNavigation />
      </Sidebar>
      <SkipNavContent />
      <PageContent element="main">
        <SpacedContainer>
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
              style={{ maxWidth: '50%' }}
            />
            <FormField
              id="password-field"
              type="password"
              label="Password"
              onTextChange={setPassword}
              value={password}
              required
              style={{ maxWidth: '50%' }}
            />
            <Button type="submit">Sign In</Button>
          </Form>

          {signInWithCognitoUrl && (
            <>
              <div className="sign-in-or">--or--</div>
              <div>
                <Link to={signInWithCognitoUrl} className="link-button">
                  Sign in with Microsoft
                </Link>
              </div>
            </>
          )}
        </SpacedContainer>
        {loading && <LoadingOverlay description="Signing in" />}
      </PageContent>
    </Layout>
  )
}

const RedirectIfSignedIn: FC = () => {
  const [auth] = useAuth()

  useEffect(() => {
    if (auth) navigate('/')
  }, [auth])

  return null
}

export default SignInPage

export const Head: HeadFC = () => <title>{formatPageTitle('Sign In')}</title>
