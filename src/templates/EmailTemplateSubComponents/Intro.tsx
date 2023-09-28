import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { useIsCurrentlyActiveEmailSubComponent } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentForSubComponent } from '../EmailPartsContent'
import { EditableElement } from 'src/ui/EditableElement'
import { DefaultStyles } from '../styles'

export const Intro: FC<EmailSubComponentProps> = ({ componentId, id }) => {
  const defaultValue = 'Intro'
  const { activate } = useIsCurrentlyActiveEmailSubComponent(componentId, id)
  const [value, setValue] = useEmailPartsContentForSubComponent(componentId, id, defaultValue)
  return (
    <tr>
      <EditableElement
        element="td"
        defaultValue={defaultValue}
        onValueChange={setValue}
        style={styles}
        value={value}
        onClick={activate}
      />
    </tr>
  )
}

const styles: CSSProperties = {
  ...DefaultStyles,
  lineHeight: '24px',
}
