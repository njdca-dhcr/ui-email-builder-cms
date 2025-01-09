import React, { FC } from 'react'
import { useCurrentLanguage } from 'src/utils/EmailTemplateState'
import { useTranslationHasChanges } from './EmailEditorContent/SaveEmailTemplateDialog/useTranslationHasChanges'
import { Button } from 'src/ui'

export interface Props {
  label: string
}

export const ExitTranslationModeButton: FC<Props> = ({ label }) => {
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
      {label}
    </Button>
  )
}
