'use client'

import { FC, ReactNode } from 'react'
import { backendUrl, cognitoSigninUrl } from './backendUrl'

const OnlyWithBackendAndCognitoUrls: FC<{ children: ReactNode }> = ({ children }) => {
  return backendUrl() && cognitoSigninUrl() ? children : null
}

export default OnlyWithBackendAndCognitoUrls
