import React, { FC, ReactNode, useState } from 'react'
import { Dialog } from './Dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { UswdsIcon } from './UswdsIcon'
import './MoreInfo.css'

interface Props {
  children: ReactNode
  title: string
}

export const MoreInfo: FC<Props> = ({ children, title }) => {
  const [showDialog, setShowDialog] = useState(false)

  return (
    <>
      <button onClick={() => setShowDialog(true)} className="more-info-button">
        <VisuallyHidden>More information about {title}</VisuallyHidden>
        <UswdsIcon icon="InfoOutline" />
      </button>
      {showDialog && (
        <Dialog onClose={() => setShowDialog(false)}>
          <h2 className="more-info-title">{title}</h2>
          {children}
        </Dialog>
      )}
    </>
  )
}
