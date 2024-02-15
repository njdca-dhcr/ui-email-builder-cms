import React, { FC } from 'react'
import { Control, EmailSubComponentControlsProps } from './shared'
import { useProgramNameValue } from 'src/templates/EmailTemplateSubComponents/ProgramName'
import { ColorPicker } from 'src/ui/ColorPicker'
import { VisuallyHidden } from '@reach/visually-hidden'
import { ColorInput } from 'src/ui/ColorInput'

export const ProgramNameControls: FC<EmailSubComponentControlsProps> = ({ id }) => {
  const colorPickerHtmlId = `program-name-background-color-${id}`
  const colorInputHtmlId = `program-name-background-color-input-${id}`
  const [value, setValue] = useProgramNameValue(id)

  return (
    <Control.Group className="program-name-inline-color-picker">
      <Control.Label htmlFor={colorPickerHtmlId}>Background Color</Control.Label>
      <VisuallyHidden>
        <label htmlFor={colorInputHtmlId}>Background Color Hex Code</label>
      </VisuallyHidden>
      <div className="color-input-and-picker">
        <ColorInput
          id={colorInputHtmlId}
          value={value.backgroundColor}
          onChange={(backgroundColor) => setValue({ ...value, backgroundColor })}
        />
        <ColorPicker
          id={colorPickerHtmlId}
          className="color-picker-inline"
          value={value.backgroundColor}
          onChange={(backgroundColor) => setValue({ ...value, backgroundColor })}
        />
      </div>
    </Control.Group>
  )
}
