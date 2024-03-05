import React, { FC } from 'react'
import { Control, EmailSubComponentControlsProps, SELECT_VARIANT_CLASSNAME } from './shared'
import { useSubComponentControlOptions } from '.'
import { VisuallyHidden } from '@reach/visually-hidden'
import { useRulesRightsRegulationsValue } from 'src/templates/EmailTemplateSubComponents/RulesRightsRegulations'
import { Select, UswdsIconSelect } from 'src/ui'
import { SubComponentControlToggle } from './SubComponentControlToggle'
import { RulesRightsRegulationsVariant } from 'src/appTypes'

export const RulesRightsRegulationsControls: FC<
  EmailSubComponentControlsProps<'RulesRightsRegulations'>
> = ({ emailSubComponent }) => {
  const variantHtmlId = `variant-${emailSubComponent.id}`
  const iconHtmlId = `icon-${emailSubComponent.id}`
  const [value, setValue] = useRulesRightsRegulationsValue(emailSubComponent)
  const isAppealRights = value.variant === RulesRightsRegulationsVariant.AppealRights
  const isReminder = value.variant === RulesRightsRegulationsVariant.Reminder

  useSubComponentControlOptions(emailSubComponent, value, setValue)

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

      {(isReminder || isAppealRights) && (
        <Control.Container layout="column">
          <Control.Label id={iconHtmlId} size="small">
            Icon
          </Control.Label>
          <UswdsIconSelect
            labelId={iconHtmlId}
            onChange={(icon) => setValue({ ...value, icon })}
            value={value.icon}
          />
        </Control.Container>
      )}

      {isReminder && (
        <>
          <SubComponentControlToggle
            subComponentId={emailSubComponent.id}
            label="Reminder Is For"
            onChange={(showReminderIsFor) => setValue({ ...value, showReminderIsFor })}
            value={value.showReminderIsFor}
          />
          <SubComponentControlToggle
            subComponentId={emailSubComponent.id}
            label="+ Footnote"
            onChange={(showFootnote) => setValue({ ...value, showFootnote })}
            value={value.showFootnote}
          />
        </>
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
            onChange={(appealRightsShowTerms) => setValue({ ...value, appealRightsShowTerms })}
            value={value.appealRightsShowTerms}
          />
        </>
      )}
    </Control.Group>
  )
}
