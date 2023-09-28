import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { useIsCurrentlyActiveEmailSubComponent } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentForSubComponent } from '../EmailPartsContent'
import { DefaultStyles } from '../styles'
import { EditableElement } from 'src/ui/EditableElement'

export const AdditionalContent: FC<EmailSubComponentProps> = ({ id, componentId }) => {
  const defaultValue = 'Additional Content'
  const { activate } = useIsCurrentlyActiveEmailSubComponent(componentId, id)
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
  ...DefaultStyles,
  paddingBottom: 20,
}
