import React, { FC } from 'react'
import { HeadFC, Link } from 'gatsby'
import { List, ListItem, LoadingOverlay } from 'src/ui'
import { Layout, PageContent, Sidebar } from 'src/ui/Settings/Shared'
import { formatPageTitle } from 'src/utils/formatPageTitle'
import { useUsers } from 'src/network/users'
import { useRedirectIfNotSignedIn } from 'src/utils/useRedirectIfNotSignedIn'
import './users.css'

const UsersPage: FC = () => {
  useRedirectIfNotSignedIn()
  const { data: users, isLoading, error } = useUsers()

  return (
    <Layout>
      <Sidebar />
      <PageContent>
        <div className="settings-header">
          <h1>Users</h1>
          <p>All of the users can be found here</p>
        </div>
        {error && <p>{error.message}</p>}
        {users && users.length > 0 && (
          <List className="user-list">
            {users.map((user) => (
              <ListItem key={user.id}>
                <Link to={`/settings/users/${user.id}`} className="user-email">
                  {user.email}
                </Link>
                <span className="user-role">{user.role}</span>
              </ListItem>
            ))}
          </List>
        )}

        {isLoading && <LoadingOverlay description="Loading the users" />}
      </PageContent>
    </Layout>
  )
}

export default UsersPage

export const Head: HeadFC = () => <title>{formatPageTitle('Users')}</title>
