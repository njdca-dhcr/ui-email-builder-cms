import React, { FC, ReactNode } from 'react'
import { download } from 'src/utils/download'

interface Props {
  children: ReactNode
  textToDownload: () => string
  fileName: string
  fieldsCompleted: () => boolean
}

export const DownloadButton: FC<Props> = ({
  children,
  textToDownload,
  fileName,
  fieldsCompleted,
}) => {
  const clickHandler = () => {
    if (fieldsCompleted()) {
      download({ fileData: textToDownload(), fileName, fileType: 'text/html' })
    }
  }

  return <button onClick={clickHandler}>{children}</button>
}
