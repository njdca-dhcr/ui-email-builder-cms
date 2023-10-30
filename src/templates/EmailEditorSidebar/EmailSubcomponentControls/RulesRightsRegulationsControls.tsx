import React, { FC } from 'react'
import { Control, EmailSubComponentControlsProps } from './shared'
import { VisuallyHidden } from '@reach/visually-hidden'
import { buildSubComponentKey } from 'src/utils/emailPartKeys'
import {
  RulesRightsRegulationsVariant,
  useRulesRightsRegulationsValue,
} from 'src/templates/EmailTemplateSubComponents/RulesRightsRegulations'
import { Input, Select, UswdsIconSelect } from 'src/ui'

export const RulesRightsRegulationsControls: FC<EmailSubComponentControlsProps> = ({
  componentId,
  id,
}) => {
  const key = buildSubComponentKey(componentId, id)
  const variantHtmlId = `variant-${key}`
  const iconHtmlId = `icon-${key}`
  const buttonLinkHtmlId = `buttonLink-${key}`
  const [value, setValue] = useRulesRightsRegulationsValue(componentId, id)
  const isAppealRights = value.variant === RulesRightsRegulationsVariant.AppealRights

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
          ]}
          onChange={(newValue) => setValue({ ...value, variant: parseInt(newValue) })}
          value={value.variant + ''}
        />
      </Control.Container>

      <Control.Container>
        <Control.Label id={iconHtmlId}>Icon</Control.Label>
        <UswdsIconSelect
          labelId={iconHtmlId}
          onChange={(icon) => setValue({ ...value, icon })}
          value={value.icon}
        />
      </Control.Container>

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
