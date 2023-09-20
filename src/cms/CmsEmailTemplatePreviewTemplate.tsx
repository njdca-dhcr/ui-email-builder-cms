import React, { FC } from 'react'
import type { PreviewTemplateComponentProps } from 'netlify-cms-core'
import { BasicTemplateContents } from 'src/templates/BasicTemplateContents'
import { EmailTemplate } from 'src/appTypes'

type Entry = PreviewTemplateComponentProps['entry']

const entryToEmailTemplate = (entry: Entry): EmailTemplate => {
  const data: Entry = entry.get('data')
  const componentEntries: Entry[] = data.get('components').toArray()

  return {
    name: data.get('name') ?? '',
    description: data.get('description') ?? '',
    components: componentEntries.map((componentEntry) => ({
      component: componentEntry.get('component') ?? '',
      description: componentEntry.get('description') ?? '',
    })),
  }
}

export const CmsEmailTemplatePreviewTemplate: FC<PreviewTemplateComponentProps> = ({ entry }) => {
  const emailTemplate = entryToEmailTemplate(entry)

  return <BasicTemplateContents emailTemplate={emailTemplate} />
}
