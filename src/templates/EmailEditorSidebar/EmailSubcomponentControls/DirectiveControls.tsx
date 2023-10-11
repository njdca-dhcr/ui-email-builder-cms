import React, { FC } from 'react'
import { EmailSubComponentControlsProps } from './shared'
import { VisuallyHidden } from '@reach/visually-hidden'
import { buildSubComponentKey } from 'src/utils/emailPartKeys'
import {
  DirectiveVariant,
  useDirectiveValue,
} from 'src/templates/EmailTemplateSubComponents/Directive'
import { Select } from 'src/ui/Select'

export const DirectiveControls: FC<EmailSubComponentControlsProps> = ({ componentId, id }) => {
  const htmlId = `select-${buildSubComponentKey(componentId, id)}`
  const [value, setValue] = useDirectiveValue(componentId, id)

  return (
    <>
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
    </>
  )
}
