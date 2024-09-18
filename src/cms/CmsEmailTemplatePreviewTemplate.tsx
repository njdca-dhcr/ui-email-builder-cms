import React, { FC } from 'react'
import type { PreviewTemplateComponentProps } from 'decap-cms-core'
import 'src/styles/app.css'
import { EmailTemplate } from 'src/appTypes'
import { EmailEditorContent } from 'src/templates/EmailEditorContent'
import { ShouldShowEmailPart } from 'src/templates/ShouldShowEmailPart'
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

type Entry = PreviewTemplateComponentProps['entry']

const entryToEmailTemplate = (entry: Entry): EmailTemplate.UniqueConfig => {
  const data: Entry = entry.get('data')
  const componentEntries: Entry[] = data.get('components').toArray()

  return {
    name: data.get('name') ?? '',
    description: data.get('description') ?? '',
    components: componentEntries.map((componentEntry) => {
      const subComponents = componentEntry.get('subComponents')
      const subComponentEntries: Entry[] = subComponents ? subComponents.toArray() : []
      return {
        id: uniqueId(),
        kind: componentEntry.get('kind') ?? '',
        required: componentEntry.get('required') ?? false,
        visibleByDefault: componentEntry.get('visibleByDefault') ?? true,
        subComponents: subComponentEntries.map((subComponent) => ({
          id: uniqueId(),
          kind: subComponent.get('kind'),
          description: subComponent.get('description'),
          required: subComponent.get('required'),
          visibleByDefault: subComponent.get('visibleByDefault') ?? true,
        })),
      }
    }),
  }
}

export const CmsEmailTemplatePreviewTemplate: FC<PreviewTemplateComponentProps> = ({ entry }) => {
  const emailTemplate = entryToEmailTemplate(entry)

  return (
    <Layout element="main">
      <ShouldShowEmailPart>
        <CurrentlyActiveEmailPart>
          <ClearCurrentlyActiveEmailPart />
          <PreviewText>
            <EmailPartsContent>
              <Sidebar>
                <EditPreviewText />
                <EmailEditorSidebarAccordion.Container>
                  {(emailTemplate.components ?? []).map((emailComponent) => (
                    <EmailEditorSidebarAccordion.EmailComponent
                      key={emailComponent.id}
                      emailComponent={emailComponent}
                    >
                      {(emailComponent.subComponents ?? []).map((emailSubComponent, i) => (
                        <EmailEditorSidebarAccordion.EmailSubComponent
                          key={emailSubComponent.id}
                          componentId={emailComponent.id}
                          emailSubComponent={emailSubComponent}
                          nextEmailSubComponent={(emailComponent.subComponents ?? [])[i + 1]}
                        />
                      ))}
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
