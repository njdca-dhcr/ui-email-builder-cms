import React, { FC, useState } from 'react'
import { EmailTemplate } from 'src/appTypes'
import { Button, ButtonLike, Dialog, Form, FormField, LoadingOverlay } from 'src/ui'
import { emailTemplateMergeDefaultValues } from './emailTemplateMergeDefaultValues'
import { stringFromFormData } from 'src/utils/stringFromFormData'
import { useEmailTemplateConfig } from 'src/templates/EmailTemplateConfig'
import { useEmailPartsContentData } from 'src/templates/EmailPartsContent'
import { usePreviewText } from 'src/templates/PreviewText'
import { DefaultError, UseMutateAsyncFunction } from '@tanstack/react-query'

interface ErrorJSON {
  errors: { name: string }
}

interface SuccessJSON {
  emailTemplate: { id: string }
}

interface Props {
  description: string
  errorMessage?: string
  loading: boolean
  loadingMessage: string
  mutate: UseMutateAsyncFunction<
    SuccessJSON | ErrorJSON | null | undefined,
    DefaultError,
    EmailTemplate.UniqueConfig
  >
  onSuccess?: (emailTemplate: { id: string }) => void
  submitButtonText: string
  title: string
  trigger: string
}

export const SaveEmailTemplateDialog: FC<Props> = ({
  description,
  errorMessage,
  loading,
  loadingMessage,
  mutate,
  onSuccess,
  submitButtonText,
  title,
  trigger,
}) => {
  const emailTemplate = useEmailTemplateConfig()
  const [emailPartsContentData] = useEmailPartsContentData()
  const [previewText] = usePreviewText()
  const [validationErrors, setValidationErrors] = useState<ErrorJSON['errors'] | null>(null)

  return (
    <Dialog
      trigger={<ButtonLike className="save-email-template-dialog-trigger">{trigger}</ButtonLike>}
      title={title}
      description={description}
      contents={({ close }) => (
        <>
          <Form
            errorMessage={errorMessage}
            onSubmit={async (event) => {
              setValidationErrors(null)
              const formData = new FormData(event.currentTarget)
              const result = await mutate({
                ...emailTemplateMergeDefaultValues(emailTemplate, emailPartsContentData),
                previewText,
                name: stringFromFormData(formData, 'name'),
                description: stringFromFormData(formData, 'description'),
              })

              if (result && 'errors' in result) {
                setValidationErrors(result.errors)
              } else if (result) {
                onSuccess && onSuccess(result.emailTemplate)
                close()
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
            <Button type="submit">{submitButtonText}</Button>
          </Form>
          {loading && <LoadingOverlay description={loadingMessage} />}
        </>
      )}
    />
  )
}
