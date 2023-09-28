import React, { CSSProperties, FC } from 'react'
import { EmailComponentProps } from './shared'
import { useIsCurrentlyActiveEmailComponent } from '../CurrentlyActiveEmailPart'
import { EditableElement } from 'src/ui/EditableElement'
import { useEmailPartsContentForComponent } from '../EmailPartsContent'
import { DefaultStyles, Spacing } from '../styles'

export const Name: FC<EmailComponentProps> = ({ children, id }) => {
  const { activate } = useIsCurrentlyActiveEmailComponent(id)
  const defaultValue = 'FIRST LAST NAME:'
  const [value, setValue] = useEmailPartsContentForComponent(id, defaultValue)
  return (
    <>
      <tr>
        <EditableElement
          onClick={activate}
          value={value}
          onValueChange={setValue}
          element="td"
          defaultValue={defaultValue}
          style={styles}
        >
          {defaultValue}
        </EditableElement>
      </tr>
      {children}
    </>
  )
}

const styles: CSSProperties = {
  ...DefaultStyles,
  paddingBottom: Spacing.size.medium,
}
