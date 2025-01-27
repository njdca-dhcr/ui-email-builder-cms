import React, { FC, ReactElement } from 'react'
import { Link } from 'gatsby'
import classNames from 'classnames'
import { SideBarList, SideBarListItem, SpacedSidebarContainer } from './Layout'
import { WhenSignedIn } from 'src/utils/WhenSignedIn'
import { HomeIcon, LibraryIcon, MyDraftsIcon, TipsTricksIcon } from './Svg'

interface Props {}

export const SIDEBAR_NAVIGATION_TEST_ID = 'sidebar-navigation'

export const SidebarNavigation: FC<Props> = () => {
  return (
    <nav data-testid={SIDEBAR_NAVIGATION_TEST_ID}>
      <SideBarList>
        <SpacedLink to="/" text="Home" icon={<HomeIcon />} />
        <WhenSignedIn>
          <SpacedLink to="/my-drafts" text="My Drafts" icon={<MyDraftsIcon />} />
        </WhenSignedIn>
        <SpacedLink to="/library" text="Library" icon={<LibraryIcon />} />
        <SpacedLink to="/tips-and-tricks" text="Tips & Tricks" icon={<TipsTricksIcon />} />
      </SideBarList>
    </nav>
  )
}

interface SpacedLinkProps {
  icon: ReactElement
  partiallyActive?: boolean
  text: string
  to: string
  className?: string
}

const SpacedLink: FC<SpacedLinkProps> = ({ icon, partiallyActive, text, to, className }) => {
  return (
    <SideBarListItem>
      <SpacedSidebarContainer>
        <Link
          activeClassName="sidebar-active-link"
          className={classNames(className)}
          to={to}
          partiallyActive={partiallyActive}
        >
          {icon}
          <span>{text}</span>
        </Link>
      </SpacedSidebarContainer>
    </SideBarListItem>
  )
}
