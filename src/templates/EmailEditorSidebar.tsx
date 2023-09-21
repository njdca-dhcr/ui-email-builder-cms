import React, { FC } from 'react'
import { Link } from 'gatsby'
import { EmailTemplate } from 'src/appTypes'
import { BackArrowIcon } from 'src/ui/BackArrowIcon'
import { Sidebar } from 'src/ui/Layout'
import { EmailEditorHeadingAndSelect } from './EmailEditorHeadingAndSelect'

interface Props {
  emailTemplate: EmailTemplate
}

export const EmailEditorSidebar: FC<Props> = ({ emailTemplate }) => {
  return (
    <Sidebar>
      <Link to="/" className="back-link">
        <BackArrowIcon />
        <span className="back-link-text">Back to Home</span>
      </Link>
      <EmailEditorHeadingAndSelect emailTemplate={emailTemplate} />
    </Sidebar>
  )
}
