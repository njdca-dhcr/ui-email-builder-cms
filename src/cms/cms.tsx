import React, { FC, useState } from 'react'
import CMS from 'netlify-cms-app'
import type {
  CmsWidgetControlProps,
  CmsWidgetPreviewProps,
  PreviewTemplateComponentProps,
} from 'netlify-cms-core'

const InnovationWidget: FC<CmsWidgetControlProps<string>> = ({
  classNameWrapper,
  field,
  forID,
  onChange,
  value,
}) => {
  return (
    <input
      className={classNameWrapper}
      id={forID}
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value.toUpperCase())}
    />
  )
}

const InnovationWidgetPreview: FC<CmsWidgetPreviewProps> = ({
  entry,
  field,
  fieldsMetaData,
  getAsset,
  metadata,
  value,
}) => {
  debugger
  return <div>{value}</div>
}

CMS.registerWidget('innovation', InnovationWidget, InnovationWidgetPreview)

const EmailTemplatePreviewTemplate: FC<PreviewTemplateComponentProps> = ({ entry, ...props }) => {
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

CMS.registerPreviewTemplate('email_templates', EmailTemplatePreviewTemplate)
