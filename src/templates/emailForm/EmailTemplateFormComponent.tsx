import React, { FC } from 'react'
import type { EmailTemplate, ID } from 'src/appTypes'
import { HeaderInput } from '../emailPreview/HeaderInput'
import { FooterInput } from '../emailPreview/FooterInput'
import { IntroInput } from '../emailPreview/IntroInput'
import { BannerInput } from '../emailPreview/BannerInput'

interface Props {
  copyId: ID
  emailTemplateComponentItem: EmailTemplate.Component
}

export const EmailTemplateFormComponent: FC<Props> = ({ copyId, emailTemplateComponentItem }) => {
  const { kind, description } = emailTemplateComponentItem

  switch (kind) {
    case 'Header':
      return <HeaderInput copyId={copyId} description={description} />
    case 'Footer':
      return <FooterInput copyId={copyId} description={description} />
    case 'Intro':
      return <IntroInput copyId={copyId} description={description} />
    case 'Banner':
      return <BannerInput copyId={copyId} description={description} />
  }
}
