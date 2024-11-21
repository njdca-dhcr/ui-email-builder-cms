import React, { FC, useState } from 'react'
import { type HeadFC } from 'gatsby'
import { Layout, PageContent } from 'src/ui'
import type { EmailParts, EmailTemplate } from 'src/appTypes'
import { ClearCurrentlyActiveEmailPart, CurrentlyActiveEmailPart } from './CurrentlyActiveEmailPart'
import { EmailEditorContent } from './EmailEditorContent'
import { EmailEditorHeadingAndSelect } from './EmailEditorSidebar/EmailEditorHeadingAndSelect'
import { EmailEditorSidebar } from './EmailEditorSidebar'
import { EmailPartsContent } from './EmailPartsContent'
import { formatPageTitle } from 'src/utils/formatPageTitle'
import { PreviewText } from './PreviewText'
import { SyncSidebarAndPreviewScroll } from './SyncSidebarAndPreviewScroll'
import uniqueId from 'lodash.uniqueid'
import './EmailEditorPage.css'
import { EmailTranslationSelector } from './EmailEditorSidebar/EmailTranslationSelector'
import { EmailTemplateState } from 'src/utils/EmailTemplateState'

interface PageContext {
  emailTemplate: EmailTemplate.Base.Config
}

interface Props {
  pageContext: PageContext
}

const EmailEditorPage: FC<Props> = ({ pageContext }) => {
  const [emailTemplateConfig] = useState<EmailTemplate.Unique.Config>(() => ({
    ...pageContext.emailTemplate,
    translations: (pageContext.emailTemplate.translations ?? []).map((translation) => ({
      ...translation,
      components: addIds(translation.components),
    })),
  }))

  return (
    <Layout element="main">
      <EmailTemplateState emailTemplate={emailTemplateConfig}>
        {({ currentEmailTemplate, currentTranslation }) => (
          <CurrentlyActiveEmailPart>
            <SyncSidebarAndPreviewScroll>
              <ClearCurrentlyActiveEmailPart />
              <EmailPartsContent>
                <PreviewText
                  key={currentTranslation.language}
                  emailTranslation={currentTranslation}
                >
                  <EmailEditorSidebar
                    emailTranslation={currentTranslation}
                    heading={
                      <>
                        <EmailEditorHeadingAndSelect emailTemplate={currentEmailTemplate} />
                        <EmailTranslationSelector />
                      </>
                    }
                  />
                  <PageContent element="div" className="email-editor-page-content">
                    <EmailEditorContent
                      emailTemplate={currentEmailTemplate}
                      emailTranslation={currentTranslation}
                    />
                  </PageContent>
                </PreviewText>
              </EmailPartsContent>
            </SyncSidebarAndPreviewScroll>
          </CurrentlyActiveEmailPart>
        )}
      </EmailTemplateState>
    </Layout>
  )
}

export default EmailEditorPage

export const Head: HeadFC<object, PageContext> = ({ pageContext }) => {
  const { name } = pageContext.emailTemplate
  return <title>{formatPageTitle(name)}</title>
}

const addIds = (components: EmailParts.Base.Component[]): EmailParts.Unique.Component[] => {
  return components.map(({ subComponents, ...emailComponent }) => {
    return {
      ...emailComponent,
      id: uniqueId(`component_${emailComponent.kind}_`),
      subComponents: addIdsToSubComponents(subComponents ?? []),
    }
  })
}

const addIdsToSubComponents = (
  subComponents: EmailParts.Base.SubComponent[],
): EmailParts.Unique.SubComponent[] => {
  return subComponents.map((subComponent) => {
    return {
      ...subComponent,
      id: uniqueId(`sub_component_${subComponent.kind}_`),
    }
  })
}
