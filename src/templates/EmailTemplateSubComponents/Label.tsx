import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { useIsCurrentlyActiveEmailSubComponent } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentForSubComponent } from '../EmailPartsContent'
import { Colors, DefaultStyles, Font, Spacing } from '../styles'
import { EditableElement } from 'src/ui/EditableElement'
import { EmailTable } from 'src/ui/EmailTable'

export const Label: FC<EmailSubComponentProps> = ({ id, componentId }) => {
  const { activate } = useIsCurrentlyActiveEmailSubComponent(componentId, id)
  const defaultValue = 'Label'
  const [label, setLabel] = useEmailPartsContentForSubComponent(componentId, id, defaultValue)

  return (
    <tr>
      <td>
        <EmailTable style={containerStyles} width="unset">
          <tr>
            <EditableElement
              defaultValue={defaultValue}
              element="td"
              onValueChange={setLabel}
              style={styles}
              value={label}
              onClick={activate}
            />
          </tr>
        </EmailTable>
      </td>
    </tr>
  )
}

const containerStyles: CSSProperties = {
  ...DefaultStyles,
  marginTop: 10,
  marginBottom: 20,
}

const styles: CSSProperties = {
  backgroundColor: '#CCBDDF',
  borderRadius: 3,
  fontSize: Font.size.small,
  fontWeight: Font.weight.bold,
  lineHeight: '150%',
  paddingBottom: Spacing.size.tiny,
  paddingTop: Spacing.size.tiny,
  paddingLeft: Spacing.size.small,
  paddingRight: Spacing.size.small,
}
