import React, { FC } from 'react'
import classNames from 'classnames'
import './Toggle.css'
import { XIcon } from './XIcon'
import { CheckmarkIcon } from './CheckmarkIcon'
import { TogglePillIcon } from './TogglePillIcon'

interface Props {
  disabled?: boolean
  id: string
  onChange: (value: boolean) => void
  value: boolean
}

export const Toggle: FC<Props> = ({ disabled, id, onChange, value }) => {
  return (
    <div className="toggle">
      <div
        className={classNames('toggle-ui', {
          'toggled-on': value,
          'toggled-off': !value,
          'toggle-disabled': disabled,
        })}
      >
        <TogglePillIcon />
        <div className="toggle-pill-overlay">
          <div className="toggle-circle">
            <XIcon />
            <CheckmarkIcon />
          </div>
        </div>
      </div>
      <input
        id={id}
        disabled={disabled}
        type="checkbox"
        checked={value}
        onChange={(event) => onChange(event.target.checked)}
      />
    </div>
  )
}
