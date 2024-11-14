import React, { FC, useEffect } from 'react'
import { EmailSubComponentControlsProps } from './shared'
import { EmailParts } from 'src/appTypes'
import { StatusControls } from './StatusControls'
import { DirectiveControls } from './DirectiveControls'
import { RulesRightsRegulationsControls } from './RulesRightsRegulationsControls'
import { useShouldShowEmailPart } from 'src/templates/ShouldShowEmailPart'
import { LoginDetailsControls } from './LoginDetailsControls'
import { ProgramNameControls } from './ProgramNameControls'
import { InformationalBoxControls } from './InformationalBoxControls'
import { SupplementalContentControls } from './SupplementalContentControls'
import './EmailSubcomponentControls.css'

interface Props extends EmailSubComponentControlsProps<EmailParts.Kinds.SubComponent> {
  component: EmailParts.Unique.Component
}

interface WrapperProps {
  children: React.ReactElement
}

const ControlWrapper: FC<WrapperProps> = ({ children }) => <div>{children}</div>

export const EmailSubComponentControls: FC<Props> = ({ emailSubComponent, ...props }) => {
  const { component } = props
  const shouldShowComponent = useShouldShowEmailPart(component)
  const shouldShowSubComponent = useShouldShowEmailPart(emailSubComponent)
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
    case 'SupplementalContent':
      ComponentControl = SupplementalContentControls
      break
    default:
      ComponentControl = null
  }

  return ComponentControl ? (
    <ControlWrapper>
      <ComponentControl emailSubComponent={emailSubComponent} {...props} />
    </ControlWrapper>
  ) : null
}

export const useSubComponentControlOptions = (
  emailSubComponent: EmailParts.Unique.SubComponent,
  value: any,
  setValue: (newValues: any) => void,
) => {
  useEffect(() => {
    const defaultValue = emailSubComponent.defaultValue ?? {}
    let options: any = {}

    if ('variant' in defaultValue) {
      options.variant = defaultValue.variant
    }
    if ('boxColor' in defaultValue) {
      options.boxColor = defaultValue.boxColor
    }
    if ('icon' in defaultValue) {
      options.icon = defaultValue.icon
    }

    setValue({ ...value, ...options })
  }, [])
}
