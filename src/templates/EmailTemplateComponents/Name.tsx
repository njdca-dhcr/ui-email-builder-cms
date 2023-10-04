import React, { CSSProperties, FC } from 'react'
import { EmailComponentProps } from './shared'
import { useIsCurrentlyActiveEmailComponent } from '../CurrentlyActiveEmailPart'
import { EditableElement } from 'src/ui/EditableElement'
import { useEmailPartsContentForComponent } from '../EmailPartsContent'
import { DefaultStyles, Spacing } from '../styles'

const defaultValue = 'FIRST LAST NAME:'

export const Name: FC<EmailComponentProps> = ({ children, id }) => {
  const { activate } = useIsCurrentlyActiveEmailComponent(id)
  const [value, setValue, { initialValue }] = useEmailPartsContentForComponent(id, defaultValue)
  return (
    <>
      <tr>
        <EditableElement
          data-testid="name"
          element="td"
          initialValue={initialValue}
          label="Recipient's Name"
          onClick={activate}
          onValueChange={setValue}
          style={styles}
          value={value}
        />
      </tr>
      {children}
    </>
  )
}

const styles: CSSProperties = {
  ...DefaultStyles,
  paddingBottom: Spacing.size.medium,
}
