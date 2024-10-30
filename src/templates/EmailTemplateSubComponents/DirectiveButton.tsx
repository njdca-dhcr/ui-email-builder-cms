import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { EmailBlock } from 'src/ui'
import { useEmailTemplateConfig } from '../EmailTemplateConfig'
import { EmailTemplate } from 'src/appTypes'
import { useDirectiveValue } from './Directive'
import { textColorForBackground } from 'src/utils/textColorForBackground'
import { Colors, Spacing, StyleDefaults, Text } from '../styles'
import { useShouldShowEmailPart } from '../ShouldShowEmailPart'
import { getSubComponentByKind } from 'src/utils/emailTemplateUtils'

const { Link, Row } = EmailBlock

export const DirectiveButton: FC<EmailSubComponentProps<'DirectiveButton'>> = () => {
  const emailTemplateConfig = useEmailTemplateConfig()
  const directive: EmailTemplate.Directive = getSubComponentByKind(
    emailTemplateConfig,
    'Directive',
  ) ?? {
    kind: 'Directive',
    id: '',
  }

  const [value] = useDirectiveValue(directive)

  const shouldShowDirective = useShouldShowEmailPart(directive)
  const buttonTextColor = textColorForBackground(value.buttonColor, {
    dark: Colors.black,
    light: Colors.white,
  })

  if (shouldShowDirective.off) {
    return null
  }

  return (
    <Row
      elements={[
        { part: 'cell', className: StyleDefaults.layout.wide, style: StyleDefaults.inline.colors },
        {
          part: 'table',
          width: 'unset',
          className: StyleDefaults.layout.button,
        },
        'row',
        {
          part: 'cell',
          style: { ...cellStyles, backgroundColor: value.buttonColor },
        },
      ]}
    >
      <Link to={value.linkHref} style={{ ...linkStyles, color: buttonTextColor }}>
        {value.buttonLabel}
      </Link>
    </Row>
  )
}

const cellStyles: CSSProperties = {
  borderRadius: 10,
  paddingTop: Spacing.size.medium,
  paddingBottom: Spacing.size.medium,
  paddingLeft: 65,
  paddingRight: 65,
  textAlign: 'center',
}
const linkStyles: CSSProperties = {
  ...Text.body.main.bold,
}
