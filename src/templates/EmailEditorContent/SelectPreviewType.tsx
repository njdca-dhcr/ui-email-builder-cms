import React, { FC, useState } from 'react'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Radio } from 'src/ui'

export type PreviewType = 'desktop' | 'mobile'

export const usePreviewType = () => {
  const [previewType, setPreviewType] = useState<PreviewType>('desktop')
  const isDesktop = previewType === 'desktop'
  const isMobile = !isDesktop

  return { current: previewType, onChange: setPreviewType, isDesktop, isMobile }
}

interface Props {
  current: PreviewType
  onChange: (value: PreviewType) => void
}

export const SelectPreviewType: FC<Props> = ({ current, onChange }) => {
  return (
    <Radio.Fieldset
      className="select-preview-type"
      legend="Select preview type"
      legendId="select-preview-type"
      renderLegend={(legend) => <VisuallyHidden>{legend}</VisuallyHidden>}
    >
      <Radio.Button
        checked={current === 'desktop'}
        label="Desktop"
        onChange={() => onChange('desktop')}
      />
      <Radio.Button
        checked={current === 'mobile'}
        label="Mobile"
        onChange={() => onChange('mobile')}
      />
    </Radio.Fieldset>
  )
}
