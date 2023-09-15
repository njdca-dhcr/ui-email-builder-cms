import React, { FC } from 'react'
import type { CmsWidgetControlProps, CmsWidgetPreviewProps } from 'netlify-cms-core'

export const InnovationWidget: FC<CmsWidgetControlProps<string>> = ({
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

export const InnovationWidgetPreview: FC<CmsWidgetPreviewProps> = ({
  entry,
  field,
  fieldsMetaData,
  getAsset,
  metadata,
  value,
}) => {
  return <div>{value}</div>
}
