import React, { FC, useState } from 'react'
import { BlackButton } from 'src/ui/Button'
import { Dialog } from 'src/ui/Dialog'
import { NewGroupForm } from './NewGroupForm'
import { CreateGroupSuccessfulResponse } from 'src/network/groups'
import { ManageGroupMembersForm } from './ManageGroupMembersForm'
import { navigate } from 'gatsby'

export const NewGroupDialog: FC = () => {
  const [group, setGroup] = useState<CreateGroupSuccessfulResponse['group'] | null>(null)

  return (
    <Dialog
      trigger={
        <BlackButton>
          Add New Group <span>+</span>
        </BlackButton>
      }
      title={group ? `Manage ${group.name} Users` : 'Create a New Group'}
      description={
        group
          ? 'Select the users you would like to be in this group'
          : 'Enter a name and description to create a group'
      }
      contents={({ close }) => {
        return group ? (
          <ManageGroupMembersForm
            group={group}
            memberships={[]}
            onCancel={close}
            onSuccess={() => navigate(`/settings/groups/${group.id}`)}
          />
        ) : (
          <NewGroupForm onCancel={close} onSuccess={setGroup} />
        )
      }}
    />
  )
}
