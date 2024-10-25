'use client'
import React, { FC, ReactNode } from 'react'
import { useAuth } from './AuthContext'
import OnlyWithBackendUrl from './OnlyWithBackendUrl'

const WhenSignedIn: FC<{ children: ReactNode }> = ({ children }) => {
  const [auth] = useAuth()

  return <OnlyWithBackendUrl>{auth ? children : null}</OnlyWithBackendUrl>
}

export default WhenSignedIn
