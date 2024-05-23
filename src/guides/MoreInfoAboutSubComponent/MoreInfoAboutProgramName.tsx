import React, { FC } from 'react'
import { MoreInfo } from 'src/ui'
import { MoreInfoImage } from './Shared'
import programNameUiPng from './images/program-name-ui.png'
import programNameUiEligibilityPng from './images/program-name-ui-eligibility.png'
import programNameDuaPng from './images/program-name-dua.png'

export const MoreInfoAboutProgramName: FC = () => {
  const programName = <strong>Program Name</strong>
  return (
    <MoreInfo title="Program Name">
      <p>
        The {programName} is a small tag that appears just below the title of your email. Use it to
        let people know which program this email concerns.
      </p>
      <MoreInfoImage
        alt={`A blue program name that reads "Unemployment Insurance (UI)"`}
        src={programNameUiPng}
      />
      <p>Use different colors in addition to text to differentiate programs.</p>
      <MoreInfoImage
        alt={`A pink program name that reads "Unemployment Insurance (UI) Monetary Eligibility"`}
        src={programNameUiEligibilityPng}
      />
      <p>
        Depending on the state you're sending emails for, there may be preconfigured program names
        with background colors to select from in the sidebar controls for {programName}.
      </p>
      <MoreInfoImage
        alt={`A lavender program name that reads "Disaster Unemployment Insurance (DUA)"`}
        src={programNameDuaPng}
      />
    </MoreInfo>
  )
}
