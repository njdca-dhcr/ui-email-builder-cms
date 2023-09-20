import React, { FC, ReactNode } from 'react'
import { Link } from 'gatsby'
import { SkipNavLink, SkipNavContent } from '@reach/skip-nav'
import '@reach/skip-nav/styles.css'
import { Navigation } from './Navigation'
import './Layout.css'

interface Props {
  children: ReactNode
}

export const TEST_ID = 'layout'

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div data-testid={TEST_ID} className="layout">
      <SkipNavLink />
      <div className="header">
        <Link to="/">Email Builder</Link>
        <Navigation />
      </div>
      <SkipNavContent />
      <main className="page">{children}</main>
    </div>
  )
}
