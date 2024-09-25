import { FC, ReactNode } from 'react'
import { backendUrl, cognitoSigninUrl } from './backendUrl'

export const OnlyWithBackendUrl: FC<{ children: ReactNode }> = ({ children }) => {
  return backendUrl() ? children : null
}

export const OnlyWithBackendAndCognitoUrls: FC<{ children: ReactNode }> = ({ children }) => {
  return backendUrl() && cognitoSigninUrl() ? children : null
}
