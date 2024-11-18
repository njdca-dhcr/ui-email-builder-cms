import React, { FC, useState } from 'react'
import uniq from 'lodash.uniq'
import { EmailTemplate } from 'src/appTypes'
import { Button, ButtonLike, Dialog, Form, FormField, LoadingOverlay } from 'src/ui'
import { mergeEmailTemplateValues } from './emailTemplateMergeDefaultValues'
import { stringFromFormData } from 'src/utils/stringFromFormData'
import { useEmailTemplateConfig } from 'src/templates/EmailTemplateConfig'
import { useEmailPartsContentData } from 'src/templates/EmailPartsContent'
import { usePreviewText } from 'src/templates/PreviewText'
import { DefaultError, UseMutateAsyncFunction } from '@tanstack/react-query'
import { FormFieldArea } from 'src/ui/Form'
import { useCurrentLanguage } from 'src/templates/CurrentLanguage'

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
    EmailTemplate.Unique.Config
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
  const [language] = useCurrentLanguage()
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
              const result = await mutate(
                mergeEmailTemplateValues({
                  previewText,
                  emailTemplate,
                  data: emailPartsContentData,
                  name: stringFromFormData(formData, 'name'),
                  language,
                  description: stringFromFormData(formData, 'description'),
                  tagNames: uniq(
                    stringFromFormData(formData, 'tagNames')
                      .split(',')
                      .map((name) => name.trim())
                      .filter(Boolean),
                  ),
                }),
              )

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
            <FormFieldArea
              id="description"
              name="description"
              label="Description"
              defaultValue={emailTemplate.description}
            />
            <FormField
              id="tag-names"
              name="tagNames"
              label="Tags"
              defaultValue={emailTemplate.tags?.map((tag) => tag.name).join(', ')}
              description="Separate tags with commas"
            />

            <Button type="submit">{submitButtonText}</Button>
          </Form>
          {loading && <LoadingOverlay description={loadingMessage} />}
        </>
      )}
    />
  )
}
