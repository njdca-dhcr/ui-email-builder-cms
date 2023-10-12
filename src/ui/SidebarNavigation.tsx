import React, { FC, ReactNode } from 'react'
import {
  SideBarList,
  SideBarListItem,
  SideBarListItemBottom,
  SpacedSidebarContainer,
} from './Layout'
import { Link } from 'gatsby'
import { availableFeatures } from 'src/features'

interface Props {}

export const TEST_ID = 'sidebar-navigation'

export const SidebarNavigation: FC<Props> = () => {
  return (
    <nav data-testid={TEST_ID}>
      <SideBarList>
        <SpacedLink to="/">Home</SpacedLink>
        <SpacedLink to="/library">Library</SpacedLink>
        <SpacedLink to="/tips-and-tricks">Tips & Tricks</SpacedLink>
        <li aria-hidden className="sidebar-spacer" />
        {availableFeatures.settings() && (
          <SpacedLink bottom to="/settings">
            Settings
          </SpacedLink>
        )}
      </SideBarList>
    </nav>
  )
}

interface SpacedLinkProps {
  bottom?: boolean
  children: ReactNode
  to: string
}

const SpacedLink: FC<SpacedLinkProps> = ({ bottom, children, to }) => {
  const Comp = bottom ? SideBarListItemBottom : SideBarListItem

  return (
    <Comp>
      <SpacedSidebarContainer>
        <Link activeClassName="sidebar-active-link" to={to}>
          {children}
        </Link>
      </SpacedSidebarContainer>
    </Comp>
  )
}
