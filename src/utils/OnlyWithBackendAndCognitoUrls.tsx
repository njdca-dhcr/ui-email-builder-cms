import { FC, ReactNode } from 'react'
import { backendUrl, cognitoSigninUrl } from './backendUrl'

export const OnlyWithBackendAndCognitoUrls: FC<{ children: ReactNode }> = ({ children }) => {
  return backendUrl() && cognitoSigninUrl() ? children : null
}
