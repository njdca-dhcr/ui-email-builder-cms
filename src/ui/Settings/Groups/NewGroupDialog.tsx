import React, { FC } from 'react'
import { BlackButton } from 'src/ui/Button'
import { Dialog } from 'src/ui/Dialog'
import { NewGroupForm } from './NewGroupForm'

export const NewGroupDialog: FC = () => {
  return (
    <Dialog
      trigger={
        <BlackButton>
          Add New Group <span>+</span>
        </BlackButton>
      }
      title="Create a New Group"
      description="Enter a name and description to create a group"
      contents={({ close }) => {
        return <NewGroupForm onCancel={close} />
      }}
    />
  )
}
