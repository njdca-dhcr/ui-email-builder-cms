import React, { FC } from 'react'
import { SaveEmailTemplateDialog } from './SaveEmailTemplateDialog'
import { useUpdateEmailTemplate } from 'src/network/emailTemplates'
import { useCurrentEmailTemplate } from 'src/utils/EmailTemplateState'

interface DialogProps {
  groups?: { id: string; name: string }[]
}

export const EmailTemplateUpdateDialog: FC<DialogProps> = ({ groups }) => {
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
      groups={groups}
    />
  )
}

/* NEED TO CHECK TO SEE IF API CAN HANDLE GROUP BEING SENT ON EMAIL TEMPLATE UPDATE */
