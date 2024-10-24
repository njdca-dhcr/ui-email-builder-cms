import React, { ReactNode, forwardRef } from 'react'
import copy from 'copy-to-clipboard'

interface Props {
  children: ReactNode
  textToCopy: () => string
  fieldsCompleted: () => boolean
}

export const CopyToClipboardButton = forwardRef<HTMLButtonElement, Props>(
  ({ children, textToCopy, fieldsCompleted, ...props }, ref) => {
    const clickHandler = () => {
      if (fieldsCompleted()) {
        copy(textToCopy())
      }
    }

    return (
      <button ref={ref} {...props} onClick={clickHandler}>
        {children}
      </button>
    )
  },
)
