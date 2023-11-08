import React, { FC } from 'react'
import { Control, EmailSubComponentControlsProps } from './shared'
import { VisuallyHidden } from '@reach/visually-hidden'
import {
  RulesRightsRegulationsVariant,
  useRulesRightsRegulationsValue,
} from 'src/templates/EmailTemplateSubComponents/RulesRightsRegulations'
import { Input, Select, UswdsIconSelect } from 'src/ui'
import { SubComponentControlToggle } from './SubComponentControlToggle'

export const RulesRightsRegulationsControls: FC<EmailSubComponentControlsProps> = ({ id }) => {
  const variantHtmlId = `variant-${id}`
  const iconHtmlId = `icon-${id}`
  const buttonLinkHtmlId = `buttonLink-${id}`
  const [value, setValue] = useRulesRightsRegulationsValue(id)
  const isAppealRights = value.variant === RulesRightsRegulationsVariant.AppealRights
  const isReminder = value.variant === RulesRightsRegulationsVariant.Reminder

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
        />
      </Control.Container>

      {(isReminder || isAppealRights) && (
        <Control.Container>
          <Control.Label id={iconHtmlId}>Icon</Control.Label>
          <UswdsIconSelect
            labelId={iconHtmlId}
            onChange={(icon) => setValue({ ...value, icon })}
            value={value.icon}
          />
        </Control.Container>
      )}

      {isReminder && (
        <>
          <Control.Container>
            <SubComponentControlToggle
              subComponentId={id}
              label="Reminder Is For"
              onChange={(showReminderIsFor) => setValue({ ...value, showReminderIsFor })}
              value={value.showReminderIsFor}
            />
            <SubComponentControlToggle
              subComponentId={id}
              label="Footnote"
              onChange={(showFootnote) => setValue({ ...value, showFootnote })}
              value={value.showFootnote}
            />
          </Control.Container>
        </>
      )}

      {isAppealRights && (
        <Control.Container>
          <Control.Label htmlFor={buttonLinkHtmlId}>Button Link</Control.Label>
          <Input
            id={buttonLinkHtmlId}
            type="url"
            value={value.appealRightsHref}
            onTextChange={(appealRightsHref) => setValue({ ...value, appealRightsHref })}
          />
        </Control.Container>
      )}
    </Control.Group>
  )
}
