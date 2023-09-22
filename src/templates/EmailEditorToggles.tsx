import React, { FC, ReactNode } from 'react'
import { useId } from '@reach/auto-id'
import { List } from 'src/ui/List'
import { Toggle } from 'src/ui/Toggle'
import './EmailEditorToggles.css'

interface EmailEditorTogglesProps {
  children: ReactNode
}

export const EmailEditorToggles: FC<EmailEditorTogglesProps> = ({ children }) => {
  return <List className="email-editor-toggles">{children}</List>
}

interface BaseEmailEditorToggleSectionProps {
  description?: string
  label: string
}

interface EmailEditorToggleSectionCanToggleProps extends BaseEmailEditorToggleSectionProps {
  children?: ReactNode
  onChange: (value: boolean) => void
  topLevelCanToggle: true
  value: boolean
}

interface EmailEditorToggleSectionCannotToggleProps extends BaseEmailEditorToggleSectionProps {
  children: ReactNode
  topLevelCanToggle: false
}

type EmailEditorToggleSectionProps =
  | EmailEditorToggleSectionCanToggleProps
  | EmailEditorToggleSectionCannotToggleProps

export const EmailEditorToggleSection: FC<EmailEditorToggleSectionProps> = (props) => {
  const id = useId('')

  const { children, description, label, topLevelCanToggle } = props
  const Label = topLevelCanToggle ? 'label' : 'span'

  return (
    <li className="email-editor-toggle-section">
      <div className="label-and-toggle">
        <Label htmlFor={id} className="section-label">
          {label}
        </Label>
        {topLevelCanToggle && <Toggle id={id} onChange={props.onChange} value={props.value} />}
      </div>
      {description && <p className="description">{description}</p>}
      {children && <List className="email-editor-sub-toggles">{children}</List>}
    </li>
  )
}

interface EmailEditorToggleProps {
  disabled?: boolean
  label: string
  onChange: (value: boolean) => void
  value: boolean
}

export const EmailEditorToggle: FC<EmailEditorToggleProps> = ({
  disabled,
  label,
  onChange,
  value,
}) => {
  const id = useId('')

  return (
    <li className="email-editor-toggle">
      <label className="toggle-label">{label}</label>
      <Toggle id={id} onChange={onChange} value={value} disabled={disabled} />
    </li>
  )
}
