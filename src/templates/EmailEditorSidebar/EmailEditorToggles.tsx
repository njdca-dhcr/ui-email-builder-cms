import React, { FC, ReactNode } from 'react'
import { List } from 'src/ui/List'
import { Toggle } from 'src/ui/Toggle'
import './EmailEditorToggles.css'
import { useShouldShowEmailComponent, useShouldShowEmailSubComponent } from '../ShouldShowEmailPart'
import { buildComponentKey, buildSubComponentKey } from 'src/utils/emailPartKeys'

interface EmailEditorTogglesProps {
  children: ReactNode
}

export const EmailEditorToggles: FC<EmailEditorTogglesProps> = ({ children }) => {
  return <List className="email-editor-toggles">{children}</List>
}

interface EmailEditorToggleSectionProps {
  children: ReactNode
  description?: string
  componentId: string
  label: string
  required?: boolean
}

export const EmailEditorToggleSection: FC<EmailEditorToggleSectionProps> = ({
  children,
  componentId,
  description,
  label,
  required,
}) => {
  const shouldShow = useShouldShowEmailComponent(componentId)
  const id = `toggle-${buildComponentKey(componentId)}`

  return (
    <li className="email-editor-toggle-section">
      <div className="label-and-toggle">
        <label htmlFor={id} className="section-label">
          {label}
        </label>
        {!required && <Toggle id={id} onChange={shouldShow.toggle} value={shouldShow.on} />}
      </div>
      {description && <p className="description">{description}</p>}
      {children && <List className="email-editor-sub-toggles">{children}</List>}
    </li>
  )
}

interface EmailEditorToggleProps {
  componentId: string
  description?: string
  disabled?: boolean
  label: string
  subComponentId: string
}

export const EmailEditorToggle: FC<EmailEditorToggleProps> = ({
  componentId,
  description,
  disabled,
  subComponentId,
  label,
}) => {
  const shouldShowComponent = useShouldShowEmailComponent(componentId)
  const shouldShow = useShouldShowEmailSubComponent(componentId, subComponentId)
  const id = `toggle-${buildSubComponentKey(componentId, subComponentId)}`

  return (
    <li className="email-editor-toggle">
      <div className="label-and-toggle">
        <label htmlFor={id} className="toggle-label">
          {label}
        </label>
        <Toggle
          id={id}
          onChange={shouldShow.toggle}
          value={shouldShow.on}
          disabled={disabled || !shouldShowComponent.on}
        />
      </div>
      {description && <p className="description">{description}</p>}
    </li>
  )
}
