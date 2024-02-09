import React, { FC } from 'react'
import { SkipNavContent } from '@reach/skip-nav'
import { EmailTemplate } from 'src/appTypes'
import { Sidebar, SpacedSidebarContainer } from 'src/ui/Layout'
import { EmailEditorHeadingAndSelect } from './EmailEditorHeadingAndSelect'
import { BackLink } from './BackLink'
import { EmailEditorSidebarAccordion } from './EmailEditorSidebarAccordion'

interface Props {
  emailTemplate: EmailTemplate.UniqueConfig
}

export const EmailEditorSidebar: FC<Props> = ({ emailTemplate }) => {
  return (
    <Sidebar id="sidebar-container">
      <SpacedSidebarContainer>
        <BackLink />
        <SkipNavContent />
        <EmailEditorHeadingAndSelect emailTemplate={emailTemplate} />
      </SpacedSidebarContainer>
      <EmailEditorSidebarAccordion.Container>
        {(emailTemplate.components ?? []).map((emailComponent) => (
          <EmailEditorSidebarAccordion.EmailComponent
            key={emailComponent.id}
            emailComponent={emailComponent}
          >
            {(emailComponent.subComponents ?? []).map((emailSubComponent) => (
              <EmailEditorSidebarAccordion.EmailSubComponent
                key={emailSubComponent.id}
                componentId={emailComponent.id}
                emailSubComponent={emailSubComponent}
              />
            ))}
          </EmailEditorSidebarAccordion.EmailComponent>
        ))}
      </EmailEditorSidebarAccordion.Container>
    </Sidebar>
  )
}
