import React, { FC } from 'react'
import { useCurrentLanguage } from 'src/utils/EmailTemplateState'
import { useTranslationHasChanges } from './EmailEditorContent/SaveEmailTemplateDialog/useTranslationHasChanges'
import { Button } from 'src/ui'
import classNames from 'classnames'

export interface Props {
  label: string
  component?: FC
}

export const ExitTranslationModeButton: FC<Props> = ({ label, component }) => {
  const [_, setCurrentLanguage] = useCurrentLanguage()
  const translationHasChanges = useTranslationHasChanges()
  const Component = component ?? Button

  return (
    <Component
      className={classNames({ 'exit-translation-mode-button': !component })}
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
    </Component>
  )
}
