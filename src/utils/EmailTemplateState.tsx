import React, {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'
import { EmailTemplate, EmailTranslation, Language } from 'src/appTypes'

type UseStateSetter<T> = Dispatch<SetStateAction<T>>

type UseState<T> = [T, UseStateSetter<T>]

const PLACEHOLDER_EMAIL_TEMPLATE = {
  name: '',
  id: '',
  versionTimestamp: '',
} as const satisfies EmailTemplate.Unique.Config

const isPlaceholder = (emailTemplate: EmailTemplate.Unique.Config): boolean =>
  PLACEHOLDER_EMAIL_TEMPLATE === emailTemplate

const NO_OP = () => {}

const OriginalEmailTemplateContext = createContext<EmailTemplate.Unique.Config>(
  PLACEHOLDER_EMAIL_TEMPLATE,
)

const CurrentEmailTemplateContext = createContext<UseState<EmailTemplate.Unique.Config>>([
  PLACEHOLDER_EMAIL_TEMPLATE,
  NO_OP,
])

const CurrentLanguageContext = createContext<UseState<Language>>(['not-set', NO_OP])

const CurrentTranslationContext = createContext<EmailTranslation.Unique>({
  language: 'not-set',
  components: [],
})

export interface State {
  currentEmailTemplate: EmailTemplate.Unique.Config
  originalEmailTemplate: EmailTemplate.Unique.Config
  currentLanguage: Language
  currentTranslation: EmailTranslation.Unique
  setCurrentEmailTemplate: UseStateSetter<EmailTemplate.Unique.Config>
  setCurrentLanguage: UseStateSetter<Language>
}

interface Props {
  children: (values: State) => ReactNode
  emailTemplate: EmailTemplate.Unique.Config | null
  initialLanguage?: Language
}

export const EmailTemplateState: FC<Props> = ({ children, emailTemplate, initialLanguage }) => {
  return (
    <OriginalEmailTemplateContext.Provider value={emailTemplate ?? PLACEHOLDER_EMAIL_TEMPLATE}>
      <OriginalEmailTemplateContext.Consumer>
        {(originalEmailTemplate) => (
          <CurrentEmailTemplate emailTemplate={originalEmailTemplate}>
            {([currentEmailTemplate, setCurrentEmailTemplate]) => (
              <CurrentLanguage
                emailTemplate={originalEmailTemplate}
                initialLanguage={initialLanguage}
              >
                {([currentLanguage, setCurrentLanguage]) => {
                  const currentTranslation = translationForLanguage(
                    currentEmailTemplate,
                    currentLanguage,
                  )
                  return (
                    <CurrentTranslationContext.Provider value={currentTranslation}>
                      {children({
                        originalEmailTemplate,
                        currentEmailTemplate,
                        currentLanguage,
                        currentTranslation,
                        setCurrentEmailTemplate: isPlaceholder(currentEmailTemplate)
                          ? NO_OP
                          : setCurrentEmailTemplate,
                        setCurrentLanguage: isPlaceholder(currentEmailTemplate)
                          ? NO_OP
                          : setCurrentLanguage,
                      })}
                    </CurrentTranslationContext.Provider>
                  )
                }}
              </CurrentLanguage>
            )}
          </CurrentEmailTemplate>
        )}
      </OriginalEmailTemplateContext.Consumer>
    </OriginalEmailTemplateContext.Provider>
  )
}

interface CurrentEmailTemplateProps {
  emailTemplate: EmailTemplate.Unique.Config
  children: (value: UseState<EmailTemplate.Unique.Config>) => ReactNode
}

const CurrentEmailTemplate: FC<CurrentEmailTemplateProps> = ({ emailTemplate, children }) => {
  const value = useState(emailTemplate)
  const [currentEmailTemplate, setCurrentEmailTemplate] = value

  useEffect(() => {
    if (isPlaceholder(currentEmailTemplate) && !isPlaceholder(emailTemplate)) {
      setCurrentEmailTemplate(emailTemplate)
    }
  }, [emailTemplate, currentEmailTemplate, setCurrentEmailTemplate])

  return (
    <CurrentEmailTemplateContext.Provider value={value}>
      <CurrentEmailTemplateContext.Consumer>{children}</CurrentEmailTemplateContext.Consumer>
    </CurrentEmailTemplateContext.Provider>
  )
}

interface CurrentLanguageProps {
  emailTemplate: EmailTemplate.Unique.Config
  children: (value: UseState<Language>) => ReactNode
  initialLanguage?: Language
}

const CurrentLanguage: FC<CurrentLanguageProps> = ({
  emailTemplate,
  children,
  initialLanguage,
}) => {
  const value = useState(() => initialLanguage ?? firstLanguageFrom(emailTemplate))

  const [currentLanguage, setCurrentLanguage] = value

  useEffect(() => {
    if (!isPlaceholder(emailTemplate) && currentLanguage === 'not-set') {
      setCurrentLanguage(initialLanguage ?? firstLanguageFrom(emailTemplate))
    }
  }, [emailTemplate, currentLanguage, setCurrentLanguage, initialLanguage])

  return (
    <CurrentLanguageContext.Provider value={value}>
      <CurrentLanguageContext.Consumer>{children}</CurrentLanguageContext.Consumer>
    </CurrentLanguageContext.Provider>
  )
}

const firstLanguageFrom = ({ translations }: EmailTemplate.Unique.Config): Language => {
  if (!translations || translations.length === 0) {
    return 'not-set'
  } else {
    return translations[0].language
  }
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

export const useOriginalEmailTemplate = () => useContext(OriginalEmailTemplateContext)

export const useCurrentEmailTemplate = () => useContext(CurrentEmailTemplateContext)

export const useCurrentLanguage = () => useContext(CurrentLanguageContext)

export const useCurrentTranslation = () => useContext(CurrentTranslationContext)
