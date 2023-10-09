import React, { FC } from 'react'
import { EmailSubComponentProps } from '../EmailTemplateSubComponents/shared'
import { Title } from '../EmailTemplateSubComponents/Title'
import { useShouldShowEmailSubComponent } from '../ShouldShowEmailPart'
import { ProgramName } from '../EmailTemplateSubComponents/ProgramName'
import { AdditionalContent } from '../EmailTemplateSubComponents/AdditionalContent'
import { Intro } from '../EmailTemplateSubComponents/Intro'
import { Status } from '../EmailTemplateSubComponents/Status'
import { SupplementalContent } from '../EmailTemplateSubComponents/SupplementalContent'
import { Directive } from '../EmailTemplateSubComponents/Directive'

export const EditEmailSubComponent: FC<EmailSubComponentProps> = (props) => {
  const shouldShow = useShouldShowEmailSubComponent(props.componentId, props.id)

  if (!shouldShow.on) return null

  switch (props.emailSubComponent.kind) {
    case 'AdditionalContent':
      return <AdditionalContent {...props} />
    case 'Title':
      return <Title {...props} />
    case 'ProgramName':
      return <ProgramName {...props} />
    case 'Intro':
      return <Intro {...props} />
    case 'Status':
      return <Status {...props} />
    case 'SupplementalContent':
      return <SupplementalContent {...props} />
    case 'Directive':
      return <Directive {...props} />
    default:
      console.warn(`SubComponent (${props.emailSubComponent.kind}) not implemented`, props)
  }
}
