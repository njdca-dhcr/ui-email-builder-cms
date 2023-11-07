import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { useIsCurrentlyActiveEmailPart } from '../CurrentlyActiveEmailPart'
import { EditableElement } from 'src/ui/EditableElement'
import { useEmailPartsContentFor } from '../EmailPartsContent'
import { Spacing, StyleDefaults, Text } from '../styles'
import { EmailBlock } from 'src/ui/EmailBlock'

const defaultValue = {
  title: 'Supplemental Content Title',
  description:
    'Aenean lacinia bibendum nulla sed consectetur. Cras mattis consectetur purus sit amet fermentum. Curabitur blandit tempus porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
}

const { Row } = EmailBlock

export const SupplementalContent: FC<EmailSubComponentProps> = ({ emailSubComponent }) => {
  const { activate } = useIsCurrentlyActiveEmailPart(emailSubComponent.id)
  const [value, setValue] = useEmailPartsContentFor(emailSubComponent.id, defaultValue)

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
          aria-level={3}
          element="td"
          label="Supplemental content title"
          onValueChange={(title) => setValue({ ...value, title })}
          role="heading"
          style={titleStyles}
          value={value.title}
        />
      </Row>
      <Row>
        <EditableElement
          element="td"
          label="Supplemental content description"
          onValueChange={(description) => setValue({ ...value, description })}
          style={descriptionStyles}
          value={value.description}
        />
      </Row>
    </Row>
  )
}

const outerCellStyles: CSSProperties = {
  ...StyleDefaults.inline.colors,
}

const titleStyles: CSSProperties = {
  ...Text.header.h3.bold,
  paddingBottom: Spacing.size.small,
}
const descriptionStyles: CSSProperties = {
  ...Text.body.secondary.regular,
}
