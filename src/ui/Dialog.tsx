import React, { FC, ReactNode } from 'react'
import { DialogOverlay, DialogContent } from '@reach/dialog'
import '@reach/dialog/styles.css'
import './Dialog.css'
import { VisuallyHidden } from '@reach/visually-hidden'
import { UswdsIcon } from './UswdsIcon'

interface Props {
  children?: ReactNode
  onClose: () => void
}

export const Dialog: FC<Props> = ({ children, onClose }) => {
  return (
    <DialogOverlay className="dialog-overlay" onDismiss={onClose}>
      <DialogContent className="dialog-content">
        <button onClick={onClose} className="dialog-close">
          <VisuallyHidden>Close</VisuallyHidden>
          <UswdsIcon icon="Close" />
        </button>
        {children}
      </DialogContent>
    </DialogOverlay>
  )
}
