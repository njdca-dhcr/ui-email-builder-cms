import React, { FC } from 'react'
import { Button, ButtonLike } from '../Button'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { UswdsIcon } from '../UswdsIcon'
import { Dialog } from '../Dialog'
import { LoadingOverlay } from '../LoadingOverlay'
import { Form } from '../Form'
import './DestroyDialog.css'

interface Props {
  trigger: string
  title: string
  description: string
  onDelete: () => Promise<void>
  loading: boolean
  loadingMessage: string
  errorMessage?: string
}

export const DestroyDialog: FC<Props> = ({
  trigger,
  title,
  description,
  onDelete,
  loading,
  loadingMessage,
  errorMessage,
}) => {
  return (
    <Dialog
      trigger={
        <ButtonLike className="destroy-dialog-trigger">
          <VisuallyHidden>{trigger}</VisuallyHidden>
          <UswdsIcon icon="Delete" />
        </ButtonLike>
      }
      title={title}
      description={description}
      contents={({ close }) => {
        return (
          <>
            <Form
              errorMessage={errorMessage}
              onSubmit={async () => {
                await onDelete()
                close()
              }}
            >
              <Button type="submit" className="destroy-dialog-delete-button">
                {trigger}
              </Button>
            </Form>
            {loading && <LoadingOverlay description={loadingMessage} />}
          </>
        )
      }}
    />
  )
}
