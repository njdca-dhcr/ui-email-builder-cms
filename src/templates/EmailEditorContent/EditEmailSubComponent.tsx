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
import { EmailParts, EmailTemplate } from 'src/appTypes'
import { DirectiveButton } from '../EmailTemplateSubComponents/DirectiveButton'

export const EditEmailSubComponent: FC<EmailSubComponentProps<EmailParts.Kinds.SubComponent>> = ({
  emailSubComponent,
  ...props
}) => {
  const shouldShow = useShouldShowEmailPart(emailSubComponent)

  if (shouldShow.off) return null

  switch (emailSubComponent.kind) {
    case 'AdditionalContent':
      return (
        <AdditionalContent
          {...props}
          emailSubComponent={emailSubComponent as EmailParts.AdditionalContent}
        />
      )
    case 'DateRange':
      return <DateRange {...props} emailSubComponent={emailSubComponent as EmailParts.DateRange} />
    case 'Title':
      return <Title {...props} emailSubComponent={emailSubComponent as EmailParts.Title} />
    case 'ProgramName':
      return (
        <ProgramName {...props} emailSubComponent={emailSubComponent as EmailParts.ProgramName} />
      )
    case 'DirectiveButton':
      return (
        <DirectiveButton
          {...props}
          emailSubComponent={emailSubComponent as EmailParts.DirectiveButton}
        />
      )
    case 'Intro':
      return <Intro {...props} emailSubComponent={emailSubComponent as EmailParts.Intro} />
    case 'RulesRightsRegulations':
      return (
        <RulesRightsRegulations
          {...props}
          emailSubComponent={emailSubComponent as EmailParts.RulesRightsRegulations}
        />
      )
    case 'Status':
      return <Status {...props} emailSubComponent={emailSubComponent as EmailParts.Status} />
    case 'SupplementalContent':
      return (
        <SupplementalContent
          {...props}
          emailSubComponent={emailSubComponent as EmailParts.SupplementalContent}
        />
      )
    case 'Directive':
      return <Directive {...props} emailSubComponent={emailSubComponent as EmailParts.Directive} />
    case 'LoginDetails':
      return (
        <LoginDetails {...props} emailSubComponent={emailSubComponent as EmailParts.LoginDetails} />
      )
    case 'DepartmentSeal':
      return (
        <DepartmentSeal
          {...props}
          emailSubComponent={emailSubComponent as EmailParts.DepartmentSeal}
        />
      )
    case 'InformationalBox':
      return (
        <InformationalBox
          {...props}
          emailSubComponent={emailSubComponent as EmailParts.InformationalBox}
        />
      )
    default:
      console.warn(`SubComponent (${emailSubComponent.kind}) not implemented`, {
        ...props,
        emailSubComponent,
      })
  }
}
