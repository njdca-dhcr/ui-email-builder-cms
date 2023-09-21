import React, { FC } from 'react'
import { SideBarList, SideBarListItem } from './Layout'
import { Link } from 'gatsby'

interface Props {}

export const TEST_ID = 'sidebar-navigation'

export const SidebarNavigation: FC<Props> = () => {
  return (
    <nav data-testid={TEST_ID}>
      <SideBarList>
        <SideBarListItem>
          <Link activeClassName="sidebar-active-link" to="/">
            Home
          </Link>
        </SideBarListItem>
        <SideBarListItem>
          <Link activeClassName="sidebar-active-link" to="/library">
            Library
          </Link>
        </SideBarListItem>
        <SideBarListItem>
          <Link activeClassName="sidebar-active-link" to="/tips-and-tricks">
            Tips & Tricks
          </Link>
        </SideBarListItem>
      </SideBarList>
    </nav>
  )
}
