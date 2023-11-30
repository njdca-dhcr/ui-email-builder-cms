import React, { FC } from 'react'
import { Control, EmailSubComponentControlsProps } from './shared'
import { Input, Select, UswdsIconSelect } from 'src/ui'
import { useInformationalBoxValue } from 'src/templates/EmailTemplateSubComponents/InformationalBox'
import { SelectBoxColor } from 'src/ui/SelectBoxColor'

export const InformationalBoxControls: FC<EmailSubComponentControlsProps> = ({ id }) => {
  const iconHtmlId = `icon-${id}`
  const boxColorHtmlId = `boxColor-${id}`
  const [value, setValue] = useInformationalBoxValue(id)

  return (
    <Control.Group>
      <Control.Container>
        <Control.Label id={iconHtmlId}>Icon</Control.Label>
        <UswdsIconSelect
          labelId={iconHtmlId}
          onChange={(icon) => setValue({ ...value, icon })}
          value={value.icon}
        />
      </Control.Container>
      <Control.Container>
        <Control.Label id={boxColorHtmlId}>Box Color</Control.Label>
        <SelectBoxColor
          labelId={boxColorHtmlId}
          value={value.boxColor}
          onChange={(boxColor) => setValue({ ...value, boxColor })}
        />
      </Control.Container>
    </Control.Group>
  )
}
