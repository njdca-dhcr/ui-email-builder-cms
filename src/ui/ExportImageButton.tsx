import React, { FC, ReactNode } from 'react'
import { download } from 'src/utils/download'
import { useAuthedFetch } from 'src/network/useAuthedFetch'
import { useExportImage } from 'src/network/useExportImage'

interface Props {
  children?: ReactNode
  fileName: string
  html: string
}

export const ExportImageButton: FC<Props> = ({ children, fileName, html }) => {
  const authedFetch = useAuthedFetch('blob', false)
  const { mutate, isPending } = useExportImage()

  const buttonHandler = () => {
    mutate(html, {
      onSuccess: (imageBlob) => {
        download({ fileBlob: imageBlob, fileName: `${fileName}.png`, fileType: 'image/png' })
      },
      onError: (error) => {
        console.error('error:', error)
      },
    })
  }

  return (
    <button disabled={isPending} onClick={buttonHandler}>
      {children}
    </button>
  )
}
