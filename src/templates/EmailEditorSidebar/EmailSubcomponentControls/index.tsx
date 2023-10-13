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
import { LoginDetailsControls } from './LoginDetailsControls'

interface Props extends EmailSubComponentControlsProps {
  emailSubComponent: EmailTemplate.SubComponent<EmailTemplate.ComponentKind>
}

interface WrapperProps {
  children: React.ReactElement
}

const ControlWrapper: FC<WrapperProps> = ({ children }) => (
  <div className="subcomponent-control-wrapper">{children}</div>
)

export const EmailSubComponentControls: FC<Props> = ({ emailSubComponent, ...props }) => {
  const { componentId, id } = props
  const shouldShowComponent = useShouldShowEmailComponent(componentId)
  const shouldShowSubComponent = useShouldShowEmailSubComponent(componentId, id)

  if (shouldShowComponent.off || shouldShowSubComponent.off) return null

  switch (emailSubComponent.kind) {
    case 'RulesRightsRegulations':
      return (
        <ControlWrapper>
          <RulesRightsRegulationsControls {...props} />
        </ControlWrapper>
      )
    case 'Status':
      return (
        <ControlWrapper>
          <StatusControls {...props} />
        </ControlWrapper>
      )
    case 'Directive':
      return (
        <ControlWrapper>
          <DirectiveControls {...props} />
        </ControlWrapper>
      )
    case 'LoginDetails':
      return (
        <ControlWrapper>
          <LoginDetailsControls {...props} />
        </ControlWrapper>
      )
    default:
      return null
  }
}
