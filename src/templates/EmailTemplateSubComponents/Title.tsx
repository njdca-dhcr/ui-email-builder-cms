import React, { FC, CSSProperties } from 'react'
import { EmailSubComponentProps } from './shared'
import { useIsCurrentlyActiveEmailSubComponent } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentForSubComponent } from '../EmailPartsContent'
import { Colors, Font } from '../styles'
import { EditableElement } from 'src/ui/EditableElement'

export const Title: FC<EmailSubComponentProps> = ({ id, componentId }) => {
  const { isActive, focus } = useIsCurrentlyActiveEmailSubComponent(componentId, id)
  const [title, setTitle] = useEmailPartsContentForSubComponent(componentId, id, 'Title')

  return (
    <tr>
      <td onClick={focus}>
        <EditableElement
          defaultValue="Title"
          element="div"
          onValueChange={setTitle}
          style={styles}
          value={title}
        />
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
