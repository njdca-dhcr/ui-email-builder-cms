import React, { FC } from 'react'
import { Control, EmailSubComponentControlsProps } from './shared'
import { useProgramNameValue } from 'src/templates/EmailTemplateSubComponents/ProgramName'
import { ColorPicker } from 'src/ui/ColorPicker'

export const ProgramNameControls: FC<EmailSubComponentControlsProps> = ({ id }) => {
  const htmlId = `program-name-background-color-${id}`
  const [value, setValue] = useProgramNameValue(id)

  return (
    <Control.Group>
      <Control.Label htmlFor={htmlId} className="program-name-inline-color-picker">
        <span>Background Color</span>
        <ColorPicker
          id={htmlId}
          className="color-picker-inline"
          value={value.backgroundColor}
          onChange={(backgroundColor) => setValue({ ...value, backgroundColor })}
        />
      </Control.Label>
    </Control.Group>
  )
}
