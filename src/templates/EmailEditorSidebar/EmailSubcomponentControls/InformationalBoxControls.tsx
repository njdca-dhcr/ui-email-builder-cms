import React, { FC } from 'react'
import { Control, EmailSubComponentControlsProps } from './shared'
import { useSubComponentControlOptions } from '.'
import { UswdsIconSelect } from 'src/ui'
import { useInformationalBoxValue } from 'src/templates/EmailTemplateSubComponents/InformationalBox'
import { SelectBoxColor } from 'src/ui/SelectBoxColor'

export const InformationalBoxControls: FC<EmailSubComponentControlsProps<'InformationalBox'>> = ({
  emailSubComponent,
}) => {
  const iconHtmlId = `icon-${emailSubComponent.id}`
  const boxColorHtmlId = `boxColor-${emailSubComponent.id}`
  const [value, setValue] = useInformationalBoxValue(emailSubComponent)

  useSubComponentControlOptions(emailSubComponent, value, setValue)

  return (
    <Control.Group>
      <Control.Container layout="column">
        <Control.Label id={iconHtmlId}>Icon</Control.Label>
        <UswdsIconSelect
          labelId={iconHtmlId}
          onChange={(icon) => setValue({ ...value, icon })}
          value={value.icon}
        />
      </Control.Container>
      <Control.Container layout="column">
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
