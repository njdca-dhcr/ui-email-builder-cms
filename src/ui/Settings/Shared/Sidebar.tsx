import React, { FC, ReactNode } from 'react'
import { useCurrentUser } from 'src/network/users'
import { LoadingOverlay } from '../../LoadingOverlay'
import { Link } from 'gatsby'

export const Sidebar: FC = () => {
  const { data: currentUser, isLoading, error } = useCurrentUser()

  return (
    <div className="settings-sidebar">
      {error && <SidebarError error={error} />}
      <SidebarList>
        <SidebarLink to="/settings/groups" label="Groups">
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
  label: string
}

const SidebarLink: FC<SidebarLinkProps> = ({ to, children, label }) => {
  return (
    <li>
      <Link to={to}>{label}</Link>
      {children}
    </li>
  )
}
