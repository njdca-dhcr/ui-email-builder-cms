import React, { FC, useEffect, useState } from 'react'
import { HeadFC, navigate, PageProps } from 'gatsby'
import {
  Button,
  Form,
  FormField,
  Heading,
  Layout,
  LoadingOverlay,
  PageContent,
  Paragraph,
  Sidebar,
  SidebarNavigation,
  SkipNavContent,
  SpacedContainer,
} from 'src/ui'
import { formatPageTitle } from 'src/utils/formatPageTitle'
import { newPasswordRequired } from 'src/network/auth'
import { useAuth } from 'src/utils/AuthContext'

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

  useEffect(() => {
    if (!hasCorrectState(locationState)) {
      navigate('/sign-in')
    }
  }, [locationState])

  return (
    <Layout element="div">
      <Sidebar>
        <SidebarNavigation />
      </Sidebar>
      <SkipNavContent />
      <PageContent element="main">
        <SpacedContainer>
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
                  navigate('/')
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
              style={{ maxWidth: '50%' }}
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
              style={{ maxWidth: '50%' }}
            />
            <Button type="submit">Update Password</Button>
          </Form>
        </SpacedContainer>
        {loading && <LoadingOverlay description="Updating Password" />}
      </PageContent>
    </Layout>
  )
}

const hasCorrectState = (locationState: unknown): locationState is PresentLocationState => {
  if (!locationState) return false

  return typeof locationState === 'object' && 'username' in locationState
}

export default NewPasswordRequiredPage

export const Head: HeadFC = () => <title>{formatPageTitle('New Password Required')}</title>
