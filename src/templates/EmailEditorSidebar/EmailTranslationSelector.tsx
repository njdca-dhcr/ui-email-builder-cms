import React, { FC, useState } from 'react'
import capitalize from 'lodash.capitalize'
import difference from 'lodash.difference'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { AVAILABLE_LANGUAGES, Language } from 'src/appTypes'
import { Button, ButtonLike, Dialog, Form, Select, UswdsIcon } from 'src/ui'
import {
  useCurrentEmailTemplate,
  useCurrentLanguage,
  useCurrentTranslation,
} from 'src/utils/EmailTemplateState'
import './EmailTranslationSelector.css'

export const EmailTranslationSelector: FC = () => {
  const [emailTemplate] = useCurrentEmailTemplate()
  const [currentLanguage, setCurrentLanguage] = useCurrentLanguage()
  const { translations } = emailTemplate

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
        <AddTranslationDialog availableLanguages={availableLanguages} />
      )}
    </div>
  )
}

interface AddTranslationDialogProps {
  availableLanguages: Language[]
}

const AddTranslationDialog: FC<AddTranslationDialogProps> = ({ availableLanguages }) => {
  const [_currentLanguage, setCurrentLanguage] = useCurrentLanguage()
  const [currentEmailTemplate, setCurrentEmailTemplate] = useCurrentEmailTemplate()
  const [selectedLanguage, setSelectedLanguage] = useState(availableLanguages[0])
  const translations = currentEmailTemplate.translations ?? []
  const currentTranslation = useCurrentTranslation()

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
              setCurrentEmailTemplate({
                ...currentEmailTemplate,
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
