import React, { FC, useState } from 'react'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import capitalize from 'lodash.capitalize'
import { LoadingOverlay } from '../LoadingOverlay'
import { BlackButton, ButtonLike, WhiteButton } from '../Button'
import { Dialog } from '../Dialog'
import { UsersIndex, useUpdateUser } from 'src/network/users'
import { EditIcon } from '../Svg'
import { Form } from '../Form'
import { Select } from '../Select'
import { USER_ROLES, UserRole } from 'src/appTypes'

interface Props {
  user: UsersIndex
}

export const EditUserDialog: FC<Props> = ({ user }) => {
  const [selectedRole, setSelectedRole] = useState(user.role)
  const { isPending, error, mutateAsync } = useUpdateUser(user.id)

  return (
    <Dialog
      trigger={
        <ButtonLike className="edit-user-button">
          <span>
            Edit User <VisuallyHidden>{user.email}</VisuallyHidden>
          </span>{' '}
          <EditIcon />
        </ButtonLike>
      }
      title="Edit User"
      contents={({ close }) => {
        return (
          <>
            <Form
              className="edit-user-dialog-form"
              errorMessage={error?.message}
              onSubmit={async (event) => {
                const result = await mutateAsync({
                  role: selectedRole,
                })

                if (result && 'errors' in result) {
                  console.error(result.errors)
                } else {
                  close()
                }
              }}
            >
              <div className="edit-user-dialog-form-fields">
                <span className="edit-user-dialog-email">{user.email}</span>
                <VisuallyHidden>
                  <label id="role">Role</label>
                </VisuallyHidden>
                <Select
                  labelId="role"
                  className="edit-user-select-role"
                  onChange={(value) => setSelectedRole(value as UserRole)}
                  options={USER_ROLES.map((role) => ({ label: capitalize(role), value: role }))}
                  name="role"
                  value={selectedRole}
                  align="end"
                  contentClassName="edit-user-select-role-content"
                  sideOffset={8}
                />
              </div>
              <div className="form-actions">
                <WhiteButton onClick={close}>Cancel</WhiteButton>
                <BlackButton type="submit">Save</BlackButton>
              </div>
            </Form>
            {isPending && <LoadingOverlay description="Updating User" />}
          </>
        )
      }}
    />
  )
}
