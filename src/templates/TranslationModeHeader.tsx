import React, { FC } from 'react'
import { ExitTranslationModeButton } from './ExitTranslationModeButton'
import { PreviewType, SelectPreviewType } from './EmailEditorContent/SelectPreviewType'
import { BlackButton } from 'src/ui'

interface Props {
  previewType: PreviewType
  onPreviewTypeChange: (value: PreviewType) => void
}

export const TranslationModeHeader: FC<Props> = ({ previewType, onPreviewTypeChange }) => {
  return (
    <div className="translation-mode-header">
      <div />
      <SelectPreviewType current={previewType} onChange={onPreviewTypeChange} />
      <div className="exit-translation-mode-button-container">
        <ExitTranslationModeButton label="Exit Translation Mode" component={BlackButton} />
      </div>
    </div>
  )
}
