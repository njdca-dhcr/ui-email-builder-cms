import React, { FC } from 'react'
import { HeadFC, Link } from 'gatsby'
import { formatPageTitle } from 'src/utils/formatPageTitle'
import {
  Heading,
  Layout,
  List,
  LoadingOverlay,
  PageContent,
  Paragraph,
  Sidebar,
  SidebarNavigation,
  SkipNavContent,
  SpacedContainer,
} from 'src/ui'
import { useGroups } from 'src/network/groups'
import { useRedirectIfNotSignedIn } from 'src/utils/useRedirectIfNotSignedIn'

const GroupsPage: FC = () => {
  useRedirectIfNotSignedIn()
  const { data: groups, isLoading, error } = useGroups()

  return (
    <Layout element="div">
      <Sidebar>
        <SidebarNavigation />
      </Sidebar>
      <PageContent element="main">
        <SkipNavContent />
        <SpacedContainer>
          <Heading element="h1">Groups</Heading>
          <Paragraph>All of the groups can be found here</Paragraph>
          {error && <Paragraph>{error.message}</Paragraph>}
          {groups && (
            <List className="library-list">
              {groups.map((group) => (
                <li key={group.id} className="library-item">
                  <div className="library-name-container">
                    <Link to={`/groups/${group.id}`} className="library-name">
                      {group.name}
                    </Link>
                  </div>
                  <p className="library-description">{group.description}</p>
                </li>
              ))}
            </List>
          )}
          {isLoading && <LoadingOverlay description="Loading groups" />}
        </SpacedContainer>
      </PageContent>
    </Layout>
  )
}

export default GroupsPage

export const Head: HeadFC = () => <title>{formatPageTitle('Groups')}</title>
