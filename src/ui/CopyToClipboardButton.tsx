import React, { ReactNode, forwardRef } from 'react'
import copy from 'copy-to-clipboard'

interface Props {
  children: ReactNode
  textToCopy: () => string
  shouldCopy: () => boolean
}

export const CopyToClipboardButton = forwardRef<HTMLButtonElement, Props>(
  ({ children, textToCopy, shouldCopy, ...props }, ref) => {
    const clickHandler = () => {
      if (shouldCopy()) {
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
