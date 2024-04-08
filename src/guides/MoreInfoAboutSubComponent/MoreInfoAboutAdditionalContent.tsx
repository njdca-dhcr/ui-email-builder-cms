import React, { FC } from 'react'
import { MoreInfo } from 'src/ui/MoreInfo'
import { MoreInfoImage } from './Shared'
import additionalContentPng from './images/additional-content.png'

export const MoreInfoAboutAdditionalContent: FC = () => {
  const additionalContent = <strong>Additional Content</strong>
  return (
    <MoreInfo title="Additional Content">
      <p>
        {additionalContent} is a place for information about the larger context for why someone
        received this email. This could include links to more information about the relevant
        program(s) or what someone should do if they believe they've received this email by
        accident.
      </p>
      <MoreInfoImage alt="An example of the additional content" src={additionalContentPng} />
      <p>
        Avoid using links that say "click here" or just "here" as{' '}
        <a
          href="https://usability.yale.edu/web-accessibility/articles/links#link-text"
          target="_blank"
          rel="noopener noreferrer"
        >
          they can damage the overall accessibility of your email
        </a>
        .
      </p>
    </MoreInfo>
  )
}
