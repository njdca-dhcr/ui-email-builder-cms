import React, { FC, ReactNode } from 'react'
import { useId } from '@reach/auto-id'
import { List } from 'src/ui/List'
import { Toggle } from 'src/ui/Toggle'
import './EmailEditorToggles.css'
import {
  ShouldShowEmailPart,
  useShouldShowEmailComponent,
  useShouldShowEmailSubComponent,
} from '../ShouldShowEmailPart'

interface EmailEditorTogglesProps {
  children: ReactNode
}

export const EmailEditorToggles: FC<EmailEditorTogglesProps> = ({ children }) => {
  return (
    <ShouldShowEmailPart>
      <List className="email-editor-toggles">{children}</List>
    </ShouldShowEmailPart>
  )
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
  const id = useId(componentId)

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
  disabled?: boolean
  label: string
  subComponentId: string
}

export const EmailEditorToggle: FC<EmailEditorToggleProps> = ({
  componentId,
  disabled,
  subComponentId,
  label,
}) => {
  const shouldShowComponent = useShouldShowEmailComponent(componentId)
  const shouldShow = useShouldShowEmailSubComponent(componentId, subComponentId)
  const id = useId([componentId, subComponentId].join('-'))

  return (
    <li className="email-editor-toggle">
      <label htmlFor={id} className="toggle-label">
        {label}
      </label>
      <Toggle
        id={id}
        onChange={shouldShow.toggle}
        value={shouldShow.on}
        disabled={disabled || !shouldShowComponent.on}
      />
    </li>
  )
}
