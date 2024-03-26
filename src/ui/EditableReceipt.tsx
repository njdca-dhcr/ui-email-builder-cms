import React, { CSSProperties, FC } from 'react'
import { EmailBlock } from './EmailBlock'
import { EditableElement } from './EditableElement'
import { Colors, Font, Spacing, Text } from 'src/templates/styles'

export interface ReceiptLineItem {
  bold?: boolean
  italic?: boolean
  label: string
  value: string
}

interface Props {
  lineItems: ReceiptLineItem[]
  total: ReceiptLineItem
  onLineItemChange: (index: number, part: 'label' | 'value', value: string) => void
  onTotalChange: (part: 'label' | 'value', value: string) => void
}

const { Table, Row } = EmailBlock

export const EditableReceipt: FC<Props> = ({
  lineItems,
  total,
  onLineItemChange,
  onTotalChange,
}) => {
  return (
    <Table role="table">
      {lineItems.map((lineItem, i) => (
        <Row key={i} role="row">
          <EditableElement
            align="left"
            role="rowheader"
            element="td"
            label={`Line item label ${i + 1}`}
            value={lineItem.label}
            onValueChange={(newValue) => onLineItemChange(i, 'label', newValue)}
            style={{ ...styles.amountLineItemLabel, ...additionalStyles(lineItem) }}
          />
          <EditableElement
            align="right"
            role="cell"
            element="td"
            label={`Line item value ${i + 1}`}
            value={lineItem.value}
            onValueChange={(newValue) => onLineItemChange(i, 'value', newValue)}
            style={{ ...styles.amountLineItemValue, ...additionalStyles(lineItem) }}
          />
        </Row>
      ))}
      <Row key="total" role="row">
        <EditableElement
          align="left"
          role="rowheader"
          element="td"
          label="Total label"
          value={total.label}
          onValueChange={(newValue) => onTotalChange('label', newValue)}
          style={{ ...styles.total, ...additionalStyles(total) }}
        />
        <EditableElement
          align="right"
          role="cell"
          element="td"
          label="Total value"
          value={total.value}
          onValueChange={(newValue) => onTotalChange('value', newValue)}
          style={{ ...styles.total, ...additionalStyles(total) }}
        />
      </Row>
    </Table>
  )
}

const additionalStyles = (options: { bold?: boolean; italic?: boolean }): CSSProperties => {
  return {
    fontWeight: options.bold ? Font.weight.bold : Font.weight.regular,
    fontStyle: options.italic ? 'italic' : 'normal',
  }
}

const styles = {
  amountLineItemLabel: {
    ...Text.caption.large.regular,
    paddingBottom: Spacing.size.tiny,
  } as CSSProperties,
  amountLineItemValue: {
    ...Text.caption.large.regular,
    paddingBottom: Spacing.size.tiny,
  } as CSSProperties,
  total: {
    ...Text.body.main.regular,
    borderTop: `1px solid ${Colors.black}`,
    paddingTop: Spacing.size.tiny,
  } as CSSProperties,
}
