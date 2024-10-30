import React, { FC, ReactElement } from 'react'
import { EmailTemplate } from 'src/appTypes'
import { Sidebar, SkipNavContent, SpacedSidebarContainer } from 'src/ui'
import { BackLink } from './BackLink'
import { EmailEditorSidebarAccordion } from './EmailEditorSidebarAccordion'

interface Props {
  emailTemplate?: EmailTemplate.Unique.Config
  heading: ReactElement
}

export const EmailEditorSidebar: FC<Props> = ({ emailTemplate, heading }) => {
  return (
    <Sidebar id="sidebar-container">
      <SpacedSidebarContainer>
        <BackLink />
        <SkipNavContent />
        {heading}
      </SpacedSidebarContainer>
      {emailTemplate && (
        <EmailEditorSidebarAccordion.Container>
          {(emailTemplate.components ?? []).map((emailComponent) => (
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
