import React, { FC } from 'react'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Radio } from 'src/ui'

export type PreviewType = 'desktop' | 'mobile'

interface Props {
  previewType: PreviewType
  onChange: (previewType: PreviewType) => void
}

export const SelectPreviewType: FC<Props> = ({ previewType, onChange }) => {
  return (
    <Radio.Fieldset
      className="select-preview-type"
      legend="Select preview type"
      legendId="select-preview-type"
      renderLegend={(legend) => <VisuallyHidden>{legend}</VisuallyHidden>}
    >
      <Radio.Button
        checked={previewType === 'desktop'}
        label="Desktop"
        onChange={() => onChange('desktop')}
      />
      <Radio.Button
        checked={previewType === 'mobile'}
        label="Mobile"
        onChange={() => onChange('mobile')}
      />
    </Radio.Fieldset>
  )
}
