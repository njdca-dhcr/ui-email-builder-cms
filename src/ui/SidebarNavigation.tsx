import React, { FC, ReactElement } from 'react'
import {
  SideBarList,
  SideBarListItem,
  SideBarListItemBottom,
  SpacedSidebarContainer,
} from './Layout'
import { Link } from 'gatsby'
import { UswdsIcon } from './UswdsIcon'
import classNames from 'classnames'
import { WhenSignedIn } from 'src/utils/WhenSignedIn'

interface Props {}

export const SIDEBAR_NAVIGATION_TEST_ID = 'sidebar-navigation'

export const SidebarNavigation: FC<Props> = () => {
  return (
    <nav data-testid={SIDEBAR_NAVIGATION_TEST_ID}>
      <SideBarList>
        <SpacedLink to="/" text="Home" icon={<UswdsIcon icon="Home" />} />
        <SpacedLink to="/library" text="Library" icon={<UswdsIcon icon="AccountBalance" />} />
        <WhenSignedIn>
          <SpacedLink to="/my-library" text="My Library" icon={<UswdsIcon icon="FolderOpen" />} />
          <SpacedLink
            to="/groups"
            text="Groups"
            icon={<UswdsIcon icon="Groups" />}
            partiallyActive
          />
          <SpacedLink to="/users" text="Users" icon={<UswdsIcon icon="People" />} partiallyActive />
        </WhenSignedIn>
        <SpacedLink
          to="/tips-and-tricks"
          text="Tips & Tricks"
          icon={<UswdsIcon icon="Support" />}
        />
        <li aria-hidden className="sidebar-spacer" />
        <SpacedLink bottom to="/settings" text="Settings" icon={<UswdsIcon icon="Settings" />} />
      </SideBarList>
    </nav>
  )
}

interface SpacedLinkProps {
  bottom?: boolean
  icon: ReactElement
  partiallyActive?: boolean
  text: string
  to: string
}

const SpacedLink: FC<SpacedLinkProps> = ({ bottom, icon, partiallyActive, text, to }) => {
  const Comp = bottom ? SideBarListItemBottom : SideBarListItem

  return (
    <Comp>
      <SpacedSidebarContainer>
        <Link
          activeClassName="sidebar-active-link"
          className={classNames({ bottom })}
          to={to}
          partiallyActive={partiallyActive}
        >
          {!bottom && icon}
          <span>{text}</span>
          {bottom && icon}
        </Link>
      </SpacedSidebarContainer>
    </Comp>
  )
}
