import { HeadFC, navigate, PageProps } from 'gatsby'
import React, { FC, useState } from 'react'
import { useGroup } from 'src/network/groups'
import {
  useMembershipsForGroup,
  useCreateMembership,
  CreateMembershipErrorResponse,
} from 'src/network/memberships'
import { UsersIndex, useUsers, UserShow } from 'src/network/users'
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
  Button,
  Select,
} from 'src/ui'
import { formatPageTitle } from 'src/utils/formatPageTitle'
import { useRedirectIfNotAdmin } from 'src/utils/useRedirectIfNotAdmin'

export type Props = PageProps<null, null, null>

const AddGroupMemberPage: FC<Props> = ({ params }) => {
  useRedirectIfNotAdmin()
  const [validationErrors, setValidationErrors] = useState<
    CreateMembershipErrorResponse['errors'] | null
  >(null)
  const { data: group, isLoading, error } = useGroup(params.id)
  const { data: users, isLoading: usersLoading, error: usersError } = useUsers()
  const {
    data: members,
    isLoading: membersLoading,
    error: membersError,
  } = useMembershipsForGroup(params.id)
  const { isPending, error: mutationError, mutateAsync } = useCreateMembership()
  const [selectedUser, setSelectedUser] = useState<string>('')
  let nonMemberUsers: UsersIndex[] = []

  const inMembership = (user: UserShow): boolean => {
    return !members?.find((member) => member.id === user.id)
  }

  if (users && members) {
    nonMemberUsers = users.filter((user) => {
      const userNotInMembership = inMembership(user)
      return userNotInMembership
    })
  }

  return (
    <Layout element="div">
      <Sidebar>
        <SidebarNavigation />
      </Sidebar>
      <PageContent element="main">
        <SkipNavContent />
        <SpacedContainer>
          <Heading element="h1">Add Member to Group</Heading>
          {[error, usersError, membersError].map(
            (error) => error && <Paragraph>{error.message}</Paragraph>,
          )}
          {group && users && members && (
            <Form
              className="add-member-form"
              onSubmit={async () => {
                if (!selectedUser) {
                  setValidationErrors({ user: 'is required' })
                  return
                }
                setValidationErrors(null)
                const result = await mutateAsync({
                  groupId: params.id,
                  userId: selectedUser,
                })

                if (result && 'errors' in result) {
                  setValidationErrors(result.errors)
                } else {
                  navigate(`/groups/${params.id}`)
                }
              }}
              errorMessage={mutationError?.message}
            >
              <label id="add-member-label">Select member to add</label>
              <Select
                labelId="add-member-label"
                onChange={(value) => {
                  setSelectedUser(value)
                }}
                value={selectedUser}
                options={nonMemberUsers.map((user) => ({ label: user.email, value: user.id }))}
              />
              {validationErrors && (
                <div className="error-messages">
                  {validationErrors?.user && <p id="user-error">{validationErrors.user}</p>}
                  {validationErrors?.group && <p id="group-error">{validationErrors.group}</p>}
                </div>
              )}

              <div className="group-edit-action-buttons">
                <Button type="submit">Add Member</Button>
                <Button
                  type="button"
                  className="cancel-edit"
                  onClick={() => navigate(`/groups/${params.id}`)}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          )}
          {(isLoading || usersLoading || membersLoading) && (
            <LoadingOverlay description="Loading group" />
          )}
          {isPending && <LoadingOverlay description="Updating group members" />}
        </SpacedContainer>
      </PageContent>
    </Layout>
  )
}

export default AddGroupMemberPage

export const Head: HeadFC = () => <title>{formatPageTitle('Add Group Member')}</title>
