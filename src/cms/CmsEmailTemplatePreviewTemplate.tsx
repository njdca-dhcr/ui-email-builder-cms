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
import {
  EmailEditorToggle,
  EmailEditorToggleSection,
  EmailEditorToggles,
} from 'src/templates/EmailEditorSidebar/EmailEditorToggles'
import 'src/templates/EmailEditorPage.css'
import { labelForSubComponent } from 'src/templates/EmailEditorSidebar/labelForSubComponent'

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
          required: subComponent.get('required'),
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
          <EmailPartsContent>
            <Sidebar>
              <EmailEditorToggles>
                {(emailTemplate.components ?? []).map(
                  ({ description, kind, required, subComponents }, i) => (
                    <EmailEditorToggleSection
                      key={i}
                      componentId={`${i}`}
                      description={description}
                      label={kind}
                      required={required}
                    >
                      {subComponents &&
                        subComponents.map((subComponent, n) => (
                          <EmailEditorToggle
                            key={n}
                            componentId={`${i}`}
                            disabled={subComponent.required}
                            label={labelForSubComponent(subComponent.kind)}
                            subComponentId={`${n}`}
                          />
                        ))}
                    </EmailEditorToggleSection>
                  ),
                )}
              </EmailEditorToggles>
            </Sidebar>
            <PageContent element="div" className="email-editor-page-content">
              <EmailEditorContent emailTemplate={emailTemplate} />
            </PageContent>
          </EmailPartsContent>
        </CurrentlyActiveEmailPart>
      </ShouldShowEmailPart>
    </Layout>
  )
}
