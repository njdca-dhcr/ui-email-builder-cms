import React, { FC, ReactNode } from 'react'
import { Link } from 'gatsby'
import { SkipNavLink, SkipNavContent } from '@reach/skip-nav'
import '@reach/skip-nav/styles.css'
import { Navigation } from './Navigation'

interface Props {
  children: ReactNode
}

export const TEST_ID = 'layout'

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div data-testid={TEST_ID}>
      <SkipNavLink />
      <div style={styles.header}>
        <Link to="/">Email Builder</Link>
        <Navigation />
      </div>
      <SkipNavContent />
      {children}
    </div>
  )
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 12,
  },
}
