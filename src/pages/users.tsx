import React, { FC } from 'react'
import capitalize from 'lodash.capitalize'
import { HeadFC } from 'gatsby'
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
} from 'src/ui'
import { formatPageTitle } from 'src/utils/formatPageTitle'
import { useUsers } from 'src/network/useUsers'
import './users.css'

const UsersPage: FC = () => {
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
          <Paragraph>All of users can be found here</Paragraph>
          {error && <Paragraph>{error.message}</Paragraph>}
          {users && users.length > 0 && (
            <List className="user-list">
              {users.map((user) => (
                <li key={user.id} className="user-item">
                  <span className="user-email">{user.email}</span>
                  <span className="user-role">{capitalize(user.role)}</span>
                </li>
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
