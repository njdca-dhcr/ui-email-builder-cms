import React, { CSSProperties, FC } from 'react'
import { EmailComponentProps } from './shared'
import { useIsCurrentlyActiveEmailComponent } from '../CurrentlyActiveEmailPart'
import { EditableElement } from 'src/ui/EditableElement'
import { useEmailPartsContentFor } from '../EmailPartsContent'
import { Font, StyleDefaults, Text } from '../styles'
import { EmailBlock } from 'src/ui'

const defaultValue = 'FIRST LAST NAME:'

const { Row } = EmailBlock

export const Name: FC<EmailComponentProps> = ({ emailComponent }) => {
  const { activate } = useIsCurrentlyActiveEmailComponent(emailComponent)
  const [value, setValue] = useEmailPartsContentFor(emailComponent.id, defaultValue)
  return (
    <Row>
      <EditableElement
        element="td"
        className={StyleDefaults.layout.narrow}
        label="Recipient's name"
        onClick={activate}
        onValueChange={setValue}
        style={styles}
        value={value}
      />
    </Row>
  )
}

const styles: CSSProperties = {
  ...StyleDefaults.inline.colors,
  ...Text.body.main.regular,
  fontFamily: Font.family.serifMonospace,
  fontWeight: Font.weight.boldLight,
}
