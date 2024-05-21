import { useCallback } from 'react'
import { AppResponse, AuthedFetchJSONParams, authedFetchJSON, authedFetchBlob } from './utils'
import { useAuth } from 'src/utils/AuthContext'
import { refreshToken } from './auth'

type useAuthedFetchParams = Omit<AuthedFetchJSONParams, 'idToken'>

export type AuthedFetch = <T>(params: useAuthedFetchParams) => Promise<AppResponse<T>>

export const useAuthedFetch = (responseType: 'json' | 'blob' = 'json'): AuthedFetch => {
  const [auth, setAuth] = useAuth()

  return useCallback(
    async <T>(params: useAuthedFetchParams): Promise<AppResponse<T>> => {
      if (!auth) throw new Error('must be signed in to make that request')

      const authedRequest = responseType === 'blob' ? authedFetchBlob : authedFetchJSON

      const originalResponse = await authedRequest({ ...params, idToken: auth.idToken })

      if (originalResponse.statusCode !== 401) return originalResponse

      const refreshTokenResponse = await refreshToken({ token: auth.refreshToken })

      switch (refreshTokenResponse.kind) {
        case 'NOT_AUTHORIZED':
          setAuth(null)
          return originalResponse
        case 'SUCCESS':
          setAuth({
            idToken: refreshTokenResponse.AuthenticationResult.IdToken,
            refreshToken: refreshTokenResponse.AuthenticationResult.RefreshToken,
          })

          return authedRequest({
            ...params,
            idToken: refreshTokenResponse.AuthenticationResult.IdToken,
          })
      }
    },
    [auth, setAuth],
  )
}
