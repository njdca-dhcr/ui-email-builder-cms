import React, { FC, ReactNode } from 'react'
import copy from 'copy-to-clipboard'

interface Props {
  children: ReactNode
  textToCopy: () => string
}

export const CopyToClipboardButton: FC<Props> = ({ children, textToCopy }) => {
  return <button onClick={() => copy(textToCopy())}>{children}</button>
}
