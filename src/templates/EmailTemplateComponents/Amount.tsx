import React, { CSSProperties, FC } from 'react'
import { EmailComponentProps } from './shared'
import { EditableElement } from 'src/ui/EditableElement'
import { Colors, Font } from '../styles'
import { WarningIcon } from 'src/ui/WarningIcon'
import { EmailTable } from 'src/ui/EmailTable'
import { useIsCurrentlyActiveEmailComponent } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentForComponent } from '../EmailPartsContent'

export const Amount: FC<EmailComponentProps> = ({ children, id }) => {
  const { activate } = useIsCurrentlyActiveEmailComponent(id)
  const defaultValue = 'You owe $200'
  const [value, setValue] = useEmailPartsContentForComponent(id, defaultValue)
  return (
    <tr>
      <td>
        <EmailTable style={tableStyles} width={'unset'}>
          <tbody>
            <tr>
              <td style={iconStyles} align="center">
                <WarningIcon />
              </td>
              <td style={amountStyles} onClick={activate}>
                <EditableElement
                  defaultValue={defaultValue}
                  element="div"
                  onValueChange={setValue}
                  value={value}
                />
              </td>
            </tr>
            <tr>
              <td />
              <td style={{ paddingRight: 6 }}>{children}</td>
            </tr>
          </tbody>
        </EmailTable>
      </td>
    </tr>
  )
}

const tableStyles: CSSProperties = {
  backgroundColor: Colors.warningBackground,
  borderLeft: `8px solid ${Colors.warning}`,
  color: Colors.black,
  fontFamily: Font.family.default,
  padding: 16,
  margin: '10px 0',
}

const iconStyles: CSSProperties = {
  paddingRight: 16,
}

const amountStyles: CSSProperties = {
  fontWeight: Font.weight.bold,
  fontSize: 22,
  lineHeight: '26px',
}
