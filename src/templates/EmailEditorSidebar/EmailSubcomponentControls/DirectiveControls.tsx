import React, { FC } from 'react'
import { EmailSubComponentControlsProps } from './shared'
import { VisuallyHidden } from '@reach/visually-hidden'
import { buildSubComponentKey } from 'src/utils/emailPartKeys'
import {
  DirectiveVariant,
  useDirectiveValue,
} from 'src/templates/EmailTemplateSubComponents/Directive'
import { Input, Select } from 'src/ui/'
import { SubComponentControlToggle } from './SubComponentControlToggle'

export const DirectiveControls: FC<EmailSubComponentControlsProps> = ({ componentId, id }) => {
  const htmlId = `select-${buildSubComponentKey(componentId, id)}`
  const [value, setValue] = useDirectiveValue(componentId, id)

  return (
    <>
      <SubComponentControlToggle
        className="directive-title-toggle"
        subComponentId={id}
        label="+ Title"
        onChange={(showTitle) => setValue({ ...value, showTitle })}
        value={value.showTitle}
      />
      <VisuallyHidden>
        <span id={htmlId}>Directive variant</span>
      </VisuallyHidden>

      <Select
        labelId={htmlId}
        options={[
          { label: 'One Step', value: DirectiveVariant.OneStep + '' },
          { label: 'Three Steps', value: DirectiveVariant.ThreeStep + '' },
          {
            label: 'Three Steps w/ Step 2 Expansion',
            value: DirectiveVariant.StepTwoExpansion + '',
          },
          // { label: 'Cost Breakdown', value: DirectiveVariant.CostBreakdown + '' },
          { label: 'Pay Online', value: DirectiveVariant.PayOnline + '' },
        ]}
        onChange={(newValue) => setValue({ ...value, variant: parseInt(newValue) })}
        value={value.variant + ''}
      />

      {[DirectiveVariant.ThreeStep, DirectiveVariant.StepTwoExpansion].includes(value.variant) && (
        <>
          <SubComponentControlToggle
            className="directive-addl-content-toggle"
            subComponentId={id}
            label="Step 1 Additional Content"
            onChange={(showStep1AdditionalContent) => setValue({ ...value, showStep1AdditionalContent })}
            value={value.showStep1AdditionalContent}
          />
          <SubComponentControlToggle
            className="directive-addl-content-toggle"
            subComponentId={id}
            label="Step 2 Additional Content"
            onChange={(showStep2AdditionalContent) => setValue({ ...value, showStep2AdditionalContent })}
            value={value.showStep2AdditionalContent}
          />
          <SubComponentControlToggle
            className="directive-addl-content-toggle"
            subComponentId={id}
            label="Step 3 Additional Content"
            onChange={(showStep3AdditionalContent) => setValue({ ...value, showStep3AdditionalContent })}
            value={value.showStep3AdditionalContent}
          />
        </>
      )}

      <label htmlFor="directive-link-input">Link</label>
      <Input
        className="directive-link-input"
        onTextChange={(linkHref) => setValue({ ...value, linkHref })}
        value={value.linkHref}
      />
    </>
  )
}
