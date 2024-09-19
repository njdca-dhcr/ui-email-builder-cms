import React, { FC, ReactNode } from 'react'
import { download } from 'src/utils/download'
import { useExportImage } from 'src/network/useExportImage'
import { LoadingOverlay } from './LoadingOverlay'

interface Props {
  children?: ReactNode
  fileName: string
  html: string
}

export const ExportImageButton: FC<Props> = ({ children, fileName, html }) => {
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
    <>
      <button disabled={isPending} onClick={buttonHandler}>
        {children}
      </button>
      {isPending && <LoadingOverlay description="Loading your image" />}
    </>
  )
}
