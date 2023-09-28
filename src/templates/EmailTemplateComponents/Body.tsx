import React, { FC } from 'react'
import { EmailComponentProps } from './shared'

export const Body: FC<EmailComponentProps> = ({ children }) => {
  return <>{children}</>
}
