import React, { FC, CSSProperties } from 'react'
import { EmailSubComponentProps } from './shared'
import { useIsCurrentlyActiveEmailSubComponent } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentForSubComponent } from '../EmailPartsContent'
import { useShouldShowEmailSubComponent } from '../ShouldShowEmailPart'
import { Colors, Font } from './styles'
import { InlineTextArea } from 'src/ui/InlineTextArea'

export const Title: FC<EmailSubComponentProps> = ({ id, componentId }) => {
  const { isActive, focus } = useIsCurrentlyActiveEmailSubComponent(componentId, id)
  const shouldShow = useShouldShowEmailSubComponent(componentId, id)
  const [title, setTitle] = useEmailPartsContentForSubComponent(componentId, id, 'Title')

  if (!shouldShow.on) return null

  return (
    <tr>
      <td onClick={focus} style={styles}>
        {isActive ? (
          <InlineTextArea
            autofocus
            label="Title"
            onChange={setTitle}
            value={title}
            style={styles}
          />
        ) : (
          title
        )}
      </td>
    </tr>
  )
}

const styles: CSSProperties = {
  color: Colors.black,
  fontFamily: Font.family.default,
  fontSize: Font.size.large,
  fontWeight: Font.weight.bold,
}
