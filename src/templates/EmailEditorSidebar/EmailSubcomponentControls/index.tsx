import React, { FC } from 'react'
import { EmailSubComponentControlsProps } from './shared'
import { EmailTemplate } from 'src/appTypes'
import { StatusControls } from './StatusControls'
import { DirectiveControls } from './DirectiveControls'
import { RulesRightsRegulationsControls } from './RulesRightsRegulationsControls'
import './EmailSubcomponentControls.css'
import {
  useShouldShowEmailComponent,
  useShouldShowEmailSubComponent,
} from 'src/templates/ShouldShowEmailPart'

interface Props extends EmailSubComponentControlsProps {
  emailSubComponent: EmailTemplate.SubComponent<EmailTemplate.ComponentKind>
}

export const EmailSubComponentControls: FC<Props> = ({ emailSubComponent, ...props }) => {
  const { componentId, id } = props
  const shouldShowComponent = useShouldShowEmailComponent(componentId)
  const shouldShowSubComponent = useShouldShowEmailSubComponent(componentId, id)

  if (shouldShowComponent.off || shouldShowSubComponent.off) return null

  switch (emailSubComponent.kind) {
    case 'RulesRightsRegulations':
      return <RulesRightsRegulationsControls {...props} />
    case 'Status':
      return <StatusControls {...props} />
    case 'Directive':
      return <DirectiveControls {...props} />
    default:
      return null
  }
}
