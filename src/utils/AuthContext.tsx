import React, {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'
import { z } from 'zod'
import { useLocalStorageJSON } from './useLocalStorage'

const authInfoSchema = z.object({
  idToken: z.string(),
  refreshToken: z.string(),
})

export type AuthInfo = z.infer<typeof authInfoSchema>

const AuthContext = createContext<[AuthInfo | null, Dispatch<SetStateAction<AuthInfo | null>>]>([
  null,
  () => null,
])

export const AUTH_LOCAL_STORAGE_KEY = 'auth'

export const AuthProvider: FC<{ children: ReactNode; initialAuth?: AuthInfo }> = ({
  children,
  initialAuth,
}) => {
  const [persistedAuth, persistAuth] = useLocalStorageJSON<AuthInfo | null>(
    AUTH_LOCAL_STORAGE_KEY,
    null,
    authInfoSchema,
  )

  const value = useState<AuthInfo | null>(persistedAuth ?? initialAuth ?? null)
  const [stateAuth] = value

  useEffect(() => {
    persistAuth(stateAuth as AuthInfo | null)
  }, [stateAuth, persistAuth])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

export const useIsSignedIn = (): boolean => {
  const [auth] = useAuth()
  return Boolean(auth)
}
