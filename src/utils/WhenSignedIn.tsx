import React, { FC, ReactNode } from 'react'
import { useAuth } from './AuthContext'
import { OnlyWithBackendUrl } from './OnlyWithBackendUrl'

export const WhenSignedIn: FC<{ children: ReactNode }> = ({ children }) => {
  const [auth] = useAuth()

  return <OnlyWithBackendUrl>{auth ? children : null}</OnlyWithBackendUrl>
}
