import React, { FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { useIsCurrentlyActiveEmailSubComponent } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentForSubComponent } from '../EmailPartsContent'
import { VisuallyHidden } from '@reach/visually-hidden'
import { useShouldShowEmailSubComponent } from '../ShouldShowEmailPart'

export const Title: FC<EmailSubComponentProps> = ({ id, componentId }) => {
  const { isActive, focus } = useIsCurrentlyActiveEmailSubComponent(componentId, id)
  const shouldShow = useShouldShowEmailSubComponent(componentId, id)
  const [title, setTitle] = useEmailPartsContentForSubComponent(componentId, id, 'Title')

  if (!shouldShow.on) return null

  return (
    <tr>
      <td onClick={focus}>
        {isActive ? (
          <label>
            <VisuallyHidden>Title</VisuallyHidden>
            <textarea value={title} onChange={(event) => setTitle(event.target.value)} />
          </label>
        ) : (
          title
        )}
      </td>
    </tr>
  )
}
