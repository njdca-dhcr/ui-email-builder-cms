import React, { FC } from 'react'
import { type HeadFC } from 'gatsby'
import { Layout, PageContent } from 'src/ui/Layout'
import type { EmailTemplate } from 'src/appTypes'
import { BasicTemplateContents } from './BasicTemplateContents'
import { EmailEditorSidebar } from './EmailEditorSidebar'
import './BasicTemplate.css'

interface PageContext {
  emailTemplate: EmailTemplate
}

interface Props {
  pageContext: PageContext
}

const BasicTemplate: FC<Props> = ({ pageContext }) => {
  const { emailTemplate } = pageContext

  return (
    <Layout element="main">
      <EmailEditorSidebar emailTemplate={emailTemplate} />
      <PageContent element="div" className="email-editor-page-content">
        <BasicTemplateContents emailTemplate={emailTemplate} />
      </PageContent>
    </Layout>
  )
}

export default BasicTemplate

export const Head: HeadFC<object, PageContext> = ({ pageContext }) => {
  const { name } = pageContext.emailTemplate
  return <title>{name}</title>
}
