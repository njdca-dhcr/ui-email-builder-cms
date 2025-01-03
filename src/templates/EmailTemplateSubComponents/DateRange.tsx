import React, { FC, CSSProperties } from 'react'
import { useIsCurrentlyActiveEmailPart } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentFor } from '../EmailPartsContent'
import { StyleDefaults, Text, Spacing } from '../styles'
import { EmailBlock, EditableElement } from 'src/ui'
import { EmailSubComponentProps } from './shared'
import { EmailParts } from 'src/appTypes'

const { Row } = EmailBlock

export const useDateRangeValue = (emailSubComponent: EmailParts.DateRange) => {
  return useEmailPartsContentFor(emailSubComponent)
}

export const DateRange: FC<EmailSubComponentProps<'DateRange'>> = ({
  emailSubComponent,
  readOnly,
}) => {
  const { activate } = useIsCurrentlyActiveEmailPart(emailSubComponent.id)
  const [value, setValue] = useDateRangeValue(emailSubComponent)

  return (
    <Row
      className="date-range"
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
        onValueChange={(range) => setValue({ ...value, range })}
        style={styles}
        value={value.range}
        readOnly={readOnly}
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
