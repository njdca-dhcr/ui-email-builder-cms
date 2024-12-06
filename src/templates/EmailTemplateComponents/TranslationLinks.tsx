import React, { FC } from 'react'
import { EmailComponentProps } from './shared'
import { EditableElement, EmailBlock } from 'src/ui'
import { useEmailPartsContentFor } from '../EmailPartsContent'
import { useCurrentEmailTemplate, useCurrentLanguage } from 'src/utils/EmailTemplateState'
import capitalize from 'lodash.capitalize'
import { useIsCurrentlyActiveEmailComponent } from '../CurrentlyActiveEmailPart'

const { Row, Cell, Link } = EmailBlock

export const TranslationLinks: FC<EmailComponentProps<'TranslationLinks'>> = ({
  emailComponent,
}) => {
  const { activate } = useIsCurrentlyActiveEmailComponent(emailComponent)
  const [value, setValue] = useEmailPartsContentFor(emailComponent)
  const [emailTemplate] = useCurrentEmailTemplate()
  const [language] = useCurrentLanguage()
  const translations = emailTemplate.translations ?? []

  return (
    <Row
      className="TranslationLinks"
      onClick={(event) => {
        activate(event)
      }}
    >
      <Cell>
        <EditableElement
          element="span"
          label={`${capitalize(language)} label`}
          onValueChange={(text) => {
            setValue({
              languages: { ...value.languages, [language]: { ...value.languages[language], text } },
            })
          }}
          value={value.languages[language]?.text ?? ''}
        />
      </Cell>

      {translations.map((translation) =>
        translation.language === language ? null : (
          <Cell key={translation.language}>
            <Link to={value.languages[translation.language]?.href ?? ''}>
              <EditableElement
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
              />
            </Link>
          </Cell>
        ),
      )}
    </Row>
  )
}
