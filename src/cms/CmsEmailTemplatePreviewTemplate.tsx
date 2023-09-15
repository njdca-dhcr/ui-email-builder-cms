import React, { FC } from 'react'
import type { PreviewTemplateComponentProps } from 'netlify-cms-core'

export const CmsEmailTemplatePreviewTemplate: FC<PreviewTemplateComponentProps> = ({ entry }) => {
  return (
    <div>
      Email template preview template
      <ul>
        <li>Title: {entry.getIn(['data', 'title'])}</li>
        <li>Custom Widget test: {entry.getIn(['data', 'widget-test'])}</li>
      </ul>
    </div>
  )
}
