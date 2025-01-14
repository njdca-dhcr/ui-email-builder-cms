import React, { FC, ReactNode } from 'react'
import { useCurrentUser } from 'src/network/users'
import { LoadingOverlay } from '../../LoadingOverlay'
import { Link } from 'gatsby'
import classNames from 'classnames'

export const Sidebar: FC = () => {
  const { data: currentUser, isLoading, error } = useCurrentUser()

  return (
    <div className="settings-sidebar">
      {error && <SidebarError error={error} />}
      <nav>
        <SidebarList>
          <SidebarLink to="/settings/groups" label="Groups" className="section-link">
            {currentUser?.groups ? (
              <SidebarList>
                {currentUser.groups.map((group) => (
                  <SidebarLink
                    key={group.id}
                    to={`/settings/groups/${group.id}`}
                    label={group.name}
                  />
                ))}
              </SidebarList>
            ) : null}
          </SidebarLink>
          <SidebarLink to="/settings/users" label="Users" />
          <SidebarLink to="/settings/email" label="Email Settings" />
        </SidebarList>
      </nav>

      {isLoading && <LoadingOverlay description="Loading sidebar" />}
    </div>
  )
}

const SidebarError: FC<{ error: Error }> = ({ error }) => {
  return <p>{error.message}</p>
}

const SidebarList: FC<{ children: ReactNode }> = ({ children }) => {
  return <ul>{children}</ul>
}

interface SidebarLinkProps {
  to: string
  children?: ReactNode
  className?: string
  label: string
}

const SidebarLink: FC<SidebarLinkProps> = ({ to, children, label, className }) => {
  return (
    <li>
      <Link activeClassName="active" className={classNames(className)} to={to}>
        {label}
      </Link>
      {children}
    </li>
  )
}
