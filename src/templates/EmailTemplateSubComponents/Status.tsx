import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { EmailTable, TableAndCell } from 'src/ui/EmailTable'
import { EditableElement } from 'src/ui/EditableElement'
import { useIsCurrentlyActiveEmailSubComponent } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentForSubComponent } from '../EmailPartsContent'
import { Colors, DefaultStyles, Font } from '../styles'

const defaultValue = {
  title: 'Received & Under Review',
  description:
    'It may take up to 2 weeks to determine if payment can be processed for the week(s) in question',
}

export const Status: FC<EmailSubComponentProps> = ({ componentId, id }) => {
  const { activate } = useIsCurrentlyActiveEmailSubComponent(componentId, id)
  const [value, setValue] = useEmailPartsContentForSubComponent(componentId, id, defaultValue)

  return (
    <tr onClick={activate}>
      <td style={outerCellStyles}>
        <TableAndCell style={innerCellStyles}>
          <EmailTable>
            <tr>
              <EditableElement
                data-testid="body-status-title"
                element="td"
                defaultValue={defaultValue.title}
                value={value.title}
                onValueChange={(title) => setValue({ ...value, title })}
                style={titleStyles}
              />
            </tr>
            <tr>
              <EditableElement
                data-testid="body-status-description"
                element="td"
                defaultValue={defaultValue.description}
                value={value.description}
                onValueChange={(description) => setValue({ ...value, description })}
              />
            </tr>
          </EmailTable>
        </TableAndCell>
      </td>
    </tr>
  )
}

const outerCellStyles: CSSProperties = {
  ...DefaultStyles,
  paddingBottom: 16,
  paddingTop: 16,
}

const innerCellStyles: CSSProperties = {
  paddingLeft: 12,
  borderLeft: `8px solid ${Colors.grayDark}`,
  paddingTop: 10,
  paddingBottom: 10,
}

const titleStyles: CSSProperties = {
  fontSize: 32,
  fontWeight: Font.weight.bold,
  lineHeight: '40px',
  paddingBottom: 10,
}
