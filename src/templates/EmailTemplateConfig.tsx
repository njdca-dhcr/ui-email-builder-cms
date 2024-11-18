import React, {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'
import { EmailTemplate } from 'src/appTypes'

const EmailTemplateConfigContext = createContext<EmailTemplate.Unique.Config>({ name: '' })

const SetEmailTemplateConfigContext = createContext<
  Dispatch<SetStateAction<EmailTemplate.Unique.Config>>
>(() => null)

export const EmailTemplateConfig: FC<{
  children: ReactNode | ((emailTemplateConfig: EmailTemplate.Unique.Config) => ReactNode)
  emailTemplateConfig: EmailTemplate.Unique.Config
}> = ({ children, emailTemplateConfig }) => {
  const [emailTemplate, setEmailTemplate] = useState(emailTemplateConfig)

  return (
    <EmailTemplateConfigContext.Provider value={emailTemplate}>
      <SetEmailTemplateConfigContext.Provider value={setEmailTemplate}>
        {typeof children === 'function' ? children(emailTemplate) : children}
      </SetEmailTemplateConfigContext.Provider>
    </EmailTemplateConfigContext.Provider>
  )
}

export const useEmailTemplateConfig = () => useContext(EmailTemplateConfigContext)

export const useSetEmailTemplateConfig = () => useContext(SetEmailTemplateConfigContext)
