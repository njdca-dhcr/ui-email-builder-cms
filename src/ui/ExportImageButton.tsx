import React, { ReactNode, forwardRef } from 'react'
import { download } from 'src/utils/download'
import { useExportImage } from 'src/network/useExportImage'
import { LoadingOverlay } from './LoadingOverlay'

interface Props {
  children?: ReactNode
  fileName: string
  html: string
}

export const ExportImageButton = forwardRef<HTMLButtonElement, Props>(
  ({ children, fileName, html, ...props }, ref) => {
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
        <button {...props} disabled={isPending} onClick={buttonHandler} ref={ref}>
          {children}
        </button>
        {isPending && <LoadingOverlay description="Loading your image" />}
      </>
    )
  },
)
