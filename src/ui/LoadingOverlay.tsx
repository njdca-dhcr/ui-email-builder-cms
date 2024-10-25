import React, { FC } from 'react'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { RemoveScroll } from 'react-remove-scroll'
import './LoadingOverlay.css'
import { Alert } from './Alert'
import { useDidMount } from 'src/utils/useDidMount'

interface Props {
  description: string
}

export const LoadingOverlay: FC<Props> = ({ description }) => {
  const mounted = useDidMount()

  if (!mounted) return null

  return (
    <RemoveScroll className="loading-overlay" removeScrollBar enabled>
      <div className="spinner" />
      <VisuallyHidden>
        <Alert>{description}</Alert>
      </VisuallyHidden>
    </RemoveScroll>
  )
}
