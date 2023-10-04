import React, { CSSProperties, FC } from 'react'
import { EmailComponentProps } from './shared'
import { EditableElement } from 'src/ui/EditableElement'
import { Colors, DefaultStyles, Font, Spacing } from '../styles'
import { WarningIcon } from 'src/ui/WarningIcon'
import { EmailTable, TableAndCell } from 'src/ui/EmailTable'
import { useIsCurrentlyActiveEmailComponent } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentForComponent } from '../EmailPartsContent'

const defaultValue = 'You owe $200'

export const Amount: FC<EmailComponentProps> = ({ children, id }) => {
  const { activate } = useIsCurrentlyActiveEmailComponent(id)
  const [value, setValue, { initialValue }] = useEmailPartsContentForComponent(id, defaultValue)

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
                    element="div"
                    initialValue={initialValue}
                    label="Amount title"
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
  paddingRight: Spacing.size.small,
  paddingTop: Spacing.size.small,
  paddingBottom: Spacing.size.large,
}

const containerTableStyles: CSSProperties = {
  backgroundColor: Colors.warningBackground,
  borderLeft: `8px solid ${Colors.warning}`,
  padding: Spacing.size.medium,
  paddingRight: Spacing.size.extraLarge,
}

const iconAndAmountStyles: CSSProperties = {
  verticalAlign: 'center',
}

const iconStyles: CSSProperties = {
  ...iconAndAmountStyles,
  paddingRight: Spacing.size.medium,
  width: 32,
}

const amountStyles: CSSProperties = {
  ...iconAndAmountStyles,
  fontWeight: Font.weight.bold,
  fontSize: Font.size.large,
}
