import React, { FC, useCallback } from 'react'
import { Control, EmailSubComponentControlsProps, SELECT_VARIANT_CLASSNAME } from './shared'
import { useSubComponentControlOptions } from '.'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { useRulesRightsRegulationsValue } from 'src/templates/EmailTemplateSubComponents/RulesRightsRegulations'
import { Select, SelectBoxColor, UswdsIconSelect, UswdsIconVariantKey } from 'src/ui'
import { SubComponentControlToggle } from './SubComponentControlToggle'
import { RulesRightsRegulationsVariant } from 'src/appTypes'

export const RulesRightsRegulationsControls: FC<
  EmailSubComponentControlsProps<'RulesRightsRegulations'>
> = ({ emailSubComponent }) => {
  const variantHtmlId = `variant-${emailSubComponent.id}`
  const iconHtmlId = `icon-${emailSubComponent.id}`
  const boxColorHtmlId = `boxColor-${emailSubComponent.id}`
  const [value, setValue] = useRulesRightsRegulationsValue(emailSubComponent)
  const isAppealRights = value.variant === RulesRightsRegulationsVariant.AppealRights
  const isReminder = value.variant === RulesRightsRegulationsVariant.Reminder
  const isYourRights = value.variant === RulesRightsRegulationsVariant.YourRights

  useSubComponentControlOptions(emailSubComponent, value, setValue)

  const selectIcon = useCallback(
    (icon: UswdsIconVariantKey) => setValue({ ...value, icon }),
    [setValue, value],
  )

  return (
    <Control.Group>
      <Control.Container>
        <VisuallyHidden>
          <span id={variantHtmlId}>Rules, Rights, and Regulations variant</span>
        </VisuallyHidden>
        <Select
          className={SELECT_VARIANT_CLASSNAME}
          labelId={variantHtmlId}
          options={[
            { label: 'Reminder', value: RulesRightsRegulationsVariant.Reminder },
            { label: 'Appeal Rights', value: RulesRightsRegulationsVariant.AppealRights },
            { label: 'Your Rights', value: RulesRightsRegulationsVariant.YourRights },
          ]}
          onChange={(newValue) =>
            setValue({ ...value, variant: newValue as RulesRightsRegulationsVariant })
          }
          value={value.variant}
          size="small"
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

      {(isReminder || isAppealRights) && (
        <Control.Container layout="column">
          <Control.Label id={iconHtmlId} size="small">
            Icon
          </Control.Label>
          <UswdsIconSelect labelId={iconHtmlId} onChange={selectIcon} value={value.icon} />
        </Control.Container>
      )}

      {isAppealRights && (
        <>
          <SubComponentControlToggle
            subComponentId={emailSubComponent.id}
            label="Instruction"
            onChange={(appealRightsShowInstruction) =>
              setValue({ ...value, appealRightsShowInstruction })
            }
            value={value.appealRightsShowInstruction}
          />
          <SubComponentControlToggle
            subComponentId={emailSubComponent.id}
            label="Information Label"
            onChange={(appealRightsShowInfoLabel) =>
              setValue({ ...value, appealRightsShowInfoLabel })
            }
            value={value.appealRightsShowInfoLabel}
          />
          <SubComponentControlToggle
            subComponentId={emailSubComponent.id}
            label="Information"
            onChange={(appealRightsShowInfo) => setValue({ ...value, appealRightsShowInfo })}
            value={value.appealRightsShowInfo}
          />
        </>
      )}

      {isYourRights && (
        <SubComponentControlToggle
          subComponentId={emailSubComponent.id}
          label="Description"
          onChange={(showYourRightsDescription) =>
            setValue({ ...value, showYourRightsDescription })
          }
          value={value.showYourRightsDescription}
        />
      )}
    </Control.Group>
  )
}
