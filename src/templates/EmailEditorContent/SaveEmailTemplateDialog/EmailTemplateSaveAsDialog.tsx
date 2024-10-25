import React, { FC } from 'react'
import { SaveEmailTemplateDialog } from './SaveEmailTemplateDialog'
import { useCreateEmailTemplate } from 'src/network/emailTemplates'
import { navigate } from 'gatsby'

export const EmailTemplateSaveAsDialog: FC = () => {
  const { mutateAsync, isPending, error } = useCreateEmailTemplate()

  return (
    <SaveEmailTemplateDialog
      description="Create a new email template"
      loading={isPending}
      loadingMessage="Creating email template"
      mutate={mutateAsync}
      onSuccess={() => navigate('/my-library')}
      title="Save As"
      trigger="Save As"
      submitButtonText="Create"
      errorMessage={error?.message}
    />
  )
}
