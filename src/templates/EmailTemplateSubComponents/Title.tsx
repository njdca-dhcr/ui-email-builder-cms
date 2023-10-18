import React, { FC, CSSProperties } from 'react'
import { EmailSubComponentProps } from './shared'
import { useIsCurrentlyActiveEmailSubComponent } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentForSubComponent } from '../EmailPartsContent'
import { Font, Spacing, SpacingCell, StyleDefaults } from '../styles'
import { EditableElement } from 'src/ui/EditableElement'
import { EmailBlock } from 'src/ui'

const defaultValue = 'Title'

const { Row } = EmailBlock

export const Title: FC<EmailSubComponentProps> = ({ id, componentId }) => {
  const { activate } = useIsCurrentlyActiveEmailSubComponent(componentId, id)
  const [value, setValue, { initialValue }] = useEmailPartsContentForSubComponent(
    componentId,
    id,
    defaultValue,
  )

  return (
    <>
      <Row
        elements={[
          'cell',
          'table',
          'row',
          { part: 'cell', style: cellContainerStyles, className: StyleDefaults.layout.narrow },
        ]}
      >
        <EditableElement
          element="h1"
          initialValue={initialValue}
          label="Title"
          onClick={activate}
          onValueChange={setValue}
          style={styles}
          value={value}
        />
      </Row>
      <Row>
        <SpacingCell size="medium" />
      </Row>
    </>
  )
}

const cellContainerStyles: CSSProperties = {
  ...StyleDefaults.inline.fontAndColors,
}

const styles: CSSProperties = {
  fontSize: Font.size.title,
  fontWeight: Font.weight.bold,
  lineHeight: 1,
  margin: 0,
  padding: 0,
}
