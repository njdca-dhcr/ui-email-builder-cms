import React, { FC } from 'react'
import { EmailSubComponentProps } from '../EmailTemplateSubComponents/shared'
import { Title } from '../EmailTemplateSubComponents/Title'
import { useShouldShowEmailSubComponent } from '../ShouldShowEmailPart'
import { Label } from '../EmailTemplateSubComponents/Label'
import { AdditionalContent } from '../EmailTemplateSubComponents/AdditionalContent'
import { Intro } from '../EmailTemplateSubComponents/Intro'
import { Breakdown } from '../EmailTemplateSubComponents/Breakdown'

export const EditEmailSubComponent: FC<EmailSubComponentProps> = (props) => {
  const shouldShow = useShouldShowEmailSubComponent(props.componentId, props.id)

  if (!shouldShow.on) return null

  switch (props.emailSubComponent.kind) {
    case 'AdditionalContent':
      return <AdditionalContent {...props} />
    case 'Breakdown':
      return <Breakdown {...props} />
    case 'Title':
      return <Title {...props} />
    case 'Label':
      return <Label {...props} />
    case 'Intro':
      return <Intro {...props} />
    default:
      console.warn(`SubComponent (${props.emailSubComponent.kind}) not implemented`, props)
  }
}
