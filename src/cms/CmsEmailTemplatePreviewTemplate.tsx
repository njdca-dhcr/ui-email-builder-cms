import React, { FC } from 'react'
import type { PreviewTemplateComponentProps } from 'decap-cms-core'
import 'src/styles/app.css'
import { EmailTemplate } from 'src/appTypes'
import { EmailEditorContent } from 'src/templates/EmailEditorContent'
import {
  ClearCurrentlyActiveEmailPart,
  CurrentlyActiveEmailPart,
} from 'src/templates/CurrentlyActiveEmailPart'
import { Layout, PageContent, Sidebar } from 'src/ui'
import { EmailPartsContent } from 'src/templates/EmailPartsContent'
import 'src/templates/EmailEditorPage.css'
import { PreviewText } from 'src/templates/PreviewText'
import { EditPreviewText } from 'src/templates/EmailEditorContent/EditPreviewText'
import { EmailEditorSidebarAccordion } from 'src/templates/EmailEditorSidebar/EmailEditorSidebarAccordion'
import uniqueId from 'lodash.uniqueid'
import { CurrentLanguage } from 'src/templates/CurrentLanguage'

type Entry = PreviewTemplateComponentProps['entry']

const entryToEmailTemplate = (entry: Entry): EmailTemplate.Unique.Config => {
  const data: Entry = entry.get('data')
  const translationEntries: Entry[] = data.get('translations').toArray()

  return {
    name: data.get('name') ?? '',
    description: data.get('description') ?? '',
    translations: translationEntries.map((translationEntry) => {
      const componentEntries: Entry[] = translationEntry.get('components').toArray()
      return {
        language: translationEntry.get('language') ?? '',
        components: componentEntries.map((componentEntry) => {
          const subComponents = componentEntry.get('subComponents')
          const subComponentEntries: Entry[] = subComponents ? subComponents.toArray() : []
          return {
            id: uniqueId(),
            kind: componentEntry.get('kind') ?? '',
            required: componentEntry.get('required') ?? false,
            subComponents: subComponentEntries.map((subComponent) => ({
              id: uniqueId(),
              kind: subComponent.get('kind'),
              description: subComponent.get('description'),
              required: subComponent.get('required'),
            })),
          }
        }),
      }
    }),
  }
}

export const CmsEmailTemplatePreviewTemplate: FC<PreviewTemplateComponentProps> = ({ entry }) => {
  const emailTemplate = entryToEmailTemplate(entry)
  const [firstTranslation] = emailTemplate.translations ?? []
  const translation = firstTranslation ?? []

  return (
    <Layout element="main">
      <CurrentlyActiveEmailPart>
        <ClearCurrentlyActiveEmailPart />
        <CurrentLanguage key={emailTemplate.id} emailTemplateConfig={emailTemplate}>
          {([language]) => (
            <PreviewText>
              <EmailPartsContent key={language}>
                <Sidebar>
                  <EditPreviewText />
                  <EmailEditorSidebarAccordion.Container>
                    {(translation.components ?? []).map((emailComponent) => (
                      <EmailEditorSidebarAccordion.EmailComponent
                        key={emailComponent.id}
                        emailComponent={emailComponent}
                      >
                        {(emailComponent.subComponents ?? []).map((emailSubComponent, i) => (
                          <EmailEditorSidebarAccordion.EmailSubComponent
                            key={emailSubComponent.id}
                            component={emailComponent}
                            emailSubComponent={emailSubComponent}
                            nextEmailSubComponent={(emailComponent.subComponents ?? [])[i + 1]}
                          />
                        ))}
                      </EmailEditorSidebarAccordion.EmailComponent>
                    ))}
                  </EmailEditorSidebarAccordion.Container>
                </Sidebar>
                <PageContent element="div" className="email-editor-page-content">
                  <EmailEditorContent language={language} emailTemplate={emailTemplate} />
                </PageContent>
              </EmailPartsContent>
            </PreviewText>
          )}
        </CurrentLanguage>
      </CurrentlyActiveEmailPart>
    </Layout>
  )
}
