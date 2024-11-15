import React, {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'
import { EmailTranslation, Language } from 'src/appTypes/EmailTranslation'
import { useEmailTemplateConfig } from './EmailTemplateConfig'
import { EmailTemplate } from 'src/appTypes'

export type LanguageContextValue = [Language, Dispatch<SetStateAction<Language>>]

const CurrentLanguageContext = createContext<LanguageContextValue>(['english', () => {}])

interface Props {
  children: (value: LanguageContextValue) => ReactNode
  emailTemplateConfig: EmailTemplate.Unique.Config
}

export const CurrentLanguage: FC<Props> = ({ children }) => {
  const emailTemplateConfig = useEmailTemplateConfig()
  const [firstTranslation] = emailTemplateConfig.translations ?? []
  const initialLanguage = firstTranslation?.language ?? 'english'

  const value = useState(initialLanguage)

  return (
    <CurrentLanguageContext.Provider value={value}>
      <CurrentLanguageContext.Consumer>{children}</CurrentLanguageContext.Consumer>
    </CurrentLanguageContext.Provider>
  )
}

export const useCurrentLanguage = () => {
  return useContext(CurrentLanguageContext)
}

export const translationForLanguage = (
  emailTemplate: EmailTemplate.Unique.Config,
  language: Language,
): EmailTranslation.Unique => {
  const translations = emailTemplate.translations ?? []

  const translation = translations.find((translation) => translation.language === language)

  if (translation) {
    return translation
  } else {
    return { language, components: [] }
  }
}
