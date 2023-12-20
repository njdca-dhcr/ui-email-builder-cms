import React, { FC, CSSProperties } from 'react'
import { EditableElement } from 'src/ui/EditableElement'
import { useIsCurrentlyActiveEmailPart } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentFor } from '../EmailPartsContent'
import { StyleDefaults, Text, Spacing } from '../styles'
import { EmailBlock } from 'src/ui'
import { EmailSubComponentProps } from './shared'

const defaultValue = '[00/00/0000] - [00/00/0000]'

const { Row } = EmailBlock

export const useDateRangeValue = (id: string) => {
  return useEmailPartsContentFor(id, defaultValue)
}

export const DateRange: FC<EmailSubComponentProps> = ({ emailSubComponent }) => {
  const { activate } = useIsCurrentlyActiveEmailPart(emailSubComponent.id)
  const [value, setValue] = useDateRangeValue(emailSubComponent.id)

  return (
    <Row
      elements={[
        'cell',
        'table',
        'row',
        { part: 'cell', style: cellContainerStyles, className: StyleDefaults.layout.narrow },
      ]}
    >
      <EditableElement
        element="h3"
        label="Date Range"
        onClick={activate}
        onFocus={activate}
        onValueChange={setValue}
        style={styles}
        value={value}
      />
    </Row>
  )
}

const cellContainerStyles: CSSProperties = {
  ...StyleDefaults.inline.colors,
}

const styles: CSSProperties = {
  ...Text.header.h3.bold,
  lineHeight: 1,
  margin: 0,
  marginBottom: Spacing.size.tiny,
  padding: 0,
}
