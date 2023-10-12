import React, { FC } from 'react'
import { EmailSubComponentControlsProps } from './shared'
import { Input } from 'src/ui/Input'
import { useLoginDetailsValue } from 'src/templates/EmailTemplateSubComponents/LoginDetails'

export const LoginDetailsControls: FC<EmailSubComponentControlsProps> = ({ componentId, id }) => {
  const [value, setValue] = useLoginDetailsValue(componentId, id)

  return (
    <div className="login-details-container">
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
