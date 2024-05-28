import { FC, ReactNode } from 'react'
import { backendFlag, backendUrl } from './backendUrl'

export const OnlyWithBackendFlagAndUrl: FC<{ children: ReactNode }> = ({ children }) => {
  return backendFlag() && backendUrl() ? children : null
}
