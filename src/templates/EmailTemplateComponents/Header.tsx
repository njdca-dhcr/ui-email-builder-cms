import React, { FC } from 'react'
import { EmailComponentProps } from './shared'
import { SpacingCell } from '../styles'

export const Header: FC<EmailComponentProps> = ({ children }) => {
  return (
    <>
      {children}
      <tr>
        <SpacingCell size="large" />
      </tr>
    </>
  )
}
