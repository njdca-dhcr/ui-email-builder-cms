import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { HeadFC, Link, PageProps } from 'gatsby'
import React, { FC } from 'react'
import { useGroup } from 'src/network/groups'
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
  List,
  UswdsIcon,
} from 'src/ui'
import { DestroyGroup } from 'src/ui/GroupShow/DestroyGroup'
import { Actions } from 'src/ui/Layout'
import { formatPageTitle } from 'src/utils/formatPageTitle'
import { useCurrentRole } from 'src/utils/useCurrentRole'
import { useRedirectIfNotSignedIn } from 'src/utils/useRedirectIfNotSignedIn'

export type Props = PageProps<null, null, null>

const GroupShowPage: FC<Props> = ({ params }) => {
  useRedirectIfNotSignedIn()
  const { data: group, isLoading, error } = useGroup(params.id)
  const { isAdmin } = useCurrentRole()

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
              <Heading element="h1">Group</Heading>
              {error && <Paragraph>{error.message}</Paragraph>}
            </div>
            <Actions>
              <Link to={`/groups/${params.id}/edit`} className="new-group-link">
                <UswdsIcon icon="Edit" />
                <VisuallyHidden>Edit Group</VisuallyHidden>
              </Link>
              {group && isAdmin && <DestroyGroup group={group} />}
            </Actions>
          </div>

          {group && (
            <>
              <section className="group-attributes">
                <h2 className="group-name">{group.name}</h2>
                <Paragraph className="group-description">{group.description}</Paragraph>
              </section>
              <section className="group-members">
                <h3 className="members-heading">Members</h3>

                {group.users.length !== 0 ? (
                  <List className="user-list">
                    {group.users.map((user) => (
                      <li key={user.id} className="user-item">
                        <Link to={`/users/${user.id}`} className="user-email">
                          {user.email}
                        </Link>
                      </li>
                    ))}
                  </List>
                ) : (
                  <Paragraph>This group doesn't have any members yet.</Paragraph>
                )}
                <Link to={`/groups/${params.id}/add-member`} className="button">
                  Add Members to this Group
                </Link>
              </section>
            </>
          )}
          {isLoading && <LoadingOverlay description="Loading group" />}
        </SpacedContainer>
      </PageContent>
    </Layout>
  )
}

export default GroupShowPage

export const Head: HeadFC = () => <title>{formatPageTitle('Group Details')}</title>
