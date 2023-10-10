import React, { FC } from 'react'
import { EmailSubComponentControlsProps } from './shared'
import { VisuallyHidden } from '@reach/visually-hidden'
import { buildSubComponentKey } from 'src/utils/emailPartKeys'
import { StatusVariant, useStatusValue } from 'src/templates/EmailTemplateSubComponents/Status'
import { Select } from 'src/ui/Select'

export const StatusControls: FC<EmailSubComponentControlsProps> = ({ componentId, id }) => {
  const htmlId = `select-${buildSubComponentKey(componentId, id)}`
  const [value, setValue] = useStatusValue(componentId, id)

  return (
    <>
      <VisuallyHidden>
        <span id={htmlId}>Status variant</span>
      </VisuallyHidden>
      <Select
        labelId={htmlId}
        options={[
          { label: 'Overview', value: StatusVariant.Overview + '' },
          { label: 'Overview w/ Reason', value: StatusVariant.OverviewWithReason + '' },
          { label: 'Missing Document Specifics', value: StatusVariant.MissingDocument + '' },
          {
            label: 'Overview w/ Reason + Amount Due',
            value: StatusVariant.OverviewWithReasonAndAmountDue + '',
          },
        ]}
        onChange={(newValue) => setValue({ ...value, variant: parseInt(newValue) })}
        value={value.variant + ''}
      />
    </>
  )
}
