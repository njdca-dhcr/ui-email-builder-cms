import React, { FC, useState } from 'react'
import {
  CreateGroupErrorResponse,
  CreateGroupSuccessfulResponse,
  useCreateGroup,
} from 'src/network/groups'
import { BlackButton, WhiteButton } from 'src/ui/Button'
import { Form, FormField } from 'src/ui/Form'
import { LoadingOverlay } from 'src/ui/LoadingOverlay'
import { stringFromFormData } from 'src/utils/stringFromFormData'

export interface Props {
  onCancel: () => void
  onSuccess: (group: CreateGroupSuccessfulResponse['group']) => void
}

export const NewGroupForm: FC<Props> = ({ onCancel, onSuccess }) => {
  const { error, mutateAsync, isPending } = useCreateGroup()
  const [validationErrors, setValidationErrors] = useState<
    CreateGroupErrorResponse['errors'] | null
  >(null)

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
          } else if (result) {
            onSuccess(result.group)
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
          <WhiteButton type="button" onClick={onCancel}>
            Cancel
          </WhiteButton>
          <BlackButton type="submit">Create</BlackButton>
        </div>
      </Form>
      {isPending && <LoadingOverlay description="Creating group" />}
    </>
  )
}
