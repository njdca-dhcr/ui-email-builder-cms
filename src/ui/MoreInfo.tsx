import React, { FC, ReactNode } from 'react'
import { Dialog } from './Dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { UswdsIcon } from './UswdsIcon'
import './MoreInfo.css'

interface Props {
  children: ReactNode
  title: string
}

export const MoreInfo: FC<Props> = ({ children, title }) => {
  return (
    <Dialog
      trigger={
        <button className="more-info-button">
          <VisuallyHidden>More information about {title}</VisuallyHidden>
          <UswdsIcon icon="InfoOutline" />
        </button>
      }
      title={title}
      description={<VisuallyHidden>More information about {title}</VisuallyHidden>}
      contents={() => children}
    />
  )
}
