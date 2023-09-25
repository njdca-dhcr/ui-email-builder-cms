import React, { FC } from 'react'
import { type HeadFC } from 'gatsby'
import { Layout, PageContent } from 'src/ui/Layout'
import type { EmailTemplate } from 'src/appTypes'
import { EmailEditorSidebar } from './EmailEditorSidebar'
import { EmailEditorContent } from './EmailEditorContent'
import './EmailEditorPage.css'
import { ShouldShowEmailPart } from './ShouldShowEmailPart'
import { EmailEditorContents } from './EmailEditorContents'

interface PageContext {
  emailTemplate: EmailTemplate.Config
}

interface Props {
  pageContext: PageContext
}

const EmailEditorPage: FC<Props> = ({ pageContext }) => {
  const { emailTemplate } = pageContext

  return (
    <Layout element="main">
      <ShouldShowEmailPart>
        <EmailEditorSidebar emailTemplate={emailTemplate} />
        <PageContent element="div" className="email-editor-page-content">
          {/* <EmailEditorContent emailTemplate={emailTemplate} /> */}
          <EmailEditorContents emailTemplate={emailTemplate} />
        </PageContent>
      </ShouldShowEmailPart>
    </Layout>
  )
}

export default EmailEditorPage

export const Head: HeadFC<object, PageContext> = ({ pageContext }) => {
  const { name } = pageContext.emailTemplate
  return <title>{name}</title>
}
