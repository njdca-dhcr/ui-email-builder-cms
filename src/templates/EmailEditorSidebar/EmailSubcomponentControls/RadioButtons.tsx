import React, { FC, ReactNode } from 'react'
import { VisuallyHidden } from '@reach/visually-hidden'
import classNames from 'classnames'

interface ButtonProps {
  checked: boolean
  onChange: () => void
  label: string
}

const Button: FC<ButtonProps> = ({ checked, label, onChange }) => {
  return (
    <div className="radio-button">
      <label>
        {label}
        <VisuallyHidden>
          <input type="radio" checked={checked} onChange={onChange} />
        </VisuallyHidden>
      </label>
    </div>
  )
}
Button.displayName = 'Radio.Button'

interface FieldsetProps {
  className?: string
  children: ReactNode
  legend: string
  legendId: string
}

const Fieldset: FC<FieldsetProps> = ({ children, className, legend, legendId }) => {
  return (
    <fieldset
      className={classNames('radio-buttons-fieldset', className)}
      aria-labelledby={legendId}
    >
      <div id={legendId} className="legend">
        {legend}
      </div>
      <div className="radio-buttons">{children}</div>
    </fieldset>
  )
}
Fieldset.displayName = 'Radio.Fieldset'

export const Radio = {
  Button,
  Fieldset,
}
