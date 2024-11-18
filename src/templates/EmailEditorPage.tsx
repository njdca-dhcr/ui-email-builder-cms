import React, { FC, useState } from 'react'
import { type HeadFC } from 'gatsby'
import { Layout, PageContent } from 'src/ui'
import type { EmailParts, EmailTemplate } from 'src/appTypes'
import { ClearCurrentlyActiveEmailPart, CurrentlyActiveEmailPart } from './CurrentlyActiveEmailPart'
import { EmailEditorContent } from './EmailEditorContent'
import { EmailEditorHeadingAndSelect } from './EmailEditorSidebar/EmailEditorHeadingAndSelect'
import { EmailEditorSidebar } from './EmailEditorSidebar'
import { EmailPartsContent } from './EmailPartsContent'
import { EmailTemplateConfig } from './EmailTemplateConfig'
import { formatPageTitle } from 'src/utils/formatPageTitle'
import { PreviewText } from './PreviewText'
import { SyncSidebarAndPreviewScroll } from './SyncSidebarAndPreviewScroll'
import uniqueId from 'lodash.uniqueid'
import './EmailEditorPage.css'
import { CurrentLanguage } from './CurrentLanguage'
import { EmailTranslationSelector } from './EmailEditorSidebar/EmailTranslationSelector'

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
      <EmailTemplateConfig key={emailTemplateConfig.id} emailTemplateConfig={emailTemplateConfig}>
        {(emailTemplate) => (
          <CurrentlyActiveEmailPart>
            <SyncSidebarAndPreviewScroll>
              <ClearCurrentlyActiveEmailPart />
              <CurrentLanguage key={emailTemplate.id} emailTemplateConfig={emailTemplate}>
                {([language]) => (
                  <EmailPartsContent key={language}>
                    <EmailEditorSidebar
                      language={language}
                      emailTemplate={emailTemplate}
                      heading={
                        <>
                          <EmailEditorHeadingAndSelect emailTemplate={emailTemplate} />
                          <EmailTranslationSelector emailTemplateConfig={emailTemplate} />
                        </>
                      }
                    />
                    <PreviewText
                      key={language}
                      emailTemplateConfig={emailTemplate}
                      language={language}
                    >
                      <PageContent element="div" className="email-editor-page-content">
                        <EmailEditorContent language={language} emailTemplate={emailTemplate} />
                      </PageContent>
                    </PreviewText>
                  </EmailPartsContent>
                )}
              </CurrentLanguage>
            </SyncSidebarAndPreviewScroll>
          </CurrentlyActiveEmailPart>
        )}
      </EmailTemplateConfig>
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
