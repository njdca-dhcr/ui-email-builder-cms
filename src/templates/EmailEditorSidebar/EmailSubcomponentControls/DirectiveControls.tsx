import React, { FC } from 'react'
import { Control, EmailSubComponentControlsProps, SELECT_VARIANT_CLASSNAME } from './shared'
import { useSubComponentControlOptions } from '.'
import { VisuallyHidden } from '@reach/visually-hidden'
import { useDirectiveValue } from 'src/templates/EmailTemplateSubComponents/Directive'
import { Select } from 'src/ui/'
import { SubComponentControlToggle } from './SubComponentControlToggle'
import { DirectiveVariant } from 'src/appTypes'

export const DirectiveControls: FC<EmailSubComponentControlsProps<'Directive'>> = ({
  emailSubComponent,
}) => {
  const htmlId = `select-${emailSubComponent.id}`
  const [value, setValue] = useDirectiveValue(emailSubComponent)

  useSubComponentControlOptions(emailSubComponent, value, setValue)

  return (
    <Control.Group>
      <Control.Container>
        <VisuallyHidden>
          <span id={htmlId}>Directive variant</span>
        </VisuallyHidden>

        <Select
          className={SELECT_VARIANT_CLASSNAME}
          labelId={htmlId}
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
        </>
      )}
    </Control.Group>
  )
}
