import React, { FC } from 'react'
import './VisibilityToggle.css'
import { ActiveEye, InactiveEye, DisabledActiveEye } from './EyeIcons'

interface Props {
  disabled?: boolean
  id: string
  onChange: (value: boolean) => void
  value: boolean
}

export const VisibilityToggle: FC<Props> = ({ disabled, id, onChange, value }) => {
  return (
    <div className="visibility-toggle">
      <input
        id={id}
        role="switch"
        disabled={disabled}
        type="checkbox"
        checked={value}
        onChange={(event) => onChange(event.target.checked)}
      />
      <div className="icons-container">
        <div className="disabled-icon icon">
          <DisabledActiveEye />
        </div>
        <div className="active-icon icon">
          <ActiveEye />
        </div>
        <div className="inactive-icon icon">
          <InactiveEye />
        </div>
      </div>
    </div>
  )
}
