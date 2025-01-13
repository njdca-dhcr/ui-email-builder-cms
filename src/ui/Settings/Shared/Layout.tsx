import React, { FC, ReactNode } from 'react'
import { Link } from 'gatsby'
import { Header } from 'src/ui/Header'
import { SkipNavLink } from 'src/ui/Layout'

interface Props {
  children: ReactNode
}

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="settings-layout">
      <SkipNavLink />
      <Header />
      <div className="return-to-email-building-link-container">
        <Link to="/dashboard">Go back to email building</Link>
      </div>
      {children}
    </div>
  )
}
