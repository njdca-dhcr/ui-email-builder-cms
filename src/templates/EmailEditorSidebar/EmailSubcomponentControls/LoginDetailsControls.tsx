import React, { FC } from 'react'
import { EmailSubComponentControlsProps } from './shared'
import { Input, UswdsIconSelect } from 'src/ui'
import { useLoginDetailsValue } from 'src/templates/EmailTemplateSubComponents/LoginDetails'

export const LoginDetailsControls: FC<EmailSubComponentControlsProps> = ({ componentId, id }) => {
  const [value, setValue] = useLoginDetailsValue(componentId, id)

  return (
    <div className="login-details-container">
      <UswdsIconSelect
        labelId="uswds-icon-login-details"
        onChange={(icon) => setValue({ ...value, icon })}
        value={value.icon}
      />

      <label htmlFor="login-details-button-link">Button Link</label>
      <Input
        id="login-details-button-link"
        type="url"
        value={value.buttonHref}
        onTextChange={(buttonHref) => setValue({ ...value, buttonHref })}
      />
    </div>
  )
}
