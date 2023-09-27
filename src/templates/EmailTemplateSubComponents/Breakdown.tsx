import React, { CSSProperties, FC, useState } from 'react'
import { EmailSubComponentProps } from './shared'
import { EditableElement } from 'src/ui/EditableElement'
import { EmailTable } from 'src/ui/EmailTable'
import { Colors, Font } from '../styles'

export const Breakdown: FC<EmailSubComponentProps> = ({}) => {
  const [overpaymentLabel, setOverpaymentLabel] = useState('')
  return (
    <EmailTable style={tableStyles}>
      <tbody>
        <tr>
          <EditableElement
            element="td"
            defaultValue="Overpayment Total"
            value={overpaymentLabel}
            onValueChange={setOverpaymentLabel}
            style={overpaymentStyles}
          />
          <EditableElement
            align="right"
            element="td"
            defaultValue="$200"
            value={''}
            onValueChange={() => {}}
            style={overpaymentStyles}
          />
        </tr>
        <tr>
          <EditableElement
            element="td"
            defaultValue="Amount waived"
            value={''}
            onValueChange={() => {}}
            style={waivedStyles}
          />
          <EditableElement
            align="right"
            element="td"
            defaultValue="$50"
            value={''}
            onValueChange={() => {}}
            style={waivedStyles}
          />
        </tr>
        <tr>
          <EditableElement
            element="td"
            defaultValue="You must pay"
            value={''}
            onValueChange={() => {}}
            style={mustPayStyles}
          />
          <EditableElement
            align="right"
            element="td"
            defaultValue="$150"
            value={''}
            onValueChange={() => {}}
            style={mustPayStyles}
          />
        </tr>
      </tbody>
    </EmailTable>
  )
}

const tableStyles: CSSProperties = {
  color: Colors.black,
  fontFamily: Font.family.default,
  paddingTop: 16,
  width: 261,
}

const overpaymentStyles: CSSProperties = {
  fontSize: 13,
  fontWeight: Font.weight.normal,
  lineHeight: '20px',
  paddingBottom: 5,
}

const waivedStyles: CSSProperties = {
  fontSize: 13,
  fontWeight: Font.weight.bold,
  lineHeight: '20px',
  borderBottom: `2px solid ${Colors.black}`,
  paddingBottom: 10,
}

const mustPayStyles: CSSProperties = {
  fontSize: 16,
  fontWeight: Font.weight.bold,
  lineHeight: '24px',
  paddingTop: 5,
}
