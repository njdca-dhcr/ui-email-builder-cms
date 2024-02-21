import React, { CSSProperties, FC } from 'react'
import { EmailComponentProps } from './shared'
import { Colors, Spacing, Text } from '../styles'
import { useLocalStorageJSON } from 'src/utils/useLocalStorage'
import { EmailBlock } from 'src/ui'
import { RichTextValue } from 'src/ui/RichTextEditor'
import { RichTextEditableElement } from 'src/ui/RichTextEditableElement'

const defaultValue: RichTextValue = [
  {
    type: 'paragraph',
    children: [
      {
        text: 'Do not reply to this email. Its inbox is not monitored and any emails received will not be responded to.',
      },
    ],
  },
  { type: 'paragraph', children: [{ text: '' }] },
  {
    type: 'paragraph',
    children: [
      {
        text: "The State of New Jersey is committed to preventing fraudulent emails. Emails from New Jersey's Division of Unemployment Insurance will always contain your full name and will be sent by no-reply@dol.nj.gov",
      },
    ],
  },
  { type: 'paragraph', children: [{ text: '' }] },
  {
    type: 'paragraph',
    children: [
      {
        text: "If you'd like to get in contact with the New Jersey's Division of Unemployment Insurance, you can call (732) 761-2020. Phone lines are open from 8am-3pm Monday through Friday; the best time to call is at 8am.",
      },
    ],
  },
  { type: 'paragraph', children: [{ text: '' }] },
  {
    type: 'paragraph',
    children: [
      {
        text: "This email is a new beta design created by New Jersey's Division of Unemployment Insurance and New Jersey's Office of Innovation.",
      },
    ],
  },
  { type: 'paragraph', children: [{ text: '' }] },
  {
    type: 'paragraph',
    children: [
      {
        text: 'CONFIDENTIALITY NOTICE: This email message and all attachments transmitted with it may contain State of New Jersey legally privileged and confidential information intended solely for the use of the addressee only. If the reader of this message is not the intended recipient, you are hereby notified that any reading, dissemination, distribution, copying, or other use of this message or its attachment is prohibited. If you have received this message in error, please notify the sender immediately and delete this message.',
      },
    ],
  },
]

export const useDisclaimerValue = () => {
  return useLocalStorageJSON<any>('disclaimer', defaultValue)
}

const { Row } = EmailBlock

export const Disclaimer: FC<EmailComponentProps> = ({}) => {
  const [value] = useDisclaimerValue()

  return (
    <Row role="contentinfo" className="disclaimer">
      <RichTextEditableElement
        element="td"
        label="Disclaimer"
        readonly
        className="disclaimer"
        style={styles}
        onValueChange={() => null}
        value={value}
      />
    </Row>
  )
}

export const styles: CSSProperties = {
  ...Text.caption.small.regular,
  backgroundColor: Colors.grayLight,
  color: Colors.gray,
  margin: 0,
  padding: 0,
  paddingBottom: Spacing.size.large,
  paddingTop: 30,
  width: '100%',
}
