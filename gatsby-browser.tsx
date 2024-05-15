import React, { FC, ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './src/utils/AuthContext'

const queryClient = new QueryClient()

export const wrapRootElement: FC<{ element: ReactNode }> = ({ element }) => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>{element}</QueryClientProvider>
    </AuthProvider>
  )
}
