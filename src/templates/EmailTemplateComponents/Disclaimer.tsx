import React, { CSSProperties, FC } from 'react'
import { EmailComponentProps } from './shared'
import { useIsCurrentlyActiveEmailComponent } from '../CurrentlyActiveEmailPart'
import { EditableElement } from 'src/ui/EditableElement'
import { useEmailPartsContentForComponent } from '../EmailPartsContent'
import { Colors, Font } from '../styles'

const defaultValue = `CONFIDENTIALITY NOTICE: This email message and any accompanying attachments may contain legally privileged and confidential information intended solely for the use of the intended recipient. If you are not the intended recipient, you are hereby advised that any reading, dissemination, distribution, copying, or other use of this message or its attachments is strictly prohibited. If you have received this message in error, please notify the sender immediately and delete this message.`
export const Disclaimer: FC<EmailComponentProps> = ({ children, id }) => {
  const { activate } = useIsCurrentlyActiveEmailComponent(id)
  const [value, setValue] = useEmailPartsContentForComponent(id, defaultValue)
  return (
    <>
      <tr>
        <EditableElement
          data-testid="disclaimer"
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
  backgroundColor: Colors.grayLight,
  color: Colors.gray,
  fontFamily: Font.family.default,
  fontSize: 10,
  fontWeight: Font.weight.normal,
  lineHeight: '15px',
  margin: 0,
  padding: 0,
  paddingBottom: 20,
  paddingTop: 20,
  width: '100%',
}
