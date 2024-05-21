import React, { FC, ReactNode } from 'react'
import { download } from 'src/utils/download'
import { useQuery } from '@tanstack/react-query'
import { useAuthedFetch } from 'src/network/useAuthedFetch'
import Config from '../../gatsby-config'

interface Props {
  children?: ReactNode
  fileName: string
  html: string
  page: string
}

export const ExportImageButton: FC<Props> = ({
  children,
  fileName,
  html,
  page
}) => {

  const authedFetch = useAuthedFetch('blob')

  const buttonHandler = () => {
    exportImage()
  }

  const queryFn = async () => {
    const response = await fetch(
      `${Config.siteMetadata?.backendUrl}/image-export`, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ html }),
      }
    )
    return await response.blob()
  }

  const exportImage = async () => {
    try {
      const imageBlob = await authedFetch({
        body: { html },
        method: 'POST',
        path: '/image-export',
      })
      download({ fileBlob: imageBlob, fileName: `${fileName}.png`, fileType: 'image/png' })
    } catch (error) {
      console.error('Error:', error)
      alert('Error exporting. Please try again.')
    }
  }

  return <button onClick={buttonHandler}>{children}</button>
}
