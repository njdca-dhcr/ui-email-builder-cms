import React, { FC, ReactElement, ReactNode } from 'react'
import classNames from 'classnames'
import './RadioButtons.css'

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
        <input type="radio" checked={checked} onChange={onChange} />
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
  renderLegend?: (legend: ReactElement) => ReactElement
}

const Fieldset: FC<FieldsetProps> = ({
  children,
  className,
  legend,
  legendId,
  renderLegend: givenRenderLegend,
}) => {
  const renderLegend = givenRenderLegend ?? ((legend: ReactElement) => legend)

  return (
    <fieldset
      className={classNames('radio-buttons-fieldset', className)}
      aria-labelledby={legendId}
    >
      {renderLegend(
        <div id={legendId} className="legend">
          {legend}
        </div>,
      )}
      <div className="radio-buttons">{children}</div>
    </fieldset>
  )
}
Fieldset.displayName = 'Radio.Fieldset'

export const Radio = {
  Button,
  Fieldset,
}
