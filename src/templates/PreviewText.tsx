import React, { FC, ReactNode, createContext, useContext, useState } from 'react'
import { EmailTemplate, Language } from 'src/appTypes'
import { translationForLanguage } from './CurrentLanguage'

type PreviewTextContextType = [string, (value: string) => void]
const PreviewTextContext = createContext<PreviewTextContextType>(['', () => {}])

interface Props {
  children: ReactNode
  emailTemplateConfig: EmailTemplate.Unique.Config
  language: Language
}

export const PreviewText: FC<Props> = ({ children, emailTemplateConfig, language }) => {
  const translation = translationForLanguage(emailTemplateConfig, language)
  const value = useState(translation.previewText ?? '')

  return <PreviewTextContext.Provider value={value}>{children}</PreviewTextContext.Provider>
}
export const usePreviewText = (): PreviewTextContextType => {
  return useContext(PreviewTextContext)
}
