import React, { FC, CSSProperties } from 'react'
import { EmailSubComponentProps } from './shared'
import { useIsCurrentlyActiveEmailSubComponent } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentForSubComponent } from '../EmailPartsContent'
import { Font, DefaultStyles } from '../styles'
import { EditableElement } from 'src/ui/EditableElement'
import { EmailTable } from 'src/ui/EmailTable'

export const Title: FC<EmailSubComponentProps> = ({ id, componentId }) => {
  const { activate } = useIsCurrentlyActiveEmailSubComponent(componentId, id)
  const defaultValue = 'Title'
  const [value, setValue] = useEmailPartsContentForSubComponent(componentId, id, defaultValue)

  return (
    <tr>
      <td>
        <EmailTable>
          <tr>
            <EditableElement
              defaultValue={defaultValue}
              element="td"
              onValueChange={setValue}
              style={styles}
              value={value}
              onClick={activate}
            />
          </tr>
        </EmailTable>
      </td>
    </tr>
  )
}

const styles: CSSProperties = {
  ...DefaultStyles,
  fontSize: Font.size.large,
  fontWeight: Font.weight.bold,
  paddingBottom: 20,
  paddingTop: 20,
}
