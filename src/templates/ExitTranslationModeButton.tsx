import React, { FC } from 'react'
import { useCurrentLanguage } from 'src/utils/EmailTemplateState'
import { useTranslationHasChanges } from './EmailEditorContent/SaveEmailTemplateDialog/useTranslationHasChanges'
import { Button } from 'src/ui'
import classNames from 'classnames'

export interface Props {
  component?: FC
  forceWarning?: boolean
  label: string
}

export const ExitTranslationModeButton: FC<Props> = ({ label, component, forceWarning }) => {
  const [_, setCurrentLanguage] = useCurrentLanguage()
  const translationHasChanges = useTranslationHasChanges()
  const Component = component ?? Button

  return (
    <Component
      className={classNames({ 'exit-translation-mode-button': !component })}
      onClick={() => {
        if (forceWarning) {
          getConfirmation() && setCurrentLanguage('english')
        } else if (!translationHasChanges || getConfirmation()) {
          setCurrentLanguage('english')
        }
      }}
    >
      {label}
    </Component>
  )
}

const getConfirmation = (): boolean => {
  return window.confirm('You have unsaved changes. Are you sure you want to continue?')
}
