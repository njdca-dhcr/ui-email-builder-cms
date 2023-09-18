import React, { FC, ReactNode } from 'react'
import { Navigation } from './Navigation'

interface Props {
  children: ReactNode
}

export const TEST_ID = 'layout'

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div data-testid={TEST_ID}>
      <Navigation />
      {children}
    </div>
  )
}
