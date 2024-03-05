import React, { FC } from 'react'
import { EmailComponentProps } from './shared'

export const Footer: FC<EmailComponentProps<'Footer'>> = ({ children, emailComponent }) => {
  return <>{children}</>
}
