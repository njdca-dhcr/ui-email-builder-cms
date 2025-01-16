import React, { FC, useState } from 'react'
import { useUpdateGroup, UpdateGroupErrorResponse } from 'src/network/groups'
import { LoadingOverlay } from 'src/ui/LoadingOverlay'
import { BlackButton, WhiteButton } from 'src/ui/Button'
import { Dialog } from 'src/ui/Dialog'
import { stringFromFormData } from 'src/utils/stringFromFormData'
import { Form, FormField } from 'src/ui/Form'
import { EditGroupIcon } from './EditGroupIcon'

interface Props {
  group: {
    id: string
    name: string
    description: string
  }
}

export const EditGroupDialog: FC<Props> = ({ group }) => {
  const { error, mutateAsync, isPending } = useUpdateGroup(group.id)
  const [validationErrors, setValidationErrors] = useState<
    UpdateGroupErrorResponse['errors'] | null
  >(null)

  return (
    <Dialog
      trigger={
        <BlackButton className="edit-group-button">
          Edit Group <EditGroupIcon />
        </BlackButton>
      }
      title="Edit Group"
      description="Enter a new name and/or description for the group"
      contents={({ close }) => {
        return (
          <>
            <Form
              className="edit-group-form"
              errorMessage={error?.message}
              onSubmit={async (event) => {
                setValidationErrors(null)
                const formData = new FormData(event.currentTarget)
                const result = await mutateAsync({
                  name: stringFromFormData(formData, 'name'),
                  description: stringFromFormData(formData, 'description'),
                })

                if (result && 'errors' in result) {
                  setValidationErrors(result.errors)
                } else {
                  close()
                }
              }}
            >
              <FormField
                label="Name"
                id="name"
                name="name"
                placeholder="Add your Group name here"
                defaultValue={group.name}
                error={validationErrors?.name}
                required
              />
              <FormField
                label="Description"
                id="description"
                name="description"
                defaultValue={group.description}
                error={validationErrors?.description}
                placeholder="Add your Group description here"
              />
              <div className="form-actions">
                <WhiteButton type="button" onClick={close}>
                  Cancel
                </WhiteButton>
                <BlackButton type="submit">Save</BlackButton>
              </div>
            </Form>
            {isPending && <LoadingOverlay description="Saving group" />}
          </>
        )
      }}
    />
  )
}
