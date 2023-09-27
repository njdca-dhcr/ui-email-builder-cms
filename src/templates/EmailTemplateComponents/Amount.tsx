import React, { CSSProperties, FC, useState } from 'react'
import { EmailComponentProps } from './shared'
import { EditableElement } from 'src/ui/EditableElement'
import { Colors, Font } from '../styles'
import { WarningIcon } from 'src/ui/WarningIcon'
import { EmailTable } from 'src/ui/EmailTable'

export const Amount: FC<EmailComponentProps> = ({ children }) => {
  const [value, setValue] = useState('')
  return (
    <tr>
      <td>
        <EmailTable style={tableStyles} width={'unset'}>
          <tbody>
            <tr>
              <td style={iconStyles} align="center">
                <WarningIcon />
              </td>
              <td style={amountStyles}>
                <EditableElement
                  defaultValue="You owe $200"
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
