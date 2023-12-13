import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { useIsCurrentlyActiveEmailPart } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentFor } from '../EmailPartsContent'
import { Colors, Spacing, StyleDefaults, Text } from '../styles'
import { EditableElement } from 'src/ui/EditableElement'
import { EmailBlock } from 'src/ui'
import { textColorForBackground } from 'src/utils/textColorForBackground'

interface ProgramNameValue {
  name: string
  backgroundColor: string
}

const defaultValue: ProgramNameValue = {
  name: 'Program Name',
  backgroundColor: '#CCBDDF',
}

const { Table, Row } = EmailBlock

export const useProgramNameValue = (id: string) => {
  return useEmailPartsContentFor(id, defaultValue)
}

export const ProgramName: FC<EmailSubComponentProps> = ({ emailSubComponent }) => {
  const { activate } = useIsCurrentlyActiveEmailPart(emailSubComponent.id)
  const [value, setValue] = useProgramNameValue(emailSubComponent.id)

  const color = textColorForBackground(value.backgroundColor, {
    dark: Colors.black,
    light: Colors.white,
  })

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
          aria-level={2}
          element="td"
          label="Program name"
          onClick={activate}
          onFocus={activate}
          onValueChange={(name) => setValue({ ...value, name })}
          role="heading"
          style={{ ...styles, color, backgroundColor: value.backgroundColor }}
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
