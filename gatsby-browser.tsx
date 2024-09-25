import React, { FC, ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './src/utils/AuthContext'
import { AppErrorBoundary } from './src/utils/AppErrorBoundary'

const queryClient = new QueryClient()

export const wrapRootElement: FC<{ element: ReactNode }> = ({ element }) => {
  return (
    <AppErrorBoundary
      fallback={(error) => {
        console.error(error)
        return <div>Something went wrong.</div>
      }}
    >
      <AuthProvider>
        <QueryClientProvider client={queryClient}>{element}</QueryClientProvider>
      </AuthProvider>
    </AppErrorBoundary>
  )
}
