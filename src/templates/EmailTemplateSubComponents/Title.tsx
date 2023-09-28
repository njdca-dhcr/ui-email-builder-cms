import React, { FC, CSSProperties } from 'react'
import { EmailSubComponentProps } from './shared'
import { useIsCurrentlyActiveEmailSubComponent } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentForSubComponent } from '../EmailPartsContent'
import { Font, DefaultStyles, Spacing } from '../styles'
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
            <td style={cellContainerStyles}>
              <EditableElement
                defaultValue={defaultValue}
                element="h1"
                onValueChange={setValue}
                style={styles}
                value={value}
                onClick={activate}
              />
            </td>
          </tr>
        </EmailTable>
      </td>
    </tr>
  )
}

const cellContainerStyles: CSSProperties = {
  ...DefaultStyles,
  paddingBottom: Spacing.size.large,
  paddingTop: Spacing.size.large,
}

const styles: CSSProperties = {
  fontSize: Font.size.title,
  fontWeight: Font.weight.bold,
  margin: 0,
  padding: 0,
}
