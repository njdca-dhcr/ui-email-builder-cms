import React, { FC } from 'react'
import { Button } from 'src/ui/Button'
import { Dialog } from 'src/ui/Dialog'
import { Form, FormField } from 'src/ui/Form'
import { useEmailTemplateConfig } from '../EmailTemplateConfig'
import { useIsSignedIn } from 'src/utils/AuthContext'

export const SaveEmailTemplate: FC = () => {
  const emailTemplate = useEmailTemplateConfig()

  return (
    <Dialog
      trigger={<Button>Save</Button>}
      title="Save Email Template"
      description="Save this email template to your library"
      contents={() => (
        <Form
          onSubmit={() => {
            alert('tried to save')
          }}
        >
          <FormField id="name" label="Name" required defaultValue={emailTemplate.name} />
          <FormField
            id="description"
            label="Description"
            defaultValue={emailTemplate.description}
          />
          <Button type="submit">Save</Button>
        </Form>
      )}
    />
  )
}
