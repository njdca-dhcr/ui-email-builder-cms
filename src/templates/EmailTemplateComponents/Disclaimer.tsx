import React, { CSSProperties, FC } from 'react'
import { EmailComponentProps } from './shared'
import { useIsCurrentlyActiveEmailComponent } from '../CurrentlyActiveEmailPart'
import { EditableElement } from 'src/ui/EditableElement'
import { useEmailPartsContentForComponent } from '../EmailPartsContent'
import { Colors, Font, Spacing } from '../styles'

const defaultValue = `CONFIDENTIALITY NOTICE: This email message and any accompanying attachments may contain legally privileged and confidential information intended solely for the use of the intended recipient. If you are not the intended recipient, you are hereby advised that any reading, dissemination, distribution, copying, or other use of this message or its attachments is strictly prohibited. If you have received this message in error, please notify the sender immediately and delete this message.`

export const Disclaimer: FC<EmailComponentProps> = ({ children, id }) => {
  const { activate } = useIsCurrentlyActiveEmailComponent(id)
  const [value, setValue, { initialValue }] = useEmailPartsContentForComponent(id, defaultValue)

  return (
    <>
      <tr>
        <EditableElement
          data-testid="disclaimer"
          element="td"
          initialValue={initialValue}
          label="Disclaimer"
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
  backgroundColor: Colors.grayLight,
  color: Colors.gray,
  fontFamily: Font.family.default,
  fontSize: Font.size.tiny,
  fontWeight: Font.weight.normal,
  lineHeight: '15px',
  margin: 0,
  padding: 0,
  paddingBottom: Spacing.size.large,
  paddingTop: Spacing.size.large,
  width: '100%',
}
