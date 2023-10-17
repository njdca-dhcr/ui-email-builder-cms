import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { useIsCurrentlyActiveEmailSubComponent } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentForSubComponent } from '../EmailPartsContent'
import { Font, Spacing, StyleDefaults } from '../styles'
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
          style: StyleDefaults.inline.fontAndColors,
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

const containerStyles: CSSProperties = {
  marginTop: 10,
  marginBottom: 20,
}

const styles: CSSProperties = {
  backgroundColor: '#CCBDDF',
  borderRadius: 3,
  fontSize: Font.size.small,
  fontWeight: Font.weight.bold,
  lineHeight: Font.lineHeight.default,
  paddingBottom: Spacing.size.tiny,
  paddingTop: Spacing.size.tiny,
  paddingLeft: Spacing.size.small,
  paddingRight: Spacing.size.small,
}
