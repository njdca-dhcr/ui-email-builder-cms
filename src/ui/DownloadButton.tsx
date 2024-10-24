import React, { ReactNode, forwardRef } from 'react'
import { download } from 'src/utils/download'

interface Props {
  children: ReactNode
  textToDownload: () => string
  fileName: string
  fieldsCompleted: () => boolean
}

export const DownloadButton = forwardRef<HTMLButtonElement, Props>(
  ({ children, textToDownload, fileName, fieldsCompleted, ...props }, ref) => {
    const clickHandler = () => {
      if (fieldsCompleted()) {
        download({ fileData: textToDownload(), fileName, fileType: 'text/html' })
      }
    }

    return (
      <button {...props} ref={ref} onClick={clickHandler}>
        {children}
      </button>
    )
  },
)
