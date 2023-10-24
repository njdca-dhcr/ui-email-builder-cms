import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { useIsCurrentlyActiveEmailSubComponent } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentForSubComponent } from '../EmailPartsContent'
import { Font, Spacing, StyleDefaults, Text } from '../styles'
import { EditableElement } from 'src/ui/EditableElement'
import { EmailBlock } from 'src/ui'

interface ProgramNameValue {
  name: string
  backgroundColor: string
}

const defaultValue: ProgramNameValue = {
  name: 'Program Name',
  backgroundColor: '#CCBDDF',
}

const { Table, Row } = EmailBlock

export const useProgramNameValue = (componentId: string, id: string) => {
  return useEmailPartsContentForSubComponent(componentId, id, defaultValue)
}

export const ProgramName: FC<EmailSubComponentProps> = ({ id, componentId }) => {
  const { activate } = useIsCurrentlyActiveEmailSubComponent(componentId, id)
  const [value, setValue, { initialValue }] = useProgramNameValue(componentId, id)

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
      <Table width="unset" elements={['row']}>
        <EditableElement
          element="td"
          initialValue={initialValue.name}
          label="Program name"
          onClick={activate}
          onValueChange={(name) => setValue({ ...value, name })}
          style={{ ...styles, backgroundColor: value.backgroundColor }}
          value={value.name}
        />
      </Table>
    </Row>
  )
}

const styles: CSSProperties = {
  ...Text.header.h6.bold,
  borderRadius: '3px',
  paddingBottom: Spacing.size.tiny,
  paddingTop: Spacing.size.tiny,
  paddingLeft: Spacing.size.small,
  paddingRight: Spacing.size.small,
}
