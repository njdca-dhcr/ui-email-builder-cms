import React, { FC } from 'react'
import { EmailSubComponentControlsProps } from './shared'
import { EmailTemplate } from 'src/appTypes'
import { StatusControls } from './StatusControls'
import { DirectiveControls } from './DirectiveControls'
import { RulesRightsRegulationsControls } from './RulesRightsRegulationsControls'
import './EmailSubcomponentControls.css'
import { useShouldShowEmailPart } from 'src/templates/ShouldShowEmailPart'
import { LoginDetailsControls } from './LoginDetailsControls'
import { ProgramNameControls } from './ProgramNameControls'
import { InformationalBoxControls } from './InformationalBoxControls'

interface Props extends EmailSubComponentControlsProps {
  emailSubComponent: EmailTemplate.UniqueSubComponent
}

interface WrapperProps {
  children: React.ReactElement
}

const ControlWrapper: FC<WrapperProps> = ({ children }) => (
  <div className="subcomponent-control-wrapper">{children}</div>
)

export const EmailSubComponentControls: FC<Props> = ({ emailSubComponent, ...props }) => {
  const { componentId, id } = props
  const shouldShowComponent = useShouldShowEmailPart(componentId)
  const shouldShowSubComponent = useShouldShowEmailPart(id)
  let ComponentControl: FC<any> | null = null

  if (shouldShowComponent.off || shouldShowSubComponent.off) return null

  switch (emailSubComponent.kind) {
    case 'RulesRightsRegulations':
      ComponentControl = RulesRightsRegulationsControls
      break
    case 'Status':
      ComponentControl = StatusControls
      break
    case 'Directive':
      ComponentControl = DirectiveControls
      break
    case 'LoginDetails':
      ComponentControl = LoginDetailsControls
      break
    case 'ProgramName':
      ComponentControl = ProgramNameControls
      break
    case 'InformationalBox':
      ComponentControl = InformationalBoxControls
      break
    default:
      ComponentControl =  null
  }

  return ComponentControl ? <ControlWrapper><ComponentControl {...props} /></ControlWrapper> : null
}
