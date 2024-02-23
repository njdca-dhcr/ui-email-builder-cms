import React, { FC } from 'react'
import { EmailSubComponentProps } from '../EmailTemplateSubComponents/shared'
import { DateRange } from '../EmailTemplateSubComponents/DateRange'
import { Title } from '../EmailTemplateSubComponents/Title'
import { useShouldShowEmailPart } from '../ShouldShowEmailPart'
import { ProgramName } from '../EmailTemplateSubComponents/ProgramName'
import { AdditionalContent } from '../EmailTemplateSubComponents/AdditionalContent'
import { Intro } from '../EmailTemplateSubComponents/Intro'
import { Status } from '../EmailTemplateSubComponents/Status'
import { SupplementalContent } from '../EmailTemplateSubComponents/SupplementalContent'
import { Directive } from '../EmailTemplateSubComponents/Directive'
import { RulesRightsRegulations } from '../EmailTemplateSubComponents/RulesRightsRegulations'
import { LoginDetails } from '../EmailTemplateSubComponents/LoginDetails'
import { DepartmentSeal } from '../EmailTemplateSubComponents/DepartmentSeal'
import { InformationalBox } from '../EmailTemplateSubComponents/InformationalBox'

export const EditEmailSubComponent: FC<EmailSubComponentProps> = (props) => {
  const shouldShow = useShouldShowEmailPart(props.emailSubComponent.id)

  if (shouldShow.off) return null

  switch (props.emailSubComponent.kind) {
    case 'AdditionalContent':
      return <AdditionalContent {...props} />
    case 'DateRange':
      return <DateRange {...props} />
    case 'Title':
      return <Title {...props} />
    case 'ProgramName':
      return <ProgramName {...props} />
    case 'Intro':
      return <Intro {...props} />
    case 'RulesRightsRegulations':
      return <RulesRightsRegulations {...props} />
    case 'Status':
      return <Status {...props} />
    case 'SupplementalContent':
      return <SupplementalContent {...props} />
    case 'Directive':
      return <Directive {...props} />
    case 'LoginDetails':
      return <LoginDetails {...props} />
    case 'DepartmentSeal':
      return <DepartmentSeal {...props} />
    case 'InformationalBox':
      return <InformationalBox {...props} />
    default:
      console.warn(`SubComponent (${props.emailSubComponent.kind}) not implemented`, props)
  }
}
