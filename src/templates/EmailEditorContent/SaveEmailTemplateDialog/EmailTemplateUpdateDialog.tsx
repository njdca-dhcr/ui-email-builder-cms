import React, { FC } from 'react'
import { SaveEmailTemplateDialog } from './SaveEmailTemplateDialog'
import { useUpdateEmailTemplate } from 'src/network/emailTemplates'
import { useEmailTemplateConfig } from 'src/templates/EmailTemplateConfig'

export const EmailTemplateUpdateDialog: FC = () => {
  const emailTemplate = useEmailTemplateConfig()
  const { mutateAsync, isPending, error } = useUpdateEmailTemplate(emailTemplate.id ?? '')

  return (
    <SaveEmailTemplateDialog
      description="Save your changes to this email template"
      loading={isPending}
      loadingMessage="Updating email template"
      mutate={mutateAsync}
      title="Update"
      trigger="Update"
      submitButtonText="Update"
      errorMessage={error?.message}
    />
  )
}
