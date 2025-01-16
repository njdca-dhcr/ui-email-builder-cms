import React, { FC, useState } from 'react'
import { CreateGroupErrorResponse, useCreateGroup } from 'src/network/groups'
import { LoadingOverlay } from 'src/ui/LoadingOverlay'
import { BlackButton, WhiteButton } from 'src/ui/Button'
import { Dialog } from 'src/ui/Dialog'
import { stringFromFormData } from 'src/utils/stringFromFormData'
import { Form, FormField } from 'src/ui/Form'

export const NewGroupDialog: FC = () => {
  const { error, mutateAsync, isPending } = useCreateGroup()
  const [validationErrors, setValidationErrors] = useState<
    CreateGroupErrorResponse['errors'] | null
  >(null)

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
        return (
          <>
            <Form
              className="new-group-form"
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
                error={validationErrors?.name}
                required
              />
              <FormField
                label="Description"
                id="description"
                name="description"
                error={validationErrors?.description}
                placeholder="Add your Group description here"
              />
              <div className="form-actions">
                <WhiteButton type="button" onClick={close}>
                  Cancel
                </WhiteButton>
                <BlackButton type="submit">Create</BlackButton>
              </div>
            </Form>
            {isPending && <LoadingOverlay description="Creating group" />}
          </>
        )
      }}
    />
  )
}
