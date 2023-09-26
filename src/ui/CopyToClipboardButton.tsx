import React, { FC, ReactNode } from 'react'
import copy from 'copy-to-clipboard'
import { Button } from './Button'

interface Props {
  children: ReactNode
  className?: string
  textToCopy: () => string
}

export const CopyToClipboardButton: FC<Props> = ({ children, className, textToCopy }) => {
  return (
    <Button className={className} onClick={() => copy(textToCopy())}>
      {children}
    </Button>
  )
}
