import React, { FC } from 'react'
import { EmailSubComponentControlsProps } from './shared'
import { useProgramNameValue } from 'src/templates/EmailTemplateSubComponents/ProgramName'
import { buildSubComponentKey } from 'src/utils/emailPartKeys'
import { ColorPicker } from 'src/ui/ColorPicker'

export const ProgramNameControls: FC<EmailSubComponentControlsProps> = ({ componentId, id }) => {
  const key = buildSubComponentKey(componentId, id)
  const htmlId = `program-name-background-color-${key}`
  const [value, setValue] = useProgramNameValue(componentId, id)

  return (
    <label htmlFor={htmlId} className="program-name-inline-color-picker">
      <span>Background Color</span>
      <ColorPicker
        id={htmlId}
        className="color-picker-inline"
        value={value.backgroundColor}
        onChange={(backgroundColor) => setValue({ ...value, backgroundColor })}
      />
    </label>
  )
}
