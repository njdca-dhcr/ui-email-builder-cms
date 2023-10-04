import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { useIsCurrentlyActiveEmailSubComponent } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentForSubComponent } from '../EmailPartsContent'
import { DefaultStyles, Font, Spacing } from '../styles'
import { EditableElement } from 'src/ui/EditableElement'
import { EmailTable } from 'src/ui/EmailTable'

const defaultValue = 'Program Name'

export const ProgramName: FC<EmailSubComponentProps> = ({ id, componentId }) => {
  const { activate } = useIsCurrentlyActiveEmailSubComponent(componentId, id)
  const [value, setValue, { initialValue }] = useEmailPartsContentForSubComponent(
    componentId,
    id,
    defaultValue,
  )

  return (
    <tr>
      <td>
        <EmailTable style={containerStyles} width="unset">
          <tr>
            <EditableElement
              initialValue={initialValue}
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
