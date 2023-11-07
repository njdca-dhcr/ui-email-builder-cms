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
    case 'ProgramName':
      return (
        <ControlWrapper>
          <ProgramNameControls {...props} />
        </ControlWrapper>
      )
    default:
      return null
  }
}
