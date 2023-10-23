import React, { FC, ReactNode } from 'react'
import { download } from 'src/utils/download'

interface Props {
  children: ReactNode
  textToDownload: () => string
  fileName: string
}

export const DownloadButton: FC<Props> = ({ children, textToDownload, fileName }) => {
  return (
    <button onClick={() => download(textToDownload(), fileName, 'text/html')}>{children}</button>
  )
}
