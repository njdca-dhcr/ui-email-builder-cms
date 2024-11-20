import React, { FC } from 'react'
import { SaveEmailTemplateDialog } from './SaveEmailTemplateDialog'
import { useUpdateEmailTemplate } from 'src/network/emailTemplates'
import { useCurrentEmailTemplate } from 'src/utils/EmailTemplateState'

export const EmailTemplateUpdateDialog: FC = () => {
  const [emailTemplate, setCurrentEmailTemplate] = useCurrentEmailTemplate()
  const { mutateAsync, isPending, error } = useUpdateEmailTemplate(emailTemplate.id ?? '')

  return (
    <SaveEmailTemplateDialog
      description="Save your changes to this email template"
      loading={isPending}
      loadingMessage="Updating email template"
      mutate={mutateAsync}
      onSuccess={setCurrentEmailTemplate}
      title="Update"
      trigger="Update"
      submitButtonText="Update"
      errorMessage={error?.message}
    />
  )
}
