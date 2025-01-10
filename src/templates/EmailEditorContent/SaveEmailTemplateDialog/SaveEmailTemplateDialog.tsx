import React, { FC, useState } from 'react'
import uniq from 'lodash.uniq'
import { EmailTemplate } from 'src/appTypes'
import { Button, ButtonLike, Dialog, Form, FormField, LoadingOverlay, Select } from 'src/ui'
import { mergeEmailTemplateValues } from './emailTemplateMergeDefaultValues'
import { stringFromFormData } from 'src/utils/stringFromFormData'
import { useEmailPartsContentData } from 'src/templates/EmailPartsContent'
import { usePreviewText } from 'src/templates/PreviewText'
import { DefaultError, UseMutateAsyncFunction } from '@tanstack/react-query'
import { FormFieldArea } from 'src/ui/Form'
import { useCurrentEmailTemplate, useCurrentLanguage } from 'src/utils/EmailTemplateState'
import { EmailTemplateShow } from 'src/network/emailTemplates'
import { currentTimestamp } from 'src/utils/currentTimestamp'
import { applyTranslationStructures } from 'src/utils/applyTranslationStructures'
import { group } from 'console'

interface ErrorJSON {
  errors: { name: string }
}

interface SuccessJSON {
  emailTemplate: EmailTemplateShow
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
  onSuccess?: (emailTemplate: EmailTemplateShow) => void
  submitButtonText: string
  title: string
  trigger: string
  groups?: { id: string; name: string }[]
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
  groups,
}) => {
  const [emailTemplate] = useCurrentEmailTemplate()
  const [language] = useCurrentLanguage()
  const [emailPartsContentData] = useEmailPartsContentData()
  const [previewText] = usePreviewText()
  const [validationErrors, setValidationErrors] = useState<ErrorJSON['errors'] | null>(null)
  const [groupId, setGroupId] = useState<string>(emailTemplate.groupId || ' ')

  let groupOptions = []
  if (groups && groups.length > 0) {
    groupOptions.push({ label: 'None', value: ' ' })
    groupOptions.push(...groups?.map(({ id, name }) => ({ label: name, value: id })))
  }

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
                applyTranslationStructures(
                  mergeEmailTemplateValues({
                    previewText,
                    emailTemplate: { ...emailTemplate, versionTimestamp: currentTimestamp() },
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
                    groupId: groupId.trim(),
                  }),
                ),
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

            {groupOptions.length > 0 && (
              <div className="form-field">
                <div className="label-container">
                  <label id="group-select">Group</label>
                </div>
                <Select
                  labelId="group-select"
                  onChange={(value) => {
                    setGroupId(value)
                  }}
                  options={groupOptions}
                  name="groupId"
                  value={groupId}
                />
              </div>
            )}
            <Button type="submit">{submitButtonText}</Button>
          </Form>
          {loading && <LoadingOverlay description={loadingMessage} />}
        </>
      )}
    />
  )
}
