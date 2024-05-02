import React, { FC } from 'react'
import { usePreviewText } from '../PreviewText'
import './EditPreviewText.css'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

export const EditPreviewText: FC = () => {
  const headingId = 'edit-preview-text'
  const descriptionId = 'preview-text-description'
  const characterCountId = 'preview-text-character-count'
  const [value, setValue] = usePreviewText()

  return (
    <div className="edit-preview-text">
      <div className="edit-preview-text-heading-container">
        <h2 id={headingId}>Preview Text</h2>
        <p id={descriptionId}>80-120 characters is ideal</p>
      </div>
      <div className="edit-preview-text-text-area-container">
        <textarea
          aria-describedby={[descriptionId, characterCountId].join(' ')}
          aria-labelledby={headingId}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="This is the preview text that you can edit. It gives insight into the email so that people will open it."
        />
        <p id={characterCountId}>
          {value.length}
          <VisuallyHidden>characters total</VisuallyHidden>
        </p>
      </div>
    </div>
  )
}
