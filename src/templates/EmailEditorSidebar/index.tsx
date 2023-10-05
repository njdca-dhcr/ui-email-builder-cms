import React, { FC } from 'react'
import { SkipNavContent } from '@reach/skip-nav'
import { EmailTemplate } from 'src/appTypes'
import { Sidebar, SpacedSidebarContainer } from 'src/ui/Layout'
import { EmailEditorHeadingAndSelect } from './EmailEditorHeadingAndSelect'
import {
  EmailEditorToggle,
  EmailEditorToggleSection,
  EmailEditorToggles,
} from './EmailEditorToggles'
import { labelForSubComponent } from './labelForSubComponent'
import { BackLink } from './BackLink'
import { EditPreviewText } from './EditPreviewText'
import { VisuallyHidden } from '@reach/visually-hidden'

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
      <SpacedSidebarContainer>
        <VisuallyHidden>
          <h2>Email preview controls</h2>
        </VisuallyHidden>
        <EmailEditorToggles>
          {(emailTemplate.components ?? []).map(
            ({ description, kind, required, subComponents }, i) => (
              <EmailEditorToggleSection
                key={i}
                componentId={`${i}`}
                description={description}
                label={kind}
                required={required}
              >
                {subComponents &&
                  subComponents.map((subComponent, n) => (
                    <EmailEditorToggle
                      key={n}
                      componentId={`${i}`}
                      description={subComponent.description}
                      disabled={subComponent.required}
                      label={labelForSubComponent(subComponent.kind)}
                      subComponentId={`${n}`}
                    />
                  ))}
              </EmailEditorToggleSection>
            ),
          )}
        </EmailEditorToggles>
      </SpacedSidebarContainer>
    </Sidebar>
  )
}
