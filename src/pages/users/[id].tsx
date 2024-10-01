import { HeadFC, PageProps } from 'gatsby'
import capitalize from 'lodash.capitalize'
import React, { FC } from 'react'
import { useUser } from 'src/network/useUser'
import {
  Heading,
  Layout,
  PageContent,
  Paragraph,
  Sidebar,
  SkipNavContent,
  SpacedContainer,
  SidebarNavigation,
  LoadingOverlay,
} from 'src/ui'
import { formatPageTitle } from 'src/utils/formatPageTitle'

export type Props = PageProps<null, null, null>

const UserShowPage: FC<Props> = ({ params }) => {
  const query = useUser(params.id)
  const { data: user, isLoading, error } = query

  return (
    <Layout element="div">
      <Sidebar>
        <SidebarNavigation />
      </Sidebar>
      <PageContent element="main">
        <SkipNavContent />
        <SpacedContainer>
          <Heading element="h1">User</Heading>
          {error && <Paragraph>{error.message}</Paragraph>}

          {user && (
            <div key={user.id} className="user-item">
              <span className="user-email">{user.email}</span>
              <span className="user-role">{capitalize(user.role)}</span>
            </div>
          )}
          {isLoading && <LoadingOverlay description="Loading user" />}
        </SpacedContainer>
      </PageContent>
    </Layout>
  )
}

export default UserShowPage

export const Head: HeadFC = () => <title>{formatPageTitle('User Details')}</title>
