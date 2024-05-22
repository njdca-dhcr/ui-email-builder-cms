import React, { FC, useEffect, useState } from 'react'
import { HeadFC, navigate } from 'gatsby'
import {
  Heading,
  Layout,
  PageContent,
  Paragraph,
  Sidebar,
  SkipNavContent,
  SpacedContainer,
} from 'src/ui/Layout'
import { SidebarNavigation } from 'src/ui/SidebarNavigation'
import { formatPageTitle } from 'src/utils/formatPageTitle'
import { LoadingOverlay } from 'src/ui/LoadingOverlay'
import { signIn } from 'src/network/auth'
import { backendUrl } from 'src/utils/backendUrl'
import { useAuth } from 'src/utils/AuthContext'
import { Alert } from 'src/ui/Alert'
import { AuthField } from 'src/ui/AuthField'
import { Button } from 'src/ui/Button'
import 'src/styles/auth.css'
import { Form } from 'src/ui/Form'

const SignInPage: FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [_auth, setAuth] = useAuth()

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
            className="auth-form"
            onSubmit={async (event) => {
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
            {errorMessage && <Alert className="errors">{errorMessage}</Alert>}
            <AuthField
              inputId="email-field"
              type="email"
              label="Email"
              onTextChange={setEmail}
              value={email}
              required
            />
            <AuthField
              inputId="password-field"
              type="password"
              label="Password"
              onTextChange={setPassword}
              value={password}
              required
            />
            <Button type="submit">Sign In</Button>
          </Form>
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
