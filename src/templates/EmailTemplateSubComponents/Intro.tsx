import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { useIsCurrentlyActiveEmailSubComponent } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentForSubComponent } from '../EmailPartsContent'
import { EditableElement } from 'src/ui/EditableElement'
import { DefaultStyles } from '../styles'

const defaultValue =
  'You requested a waiver application for your Pandemic Unemployment Overpayment.'

export const Intro: FC<EmailSubComponentProps> = ({ componentId, id }) => {
  const { activate } = useIsCurrentlyActiveEmailSubComponent(componentId, id)
  const [value, setValue, { initialValue }] = useEmailPartsContentForSubComponent(
    componentId,
    id,
    defaultValue,
  )
  return (
    <tr>
      <EditableElement
        element="td"
        initialValue={initialValue}
        label="Introduction"
        onClick={activate}
        onValueChange={setValue}
        style={styles}
        value={value}
      />
    </tr>
  )
}

const styles: CSSProperties = {
  ...DefaultStyles,
  lineHeight: '24px',
}
