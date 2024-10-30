import React, { FC, useCallback } from 'react'
import { Control, EmailSubComponentControlsProps, SELECT_VARIANT_CLASSNAME } from './shared'
import { useSubComponentControlOptions } from '.'
import { Select, UswdsIconSelect, UswdsIconVariantKey } from 'src/ui'
import { useLoginDetailsValue } from 'src/templates/EmailTemplateSubComponents/LoginDetails'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { LoginDetailsVariant } from 'src/appTypes'
import { SubComponentControlToggle } from './SubComponentControlToggle'

export const LoginDetailsControls: FC<EmailSubComponentControlsProps<'LoginDetails'>> = ({
  emailSubComponent,
}) => {
  const variantHtmlId = `variant-${emailSubComponent.id}`
  const iconHtmlId = `icon-${emailSubComponent.id}`
  const [value, setValue] = useLoginDetailsValue(emailSubComponent)
  const isDetails = value.variant === LoginDetailsVariant.Details
  const isInformation = value.variant === LoginDetailsVariant.Information

  useSubComponentControlOptions(emailSubComponent, value, setValue)

  const selectIcon = useCallback(
    (loginDetailsIcon: UswdsIconVariantKey) => setValue({ ...value, loginDetailsIcon }),
    [setValue, value],
  )

  return (
    <Control.Group>
      <Control.Container>
        <VisuallyHidden>
          <span id={variantHtmlId}>Login Details variant</span>
        </VisuallyHidden>
        <Select
          className={SELECT_VARIANT_CLASSNAME}
          labelId={variantHtmlId}
          options={[
            { label: 'Details', value: LoginDetailsVariant.Details },
            { label: 'Information', value: LoginDetailsVariant.Information },
          ]}
          onChange={(newValue) => setValue({ ...value, variant: newValue as LoginDetailsVariant })}
          value={value.variant}
          size="small"
        />
      </Control.Container>

      {isDetails && (
        <Control.Container layout="column">
          <Control.Label id={iconHtmlId} size="small">
            Icon
          </Control.Label>
          <UswdsIconSelect
            labelId={iconHtmlId}
            onChange={selectIcon}
            value={value.loginDetailsIcon}
          />
        </Control.Container>
      )}

      {isInformation && (
        <>
          <Control.Container layout="column">
            <Control.Label id={iconHtmlId} size="small">
              Icon
            </Control.Label>
            <UswdsIconSelect
              labelId={iconHtmlId}
              onChange={(loginInformationIcon) => setValue({ ...value, loginInformationIcon })}
              value={value.loginInformationIcon}
            />
          </Control.Container>
          <SubComponentControlToggle
            subComponentId={emailSubComponent.id}
            label="+ Login Information Body"
            onChange={(showLoginInformationBody) =>
              setValue({ ...value, showLoginInformationBody })
            }
            value={value.showLoginInformationBody}
          />
        </>
      )}
    </Control.Group>
  )
}
