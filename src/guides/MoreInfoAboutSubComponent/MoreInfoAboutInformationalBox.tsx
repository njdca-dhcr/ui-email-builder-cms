import React, { FC } from 'react'
import { MoreInfo } from 'src/ui'
import { MoreInfoImage } from './Shared'
import informationalBoxYellowPng from './images/informational-box-yellow.png'
import informationalBoxGrayPng from './images/informational-box-gray.png'
import informationalBoxBluePng from './images/informational-box-blue.png'

export const MoreInfoAboutInformationalBox: FC = () => {
  const informationalBox = <strong>Informational Box</strong>
  return (
    <MoreInfo title="Informational Box">
      <p>
        The {informationalBox} provides a way to call out information in a generic way while feeling
        more specific. Adjust the color and icon of the box to match the feeling of the information.
      </p>
      <p>For example, a warning might use "Yielding Yellow."</p>
      <MoreInfoImage
        alt={`A yellow informational box explaining that program certifications must be completed weekly`}
        src={informationalBoxYellowPng}
      />
      <p>Or try a cooler color for more positive information.</p>
      <MoreInfoImage
        alt={`A blue informational box explaining there are a number of reasons for a change in benefits`}
        src={informationalBoxBluePng}
      />
      <p>
        Of course, there's the neutral "Governing Gray" for when the information requires a bit more
        authority.
      </p>
      <MoreInfoImage
        alt={`An information box explaining that the recipient should call if they don't receive a response within seven days`}
        src={informationalBoxGrayPng}
      />
    </MoreInfo>
  )
}
