import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { HeadFC, Link } from 'gatsby'
import React, { FC } from 'react'
import { useGroups } from 'src/network/groups'
import { List, ListItem, LoadingOverlay, UswdsIcon } from 'src/ui'
import { Layout, PageContent, Sidebar } from 'src/ui/Settings/Shared'
import { formatPageTitle } from 'src/utils/formatPageTitle'
import { useRedirectIfNotSignedIn } from 'src/utils/useRedirectIfNotSignedIn'
import './groups.css'

const GroupsPage: FC = () => {
  useRedirectIfNotSignedIn()
  const { data: groups, isLoading, error } = useGroups()

  return (
    <Layout>
      <Sidebar />
      <PageContent>
        <div className="heading-with-actions">
          <div>
            <h1>Groups</h1>
            <p>All of the groups can be found here</p>
          </div>
          <div>
            <Link to="/settings/groups/new" className="new-group-link">
              <UswdsIcon icon="GroupAdd" />
              <VisuallyHidden>New Group</VisuallyHidden>
            </Link>
          </div>
        </div>
        {error && <p>{error.message}</p>}
        {groups && (
          <List className="library-list">
            {groups.map((group) => (
              <ListItem key={group.id} className="library-item">
                <div className="library-name-container">
                  <Link to={`/settings/groups/${group.id}`} className="library-name">
                    {group.name}
                  </Link>
                </div>
                <p className="library-description">{group.description}</p>
              </ListItem>
            ))}
          </List>
        )}
        {isLoading && <LoadingOverlay description="Loading groups" />}
      </PageContent>
    </Layout>
  )
}

export default GroupsPage

export const Head: HeadFC = () => <title>{formatPageTitle('Groups')}</title>
