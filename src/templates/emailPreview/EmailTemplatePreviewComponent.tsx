import React, { FC } from 'react'
import { EmailTemplate, ID } from 'src/appTypes'
import { Header } from './Header'
import { Footer } from './Footer'
import { Intro } from './Intro'
import { Banner } from './Banner'

interface Props {
  copyId: ID
  emailTemplateComponentItem: EmailTemplate.Component
}

export const EmailTemplatePreviewComponent: FC<Props> = ({
  copyId,
  emailTemplateComponentItem,
}) => {
  const { kind } = emailTemplateComponentItem

  switch (kind) {
    case 'Header':
      return <Header copyId={copyId} />
    case 'Footer':
      return <Footer copyId={copyId} />
    case 'Intro':
      return <Intro copyId={copyId} />
    case 'Banner':
      return <Banner copyId={copyId} />
  }
}
