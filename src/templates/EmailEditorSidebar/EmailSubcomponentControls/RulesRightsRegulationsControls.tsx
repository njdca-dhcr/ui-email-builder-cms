import React, { FC } from 'react'
import { EmailSubComponentControlsProps } from './shared'
import { VisuallyHidden } from '@reach/visually-hidden'
import { buildSubComponentKey } from 'src/utils/emailPartKeys'
import {
  RulesRightsRegulationsVariant,
  useRulesRightsRegulationsValue,
} from 'src/templates/EmailTemplateSubComponents/RulesRightsRegulations'
import { Select } from 'src/ui/Select'
import { Input } from 'src/ui/Input'

export const RulesRightsRegulationsControls: FC<EmailSubComponentControlsProps> = ({
  componentId,
  id,
}) => {
  const htmlId = `select-${buildSubComponentKey(componentId, id)}`
  const [value, setValue] = useRulesRightsRegulationsValue(componentId, id)
  const isAppealRights = value.variant === RulesRightsRegulationsVariant.AppealRights

  return (
    <>
      <VisuallyHidden>
        <span id={htmlId}>Rules, Rights, and Regulations variant</span>
      </VisuallyHidden>
      <Select
        labelId={htmlId}
        options={[
          { label: 'Reminder', value: RulesRightsRegulationsVariant.Reminder + '' },
          { label: 'Appeal Rights', value: RulesRightsRegulationsVariant.AppealRights + '' },
        ]}
        onChange={(newValue) => setValue({ ...value, variant: parseInt(newValue) })}
        value={value.variant + ''}
      />
      {isAppealRights && (
        <div className="appeal-rights-container">
          <label htmlFor="appeal-rights-button-link">Button Link</label>
          <Input
            id="appeal-rights-button-link"
            type="url"
            value={value.appealRightsHref}
            onTextChange={(appealRightsHref) => setValue({ ...value, appealRightsHref })}
          />
        </div>
      )}
    </>
  )
}
