import React, { FC } from 'react'
import { buildSubComponentPartKey } from 'src/utils/emailPartKeys'
import { Toggle } from 'src/ui/'

interface SubComponentControlsToggleProps {
  subComponentId: string
  label: string
  onChange: (showTitle: boolean) => void
  value: boolean
}

export const SubComponentControlToggle: FC<SubComponentControlsToggleProps> = ({
  subComponentId,
  label,
  onChange,
  value,
}) => {
  const toggleId = `toggle-${buildSubComponentPartKey(subComponentId, label)}`

  return (
    <div className="label-and-toggle">
      <label htmlFor={toggleId}>{label}</label>
      <Toggle id={toggleId} onChange={onChange} value={value} />
    </div>
  )
}
