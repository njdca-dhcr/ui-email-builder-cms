import React, { FC } from 'react'
import { Control, EmailSubComponentControlsProps } from './shared'
import { Input, Select, UswdsIconSelect } from 'src/ui'
import {
  LoginDetailsVariant,
  useLoginDetailsValue,
} from 'src/templates/EmailTemplateSubComponents/LoginDetails'
import { buildSubComponentKey } from 'src/utils/emailPartKeys'
import { VisuallyHidden } from '@reach/visually-hidden'

export const LoginDetailsControls: FC<EmailSubComponentControlsProps> = ({ componentId, id }) => {
  const key = buildSubComponentKey(componentId, id)
  const variantHtmlId = `variant-${key}`
  const iconHtmlId = `icon-${key}`
  const buttonLinkHtmlId = `buttonLink-${key}`
  const [value, setValue] = useLoginDetailsValue(componentId, id)
  const isDetails = value.variant === LoginDetailsVariant.Details
  const isInformation = value.variant === LoginDetailsVariant.Information

  return (
    <Control.Group>
      <Control.Container>
        <VisuallyHidden>
          <span id={variantHtmlId}>Login Details variant</span>
        </VisuallyHidden>
        <Select
          labelId={variantHtmlId}
          options={[
            { label: 'Details', value: LoginDetailsVariant.Details + '' },
            { label: 'Information', value: LoginDetailsVariant.Information + '' },
          ]}
          onChange={(newValue) => setValue({ ...value, variant: parseInt(newValue) })}
          value={value.variant + ''}
        />
      </Control.Container>

      {isDetails && (
        <>
          <Control.Container>
            <Control.Label id={iconHtmlId}>Icon</Control.Label>
            <UswdsIconSelect
              labelId={iconHtmlId}
              onChange={(loginDetailsIcon) => setValue({ ...value, loginDetailsIcon })}
              value={value.loginDetailsIcon}
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
        </>
      )}

      {isInformation && (
        <Control.Container>
          <Control.Label id={iconHtmlId}>Icon</Control.Label>
          <UswdsIconSelect
            labelId={iconHtmlId}
            onChange={(loginInformationIcon) => setValue({ ...value, loginInformationIcon })}
            value={value.loginInformationIcon}
          />
        </Control.Container>
      )}
    </Control.Group>
  )
}
