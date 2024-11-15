import React, { FC, ReactElement } from 'react'
import { EmailTemplate, Language } from 'src/appTypes'
import { Sidebar, SkipNavContent, SpacedSidebarContainer } from 'src/ui'
import { BackLink } from './BackLink'
import { EmailEditorSidebarAccordion } from './EmailEditorSidebarAccordion'
import { translationForLanguage } from '../CurrentLanguage'

interface Props {
  emailTemplate?: EmailTemplate.Unique.Config
  heading: ReactElement
  language: Language
}

export const EmailEditorSidebar: FC<Props> = ({ emailTemplate, heading, language }) => {
  const translation = emailTemplate && translationForLanguage(emailTemplate, language)
  const components = translation?.components ?? []

  return (
    <Sidebar id="sidebar-container">
      <SpacedSidebarContainer>
        <BackLink />
        <SkipNavContent />
        {heading}
      </SpacedSidebarContainer>
      {emailTemplate && (
        <EmailEditorSidebarAccordion.Container>
          {components.map((emailComponent) => (
            <EmailEditorSidebarAccordion.EmailComponent
              key={emailComponent.id}
              emailComponent={emailComponent}
            >
              {(emailComponent.subComponents ?? []).map((emailSubComponent, i) => (
                <EmailEditorSidebarAccordion.EmailSubComponent
                  key={emailSubComponent.id}
                  component={emailComponent}
                  emailSubComponent={emailSubComponent}
                  nextEmailSubComponent={(emailComponent.subComponents ?? [])[i + 1]}
                />
              ))}
            </EmailEditorSidebarAccordion.EmailComponent>
          ))}
        </EmailEditorSidebarAccordion.Container>
      )}
    </Sidebar>
  )
}
