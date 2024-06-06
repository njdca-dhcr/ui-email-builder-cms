import { FC, ReactNode } from 'react'
import { backendUrl } from './backendUrl'

export const OnlyWithBackendUrl: FC<{ children: ReactNode }> = ({ children }) => {
  return backendUrl() ? children : null
}
