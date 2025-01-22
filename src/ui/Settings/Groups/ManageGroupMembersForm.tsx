import React, { FC } from 'react'
import { useBulkUpdateMemberships } from 'src/network/memberships'
import { useUsers } from 'src/network/users'
import { BlackButton, WhiteButton } from 'src/ui/Button'
import { Form } from 'src/ui/Form'
import { LoadingOverlay } from 'src/ui/LoadingOverlay'
import { stringsFromFormData } from 'src/utils/stringsFromFormData'
import { CheckedIcon } from './CheckedIcon'
import { UncheckedIcon } from './UncheckedIcon'

export interface Props {
  group: { id: string; name: string }
  memberships: { id: string; userId: string }[]
  onSuccess?: () => void
  onCancel?: () => void
}

const USERS_TO_ADD = 'users-to-add'

export const ManageGroupMembersForm: FC<Props> = ({ group, memberships, onCancel, onSuccess }) => {
  const { data: users, isLoading, error } = useUsers()
  const { mutateAsync, error: mutationError, isPending } = useBulkUpdateMemberships()

  return (
    <>
      <Form
        className="manage-group-members-form"
        errorMessage={error?.message ?? mutationError?.message}
        onSubmit={async (event) => {
          const formData = new FormData(event.currentTarget)
          const userIdsInGroup = stringsFromFormData(formData, USERS_TO_ADD)

          const userIdsToAdd = userIdsInGroup.filter(
            (id) => !memberships.some((membership) => id === membership.userId),
          )

          const membershipIdsToDelete = memberships
            .filter((membership) => !userIdsInGroup.includes(membership.userId))
            .map(({ id }) => id)

          await mutateAsync({ userIdsToAdd, groupId: group.id, membershipIdsToDelete })
          onSuccess && onSuccess()
        }}
      >
        <h3>Members</h3>
        <div className="checkboxes">
          {users?.map((user) => (
            <FormCheckbox
              key={user.id}
              userId={user.id}
              label={user.email}
              defaultChecked={memberships.some(({ userId }) => userId === user.id)}
            />
          ))}
        </div>
        <div className="form-actions">
          <WhiteButton type="button" onClick={onCancel}>
            Cancel
          </WhiteButton>
          <BlackButton type="submit">Save</BlackButton>
        </div>
      </Form>
      {isLoading && <LoadingOverlay description="Loading members form" />}
      {isPending && <LoadingOverlay description="Adding and removing members" />}
    </>
  )
}

interface FormCheckboxProps {
  userId: string
  label: string
  defaultChecked: boolean
}

const FormCheckbox: FC<FormCheckboxProps> = ({ userId, label, defaultChecked }) => {
  return (
    <div className="form-checkbox">
      <label htmlFor={userId}>{label}</label>

      <div className="checkbox-container">
        <UncheckedIcon />

        <div className="checked-icon-container">
          <CheckedIcon />
        </div>

        <input
          type="checkbox"
          id={userId}
          defaultChecked={defaultChecked}
          name={USERS_TO_ADD}
          value={userId}
        />
      </div>
    </div>
  )
}
