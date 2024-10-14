import React, { FC, ReactElement, ReactNode, useCallback, useState } from 'react'
import classNames from 'classnames'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Content, Description, Overlay, Portal, Root, Title, Trigger } from '@radix-ui/react-dialog'
import { UswdsIcon } from './UswdsIcon'
import './Dialog.css'

export interface DialogProps {
  contents: (options: { close: () => void }) => ReactNode
  description: ReactElement | string
  descriptionClassName?: string
  title: string
  titleClassName?: string
  trigger: ReactElement
}

export const Dialog: FC<DialogProps> = ({
  contents,
  description,
  descriptionClassName,
  title,
  titleClassName,
  trigger,
}) => {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [setOpen])

  return (
    <Root open={open} onOpenChange={setOpen}>
      <Trigger asChild>{trigger}</Trigger>
      <Portal>
        <Overlay className="dialog-overlay" />
        <Content className="dialog-content">
          <button className="dialog-close" onClick={close}>
            <VisuallyHidden>Close</VisuallyHidden>
            <UswdsIcon icon="Close" />
          </button>
          <Title className={classNames('dialog-title', titleClassName)}>{title}</Title>
          <Description className={classNames('dialog-description', descriptionClassName)}>
            {description}
          </Description>
          {contents({ close })}
        </Content>
      </Portal>
    </Root>
  )
}
