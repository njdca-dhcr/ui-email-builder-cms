import React, { FC } from 'react'
import { MoreInfo } from 'src/ui'
import { MoreInfoImage } from './Shared'
import directiveButtonPng from './images/directive-button.png'
import directive3StepPng from './images/directive-3-step.png'

export const MoreInfoAboutDirectiveButton: FC = () => {
  const directiveButton = <strong>Directive Button</strong>
  const directive = <strong>Directive</strong>
  return (
    <MoreInfo title="Directive Button">
      <p>
        The {directiveButton} may appear in the header of any email that also has a {directive} to
        really reduce the time it takes for people to take action regarding this email.
      </p>
      <MoreInfoImage
        alt={`A black directive button that reads "Get Started"`}
        src={directiveButtonPng}
      />
      <p>
        The {directiveButton} always has the same background color, text, and link as the button in
        the {directive}.
      </p>
      <MoreInfoImage
        alt={`A three step directive feature the same black directive button`}
        src={directive3StepPng}
      />
      <p>
        In order to change the {directiveButton}, please edit the {directive} itself.
      </p>
    </MoreInfo>
  )
}
