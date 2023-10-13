import React, { FC } from 'react'
import type { PreviewTemplateComponentProps } from 'netlify-cms-core'
import 'src/styles/app.css'
import { EmailTemplate } from 'src/appTypes'
import { EmailEditorContent } from 'src/templates/EmailEditorContent'
import { ShouldShowEmailPart } from 'src/templates/ShouldShowEmailPart'
import {
  ClearCurrentlyActiveEmailPart,
  CurrentlyActiveEmailPart,
} from 'src/templates/CurrentlyActiveEmailPart'
import { Layout, PageContent, Sidebar } from 'src/ui/Layout'
import { EmailPartsContent } from 'src/templates/EmailPartsContent'
import 'src/templates/EmailEditorPage.css'
import { PreviewText } from 'src/templates/PreviewText'
import { EditPreviewText } from 'src/templates/EmailEditorSidebar/EditPreviewText'
import { EmailEditorSidebarAccordion } from 'src/templates/EmailEditorSidebar/EmailEditorSidebarAccordion'

type Entry = PreviewTemplateComponentProps['entry']

const entryToEmailTemplate = (entry: Entry): EmailTemplate.Config => {
  const data: Entry = entry.get('data')
  const componentEntries: Entry[] = data.get('components').toArray()

  return {
    name: data.get('name') ?? '',
    description: data.get('description') ?? '',
    components: componentEntries.map((componentEntry) => {
      const subComponents = componentEntry.get('subComponents')
      const subComponentEntries: Entry[] = subComponents ? subComponents.toArray() : []
      return {
        kind: componentEntry.get('kind') ?? '',
        description: componentEntry.get('description') ?? '',
        required: componentEntry.get('required') ?? false,
        subComponents: subComponentEntries.map((subComponent) => ({
          kind: subComponent.get('kind'),
          description: subComponent.get('description'),
          required: subComponent.get('required'),
        })),
      }
    }),
  }
}

export const CmsEmailTemplatePreviewTemplate: FC<PreviewTemplateComponentProps> = ({ entry }) => {
  const emailTemplate = entryToEmailTemplate(entry)

  return (
    <Layout element="main" singleScroll>
      <ShouldShowEmailPart>
        <CurrentlyActiveEmailPart>
          <ClearCurrentlyActiveEmailPart />
          <PreviewText>
            <EmailPartsContent>
              <Sidebar>
                <EditPreviewText />
                <EmailEditorSidebarAccordion.Container>
                  {(emailTemplate.components ?? []).map((emailComponent, componentId) => (
                    <EmailEditorSidebarAccordion.EmailComponent
                      key={componentId}
                      id={`${componentId}`}
                      emailComponent={emailComponent}
                    >
                      {(emailComponent.subComponents ?? []).map(
                        (emailSubComponent, subComponentId) => (
                          <EmailEditorSidebarAccordion.EmailSubComponent
                            key={subComponentId}
                            componentId={`${componentId}`}
                            id={`${subComponentId}`}
                            emailSubComponent={emailSubComponent}
                          />
                        ),
                      )}
                    </EmailEditorSidebarAccordion.EmailComponent>
                  ))}
                </EmailEditorSidebarAccordion.Container>
              </Sidebar>
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
