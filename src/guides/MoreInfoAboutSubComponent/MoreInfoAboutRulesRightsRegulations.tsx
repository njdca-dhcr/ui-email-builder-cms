import React, { FC } from 'react'
import { MoreInfo } from 'src/ui/MoreInfo'
import { MoreInfoImage } from './Shared'
import appealRightsPng from './images/appeal-rights.png'
import reminderPng from './images/reminder.png'
import yourRightsPng from './images/your-rights.png'
import rrrControlsPng from './images/rrr-controls.png'

export const MoreInfoAboutRulesRightsRegulations: FC = () => {
  const appealRights = <strong>Appeal Rights</strong>
  const reminder = <strong>Reminder</strong>
  const yourRights = <strong>Your Rights</strong>
  const all = <strong>Rights, Regulations, Appeals, and Reminders</strong>

  return (
    <MoreInfo title="Rights, Regulations, Appeals, and Reminders">
      <p>
        The {all} section can be configured to show a {reminder}, {appealRights}, or {yourRights} in
        the sidebar controls.
      </p>
      <MoreInfoImage
        alt={`The sidebar controls for Rights, Regulations, Appeals, and Reminders with "Reminder" selected`}
        src={rrrControlsPng}
      />
      <h3>{appealRights}</h3>
      <p>
        {appealRights} communicates to recipients a specific action they could take if they disagree
        with the direction of the current process. Try to provide any relevant information that
        would make it easier to complete this action.
      </p>
      <MoreInfoImage
        alt="An appeal rights box detailing how begin the appeal process"
        src={appealRightsPng}
      />
      <h3>{reminder}</h3>
      <p>
        {reminder} is exactly what it sounds like: a place to provide any important context that may
        have been previously communicated.
      </p>
      <MoreInfoImage
        alt="A reminder box detailing rules around eligibility for a program"
        src={reminderPng}
      />
      <h3>{yourRights}</h3>
      <p>
        {yourRights} is primarily for enumerating the recipient's rights within the context of the
        email.
      </p>
      <MoreInfoImage
        alt="A your rights box featuring a numbered list of rights available to the recipient"
        src={yourRightsPng}
      />
    </MoreInfo>
  )
}
