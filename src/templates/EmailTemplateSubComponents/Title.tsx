import React, { FC, CSSProperties } from 'react'
import { EmailSubComponentProps } from './shared'
import { useIsCurrentlyActiveEmailSubComponent } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentForSubComponent } from '../EmailPartsContent'
import { Colors, Font } from '../styles'
import { EditableElement } from 'src/ui/EditableElement'

export const Title: FC<EmailSubComponentProps> = ({ id, componentId }) => {
  const { activate } = useIsCurrentlyActiveEmailSubComponent(componentId, id)
  const defaultValue = 'Title'
  const [value, setValue] = useEmailPartsContentForSubComponent(componentId, id, defaultValue)

  return (
    <tr>
      <td onClick={activate}>
        <EditableElement
          defaultValue={defaultValue}
          element="div"
          onValueChange={setValue}
          style={styles}
          value={value}
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
