import React, { FC } from 'react'
import { Control, EmailSubComponentControlsProps } from './shared'
import { Input, UswdsIconSelect } from 'src/ui'
import { useLoginDetailsValue } from 'src/templates/EmailTemplateSubComponents/LoginDetails'
import { buildSubComponentKey } from 'src/utils/emailPartKeys'

export const LoginDetailsControls: FC<EmailSubComponentControlsProps> = ({ componentId, id }) => {
  const key = buildSubComponentKey(componentId, id)
  const iconHtmlId = `icon-${key}`
  const buttonLinkHtmlId = `buttonLink-${key}`
  const [value, setValue] = useLoginDetailsValue(componentId, id)

  return (
    <Control.Group>
      <Control.Container>
        <Control.Label htmlFor={iconHtmlId}>Icon</Control.Label>
        <UswdsIconSelect
          labelId={iconHtmlId}
          onChange={(icon) => setValue({ ...value, icon })}
          value={value.icon}
        />
      </Control.Container>

      <Control.Container>
        <Control.Label htmlFor={buttonLinkHtmlId}>Button Link</Control.Label>
        <Input
          id={buttonLinkHtmlId}
          type="url"
          value={value.buttonHref}
          onTextChange={(buttonHref) => setValue({ ...value, buttonHref })}
        />
      </Control.Container>
    </Control.Group>
  )
}
