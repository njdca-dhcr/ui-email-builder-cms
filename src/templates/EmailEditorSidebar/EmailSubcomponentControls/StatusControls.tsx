import React, { FC } from 'react'
import { EmailSubComponentControlsProps } from './shared'
import { VisuallyHidden } from '@reach/visually-hidden'
import { buildSubComponentKey } from 'src/utils/emailPartKeys'
import { StatusVariant, useStatusValue } from 'src/templates/EmailTemplateSubComponents/Status'
import { Select } from 'src/ui/Select'
import { Input } from 'src/ui'
import { SubComponentControlToggle } from './SubComponentControlToggle'

export const StatusControls: FC<EmailSubComponentControlsProps> = ({ componentId, id }) => {
  const variantHtmlId = `select-${buildSubComponentKey(componentId, id)}`
  const [value, setValue] = useStatusValue(componentId, id)

  return (
    <>
      <VisuallyHidden>
        <span id={variantHtmlId}>Status variant</span>
      </VisuallyHidden>
      <Select
        labelId={variantHtmlId}
        options={[
          { label: 'Overview', value: StatusVariant.Overview + '' },
          { label: 'Overview w/ Reason', value: StatusVariant.OverviewWithReason + '' },
          { label: 'Missing Document Specifics', value: StatusVariant.MissingDocument + '' },
          {
            label: 'Overview w/ Reason + Amount Due',
            value: StatusVariant.OverviewWithReasonAndAmountDue + '',
          },
          {
            label: 'Overview w/ Reason + Amount Breakdown',
            value: StatusVariant.OverviewWithReasonAndAmountBreakdown + '',
          },
        ]}
        onChange={(newValue) => setValue({ ...value, variant: parseInt(newValue) })}
        value={value.variant + ''}
      />
      <SubComponentControlToggle
        className="status-supportive-information-toggle"
        subComponentId={id}
        label="Supportive Information"
        onChange={(showSupportiveInformation) => setValue({ ...value, showSupportiveInformation })}
        value={value.showSupportiveInformation}
      />
    </>
  )
}
