import React, { FC } from 'react'
import { buildSubComponentPartKey } from 'src/utils/emailPartKeys'
import { VisibilityToggle } from 'src/ui'
import { Control } from './shared'

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
    <Control.Container className={className}>
      <Control.Label htmlFor={toggleId}>{label}</Control.Label>
      <VisibilityToggle id={toggleId} onChange={onChange} value={value} />
    </Control.Container>
  )
}
