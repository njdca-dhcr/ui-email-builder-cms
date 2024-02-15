import React, { FC } from 'react'
import { usePreviewText } from '../PreviewText'
import './EditPreviewText.css'
import { VisuallyHidden } from '@reach/visually-hidden'

export const EditPreviewText: FC = () => {
  const id = 'edit-preview-text'
  const [value, setValue] = usePreviewText()

  return (
    <div className="edit-preview-text">
      <h2>Preview Text</h2>
      <VisuallyHidden>
        <label htmlFor={id}>Preview text</label>
      </VisuallyHidden>
      <textarea
        id={id}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="This is the preview text that you can edit. It gives insight into the email so that people will open it."
      />
    </div>
  )
}
