import React, { FC } from 'react'
import { Button, ButtonLike, WhiteButton } from '../Button'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Dialog } from '../Dialog'
import { LoadingOverlay } from '../LoadingOverlay'
import { Form } from '../Form'
import { DeleteIcon } from '../Svg/DeleteIcon'
import './DestroyDialog.css'
import { Paragraph } from '../Layout'

interface Props {
  trigger: string
  title: string
  description: string
  subject?: string
  comment?: string
  onDelete: () => Promise<void>
  loading: boolean
  loadingMessage: string
  errorMessage?: string
}

export const DestroyDialog: FC<Props> = ({
  trigger,
  title,
  description,
  subject,
  comment,
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
          <DeleteIcon />
        </ButtonLike>
      }
      title={title}
      description={description}
      contents={({ close }) => {
        return (
          <>
            <Paragraph>Are you sure you want to delete</Paragraph>
            {subject && <Paragraph className="destroy-dialog-subject">{subject}</Paragraph>}
            <Paragraph>from the platform?</Paragraph>
            <Paragraph className="destroy-dialog-warning">This action cannot be undone.</Paragraph>
            {comment && <Paragraph className="destroy-dialog-comment">{comment}</Paragraph>}
            <Form
              className="destroy-dialog-form"
              errorMessage={errorMessage}
              onSubmit={async () => {
                await onDelete()
                close()
              }}
            >
              <WhiteButton type="button" onClick={close} className="destroy-dialog-cancel-button">
                Cancel
              </WhiteButton>
              <Button type="submit" className="destroy-dialog-delete-button">
                {trigger} <DeleteIcon />
              </Button>
            </Form>
            {loading && <LoadingOverlay description={loadingMessage} />}
          </>
        )
      }}
    />
  )
}
