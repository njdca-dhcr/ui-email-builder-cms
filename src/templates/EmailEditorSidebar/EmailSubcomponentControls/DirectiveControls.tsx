import React, { FC } from 'react'
import { Control, EmailSubComponentControlsProps, SELECT_VARIANT_CLASSNAME } from './shared'
import { useSubComponentControlOptions } from '.'
import { VisuallyHidden } from '@reach/visually-hidden'
import { useDirectiveValue } from 'src/templates/EmailTemplateSubComponents/Directive'
import { Select } from 'src/ui/'
import { SubComponentControlToggle } from './SubComponentControlToggle'
import { DirectiveVariant } from 'src/appTypes'
import { ColorInput } from 'src/ui/ColorInput'
import { ColorPicker } from 'src/ui/ColorPicker'

export const DirectiveControls: FC<EmailSubComponentControlsProps<'Directive'>> = ({
  emailSubComponent,
}) => {
  const variantHtmlId = `directive-variant-${emailSubComponent.id}`
  const buttonColorPickerHtmlId = `directive-button-color-picker-${emailSubComponent.id}`
  const buttonColorInputHtmlId = `directive-button-color-input-${emailSubComponent.id}`
  const [value, setValue] = useDirectiveValue(emailSubComponent)

  useSubComponentControlOptions(emailSubComponent, value, setValue)

  return (
    <Control.Group>
      <Control.Container>
        <VisuallyHidden>
          <span id={variantHtmlId}>Directive variant</span>
        </VisuallyHidden>

        <Select
          className={SELECT_VARIANT_CLASSNAME}
          labelId={variantHtmlId}
          options={[
            { label: 'One Step', value: DirectiveVariant.OneStep },
            { label: 'Three Steps', value: DirectiveVariant.ThreeStep },
            {
              label: 'Three Steps w/ Step 2 Expansion',
              value: DirectiveVariant.StepTwoExpansion,
            },
            { label: 'Pay Online', value: DirectiveVariant.PayOnline },
          ]}
          onChange={(newValue) => setValue({ ...value, variant: newValue as DirectiveVariant })}
          value={value.variant}
          size="small"
        />
      </Control.Container>

      <SubComponentControlToggle
        subComponentId={emailSubComponent.id}
        label="+ Title"
        onChange={(showTitle) => setValue({ ...value, showTitle })}
        value={value.showTitle}
      />

      <Control.Container className="program-name-inline-color-picker">
        <Control.Label htmlFor={buttonColorPickerHtmlId}>Button Color</Control.Label>
        <VisuallyHidden>
          <label htmlFor={buttonColorInputHtmlId}>Button Color Hex Code</label>
        </VisuallyHidden>
        <div className="color-input-and-picker">
          <ColorInput
            id={buttonColorInputHtmlId}
            value={value.buttonColor}
            onChange={(buttonColor) => setValue({ ...value, buttonColor })}
          />
          <ColorPicker
            id={buttonColorPickerHtmlId}
            className="color-picker-inline"
            value={value.buttonColor}
            onChange={(buttonColor) => setValue({ ...value, buttonColor })}
          />
        </div>
      </Control.Container>

      {[DirectiveVariant.ThreeStep, DirectiveVariant.StepTwoExpansion].includes(value.variant) && (
        <>
          <SubComponentControlToggle
            className="directive-addl-content-toggle"
            subComponentId={emailSubComponent.id}
            label="Step 1 Additional Content"
            onChange={(showStep1AdditionalContent) =>
              setValue({ ...value, showStep1AdditionalContent })
            }
            value={value.showStep1AdditionalContent}
          />
          <SubComponentControlToggle
            className="directive-addl-content-toggle"
            subComponentId={emailSubComponent.id}
            label="Step 2 Additional Content"
            onChange={(showStep2AdditionalContent) =>
              setValue({ ...value, showStep2AdditionalContent })
            }
            value={value.showStep2AdditionalContent}
          />
          <SubComponentControlToggle
            className="directive-addl-content-toggle"
            subComponentId={emailSubComponent.id}
            label="Step 3 Additional Content"
            onChange={(showStep3AdditionalContent) =>
              setValue({ ...value, showStep3AdditionalContent })
            }
            value={value.showStep3AdditionalContent}
          />
          <SubComponentControlToggle
            subComponentId={emailSubComponent.id}
            label="+ Supportive Information"
            onChange={(showMultipleStepsSupportiveText) =>
              setValue({ ...value, showMultipleStepsSupportiveText })
            }
            value={value.showMultipleStepsSupportiveText}
          />
        </>
      )}
    </Control.Group>
  )
}
