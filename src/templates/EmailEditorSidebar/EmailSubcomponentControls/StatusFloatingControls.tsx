import React, { FC, useEffect } from 'react'
import { EmailParts } from 'src/appTypes'
import { useStatusValue } from 'src/templates/EmailTemplateSubComponents/Status'
import { Radio } from 'src/ui'

interface Props {
  emailSubComponent: EmailParts.Status
}

export const StatusFloatingControls: FC<Props> = ({ emailSubComponent }) => {
  const [value, setValue] = useStatusValue(emailSubComponent)

  useEffect(() => {
    return () => {
      setValue((previousValue) => ({ ...previousValue, spaceAfter: true }))
    }
  }, [setValue])

  return (
    <Radio.Fieldset legend="Spacing" legendId="status-spacing-control">
      <Radio.Button
        label="Small"
        checked={!value.spaceAfter}
        onChange={() => setValue({ ...value, spaceAfter: false })}
      />
      <Radio.Button
        label="Large"
        checked={value.spaceAfter}
        onChange={() => setValue({ ...value, spaceAfter: true })}
      />
    </Radio.Fieldset>
  )
}
