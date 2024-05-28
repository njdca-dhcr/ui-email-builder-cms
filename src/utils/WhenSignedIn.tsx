import React, { FC, ReactNode } from 'react'
import { useAuth } from './AuthContext'
import { OnlyWithBackendFlagAndUrl } from './OnlyWithBackendUrl'

export const WhenSignedIn: FC<{ children: ReactNode }> = ({ children }) => {
  const [auth] = useAuth()

  return <OnlyWithBackendFlagAndUrl>{auth ? children : null}</OnlyWithBackendFlagAndUrl>
}
