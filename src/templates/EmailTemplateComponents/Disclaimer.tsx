import React, { CSSProperties, FC } from 'react'
import { EmailComponentProps } from './shared'
import { Colors, Font, Spacing, SpacingCell, StyleDefaults } from '../styles'
import { useLocalStorageJSON } from 'src/utils/useLocalStorage'
import { EmailBlock } from 'src/ui'

const defaultValue = `
Do not reply to this email. Its inbox is not monitored and any emails received will not be responded to.
<br /><br />
The State of New Jersey is committed to preventing fraudulent emails. Emails from New Jersey's Division of Unemployment Insurance will always contain your full name and will be sent by no-reply@dol.nj.gov
<br /><br />
If you'd like to get in contact with the New Jersey's Division of Unemployment Insurance, you can call (732) 761-2020. Phone lines are open from 8am-3pm Monday through Friday; the best time to call is at 8am.
<br /><br />
This email is a new beta design created by New Jersey's Division of Unemployment Insurance and New Jersey's Office of Innovation.
<br /><br /><br />
CONFIDENTIALITY NOTICE: This email message and all attachments transmitted with it may contain State of New Jersey legally privileged and confidential information intended solely for the use of the addressee only. If the reader of this message is not the intended recipient, you are hereby notified that any reading, dissemination, distribution, copying, or other use of this message or its attachment is prohibited. If you have received this message in error, please notify the sender immediately and delete this message.
`

export const useDisclaimerValue = () => {
  return useLocalStorageJSON<string>('disclaimer', defaultValue)
}

const { Row } = EmailBlock

export const Disclaimer: FC<EmailComponentProps> = ({}) => {
  const [value] = useDisclaimerValue()

  return (
    <>
      <Row>
        <td style={styles} dangerouslySetInnerHTML={{ __html: value }} />
      </Row>
    </>
  )
}

export const styles: CSSProperties = {
  backgroundColor: Colors.grayLight,
  color: Colors.gray,
  fontFamily: Font.family.default,
  fontSize: Font.size.tiny,
  fontWeight: Font.weight.normal,
  lineHeight: Font.lineHeight.default,
  letterSpacing: StyleDefaults.inline.fontAndColors.letterSpacing,
  margin: 0,
  padding: 0,
  paddingBottom: Spacing.size.large,
  paddingTop: 30,
  width: '100%',
}
