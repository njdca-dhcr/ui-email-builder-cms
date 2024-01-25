import React, { FC, ReactNode } from 'react'
import copy from 'copy-to-clipboard'

interface Props {
  children: ReactNode
  textToCopy: () => string
  fieldsCompleted: () => boolean
}

export const CopyToClipboardButton: FC<Props> = ({ children, textToCopy, fieldsCompleted }) => {
  const clickHandler = () => {
    if (fieldsCompleted()) {
      copy(textToCopy())
    }
  }

  return <button onClick={clickHandler}>{children}</button>
}
