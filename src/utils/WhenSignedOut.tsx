'use client'
import React, { FC, ReactNode } from 'react'
import { useAuth } from './AuthContext'
import OnlyWithBackendUrl from './OnlyWithBackendUrl'

const WhenSignedOut: FC<{ children: ReactNode }> = ({ children }) => {
  const [auth] = useAuth()

  return <OnlyWithBackendUrl>{auth ? null : children}</OnlyWithBackendUrl>
}

export default WhenSignedOut
