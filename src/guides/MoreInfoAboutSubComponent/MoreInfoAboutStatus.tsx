import React, { FC } from 'react'
import { MoreInfo } from 'src/ui/MoreInfo'
import { MoreInfoImage } from './Shared'
import statusControlsPng from './images/status-controls.png'
import statusWithSupportiveInfoPng from './images/status-with-supportive-info.png'

export const MoreInfoAboutStatus: FC = () => {
  const status = <strong>Status</strong>
  return (
    <MoreInfo title="Status">
      <p>
        The {status} is all about communicating where things currently stand with their application,
        benefits, or anything you may be contacting them for.
      </p>
      <p>
        A {status} can also contain more specific information such as timeline information or
        relevant case numbers or identifiers in the description of the {status}. If you have any
        additional caveat, those can be placed in the supportive information of the {status}.
      </p>
      <MoreInfoImage
        alt="A status with supportive information below it"
        src={statusWithSupportiveInfoPng}
      />
      <p>
        The presence of the description or supportive information can be toggled in the sidebar (if
        the selected kind of {status} allows for it).
      </p>
      <MoreInfoImage alt="Status controls as they appear in the sidebar" src={statusControlsPng} />
    </MoreInfo>
  )
}
