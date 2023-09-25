import React, { FC } from 'react'
import { EmailComponentProps } from './shared'

export const Header: FC<EmailComponentProps> = ({ children }) => {
  return <>{children}</>
}
