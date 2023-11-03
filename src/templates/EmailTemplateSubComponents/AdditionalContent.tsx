import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { useIsCurrentlyActiveEmailSubComponent } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentForSubComponent } from '../EmailPartsContent'
import { Colors, StyleDefaults, Text } from '../styles'
import { EditableElement } from 'src/ui/EditableElement'
import { EmailBlock } from 'src/ui'

const defaultValue =
  'The [INSERT STATE] Department of Labor and Workforce Development is an equal opportunity employer and offers equal opportunity programs. Auxiliary aids and services are available upon request to assist individuals with disabilities.'

const { Row } = EmailBlock

export const AdditionalContent: FC<EmailSubComponentProps> = ({ id, componentId }) => {
  const { activate } = useIsCurrentlyActiveEmailSubComponent(componentId, id)
  const [value, setValue] = useEmailPartsContentForSubComponent(componentId, id, defaultValue)

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
