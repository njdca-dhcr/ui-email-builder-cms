import React, { FC } from 'react'
import { Control, EmailSubComponentControlsProps, SELECT_VARIANT_CLASSNAME } from './shared'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Select, SelectBoxColor, UswdsIconSelect } from 'src/ui'
import { useSupplementalContentValue } from 'src/templates/EmailTemplateSubComponents/SupplementalContent'
import { SupplementalContentVariant } from 'src/appTypes'

export const SupplementalContentControls: FC<
  EmailSubComponentControlsProps<'SupplementalContent'>
> = ({ emailSubComponent }) => {
  const variantHtmlId = `variant-${emailSubComponent.id}`
  const boxColorHtmlId = `select-box-color-${emailSubComponent.id}`
  const iconHtmlId = `select-icon-${emailSubComponent.id}`
  const [value, setValue] = useSupplementalContentValue(emailSubComponent)

  return (
    <Control.Group>
      <Control.Container>
        <VisuallyHidden>
          <span id={variantHtmlId}>Supplemental Content variant</span>
        </VisuallyHidden>
        <Select
          className={SELECT_VARIANT_CLASSNAME}
          labelId={variantHtmlId}
          options={[
            { label: 'Single', value: SupplementalContentVariant.SingleSupplementalContent },
            { label: 'Double', value: SupplementalContentVariant.DoubleSupplementalContent },
            { label: 'Triple', value: SupplementalContentVariant.TripleSupplementalContent },
            { label: 'Benefit Amount', value: SupplementalContentVariant.BenefitAmount },
          ]}
          onChange={(newValue) =>
            setValue({ ...value, variant: newValue as SupplementalContentVariant })
          }
          value={value.variant}
          size="small"
        />
      </Control.Container>
      {[SupplementalContentVariant.BenefitAmount].includes(value.variant) && (
        <>
          <Control.Container layout="column">
            <Control.Label id={boxColorHtmlId} size="small">
              Box Color
            </Control.Label>
            <SelectBoxColor
              labelId={boxColorHtmlId}
              value={value.benefitAmountBoxColor}
              onChange={(benefitAmountBoxColor) => setValue({ ...value, benefitAmountBoxColor })}
            />
          </Control.Container>
          <Control.Container layout="column">
            <Control.Label id={iconHtmlId} size="small">
              Icon
            </Control.Label>
            <UswdsIconSelect
              labelId={iconHtmlId}
              onChange={(benefitAmountIcon) => setValue({ ...value, benefitAmountIcon })}
              value={value.benefitAmountIcon}
            />
          </Control.Container>
        </>
      )}
    </Control.Group>
  )
}
