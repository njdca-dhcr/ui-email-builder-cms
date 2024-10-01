import { HeadFC, PageProps } from 'gatsby'
import capitalize from 'lodash.capitalize'
import React, { FC, useEffect, useState } from 'react'
import { useUpdateUser } from 'src/network/useUpdateUser'
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
  Form,
} from 'src/ui'
import { formatPageTitle } from 'src/utils/formatPageTitle'

export type Props = PageProps<null, null, null>
Form
const UserShowPage: FC<Props> = ({ params }) => {
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
                    <input type="submit" value="Save" />
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                  </Form>
                ) : (
                  <>
                    {capitalize(user.role)}{' '}
                    <button onClick={() => setIsEditing(true)}>Edit role</button>
                  </>
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
