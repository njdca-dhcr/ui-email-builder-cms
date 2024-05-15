import React, { FC } from 'react'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { RemoveScroll } from 'react-remove-scroll'
import './LoadingOverlay.css'
import { Alert } from './Alert'

interface Props {
  description: string
}

export const LoadingOverlay: FC<Props> = ({ description }) => {
  return (
    <RemoveScroll className="loading-overlay" removeScrollBar enabled>
      <div className="spinner" />
      <VisuallyHidden>
        <Alert>{description}</Alert>
      </VisuallyHidden>
    </RemoveScroll>
  )
}
