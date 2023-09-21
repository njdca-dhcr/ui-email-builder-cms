import React, { FC } from 'react'
import { EmailTemplateComponentItem, ID } from 'src/appTypes'
import { Header } from './Header'
import { Footer } from './Footer'
import { Intro } from './Intro'

interface Props {
  copyId: ID
  emailTemplateComponentItem: EmailTemplateComponentItem
}

export const EmailTemplatePreviewComponent: FC<Props> = ({
  copyId,
  emailTemplateComponentItem,
}) => {
  const { component } = emailTemplateComponentItem

  switch (component) {
    case 'Header':
      return <Header copyId={copyId} />
    case 'Footer':
      return <Footer copyId={copyId} />
    case 'Intro':
      return <Intro copyId={copyId} />
  }
}
