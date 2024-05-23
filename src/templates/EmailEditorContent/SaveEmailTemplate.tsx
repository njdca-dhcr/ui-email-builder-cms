import React, { FC, useState } from 'react'
import { Button } from 'src/ui/Button'
import { Dialog } from 'src/ui/Dialog'
import { Form, FormField } from 'src/ui/Form'
import { useEmailTemplateConfig } from '../EmailTemplateConfig'
import {
  CreateEmailTemplateErrorResponse,
  useCreateEmailTemplate,
} from 'src/network/useCreateEmailTemplate'
import { navigate } from 'gatsby'
import { LoadingOverlay } from 'src/ui/LoadingOverlay'
import { useEmailPartsContentData } from '../EmailPartsContent'
import { EmailTemplate } from 'src/appTypes'
import { usePreviewText } from '../PreviewText'

export const SaveEmailTemplate: FC = () => {
  const emailTemplate = useEmailTemplateConfig()
  const [emailPartsContentData] = useEmailPartsContentData()
  const [previewText] = usePreviewText()
  const [validationErrors, setValidationErrors] = useState<
    CreateEmailTemplateErrorResponse['errors'] | null
  >(null)
  const { error, mutateAsync, isPending } = useCreateEmailTemplate()

  return (
    <Dialog
      trigger={<Button>Save</Button>}
      title="Save Email Template"
      description="Save this email template to your library"
      contents={() => (
        <>
          <Form
            errorMessage={error?.message}
            onSubmit={async (event) => {
              setValidationErrors(null)
              const formData = new FormData(event.currentTarget)
              const result = await mutateAsync({
                ...emailTemplateMergeDefaultValues(emailTemplate, emailPartsContentData),
                previewText,
                name: stringFromFormData(formData, 'name'),
                description: stringFromFormData(formData, 'description'),
              })

              if (result && 'errors' in result) {
                setValidationErrors(result.errors)
              } else {
                navigate('/my-library')
              }
            }}
          >
            <FormField
              id="name"
              name="name"
              label="Name"
              required
              defaultValue={emailTemplate.name}
              error={validationErrors?.name}
            />
            <FormField
              id="description"
              name="description"
              label="Description"
              defaultValue={emailTemplate.description}
            />
            <Button type="submit">Save</Button>
          </Form>
          {isPending && <LoadingOverlay description="Creating email template" />}
        </>
      )}
    />
  )
}

const stringFromFormData = (formData: FormData, key: string): string => {
  const result = formData.get(key) ?? ''
  if (typeof result === 'string') {
    return result
  } else {
    throw new Error(`FormData contained a file for ${key} instead of a string`)
  }
}

export const emailTemplateMergeDefaultValues = (
  emailTemplate: EmailTemplate.UniqueConfig,
  emailPartsContentData: Record<string, any>,
): EmailTemplate.UniqueConfig => {
  return {
    ...emailTemplate,
    components: emailTemplate.components?.map((component) => ({
      ...component,
      defaultValue: emailPartsContentData[component.id] ?? component.defaultValue,
      subComponents: component.subComponents?.map((subComponent) => ({
        ...subComponent,
        defaultValue: emailPartsContentData[subComponent.id] ?? subComponent.defaultValue,
      })),
    })),
  }
}
