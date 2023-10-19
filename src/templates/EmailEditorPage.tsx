import React, { FC } from 'react'
import { type HeadFC } from 'gatsby'
import { Layout, PageContent } from 'src/ui/Layout'
import type { EmailTemplate } from 'src/appTypes'
import { EmailEditorSidebar } from './EmailEditorSidebar'
import { EmailEditorContent } from './EmailEditorContent'
import { ShouldShowEmailPart } from './ShouldShowEmailPart'
import { ClearCurrentlyActiveEmailPart, CurrentlyActiveEmailPart } from './CurrentlyActiveEmailPart'
import { EmailPartsContent } from './EmailPartsContent'
import { PreviewText } from './PreviewText'
import './EmailEditorPage.css'
import { formatPageTitle } from 'src/utils/formatPageTitle'

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
        <CurrentlyActiveEmailPart>
          <ClearCurrentlyActiveEmailPart />
          <PreviewText>
            <EmailPartsContent>
              <EmailEditorSidebar emailTemplate={emailTemplate} />
              <PageContent element="div" className="email-editor-page-content">
                <EmailEditorContent emailTemplate={emailTemplate} />
              </PageContent>
            </EmailPartsContent>
          </PreviewText>
        </CurrentlyActiveEmailPart>
      </ShouldShowEmailPart>
    </Layout>
  )
}

export default EmailEditorPage

export const Head: HeadFC<object, PageContext> = ({ pageContext }) => {
  const { name } = pageContext.emailTemplate
  return <title>{formatPageTitle(name)}</title>
}
