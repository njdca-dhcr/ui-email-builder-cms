import React, { FC, useState } from 'react'
import capitalize from 'lodash.capitalize'
import difference from 'lodash.difference'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { AVAILABLE_LANGUAGES, EmailTemplate, Language } from 'src/appTypes'
import { Button, ButtonLike, Dialog, Form, Select, UswdsIcon } from 'src/ui'
import { translationForLanguage, useCurrentLanguage } from '../CurrentLanguage'
import './EmailTranslationSelector.css'
import { useSetEmailTemplateConfig } from '../EmailTemplateConfig'

interface Props {
  emailTemplateConfig: EmailTemplate.Unique.Config
}

export const EmailTranslationSelector: FC<Props> = ({ emailTemplateConfig }) => {
  const [currentLanguage, setCurrentLanguage] = useCurrentLanguage()
  const { translations } = emailTemplateConfig

  const availableLanguages = difference(
    AVAILABLE_LANGUAGES,
    translations?.map(({ language }) => language) ?? [],
  )

  if (!translations) return null

  return (
    <div className="email-translation-selector">
      <VisuallyHidden>
        <label id="language-select-label">Translation Language</label>
      </VisuallyHidden>
      <Select
        labelId="language-select-label"
        onChange={(value) => setCurrentLanguage(value as Language)}
        size="small"
        options={translations.map(({ language }) => ({
          value: language,
          label: capitalize(language),
        }))}
        value={currentLanguage}
      />
      {availableLanguages.length > 0 && (
        <AddTranslationDialog
          availableLanguages={availableLanguages}
          emailTemplateConfig={emailTemplateConfig}
        />
      )}
    </div>
  )
}

interface AddTranslationDialogProps {
  availableLanguages: Language[]
  emailTemplateConfig: EmailTemplate.Unique.Config
}

const AddTranslationDialog: FC<AddTranslationDialogProps> = ({
  availableLanguages,
  emailTemplateConfig,
}) => {
  const [currentLanguage, setCurrentLanguage] = useCurrentLanguage()
  const setEmailTemplateConfig = useSetEmailTemplateConfig()
  const [selectedLanguage, setSelectedLanguage] = useState(availableLanguages[0])
  const translations = emailTemplateConfig.translations ?? []
  const currentTranslation = translationForLanguage(emailTemplateConfig, currentLanguage)

  return (
    <Dialog
      trigger={
        <ButtonLike className="add-translation-trigger">
          <VisuallyHidden>Add Translation</VisuallyHidden>
          <UswdsIcon icon="AddCircle" />
        </ButtonLike>
      }
      title="New Translation"
      description={`Choose the language of the translation you would like to add. Any unsaved changes you've made will be lost.`}
      contents={({ close }) => (
        <>
          <Form
            onSubmit={() => {
              setEmailTemplateConfig({
                ...emailTemplateConfig,
                translations: [
                  ...translations,
                  { ...currentTranslation, language: selectedLanguage },
                ],
              })
              setCurrentLanguage(selectedLanguage)
              close()
            }}
          >
            <label id="available-lanague-select-label">Language</label>
            <Select
              labelId="available-lanague-select-label"
              onChange={(value) => setSelectedLanguage(value as Language)}
              value={selectedLanguage}
              options={availableLanguages.map((language) => ({
                value: language,
                label: capitalize(language),
              }))}
            />

            <div className="email-translation-selector-dialog-actions">
              <Button type="submit">Add Translation</Button>
            </div>
          </Form>
        </>
      )}
    />
  )
}
