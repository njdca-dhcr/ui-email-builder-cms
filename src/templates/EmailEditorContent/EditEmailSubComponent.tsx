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
import { EmailTemplate } from 'src/appTypes'
import { DirectiveButton } from '../EmailTemplateSubComponents/DirectiveButton'

export const EditEmailSubComponent: FC<EmailSubComponentProps<EmailTemplate.SubComponentKind>> = ({
  emailSubComponent,
  ...props
}) => {
  const shouldShow = useShouldShowEmailPart(emailSubComponent.id)

  if (shouldShow.off) return null

  switch (emailSubComponent.kind) {
    case 'AdditionalContent':
      return (
        <AdditionalContent
          {...props}
          emailSubComponent={emailSubComponent as EmailTemplate.AdditionalContent}
        />
      )
    case 'DateRange':
      return (
        <DateRange {...props} emailSubComponent={emailSubComponent as EmailTemplate.DateRange} />
      )
    case 'Title':
      return <Title {...props} emailSubComponent={emailSubComponent as EmailTemplate.Title} />
    case 'ProgramName':
      return (
        <ProgramName
          {...props}
          emailSubComponent={emailSubComponent as EmailTemplate.ProgramName}
        />
      )
    case 'DirectiveButton':
      return (
        <DirectiveButton
          {...props}
          emailSubComponent={emailSubComponent as EmailTemplate.DirectiveButton}
        />
      )
    case 'Intro':
      return <Intro {...props} emailSubComponent={emailSubComponent as EmailTemplate.Intro} />
    case 'RulesRightsRegulations':
      return (
        <RulesRightsRegulations
          {...props}
          emailSubComponent={emailSubComponent as EmailTemplate.RulesRightsRegulations}
        />
      )
    case 'Status':
      return <Status {...props} emailSubComponent={emailSubComponent as EmailTemplate.Status} />
    case 'SupplementalContent':
      return (
        <SupplementalContent
          {...props}
          emailSubComponent={emailSubComponent as EmailTemplate.SupplementalContent}
        />
      )
    case 'Directive':
      return (
        <Directive {...props} emailSubComponent={emailSubComponent as EmailTemplate.Directive} />
      )
    case 'LoginDetails':
      return (
        <LoginDetails
          {...props}
          emailSubComponent={emailSubComponent as EmailTemplate.LoginDetails}
        />
      )
    case 'DepartmentSeal':
      return (
        <DepartmentSeal
          {...props}
          emailSubComponent={emailSubComponent as EmailTemplate.DepartmentSeal}
        />
      )
    case 'InformationalBox':
      return (
        <InformationalBox
          {...props}
          emailSubComponent={emailSubComponent as EmailTemplate.InformationalBox}
        />
      )
    default:
      console.warn(`SubComponent (${emailSubComponent.kind}) not implemented`, {
        ...props,
        emailSubComponent,
      })
  }
}
