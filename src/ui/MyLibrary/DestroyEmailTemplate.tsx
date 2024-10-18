import React, { FC } from 'react'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { useDestroyEmailTemplate } from 'src/network/emailTemplates'
import { EmailTemplateIndex } from 'src/network/emailTemplates'
import { Dialog, Form, LoadingOverlay, ButtonLike, Button, UswdsIcon } from 'src/ui'

interface DestroyEmailTemplateProps {
  emailTemplate: EmailTemplateIndex
}

export const DestroyEmailTemplate: FC<DestroyEmailTemplateProps> = ({ emailTemplate }) => {
  const { mutateAsync, isPending, error } = useDestroyEmailTemplate()

  return (
    <Dialog
      trigger={
        <ButtonLike className="delete-trigger">
          <VisuallyHidden>Delete</VisuallyHidden>
          <UswdsIcon icon="Delete" />
        </ButtonLike>
      }
      title="Delete Email Template"
      description={`Are you sure you want to delete ${emailTemplate.name}?`}
      contents={({ close }) => (
        <>
          <Form
            className="destroy-email-template-form"
            errorMessage={error?.message}
            onSubmit={async () => {
              await mutateAsync(emailTemplate.id)
              close()
            }}
          >
            <Button type="submit" className="delete-button">
              Delete
            </Button>
          </Form>
          {isPending && <LoadingOverlay description="Deleting email template" />}
        </>
      )}
    />
  )
}
