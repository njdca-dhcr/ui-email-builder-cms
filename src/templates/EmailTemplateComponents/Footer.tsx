import React, { FC } from 'react'
import { EmailComponentProps } from './shared'
import { SpacingCell } from '../styles'

export const Footer: FC<EmailComponentProps> = ({ children }) => {
  return (
    <>
      {children}
      <tr>
        <SpacingCell size="medium" />
      </tr>
    </>
  )
}
