import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { HeadFC, Link, PageProps } from 'gatsby'
import React, { FC } from 'react'
import { useGroup } from 'src/network/groups'
import { LoadingOverlay, List, UswdsIcon, ListItem } from 'src/ui'
import { DestroyGroup, DestroyMembership } from 'src/ui/DestroyDialog'
import { Layout, PageContent, Sidebar } from 'src/ui/Settings/Shared'
import { formatPageTitle } from 'src/utils/formatPageTitle'
import { useCurrentRole } from 'src/utils/useCurrentRole'
import { useRedirectIfNotSignedIn } from 'src/utils/useRedirectIfNotSignedIn'

export type Props = PageProps<null, null, null>

const GroupShowPage: FC<Props> = ({ params }) => {
  useRedirectIfNotSignedIn()
  const { data: group, isLoading, error } = useGroup(params.id)
  const { isAdmin } = useCurrentRole()

  return (
    <Layout>
      <Sidebar />
      <PageContent>
        <div className="heading-with-actions">
          <div>
            <h1>Group</h1>
            {error && <p>{error.message}</p>}
          </div>
          <div>
            <Link to={`/settings/groups/${params.id}/edit`} className="new-group-link">
              <UswdsIcon icon="Edit" />
              <VisuallyHidden>Edit Group</VisuallyHidden>
            </Link>
            {group && isAdmin && <DestroyGroup group={group} />}
          </div>
        </div>

        {group && (
          <>
            <section className="group-attributes">
              <h2 className="group-name">{group.name}</h2>
              <p className="group-description">{group.description}</p>
            </section>
            <section className="group-members">
              <h3 className="members-heading">Members</h3>

              {group.users.length !== 0 ? (
                <List className="user-list">
                  {group.users.map((user) => (
                    <ListItem key={user.id} className="user-item">
                      <Link to={`/users/${user.id}`} className="user-email">
                        {user.email}
                      </Link>
                      {isAdmin && (
                        <DestroyMembership
                          group={group}
                          membership={{
                            id: user.membershipId,
                            groupId: group.id,
                            userId: user.id,
                          }}
                          user={user}
                        />
                      )}
                    </ListItem>
                  ))}
                </List>
              ) : (
                <p>This group doesn't have any members yet.</p>
              )}
              <Link to={`/settings/groups/${params.id}/add-member`} className="button">
                Add a Member to this Group
              </Link>
            </section>
          </>
        )}
        {isLoading && <LoadingOverlay description="Loading group" />}
      </PageContent>
    </Layout>
  )
}

export default GroupShowPage

export const Head: HeadFC = () => <title>{formatPageTitle('Group Details')}</title>
