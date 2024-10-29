import React, { FC, ReactNode, createContext, useContext } from 'react'
import { EmailTemplate } from 'src/appTypes'

const EmailTemplateConfigContext = createContext<EmailTemplate.Unique.Config>({ name: '' })

export const EmailTemplateConfig: FC<{
  children: ReactNode
  emailTemplateConfig: EmailTemplate.Unique.Config
}> = ({ children, emailTemplateConfig }) => {
  return (
    <EmailTemplateConfigContext.Provider value={emailTemplateConfig}>
      {children}
    </EmailTemplateConfigContext.Provider>
  )
}

export const useEmailTemplateConfig = () => useContext(EmailTemplateConfigContext)
