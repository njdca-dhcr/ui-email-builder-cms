import React, { FC, useState } from 'react'
import { type HeadFC } from 'gatsby'
import uniqueId from 'lodash.uniqueid'
import { Layout, PageContent } from 'src/ui'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import type { EmailParts, EmailTemplate } from 'src/appTypes'
import { ClearCurrentlyActiveEmailPart, CurrentlyActiveEmailPart } from './CurrentlyActiveEmailPart'
import { currentTimestamp } from 'src/utils/currentTimestamp'
import { EmailEditorContent } from './EmailEditorContent'
import { EmailEditorHeadingAndSelect } from './EmailEditorSidebar/EmailEditorHeadingAndSelect'
import { EmailEditorSidebar } from './EmailEditorSidebar'
import { EmailPartsContent } from './EmailPartsContent'
import { EmailTemplateSaveAsDialog } from './EmailEditorContent/SaveEmailTemplateDialog'
import { EmailTemplateState } from 'src/utils/EmailTemplateState'
import { EmailTranslationSelector } from './EmailEditorSidebar/EmailTranslationSelector'
import { formatPageTitle } from 'src/utils/formatPageTitle'
import { PreviewText } from './PreviewText'
import { SelectPreviewType, usePreviewType } from './EmailEditorContent/SelectPreviewType'
import { SyncSidebarAndPreviewScroll } from './SyncSidebarAndPreviewScroll'
import { useCurrentUser } from 'src/network/users'
import { useRedirectIfNotSignedIn } from 'src/utils/useRedirectIfNotSignedIn'
import './EmailEditorPage.css'

interface PageContext {
  emailTemplate: EmailTemplate.Base.Config
}

interface Props {
  pageContext: PageContext
}

const EmailEditorPage: FC<Props> = ({ pageContext }) => {
  useRedirectIfNotSignedIn()
  const previewTypeOptions = usePreviewType()
  const { data: currentUser } = useCurrentUser()
  const [emailTemplateConfig] = useState<EmailTemplate.Unique.Config>(() => ({
    ...pageContext.emailTemplate,
    versionTimestamp: currentTimestamp(),
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
                  <PageContent element="div" className="email-editor-page-content-container">
                    <VisuallyHidden>
                      <h2>Email Preview</h2>
                    </VisuallyHidden>
                    <EmailEditorContent
                      actions={
                        <>
                          <SelectPreviewType {...previewTypeOptions} />
                          <div className="share-and-save-buttons">
                            <div className="save-and-update-buttons">
                              <EmailTemplateSaveAsDialog groups={currentUser?.groups} />
                            </div>
                          </div>
                        </>
                      }
                      emailTemplate={currentEmailTemplate}
                      emailTranslation={currentTranslation}
                      currentUser={currentUser ?? { id: 'placeholder' }}
                      preview={previewTypeOptions.current}
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
