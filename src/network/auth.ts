import { backendUrl } from 'src/utils/backendUrl'

interface AuthenticationResult {
  AccessToken: string
  ExpiresIn: number
  IdToken: string
  RefreshToken: string
  TokenType: 'Bearer'
}

export interface AuthSuccessResponse {
  kind: 'SUCCESS'
  AuthenticationResult: AuthenticationResult
}

interface SignInNewPasswordRequired {
  kind: 'NEW_PASSWORD_REQUIRED'
  session: string
  username: string
}

interface NotAuthorizedResponse {
  kind: 'NOT_AUTHORIZED'
  error: { name: string; message: string }
}

type SignInResponse = AuthSuccessResponse | SignInNewPasswordRequired | NotAuthorizedResponse

export const signIn = async ({
  email,
  password,
}: {
  email: string
  password: string
}): Promise<SignInResponse> => {
  return fetchJSON({
    path: '/sign-in',
    body: { username: email, password },
  })
}

interface InvalidPasswordResponse {
  kind: 'INVALID_PASSWORD'
  error: { name: string; message: string }
}

type NewPasswordRequiredResponse =
  | AuthSuccessResponse
  | NotAuthorizedResponse
  | InvalidPasswordResponse

export const newPasswordRequired = async ({
  email,
  password,
  session,
}: {
  email: string
  password: string
  session: string
}): Promise<NewPasswordRequiredResponse> => {
  return fetchJSON({
    path: '/set-new-password',
    body: { username: email, password, session },
  })
}

type RefreshTokenResponse = AuthSuccessResponse | NotAuthorizedResponse

export const refreshToken = async ({ token }: { token: string }): Promise<RefreshTokenResponse> => {
  return fetchJSON({
    path: '/refresh-token',
    body: { refreshToken: token },
  })
}

type SignInWithCodeResponse = AuthSuccessResponse | NotAuthorizedResponse

export const signInWithCode = async ({
  code,
}: {
  code: string
}): Promise<SignInWithCodeResponse> => {
  return fetchJSON({
    path: '/token-via-code',
    body: { code },
  })
}

const fetchJSON = async ({ path, body }: { path: string; body: object }): Promise<any> => {
  const url = [backendUrl() ?? '', path].join('')
  const response = await fetch(url, {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
  return response.json()
}
