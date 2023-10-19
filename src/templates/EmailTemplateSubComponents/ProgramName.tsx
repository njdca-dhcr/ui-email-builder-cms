import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { useIsCurrentlyActiveEmailSubComponent } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentForSubComponent } from '../EmailPartsContent'
import { Font, Spacing, StyleDefaults, Text } from '../styles'
import { EditableElement } from 'src/ui/EditableElement'
import { EmailBlock } from 'src/ui'

const defaultValue = 'Program Name'

const { Table, Row } = EmailBlock

export const ProgramName: FC<EmailSubComponentProps> = ({ id, componentId }) => {
  const { activate } = useIsCurrentlyActiveEmailSubComponent(componentId, id)
  const [value, setValue, { initialValue }] = useEmailPartsContentForSubComponent(
    componentId,
    id,
    defaultValue,
  )

  return (
    <Row
      elements={[
        {
          part: 'cell',
          style: StyleDefaults.inline.colors,
          className: StyleDefaults.layout.narrow,
        },
      ]}
    >
      <Table style={containerStyles} width="unset" elements={['row']}>
        <EditableElement
          element="td"
          initialValue={initialValue}
          label="Program name"
          onClick={activate}
          onValueChange={setValue}
          style={styles}
          value={value}
        />
      </Table>
    </Row>
  )
}

const containerStyles: CSSProperties = {}

const styles: CSSProperties = {
  ...Text.header.h6.bold,
  backgroundColor: '#CCBDDF',
  borderRadius: 3,
  paddingBottom: Spacing.size.tiny,
  paddingTop: Spacing.size.tiny,
  paddingLeft: Spacing.size.small,
  paddingRight: Spacing.size.small,
}
