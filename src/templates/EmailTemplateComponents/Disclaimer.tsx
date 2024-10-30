import React, { CSSProperties, FC } from 'react'
import { EmailComponentProps } from './shared'
import { Colors, Spacing, Text } from '../styles'
import { EmailBlock, RichTextEditableElement } from 'src/ui'
import { useUserInfoValue } from 'src/utils/UserInfoContext'
import { disclaimerSchema } from 'src/utils/userInfoSchemas'
import { defaultDisclaimerValue } from './Values/DisclaimerValue'

export const useDisclaimerValue = () =>
  useUserInfoValue('disclaimer', defaultDisclaimerValue(), disclaimerSchema)

const { Row } = EmailBlock

export const Disclaimer: FC<EmailComponentProps<'Disclaimer'>> = ({}) => {
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
        value={value.content}
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
