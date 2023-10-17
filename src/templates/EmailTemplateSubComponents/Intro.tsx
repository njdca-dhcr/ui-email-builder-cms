import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { useIsCurrentlyActiveEmailSubComponent } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentForSubComponent } from '../EmailPartsContent'
import { EditableElement } from 'src/ui/EditableElement'
import { StyleDefaults } from '../styles'
import { EmailBlock } from 'src/ui'

const defaultValue =
  'You requested a waiver application for your Pandemic Unemployment Overpayment.'

const { Row } = EmailBlock

export const Intro: FC<EmailSubComponentProps> = ({ componentId, id }) => {
  const { activate } = useIsCurrentlyActiveEmailSubComponent(componentId, id)
  const [value, setValue, { initialValue }] = useEmailPartsContentForSubComponent(
    componentId,
    id,
    defaultValue,
  )
  return (
    <Row>
      <EditableElement
        element="td"
        initialValue={initialValue}
        className={StyleDefaults.layout.narrow}
        label="Introduction"
        onClick={activate}
        onValueChange={setValue}
        style={styles}
        value={value}
      />
    </Row>
  )
}

const styles: CSSProperties = {
  ...StyleDefaults.inline.fontAndColors,
}
