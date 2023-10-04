import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { EditableElement } from 'src/ui/EditableElement'
import { EmailTable, TableAndCell } from 'src/ui/EmailTable'
import { Colors, Font, Spacing } from '../styles'
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
  const [value, setValue, { initialValue }] = useEmailPartsContentForSubComponent(
    componentId,
    id,
    defaultValue,
  )

  return (
    <TableAndCell style={containerStyles}>
      <EmailTable onClick={activate} maxWidth={273}>
        <tr>
          <EditableElement
            element="td"
            initialValue={initialValue.overpaymentLabel}
            label="Owed label"
            onValueChange={(overpaymentLabel) => setValue({ ...value, overpaymentLabel })}
            style={overpaymentStyles}
            value={value.overpaymentLabel}
          />
          <EditableElement
            align="right"
            element="td"
            initialValue={initialValue.overpaymentAmount}
            label="Owed amount"
            onValueChange={(overpaymentAmount) => setValue({ ...value, overpaymentAmount })}
            style={overpaymentStyles}
            value={value.overpaymentAmount}
          />
        </tr>
        <tr>
          <EditableElement
            element="td"
            initialValue={initialValue.waivedLabel}
            label="Waived label"
            onValueChange={(waivedLabel) => setValue({ ...value, waivedLabel })}
            style={waivedStyles}
            value={value.waivedLabel}
          />
          <EditableElement
            align="right"
            element="td"
            initialValue={initialValue.waivedAmount}
            label="Waived amount"
            onValueChange={(waivedAmount) => setValue({ ...value, waivedAmount })}
            style={waivedStyles}
            value={value.waivedAmount}
          />
        </tr>
        <tr>
          <EditableElement
            element="td"
            initialValue={initialValue.mustPayLabel}
            label="Must pay label"
            onValueChange={(mustPayLabel) => setValue({ ...value, mustPayLabel })}
            style={mustPayStyles}
            value={value.mustPayLabel}
          />
          <EditableElement
            align="right"
            element="td"
            initialValue={initialValue.mustPayAmount}
            label="Must pay amount"
            onValueChange={(mustPayAmount) => setValue({ ...value, mustPayAmount })}
            style={mustPayStyles}
            value={value.mustPayAmount}
          />
        </tr>
      </EmailTable>
    </TableAndCell>
  )
}

const containerStyles: CSSProperties = {
  paddingTop: Spacing.size.large,
}

const overpaymentStyles: CSSProperties = {
  fontSize: Font.size.small,
  fontWeight: Font.weight.normal,
  lineHeight: '20px',
  paddingBottom: Spacing.size.tiny,
}

const waivedStyles: CSSProperties = {
  fontSize: Font.size.small,
  fontWeight: Font.weight.bold,
  lineHeight: '20px',
  borderBottom: `2px solid ${Colors.black}`,
  paddingBottom: Spacing.size.small,
}

const mustPayStyles: CSSProperties = {
  fontSize: Font.size.medium,
  fontWeight: Font.weight.bold,
  lineHeight: '24px',
  paddingTop: Spacing.size.tiny,
}
