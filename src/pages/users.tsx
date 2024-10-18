import React, { FC } from 'react'
import capitalize from 'lodash.capitalize'
import { HeadFC, Link } from 'gatsby'
import {
  Heading,
  Layout,
  List,
  PageContent,
  Paragraph,
  Sidebar,
  SkipNavContent,
  SpacedContainer,
  SidebarNavigation,
  LoadingOverlay,
  ListItem,
} from 'src/ui'
import { formatPageTitle } from 'src/utils/formatPageTitle'
import { useUsers } from 'src/network/users'
import './users.css'
import { useRedirectIfNotSignedIn } from 'src/utils/useRedirectIfNotSignedIn'

const UsersPage: FC = () => {
  useRedirectIfNotSignedIn()
  const { data: users, isLoading, error } = useUsers()

  return (
    <Layout element="div">
      <Sidebar>
        <SidebarNavigation />
      </Sidebar>
      <PageContent element="main">
        <SkipNavContent />
        <SpacedContainer>
          <Heading element="h1">Users</Heading>
          <Paragraph>All of the users can be found here</Paragraph>
          {error && <Paragraph>{error.message}</Paragraph>}
          {users && users.length > 0 && (
            <List className="user-list">
              {users.map((user) => (
                <ListItem key={user.id}>
                  <Link to={`/users/${user.id}`} className="user-email">
                    {user.email}
                  </Link>
                  <span className="user-role">{capitalize(user.role)}</span>
                </ListItem>
              ))}
            </List>
          )}

          {isLoading && <LoadingOverlay description="Loading the users" />}
        </SpacedContainer>
      </PageContent>
    </Layout>
  )
}

export default UsersPage

export const Head: HeadFC = () => <title>{formatPageTitle('Users')}</title>
