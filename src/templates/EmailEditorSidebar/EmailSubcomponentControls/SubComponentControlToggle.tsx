import React, { FC } from 'react'
import { buildSubComponentPartKey } from 'src/utils/emailPartKeys'
import { Toggle } from 'src/ui/'
import classNames from 'classnames'

interface SubComponentControlsToggleProps {
  className?: string
  subComponentId: string
  label: string
  onChange: (showTitle: boolean) => void
  value: boolean
}

export const SubComponentControlToggle: FC<SubComponentControlsToggleProps> = ({
  className,
  subComponentId,
  label,
  onChange,
  value,
}) => {
  const toggleId = `toggle-${buildSubComponentPartKey(subComponentId, label)}`

  return (
    <div className={classNames('label-and-toggle', 'subcomponent-part', className)}>
      <label htmlFor={toggleId}>{label}</label>
      <Toggle id={toggleId} onChange={onChange} value={value} />
    </div>
  )
}
