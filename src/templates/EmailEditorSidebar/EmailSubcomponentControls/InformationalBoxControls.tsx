import React, { FC, useCallback } from 'react'
import { Control, EmailSubComponentControlsProps } from './shared'
import { useSubComponentControlOptions } from '.'
import { SelectBoxColor, UswdsIconSelect, UswdsIconVariantKey } from 'src/ui'
import { useInformationalBoxValue } from 'src/templates/EmailTemplateSubComponents/InformationalBox'
import { SubComponentControlToggle } from './SubComponentControlToggle'

export const InformationalBoxControls: FC<EmailSubComponentControlsProps<'InformationalBox'>> = ({
  emailSubComponent,
}) => {
  const iconHtmlId = `icon-${emailSubComponent.id}`
  const boxColorHtmlId = `boxColor-${emailSubComponent.id}`
  const [value, setValue] = useInformationalBoxValue(emailSubComponent)

  useSubComponentControlOptions(emailSubComponent, value, setValue)

  const selectIcon = useCallback(
    (icon: UswdsIconVariantKey) => setValue({ ...value, icon }),
    [setValue, value],
  )

  return (
    <Control.Group>
      <Control.Container layout="column">
        <Control.Label id={iconHtmlId}>Icon</Control.Label>
        <UswdsIconSelect labelId={iconHtmlId} onChange={selectIcon} value={value.icon} />
      </Control.Container>
      <Control.Container layout="column">
        <Control.Label id={boxColorHtmlId}>Box Color</Control.Label>
        <SelectBoxColor
          labelId={boxColorHtmlId}
          value={value.boxColor}
          onChange={(boxColor) => setValue({ ...value, boxColor })}
        />
      </Control.Container>
      <SubComponentControlToggle
        subComponentId={emailSubComponent.id}
        label="+ Supportive Information"
        onChange={(showSupportiveInformation) => setValue({ ...value, showSupportiveInformation })}
        value={value.showSupportiveInformation}
      />
    </Control.Group>
  )
}
