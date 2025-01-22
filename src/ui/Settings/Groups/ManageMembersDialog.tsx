import React, { FC } from 'react'
import { WhiteButton } from 'src/ui/Button'
import { Dialog } from 'src/ui/Dialog'
import { ManageGroupMembersForm } from './ManageGroupMembersForm'
import { GroupShow } from 'src/network/groups'

interface Props {
  group: GroupShow
}

export const ManageMembersDialog: FC<Props> = ({ group }) => {
  const memberships = group.users.map((user) => ({ id: user.membershipId, userId: user.id }))
  return (
    <Dialog
      trigger={
        <WhiteButton>
          Add User <span aria-hidden>+</span>
        </WhiteButton>
      }
      title={`Manage ${group.name} Users`}
      description="Select the users you would like to be in this group"
      contents={({ close }) => {
        return (
          <ManageGroupMembersForm
            group={group}
            memberships={memberships}
            onCancel={close}
            onSuccess={close}
          />
        )
      }}
    />
  )
}
