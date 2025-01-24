import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { HeadFC, PageProps } from 'gatsby'
import React, { FC } from 'react'
import { useGroup } from 'src/network/groups'
import { LoadingOverlay, IndexList, IndexListItem } from 'src/ui'
import { DestroyMembership } from 'src/ui/DestroyDialog'
import { EditGroupDialog } from 'src/ui/Settings/Groups/EditGroupDialog'
import { ManageMembersDialog } from 'src/ui/Settings/Groups/ManageMembersDialog'
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
        <div className="settings-header groups">
          <h1>{group?.name ?? 'Group'}</h1>
          <p>{group?.description}</p>
          <div className="settings-actions">
            {isAdmin && group && <EditGroupDialog group={group} />}
          </div>
          <div className="additional-actions">
            {isAdmin && group && <ManageMembersDialog group={group} />}
          </div>
        </div>

        {error && <p>{error.message}</p>}
        {group && (
          <>
            <VisuallyHidden>
              <h2>Members</h2>
            </VisuallyHidden>

            {group.users.length !== 0 ? (
              <IndexList>
                {group.users.map((user) => (
                  <IndexListItem key={user.id}>
                    <div>
                      <div className="library-name-container member-email">
                        <span className="user-email">{user.email}</span>
                      </div>
                      <div className="group-members-list-item-role">{user.role}</div>
                    </div>
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
                  </IndexListItem>
                ))}
              </IndexList>
            ) : (
              <p>This group doesn't have any members yet.</p>
            )}
          </>
        )}
        {isLoading && <LoadingOverlay description="Loading group" />}
      </PageContent>
    </Layout>
  )
}

export default GroupShowPage

export const Head: HeadFC = () => <title>{formatPageTitle('Group Details')}</title>
