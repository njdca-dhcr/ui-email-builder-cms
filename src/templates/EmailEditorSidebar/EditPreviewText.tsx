import React, { FC } from 'react'
import { usePreviewText } from '../PreviewText'
import './EditPreviewText.css'
import { VisuallyHidden } from '@reach/visually-hidden'
import { SpacedSidebarContainer } from 'src/ui/Layout'

export const EditPreviewText: FC = () => {
  const id = 'edit-preview-text'
  const [value, setValue] = usePreviewText()

  return (
    <SpacedSidebarContainer className="edit-preview-text">
      <div className="edit-preview-text-content">
        <h2>Preview Text</h2>
        <p className="description">1-2 sentences that will preview the content of your email</p>
        <div className="subject-and-preview">
          <p className="subject">[Subject Line] Don't forget this on your platform!</p>
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
        <div className="suggestion-and-count">
          <p>80-120 characters is ideal</p>
          <p>
            {value.length}
            <VisuallyHidden>characters total</VisuallyHidden>
          </p>
        </div>
      </div>
    </SpacedSidebarContainer>
  )
}
