import React, { FC, ReactNode } from 'react'
import { download } from 'src/utils/download'
import Config from '../../gatsby-config'

interface Props {
  children?: ReactNode
  html: string
  fileName: string
}

export const ExportImageButton: FC<Props> = ({
  html,
  fileName,
  children
}) => {
  const buttonHandler = () => {
    exportImage()
  }

  const exportImage = async () => {
    // change to useRequest once it's merged
    try {
      const response = await fetch(`${Config.siteMetadata?.backendUrl}/image-export`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ html }),
      })
      const imageBlob = await response.blob()
      download({ fileBlob: imageBlob, fileName: `${fileName}.png`, fileType: 'image/png' })
    } catch (error) {
      console.error('Error:', error)
      alert('Error exporting. Please try again.')
    }
  }

  return <button onClick={buttonHandler}>{children}</button>
}
