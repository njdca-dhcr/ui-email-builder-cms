import React, { FC } from 'react'
import { EmailSubComponentControlsProps } from './shared'
import { EmailTemplate } from 'src/appTypes'
import { StatusControls } from './StatusControls'
import { DirectiveControls } from './DirectiveControls'

interface Props extends EmailSubComponentControlsProps {
  emailSubComponent: EmailTemplate.SubComponent<EmailTemplate.ComponentKind>
}

export const EmailSubComponentControls: FC<Props> = ({ emailSubComponent, ...props }) => {
  switch (emailSubComponent.kind) {
    case 'Status':
      return <StatusControls {...props} />
    case 'Directive':
      return <DirectiveControls {...props} />
    default:
      return null
  }
}
