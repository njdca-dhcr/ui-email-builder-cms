import React, { FC } from 'react'
import { useDestroyEmailTemplate } from 'src/network/emailTemplates'
import { EmailTemplateIndexItem } from 'src/network/emailTemplates'
import { DestroyDialog } from './DestroyDialog'

interface DestroyEmailTemplateProps {
  emailTemplate: EmailTemplateIndexItem
}

export const DestroyEmailTemplate: FC<DestroyEmailTemplateProps> = ({ emailTemplate }) => {
  const { mutateAsync, isPending, error } = useDestroyEmailTemplate()

  return (
    <DestroyDialog
      trigger="Delete"
      title="Delete Email Template"
      description={`Are you sure you want to delete ${emailTemplate.name}?`}
      onDelete={async () => {
        await mutateAsync(emailTemplate.id)
      }}
      loading={isPending}
      loadingMessage="Deleting email template"
      errorMessage={error?.message}
    />
  )
}
