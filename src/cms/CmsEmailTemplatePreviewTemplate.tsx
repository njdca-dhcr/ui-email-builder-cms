import React, { FC } from 'react'
import type { PreviewTemplateComponentProps } from 'netlify-cms-core'
import { EmailTemplate } from 'src/appTypes'
import { EmailEditorContent } from 'src/templates/EmailEditorContent'
import { ShouldShowEmailPart } from 'src/templates/ShouldShowEmailPart'
import { CurrentlyActiveEmailPart } from 'src/templates/CurrentlyActiveEmailPart'
import { EmailPartsContent } from 'src/templates/EmailPartsContent'

type Entry = PreviewTemplateComponentProps['entry']

const entryToEmailTemplate = (entry: Entry): EmailTemplate.Config => {
  const data: Entry = entry.get('data')
  const componentEntries: Entry[] = data.get('components').toArray()

  return {
    name: data.get('name') ?? '',
    description: data.get('description') ?? '',
    components: componentEntries.map((componentEntry) => {
      const subComponentEntries: Entry[] = componentEntry.get('subComponents').toArray()
      return {
        kind: componentEntry.get('kind') ?? '',
        description: componentEntry.get('description') ?? '',
        required: componentEntry.get('required') ?? false,
        subComponents: subComponentEntries.map((subComponent) => ({
          kind: subComponent.get('kind'),
          required: subComponent.get('kind'),
        })),
      }
    }),
  }
}

export const CmsEmailTemplatePreviewTemplate: FC<PreviewTemplateComponentProps> = ({ entry }) => {
  const emailTemplate = entryToEmailTemplate(entry)

  return (
    <ShouldShowEmailPart>
      <CurrentlyActiveEmailPart>
        <EmailPartsContent>
          <EmailEditorContent emailTemplate={emailTemplate} />
        </EmailPartsContent>
      </CurrentlyActiveEmailPart>
    </ShouldShowEmailPart>
  )
}
