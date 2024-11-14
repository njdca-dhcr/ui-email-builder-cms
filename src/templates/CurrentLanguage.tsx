import React, {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'
import { Language } from 'src/appTypes/EmailTranslation'
import { useEmailTemplateConfig } from './EmailTemplateConfig'

interface Props {
  children: ReactNode
}

type LanguageContextValue = [Language, Dispatch<SetStateAction<Language>>]

const CurrentLanguageContext = createContext<LanguageContextValue>(['english', () => {}])

export const CurrentLanguage: FC<Props> = ({ children }) => {
  const emailTemplateConfig = useEmailTemplateConfig()
  const [firstTranslation] = emailTemplateConfig.translations ?? []
  const initialLanguage = firstTranslation?.language ?? 'english'

  const value = useState(initialLanguage)

  return <CurrentLanguageContext.Provider value={value}>{children}</CurrentLanguageContext.Provider>
}

export const useCurrentLanguage = () => {
  return useContext(CurrentLanguageContext)
}
