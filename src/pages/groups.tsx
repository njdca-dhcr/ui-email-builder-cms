import React, { FC } from 'react'
import { HeadFC, Link } from 'gatsby'
import { formatPageTitle } from 'src/utils/formatPageTitle'
import {
  Heading,
  Layout,
  List,
  ListItem,
  LoadingOverlay,
  PageContent,
  Paragraph,
  Sidebar,
  SidebarNavigation,
  SkipNavContent,
  SpacedContainer,
  UswdsIcon,
} from 'src/ui'
import { useGroups } from 'src/network/groups'
import { useRedirectIfNotSignedIn } from 'src/utils/useRedirectIfNotSignedIn'
import { Actions } from 'src/ui/Layout'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import './groups.css'

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
          <div className="heading-with-actions">
            <div>
              <Heading element="h1">Groups</Heading>
              <Paragraph>All of the groups can be found here</Paragraph>
            </div>
            <Actions>
              <Link to="/groups/new" className="new-group-link">
                <UswdsIcon icon="GroupAdd" />
                <VisuallyHidden>New Group</VisuallyHidden>
              </Link>
            </Actions>
          </div>
          {error && <Paragraph>{error.message}</Paragraph>}
          {groups && (
            <List className="library-list">
              {groups.map((group) => (
                <ListItem key={group.id} className="library-item">
                  <div className="library-name-container">
                    <Link to={`/groups/${group.id}`} className="library-name">
                      {group.name}
                    </Link>
                  </div>
                  <p className="library-description">{group.description}</p>
                </ListItem>
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
