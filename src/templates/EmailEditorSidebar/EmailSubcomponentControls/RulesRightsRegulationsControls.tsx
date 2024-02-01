import React, { FC } from 'react'
import { Control, EmailSubComponentControlsProps } from './shared'
import { useSubComponentControlOptions } from '.'
import { VisuallyHidden } from '@reach/visually-hidden'
import {
  RulesRightsRegulationsVariant,
  useRulesRightsRegulationsValue,
} from 'src/templates/EmailTemplateSubComponents/RulesRightsRegulations'
import { Input, Select, UswdsIconSelect } from 'src/ui'
import { SubComponentControlToggle } from './SubComponentControlToggle'

export const RulesRightsRegulationsControls: FC<EmailSubComponentControlsProps> = ({
  id,
  emailSubComponent,
}) => {
  const variantHtmlId = `variant-${id}`
  const iconHtmlId = `icon-${id}`
  const buttonLinkHtmlId = `buttonLink-${id}`
  const [value, setValue] = useRulesRightsRegulationsValue(id)
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
          labelId={variantHtmlId}
          options={[
            { label: 'Reminder', value: RulesRightsRegulationsVariant.Reminder + '' },
            { label: 'Appeal Rights', value: RulesRightsRegulationsVariant.AppealRights + '' },
            { label: 'Your Rights', value: RulesRightsRegulationsVariant.YourRights + '' },
          ]}
          onChange={(newValue) => setValue({ ...value, variant: parseInt(newValue) })}
          value={value.variant + ''}
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
            subComponentId={id}
            label="Reminder Is For"
            onChange={(showReminderIsFor) => setValue({ ...value, showReminderIsFor })}
            value={value.showReminderIsFor}
          />
          <SubComponentControlToggle
            subComponentId={id}
            label="+ Footnote"
            onChange={(showFootnote) => setValue({ ...value, showFootnote })}
            value={value.showFootnote}
          />
        </>
      )}

      {isAppealRights && (
        <>
          <Control.Container layout="column">
            <Control.Label htmlFor={buttonLinkHtmlId} size="small">
              Button Link
            </Control.Label>
            <Input
              id={buttonLinkHtmlId}
              type="url"
              value={value.appealRightsHref}
              onTextChange={(appealRightsHref) => setValue({ ...value, appealRightsHref })}
            />
          </Control.Container>
          <SubComponentControlToggle
            subComponentId={id}
            label="Instruction"
            onChange={(appealRightsShowInstruction) =>
              setValue({ ...value, appealRightsShowInstruction })
            }
            value={value.appealRightsShowInstruction}
          />
          <SubComponentControlToggle
            subComponentId={id}
            label="Information Label"
            onChange={(appealRightsShowInfoLabel) =>
              setValue({ ...value, appealRightsShowInfoLabel })
            }
            value={value.appealRightsShowInfoLabel}
          />
          <SubComponentControlToggle
            subComponentId={id}
            label="Information"
            onChange={(appealRightsShowTerms) => setValue({ ...value, appealRightsShowTerms })}
            value={value.appealRightsShowTerms}
          />
        </>
      )}
    </Control.Group>
  )
}
