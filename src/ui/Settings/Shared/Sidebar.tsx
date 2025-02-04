import React, { FC, ReactElement, ReactNode } from 'react'
import { Link } from 'gatsby'
import classNames from 'classnames'
import { useCurrentUser } from 'src/network/users'
import { LoadingOverlay } from '../../LoadingOverlay'
import { GroupsIcon, UsersIcon, EmailSettingsIcon, GroupIcon } from './Icons'

export const Sidebar: FC = () => {
  const { data: currentUser, isLoading, error } = useCurrentUser()

  return (
    <div className="settings-sidebar">
      {error && <SidebarError error={error} />}
      <nav>
        <SidebarList>
          {currentUser?.role === 'admin' && (
            <>
              <SidebarLink
                to="/settings/groups"
                label="Groups"
                className="section-link"
                icon={<GroupsIcon />}
              >
                {currentUser?.groups ? (
                  <SidebarList className="inner">
                    {currentUser.groups.map((group) => (
                      <SidebarLink
                        key={group.id}
                        to={`/settings/groups/${group.id}`}
                        label={group.name}
                        partiallyActive
                        icon={<GroupIcon />}
                      />
                    ))}
                  </SidebarList>
                ) : null}
              </SidebarLink>
              <SidebarLink
                to="/settings/users"
                label="Users"
                partiallyActive
                icon={<UsersIcon />}
              />
            </>
          )}
          <SidebarLink to="/settings/email" label="Email Settings" icon={<EmailSettingsIcon />} />
        </SidebarList>
      </nav>

      {isLoading && <LoadingOverlay description="Loading sidebar" />}
    </div>
  )
}

const SidebarError: FC<{ error: Error }> = ({ error }) => {
  return <p>{error.message}</p>
}

const SidebarList: FC<{ children: ReactNode; className?: string }> = ({ children, className }) => {
  return <ul className={classNames('settings-sidebar-list', className)}>{children}</ul>
}

interface SidebarLinkProps {
  children?: ReactNode
  className?: string
  icon: ReactElement
  label: string
  partiallyActive?: boolean
  to: string
}

const SidebarLink: FC<SidebarLinkProps> = ({
  children,
  className,
  icon,
  label,
  partiallyActive,
  to,
}) => {
  return (
    <li className="settings-sidebar-list-item">
      <Link
        partiallyActive={partiallyActive}
        activeClassName="active"
        className={classNames('link', className)}
        to={to}
      >
        <span className="icon">{icon}</span>
        <span className="label">{label}</span>
      </Link>
      {children}
    </li>
  )
}
