import React, { FC } from 'react'
import { Link } from 'gatsby'
import { SkipNavContent } from '@reach/skip-nav'
import { EmailTemplate } from 'src/appTypes'
import { BackArrowIcon } from 'src/ui/BackArrowIcon'
import { Sidebar } from 'src/ui/Layout'
import { EmailEditorHeadingAndSelect } from './EmailEditorHeadingAndSelect'
import {
  EmailEditorToggle,
  EmailEditorToggleSection,
  EmailEditorToggles,
} from './EmailEditorToggles'

interface Props {
  emailTemplate: EmailTemplate.Config
}

export const EmailEditorSidebar: FC<Props> = ({ emailTemplate }) => {
  return (
    <Sidebar>
      <Link to="/" className="back-link">
        <BackArrowIcon />
        <span className="back-link-text">Back to Home</span>
      </Link>
      <SkipNavContent />
      <EmailEditorHeadingAndSelect emailTemplate={emailTemplate} />
      <EmailEditorToggles>
        {emailTemplate.components.map(({ description, kind, required, subComponents }, i) => (
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
                  disabled={subComponent.required}
                  label={subComponent.kind}
                  subComponentId={`${n}`}
                />
              ))}
          </EmailEditorToggleSection>
        ))}
      </EmailEditorToggles>
    </Sidebar>
  )
}
