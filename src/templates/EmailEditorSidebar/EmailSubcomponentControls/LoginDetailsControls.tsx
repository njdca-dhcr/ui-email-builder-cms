import React, { FC } from 'react'
import { Control, EmailSubComponentControlsProps } from './shared'
import { useSubComponentControlOptions } from '.'
import { Input, Select, UswdsIconSelect } from 'src/ui'
import {
  LoginDetailsVariant,
  useLoginDetailsValue,
} from 'src/templates/EmailTemplateSubComponents/LoginDetails'
import { VisuallyHidden } from '@reach/visually-hidden'

export const LoginDetailsControls: FC<EmailSubComponentControlsProps> = ({ id, emailSubComponent }) => {
  const variantHtmlId = `variant-${id}`
  const iconHtmlId = `icon-${id}`
  const buttonLinkHtmlId = `buttonLink-${id}`
  const [value, setValue] = useLoginDetailsValue(id)
  const isDetails = value.variant === LoginDetailsVariant.Details
  const isInformation = value.variant === LoginDetailsVariant.Information

  useSubComponentControlOptions(emailSubComponent, value, setValue)

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
