import React, { FC, ReactNode } from 'react'
import { Navigation } from './Navigation'
import { Link } from 'gatsby'

interface Props {
  children: ReactNode
}

export const TEST_ID = 'layout'

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div data-testid={TEST_ID}>
      <div style={styles.header}>
        <Link to="/">Email Builder</Link>
        <Navigation />
      </div>
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
