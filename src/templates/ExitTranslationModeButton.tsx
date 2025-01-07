import React, { FC } from 'react'
import { useCurrentLanguage } from 'src/utils/EmailTemplateState'
import { useTranslationHasChanges } from './EmailEditorContent/SaveEmailTemplateDialog/useTranslationHasChanges'
import { Button } from 'src/ui'

export const ExitTranslationModeButton: FC = () => {
  const [_, setCurrentLanguage] = useCurrentLanguage()
  const translationHasChanges = useTranslationHasChanges()

  return (
    <Button
      className="exit-translation-mode-button"
      onClick={() => {
        if (
          !translationHasChanges ||
          window.confirm('You have unsaved changes. Are you sure you want to continue?')
        ) {
          setCurrentLanguage('english')
        }
      }}
    >
      Exit translation mode
    </Button>
  )
}
