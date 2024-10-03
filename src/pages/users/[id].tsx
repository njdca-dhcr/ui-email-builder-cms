import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { HeadFC, PageProps } from 'gatsby'
import capitalize from 'lodash.capitalize'
import React, { FC, useEffect, useState } from 'react'
import { useUpdateUser } from 'src/network/useUpdateUser'
import { useUser } from 'src/network/useUser'
import {
  Button,
  ButtonLike,
  Heading,
  Layout,
  PageContent,
  Paragraph,
  Sidebar,
  SkipNavContent,
  SpacedContainer,
  SidebarNavigation,
  LoadingOverlay,
  Form,
  UswdsIcon,
} from 'src/ui'
import { formatPageTitle } from 'src/utils/formatPageTitle'
import { useRedirectIfNotSignedIn } from 'src/utils/useRedirectIfNotSignedIn'

export type Props = PageProps<null, null, null>

const UserShowPage: FC<Props> = ({ params }) => {
  useRedirectIfNotSignedIn()
  const [isEditing, setIsEditing] = useState(false)
  const { data: user, isLoading, error } = useUser(params.id)
  const [selectedRole, setSelectedRole] = useState(user?.role ?? 'member')
  const { isPending, error: mutationError, mutateAsync } = useUpdateUser(user?.id ?? '')

  useEffect(() => {
    if (user) {
      setSelectedRole(user.role)
    }
  }, [user])

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
              <div className="user-role">
                {isEditing ? (
                  <Form
                    errorMessage={mutationError?.message}
                    onSubmit={async () => {
                      await mutateAsync({
                        role: selectedRole,
                      })
                      setIsEditing(false)
                    }}
                  >
                    <label htmlFor="role-select">Role</label>
                    <select
                      id="role-select"
                      value={selectedRole}
                      onChange={(event) => setSelectedRole(event.target.value as any)}
                    >
                      <option value="admin">Admin</option>
                      <option value="member">Member</option>
                    </select>
                    <Button type="submit"> Save </Button>
                    <Button onClick={() => setIsEditing(false)} className="cancel-edit">
                      Cancel
                    </Button>
                  </Form>
                ) : (
                  <div>
                    {capitalize(user.role)}
                    <ButtonLike onClick={() => setIsEditing(true)}>
                      <UswdsIcon icon="Edit" /> <VisuallyHidden>Edit role</VisuallyHidden>
                    </ButtonLike>
                  </div>
                )}
              </div>
            </div>
          )}
          {isLoading && <LoadingOverlay description="Loading user" />}
          {isPending && <LoadingOverlay description="Updating user" />}
        </SpacedContainer>
      </PageContent>
    </Layout>
  )
}

export default UserShowPage

export const Head: HeadFC = () => <title>{formatPageTitle('User Details')}</title>
