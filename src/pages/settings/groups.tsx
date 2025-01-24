import { HeadFC, Link } from 'gatsby'
import React, { FC } from 'react'
import { useGroups } from 'src/network/groups'
import { IndexList, IndexListItem, LoadingOverlay } from 'src/ui'
import { DestroyGroup } from 'src/ui/DestroyDialog'
import { Layout, PageContent, Sidebar } from 'src/ui/Settings/Shared'
import { formatPageTitle } from 'src/utils/formatPageTitle'
import { useRedirectIfNotSignedIn } from 'src/utils/useRedirectIfNotSignedIn'
import { NewGroupDialog } from 'src/ui/Settings/Groups/NewGroupDialog'
import './groups.css'

const GroupsPage: FC = () => {
  useRedirectIfNotSignedIn()
  const { data: groups, isLoading, error } = useGroups()

  return (
    <Layout>
      <Sidebar />
      <PageContent>
        <div className="settings-header groups">
          <h1>Groups</h1>
          <p>All of the groups can be found here</p>
          <div className="settings-actions">
            <NewGroupDialog />
          </div>
        </div>
        {error && <p>{error.message}</p>}
        {groups && (
          <IndexList>
            {groups.map((group) => (
              <IndexListItem key={group.id}>
                <div>
                  <div className="library-name-container group-name">
                    <Link to={`/settings/groups/${group.id}`} className="library-name">
                      {group.name}
                    </Link>
                  </div>
                  <p className="library-description">{group.description}</p>
                  <div className="list-item-group-members">
                    {group.members.map((member) => member.email).join(', ')}
                  </div>
                </div>
                <DestroyGroup group={group} />
              </IndexListItem>
            ))}
          </IndexList>
        )}
        {isLoading && <LoadingOverlay description="Loading groups" />}
      </PageContent>
    </Layout>
  )
}

export default GroupsPage

export const Head: HeadFC = () => <title>{formatPageTitle('Groups')}</title>
