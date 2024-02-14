import React, { FC, useState } from 'react'
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
import uniqueId from 'lodash.uniqueid'
import { SyncSidebarAndPreviewScroll } from './SyncSidebarAndPreviewScroll'
import { shouldShowEmailPartsFromEmailTemplate } from 'src/utils/shouldShowEmailPartsFromEmailTemplate'

interface PageContext {
  emailTemplate: EmailTemplate.Config
}

interface Props {
  pageContext: PageContext
}

const EmailEditorPage: FC<Props> = ({ pageContext }) => {
  const [emailTemplate] = useState(() => ({
    ...pageContext.emailTemplate,
    components: addIds(pageContext.emailTemplate.components ?? []),
  }))

  return (
    <Layout element="main">
      <ShouldShowEmailPart initialData={shouldShowEmailPartsFromEmailTemplate(emailTemplate)}>
        <CurrentlyActiveEmailPart>
          <SyncSidebarAndPreviewScroll>
            <ClearCurrentlyActiveEmailPart />
            <EmailPartsContent>
              <EmailEditorSidebar emailTemplate={emailTemplate} />
              <PreviewText>
                <PageContent element="div" className="email-editor-page-content">
                  <EmailEditorContent emailTemplate={emailTemplate} />
                </PageContent>
              </PreviewText>
            </EmailPartsContent>
          </SyncSidebarAndPreviewScroll>
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

const addIds = (components: EmailTemplate.Component[]): EmailTemplate.UniqueComponent[] => {
  return components.map(({ subComponents, ...emailComponent }) => {
    return {
      ...emailComponent,
      id: uniqueId(`component_${emailComponent.kind}_`),
      subComponents: addIdsToSubComponents(subComponents ?? []),
    }
  })
}

const addIdsToSubComponents = (
  subComponents: EmailTemplate.SubComponent[],
): EmailTemplate.UniqueSubComponent[] => {
  return subComponents.map((subComponent) => {
    return {
      ...subComponent,
      id: uniqueId(`sub_component_${subComponent.kind}_`),
    }
  })
}
