import React, { FC } from 'react'
import { useCurrentLanguage } from 'src/utils/EmailTemplateState'
import { useTranslationHasChanges } from './EmailEditorContent/SaveEmailTemplateDialog/useTranslationHasChanges'
import { Button } from 'src/ui'
import classNames from 'classnames'

export interface Props {
  component?: FC
  forceWarning?: boolean
  label: string
  onExit?: () => void
}

export const ExitTranslationModeButton: FC<Props> = ({
  label,
  component,
  forceWarning,
  onExit,
}) => {
  const [_, setCurrentLanguage] = useCurrentLanguage()
  const translationHasChanges = useTranslationHasChanges()
  const Component = component ?? Button

  const handleExit = () => {
    setCurrentLanguage('english')
    onExit && onExit()
  }

  return (
    <Component
      className={classNames({ 'exit-translation-mode-button': !component })}
      onClick={() => {
        if (forceWarning) {
          getConfirmation() && handleExit()
        } else if (!translationHasChanges || getConfirmation()) {
          handleExit()
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
