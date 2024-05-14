import React, { FC, ReactNode } from 'react'
import { download } from 'src/utils/download'
import Config from '../../gatsby-config'

interface Props {
  children?: ReactNode
  html: string
  fileName: string
  fieldsCompleted: () => boolean
}

export const ExportImageButton: FC<Props> = ({
  fieldsCompleted,
  html,
  fileName,
  children
}) => {
  const buttonHandler = () => {
    if (fieldsCompleted()) {
      exportImage()
    }
  }

  const exportImage = async () => {
    try {
      const response = await fetch(`${Config.siteMetadata?.backendUrl}/image-export`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ html })
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