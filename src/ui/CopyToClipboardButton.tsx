import React, { FC, ReactNode } from 'react'
import copy from 'copy-to-clipboard'

interface Props {
  children: ReactNode
  className?: string
  textToCopy: () => string
}

export const CopyToClipboardButton: FC<Props> = ({ children, className, textToCopy }) => {
  return (
    <button className={className} onClick={() => copy(textToCopy())}>
      {children}
    </button>
  )
}
