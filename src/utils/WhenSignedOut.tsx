'use client'
import React, { FC, ReactNode } from 'react'
import { useAuth } from './AuthContext'
import OnlyWithBackendUrl from './OnlyWithBackendUrl'
import { useDidMount } from './useDidMount'

const WhenSignedOut: FC<{ children: ReactNode }> = ({ children }) => {
  const [auth] = useAuth()
  const mounted = useDidMount()

  if (!mounted) return null

  return <OnlyWithBackendUrl>{auth ? null : children}</OnlyWithBackendUrl>
}

export default WhenSignedOut
