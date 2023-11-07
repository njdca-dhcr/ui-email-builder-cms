import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { useIsCurrentlyActiveEmailPart } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentFor } from '../EmailPartsContent'
import { Colors, StyleDefaults, Text } from '../styles'
import { EditableElement } from 'src/ui/EditableElement'
import { EmailBlock } from 'src/ui'

const defaultValue =
  'Aenean lacinia bibendum nulla sed consectetur. Cras mattis consectetur purus sit amet fermentum.'

const { Row } = EmailBlock

export const AdditionalContent: FC<EmailSubComponentProps> = ({ emailSubComponent }) => {
  const { activate } = useIsCurrentlyActiveEmailPart(emailSubComponent.id)
  const [value, setValue] = useEmailPartsContentFor(emailSubComponent.id, defaultValue)

  return (
    <Row onClick={activate}>
      <EditableElement
        element="td"
        className={StyleDefaults.layout.narrow}
        label="Additional content"
        onValueChange={setValue}
        style={styles}
        value={value}
      />
    </Row>
  )
}

const styles: CSSProperties = {
  ...StyleDefaults.inline.colors,
  ...Text.caption.large.regular,
  color: Colors.black,
}
