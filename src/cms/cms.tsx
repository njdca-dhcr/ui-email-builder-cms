import CMS from 'netlify-cms-app'
import type { CmsConfig } from 'netlify-cms-core'
import { InnovationWidget, InnovationWidgetPreview } from './InnovationWidget'
import { CmsEmailTemplatePreviewTemplate } from './CmsEmailTemplatePreviewTemplate'

CMS.registerWidget('innovation', InnovationWidget, InnovationWidgetPreview)

CMS.registerPreviewTemplate('email_templates', CmsEmailTemplatePreviewTemplate)

const cmsConfig: Partial<CmsConfig> = {
  local_backend: process.env.NODE_ENV === 'development',
}

CMS.init({ config: cmsConfig as any })
