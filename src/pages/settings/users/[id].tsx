import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { HeadFC, PageProps } from 'gatsby'
import capitalize from 'lodash.capitalize'
import React, { FC, useEffect, useState } from 'react'
import { useCurrentUser, useUpdateUser, useUser } from 'src/network/users'
import { Button, ButtonLike, LoadingOverlay, Form, UswdsIcon } from 'src/ui'
import { DestroyUser } from 'src/ui/DestroyDialog'
import { Layout, PageContent, Sidebar } from 'src/ui/Settings/Shared'
import { formatPageTitle } from 'src/utils/formatPageTitle'
import { useCurrentRole } from 'src/utils/useCurrentRole'
import { useRedirectIfNotSignedIn } from 'src/utils/useRedirectIfNotSignedIn'

export type Props = PageProps<null, null, null>

const UserShowPage: FC<Props> = ({ params }) => {
  useRedirectIfNotSignedIn()
  const { data: currentUser } = useCurrentUser()
  const { isAdmin } = useCurrentRole()
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
    <Layout>
      <Sidebar />
      <PageContent>
        <h1>User</h1>
        {error && <p>{error.message}</p>}

        {user && (
          <div key={user.id} className="user-item">
            <span className="user-email">
              {user.email}
              {isAdmin && currentUser!.id !== user.id && <DestroyUser user={user} />}
            </span>
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
                  {isAdmin && (
                    <ButtonLike onClick={() => setIsEditing(true)}>
                      <UswdsIcon icon="Edit" /> <VisuallyHidden>Edit role</VisuallyHidden>
                    </ButtonLike>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
        {isLoading && <LoadingOverlay description="Loading user" />}
        {isPending && <LoadingOverlay description="Updating user" />}
      </PageContent>
    </Layout>
  )
}

export default UserShowPage

export const Head: HeadFC = () => <title>{formatPageTitle('User Details')}</title>
