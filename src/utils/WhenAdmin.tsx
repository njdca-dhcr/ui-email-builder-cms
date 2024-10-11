import { FC, ReactNode } from 'react'
import { useCurrentRole } from './useCurrentRole'

export const WhenAdmin: FC<{ children: ReactNode }> = ({ children }) => {
  const { isAdmin } = useCurrentRole()

  return isAdmin ? children : null
}
