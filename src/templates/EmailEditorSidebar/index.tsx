import React, { FC } from 'react'
import { SkipNavContent } from '@reach/skip-nav'
import { EmailTemplate } from 'src/appTypes'
import { Sidebar, SpacedSidebarContainer } from 'src/ui/Layout'
import { EmailEditorHeadingAndSelect } from './EmailEditorHeadingAndSelect'
import { BackLink } from './BackLink'
import { EditPreviewText } from './EditPreviewText'
import { EmailEditorSidebarAccordion } from './EmailEditorSidebarAccordion'

interface Props {
  emailTemplate: EmailTemplate.Config
}

export const EmailEditorSidebar: FC<Props> = ({ emailTemplate }) => {
  return (
    <Sidebar>
      <SpacedSidebarContainer>
        <BackLink />
        <SkipNavContent />
        <EmailEditorHeadingAndSelect emailTemplate={emailTemplate} />
      </SpacedSidebarContainer>
      <EditPreviewText />
      <EmailEditorSidebarAccordion.Container>
        {(emailTemplate.components ?? []).map((emailComponent, componentId) => (
          <EmailEditorSidebarAccordion.EmailComponent
            key={componentId}
            id={`${componentId}`}
            emailComponent={emailComponent}
          >
            {(emailComponent.subComponents ?? []).map((emailSubComponent, subComponentId) => (
              <EmailEditorSidebarAccordion.EmailSubComponent
                key={subComponentId}
                componentId={`${componentId}`}
                id={`${subComponentId}`}
                emailSubComponent={emailSubComponent}
              />
            ))}
          </EmailEditorSidebarAccordion.EmailComponent>
        ))}
      </EmailEditorSidebarAccordion.Container>
    </Sidebar>
  )
}