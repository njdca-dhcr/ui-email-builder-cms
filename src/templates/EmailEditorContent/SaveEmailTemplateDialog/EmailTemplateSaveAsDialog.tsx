import React, { FC } from 'react'
import { SaveEmailTemplateDialog } from './SaveEmailTemplateDialog'
import { useCreateEmailTemplate } from 'src/network/emailTemplates'
import { navigate } from 'gatsby'

interface DialogProps {
  groups?: { id: string; name: string }[]
}

export const EmailTemplateSaveAsDialog: FC<DialogProps> = ({ groups }) => {
  const { mutateAsync, isPending, error } = useCreateEmailTemplate()

  return (
    <SaveEmailTemplateDialog
      description="Create a new email template"
      loading={isPending}
      loadingMessage="Creating email template"
      mutate={mutateAsync}
      onSuccess={() => navigate('/my-drafts')}
      title="Save As"
      trigger="Save As"
      submitButtonText="Create"
      errorMessage={error?.message}
      groups={groups}
    />
  )
}
