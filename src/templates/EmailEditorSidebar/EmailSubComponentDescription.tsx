import React, { FC, ReactNode } from 'react'
import { Link } from 'gatsby'
import { EmailTemplate } from 'src/appTypes'

interface Props {
  emailSubComponent: EmailTemplate.SubComponent
}

export const EmailSubComponentDescription: FC<Props> = ({ emailSubComponent }) => {
  switch (emailSubComponent.kind) {
    case 'DepartmentSeal':
      return (
        <Description>
          Edit this in <Link to="/settings">Settings</Link>
        </Description>
      )
    case 'DateRange':
      return (
        <Description>
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
      return <Description>Rights? Regulations? Appeals? Reminders?</Description>
    case 'Status':
      return <Description>Make it obvious what the current state is</Description>
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
        <Description>
          A great place to add links to find out more about programs and other state offerings.{' '}
          <strong>Do not use "click here"!</strong>
        </Description>
      )
    case 'DirectiveButton':
    case 'ProgramName':
    case 'Directive':
    case 'InformationalBox':
      return null
  }
}

const Description: FC<{ children: ReactNode }> = ({ children }) => {
  return <p className="description">{children}</p>
}
