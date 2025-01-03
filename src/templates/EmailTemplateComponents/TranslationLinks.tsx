import React, { CSSProperties, FC } from 'react'
import { EmailComponentProps } from './shared'
import { EditableElement, EmailBlock } from 'src/ui'
import { useEmailPartsContentFor } from '../EmailPartsContent'
import { useCurrentEmailTemplate, useCurrentLanguage } from 'src/utils/EmailTemplateState'
import capitalize from 'lodash.capitalize'
import { useIsCurrentlyActiveEmailComponent } from '../CurrentlyActiveEmailPart'
import { Colors, Font, Spacing, StyleDefaults, Text } from '../styles'
import { useUserInfo } from 'src/utils/UserInfoContext'
import { buildHtmlTranslationUrl } from 'src/utils/buildHtmlTranslationUrl'

const { Row, Link } = EmailBlock

export const TranslationLinks: FC<EmailComponentProps<'TranslationLinks'>> = ({
  emailComponent,
  readOnly,
}) => {
  const { activate } = useIsCurrentlyActiveEmailComponent(emailComponent)
  const [value, setValue] = useEmailPartsContentFor(emailComponent)
  const [emailTemplate] = useCurrentEmailTemplate()
  const [language] = useCurrentLanguage()
  const translations = emailTemplate.translations ?? []
  const [user] = useUserInfo()

  return (
    <Row
      className="translation-links"
      onClick={(event) => {
        activate(event)
      }}
      elements={[
        { part: 'cell', style: styles.outerCell },
        'table',
        'row',
        { part: 'cell', align: 'center' },
      ]}
    >
      {translations.map((translation) =>
        translation.language === language ? (
          <EditableElement
            key={translation.language}
            readOnly={readOnly}
            element="span"
            style={styles.currentLanguage}
            label={`${capitalize(language)} label`}
            onValueChange={(text) => {
              setValue({
                languages: {
                  ...value.languages,
                  [language]: { ...value.languages[language], text },
                },
              })
            }}
            value={value.languages[language]?.text ?? ''}
          />
        ) : (
          <Link
            to={buildHtmlTranslationUrl({
              emailTemplateId: emailTemplate.id!,
              userId: user.id,
              versionTimestamp: emailTemplate.versionTimestamp,
              language: translation.language,
            })}
            key={translation.language}
          >
            <EditableElement
              readOnly={readOnly}
              element="span"
              label={`${capitalize(translation.language)} label`}
              onValueChange={(text) => {
                setValue({
                  languages: {
                    ...value.languages,
                    [translation.language]: { ...value.languages[translation.language], text },
                  },
                })
              }}
              value={value.languages[translation.language]?.text ?? ''}
              style={styles.otherLanguage}
            />
          </Link>
        ),
      )}
    </Row>
  )
}

const styles = {
  outerCell: {
    ...StyleDefaults.inline.colors,
    ...Text.body.main.regular,
    backgroundColor: '#3a3a3a',
    color: Colors.white,
    fontSize: 12,
    padding: `${Spacing.size.tiny}px 0`,
  } as CSSProperties,
  currentLanguage: {
    fontWeight: Font.weight.bold,
    marginRight: 12,
  } as CSSProperties,
  otherLanguage: {
    textDecoration: 'underline',
    marginRight: 12,
    color: Colors.white,
  } as CSSProperties,
}
