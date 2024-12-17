import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import React, { FC } from 'react'
import capitalize from 'lodash.capitalize'
import { EmailTemplate, Language } from 'src/appTypes'
import { useUpdateEmailTemplate } from 'src/network/emailTemplates'
import { Button, ButtonLike, Dialog, Form, UswdsIcon } from 'src/ui'
import { addOrRemoveTranslationLinks } from 'src/utils/addOrRemoveTranslationLinks'

import './DeleteTranslationDialog.css'

interface DeleteTranslationDialogProps {
  emailTemplate: EmailTemplate.Unique.Config
  setCurrentEmailTemplate: (emailTemplate: EmailTemplate.Unique.Config) => void
  currentLanguage: Language
  setCurrentLanguage: (language: Language) => void
}

export const DeleteTranslationDialog: FC<DeleteTranslationDialogProps> = ({
  emailTemplate,
  setCurrentEmailTemplate,
  currentLanguage,
  setCurrentLanguage,
}) => {
  const { mutateAsync, isPending } = useUpdateEmailTemplate(emailTemplate.id ?? '')

  const removeTranslationFromEmailTemplate = (
    emailTemplate: EmailTemplate.Unique.Config,
    language: Language,
  ): EmailTemplate.Unique.Config => {
    const editedTemplate = { ...emailTemplate }
    const { translations } = editedTemplate

    if (!translations) return editedTemplate

    const translationIndex = translations.findIndex(
      (translation) => translation.language === language,
    )
    // TODO: is this splice still mutating the translations object since the spread operator is shallow?
    translations.splice(translationIndex, 1)

    return editedTemplate
  }

  const handleDelete = () => {
    const editedTemplate = addOrRemoveTranslationLinks(
      removeTranslationFromEmailTemplate(emailTemplate, currentLanguage),
    )
    setCurrentEmailTemplate(editedTemplate)
    setCurrentLanguage('english')
    return mutateAsync(editedTemplate)
  }

  return (
    <Dialog
      trigger={
        <ButtonLike className="destroy-translation-trigger">
          <VisuallyHidden>Delete Current Translation</VisuallyHidden>
          <UswdsIcon icon="Delete" />
        </ButtonLike>
      }
      title="Delete Current Translation"
      description={`Are you sure you want to delete the ${capitalize(currentLanguage)} translation? This action cannot be undone.`}
      contents={({ close }) => (
        <Form
          className="destroy-translation-form"
          onSubmit={async () => {
            const result = await handleDelete()

            if (result && 'errors' in result) {
              alert('Something went wrong with deleting the translation. Please try again.')
            } else if (result) {
              close()
            }
          }}
        >
          <Button type="submit" className="destroy-dialog-delete-button" disabled={isPending}>
            Delete Translation
          </Button>
          <Button className="cancel-button" type="button" onClick={close}>
            Cancel
          </Button>
        </Form>
      )}
    />
  )
}
