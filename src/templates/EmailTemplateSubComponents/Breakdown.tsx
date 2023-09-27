import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { EditableElement } from 'src/ui/EditableElement'
import { EmailTable, TableAndCell } from 'src/ui/EmailTable'
import { Colors, Font } from '../styles'
import { useIsCurrentlyActiveEmailSubComponent } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentForSubComponent } from '../EmailPartsContent'

interface Value {
  overpaymentLabel: string
  overpaymentAmount: string
  waivedLabel: string
  waivedAmount: string
  mustPayLabel: string
  mustPayAmount: string
}

export const Breakdown: FC<EmailSubComponentProps> = ({ componentId, id }) => {
  const { activate } = useIsCurrentlyActiveEmailSubComponent(componentId, id)
  const defaultValue: Value = {
    overpaymentLabel: 'Overpayment Total',
    overpaymentAmount: '$200',
    waivedLabel: 'Amount waived',
    waivedAmount: '$50',
    mustPayLabel: 'You must pay',
    mustPayAmount: '$150',
  }
  const [value, setValue] = useEmailPartsContentForSubComponent(componentId, id, defaultValue)

  return (
    <TableAndCell style={containerStyles}>
      <EmailTable onClick={activate} maxWidth={273}>
        <tr>
          <EditableElement
            element="td"
            defaultValue={defaultValue.overpaymentLabel}
            value={value.overpaymentLabel}
            onValueChange={(overpaymentLabel) => setValue({ ...value, overpaymentLabel })}
            style={overpaymentStyles}
          />
          <EditableElement
            align="right"
            element="td"
            defaultValue={defaultValue.overpaymentAmount}
            value={value.overpaymentAmount}
            onValueChange={(overpaymentAmount) => setValue({ ...value, overpaymentAmount })}
            style={overpaymentStyles}
          />
        </tr>
        <tr>
          <EditableElement
            element="td"
            defaultValue={defaultValue.waivedLabel}
            value={value.waivedLabel}
            onValueChange={(waivedLabel) => setValue({ ...value, waivedLabel })}
            style={waivedStyles}
          />
          <EditableElement
            align="right"
            element="td"
            defaultValue={defaultValue.waivedAmount}
            value={value.waivedAmount}
            onValueChange={(waivedAmount) => setValue({ ...value, waivedAmount })}
            style={waivedStyles}
          />
        </tr>
        <tr>
          <EditableElement
            element="td"
            defaultValue={defaultValue.mustPayLabel}
            value={value.mustPayLabel}
            onValueChange={(mustPayLabel) => setValue({ ...value, mustPayLabel })}
            style={mustPayStyles}
          />
          <EditableElement
            align="right"
            element="td"
            defaultValue={defaultValue.mustPayAmount}
            value={value.mustPayAmount}
            onValueChange={(mustPayAmount) => setValue({ ...value, mustPayAmount })}
            style={mustPayStyles}
          />
        </tr>
      </EmailTable>
    </TableAndCell>
  )
}

const containerStyles: CSSProperties = {
  paddingTop: 20,
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
