import React, { FC, ReactElement, ReactNode } from 'react'
import { Link } from 'gatsby'
import { EmailParts } from 'src/appTypes'
import {
  MoreInfoAboutDateRange,
  MoreInfoAboutStatus,
  MoreInfoAboutAdditionalContent,
  MoreInfoAboutProgramName,
  MoreInfoAboutDirectiveButton,
  MoreInfoAboutDirective,
  MoreInfoAboutRulesRightsRegulations,
  MoreInfoAboutInformationalBox,
} from 'src/guides/MoreInfoAboutSubComponent'

interface Props {
  emailSubComponent: EmailParts.Base.Part<EmailParts.Kinds.SubComponent>
}

export const EmailSubComponentDescription: FC<Props> = ({ emailSubComponent }) => {
  switch (emailSubComponent.kind) {
    case 'DepartmentSeal':
      return (
        <Description>
          Edit this in&nbsp;<Link to="/settings/email">Settings</Link>
        </Description>
      )
    case 'DateRange':
      return (
        <Description moreInfo={<MoreInfoAboutDateRange />}>
          Using names of months is preferred over numbers (i.e. Jan 5 is clearer than 01/05)
        </Description>
      )
    case 'Title':
      return <Description>Keep this short and to the point!</Description>
    case 'Intro':
      return (
        <Description>Keep it simple and clear. Don't use filler language like "please"</Description>
      )
    case 'RulesRightsRegulations':
      return (
        <Description moreInfo={<MoreInfoAboutRulesRightsRegulations />}>
          Rights? Regulations? Appeals? Reminders?
        </Description>
      )
    case 'Status':
      return (
        <Description moreInfo={<MoreInfoAboutStatus />}>
          Make it obvious what the current state is.
        </Description>
      )
    case 'SupplementalContent':
      return (
        <Description>
          Add other resources that will help color the message you're sending
        </Description>
      )
    case 'LoginDetails':
      return <Description>Just in case they need to reset their password</Description>
    case 'AdditionalContent':
      return (
        <Description moreInfo={<MoreInfoAboutAdditionalContent />}>
          <span>
            A great place to add links to find out more about programs and other state offerings.{' '}
            <strong>Do not use "click here"!</strong>
          </span>
        </Description>
      )
    case 'ProgramName':
      return (
        <Description moreInfo={<MoreInfoAboutProgramName />}>
          Let people know which program this email concerns
        </Description>
      )
    case 'DirectiveButton':
      return (
        <Description moreInfo={<MoreInfoAboutDirectiveButton />}>
          This button is always the same as the one that appears in the Directive
        </Description>
      )
    case 'Directive':
      return (
        <Description moreInfo={<MoreInfoAboutDirective />}>
          Tell people how to do what they need to do, step by step
        </Description>
      )
    case 'InformationalBox':
      return (
        <Description moreInfo={<MoreInfoAboutInformationalBox />}>
          Call out information in colors
        </Description>
      )
  }
}

interface DescriptionProps {
  moreInfo?: ReactElement
  children: ReactNode
}

const Description: FC<DescriptionProps> = ({ children, moreInfo }) => {
  return (
    <p className="description">
      {moreInfo}
      <span>{children}</span>
    </p>
  )
}
