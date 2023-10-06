import React, { FC } from 'react'
import { EmailSubComponentControlsProps } from './shared'
import { EmailTemplate } from 'src/appTypes'
import { StatusControls } from './StatusControls'

interface Props extends EmailSubComponentControlsProps {
  emailSubComponent: EmailTemplate.SubComponent<EmailTemplate.ComponentKind>
}

export const EmailSubComponentControls: FC<Props> = ({ emailSubComponent, ...props }) => {
  switch (emailSubComponent.kind) {
    case 'Status':
      return <StatusControls {...props} />
    default:
      return null
  }
}
