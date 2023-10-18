import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { useIsCurrentlyActiveEmailSubComponent } from '../CurrentlyActiveEmailPart'
import { EditableElement } from 'src/ui/EditableElement'
import { useEmailPartsContentForSubComponent } from '../EmailPartsContent'
import { Font, Spacing, SpacingCell, StyleDefaults } from '../styles'
import { EmailBlock } from 'src/ui/EmailBlock'

const defaultValue = {
  title: 'Supplemental Content Title',
  description:
    'Aenean lacinia bibendum nulla sed consectetur. Cras mattis consectetur purus sit amet fermentum. Curabitur blandit tempus porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
}

const { Row } = EmailBlock

export const SupplementalContent: FC<EmailSubComponentProps> = ({ componentId, id }) => {
  const { activate } = useIsCurrentlyActiveEmailSubComponent(componentId, id)
  const [value, setValue, { initialValue }] = useEmailPartsContentForSubComponent(
    componentId,
    id,
    defaultValue,
  )

  return (
    <Row
      onClick={activate}
      elements={[
        { part: 'cell', style: outerCellStyles, className: StyleDefaults.layout.narrow },
        'table',
      ]}
    >
      <Row>
        <EditableElement
          element="td"
          initialValue={initialValue.title}
          label="Supplemental content title"
          onValueChange={(title) => setValue({ ...value, title })}
          style={titleStyles}
          value={value.title}
        />
      </Row>
      <Row>
        <EditableElement
          element="td"
          initialValue={initialValue.description}
          label="Supplemental content description"
          onValueChange={(description) => setValue({ ...value, description })}
          style={descriptionStyles}
          value={value.description}
        />
      </Row>
      <Row>
        <SpacingCell size="large" />
      </Row>
    </Row>
  )
}

const outerCellStyles: CSSProperties = {
  ...StyleDefaults.inline.fontAndColors,
}

const titleStyles: CSSProperties = {
  fontSize: Font.size.large,
  fontWeight: Font.weight.bold,
  paddingBottom: Spacing.size.small,
}
const descriptionStyles: CSSProperties = {
  lineHeight: Font.lineHeight.default,
}
