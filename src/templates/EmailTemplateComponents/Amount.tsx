import React, { CSSProperties, FC } from 'react'
import { EmailComponentProps } from './shared'
import { EditableElement } from 'src/ui/EditableElement'
import { Colors, DefaultStyles, Font } from '../styles'
import { WarningIcon } from 'src/ui/WarningIcon'
import { EmailTable, TableAndCell } from 'src/ui/EmailTable'
import { useIsCurrentlyActiveEmailComponent } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentForComponent } from '../EmailPartsContent'

export const Amount: FC<EmailComponentProps> = ({ children, id }) => {
  const { activate } = useIsCurrentlyActiveEmailComponent(id)
  const defaultValue = 'You owe $200'
  const [value, setValue] = useEmailPartsContentForComponent(id, defaultValue)
  return (
    <tr>
      <td style={containerCellStyles}>
        <TableAndCell style={containerTableStyles} maxWidth={345}>
          <EmailTable>
            <tr>
              <td style={iconStyles} align="center">
                <WarningIcon />
              </td>
              <td onClick={activate} style={amountStyles}>
                <TableAndCell>
                  <EditableElement
                    defaultValue={defaultValue}
                    element="div"
                    onValueChange={setValue}
                    value={value}
                  />
                </TableAndCell>
              </td>
            </tr>
            <tr>
              <td />
              <td>
                <TableAndCell>{children}</TableAndCell>
              </td>
            </tr>
          </EmailTable>
        </TableAndCell>
      </td>
    </tr>
  )
}

const containerCellStyles: CSSProperties = {
  ...DefaultStyles,
  paddingRight: 10,
  paddingTop: 10,
  paddingBottom: 20,
}

const containerTableStyles: CSSProperties = {
  backgroundColor: Colors.warningBackground,
  borderLeft: `8px solid ${Colors.warning}`,
  padding: 16,
  paddingRight: 25,
}

const iconAndAmountStyles: CSSProperties = {
  verticalAlign: 'center',
}

const iconStyles: CSSProperties = {
  ...iconAndAmountStyles,
  paddingRight: 16,
  width: 32,
}

const amountStyles: CSSProperties = {
  ...iconAndAmountStyles,
  fontWeight: Font.weight.bold,
  fontSize: 22,
}
