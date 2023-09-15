import React, { FC } from 'react'
import type { EmailTemplateComponentItem } from '../../appTypes'
import { Header } from './Header'
import { Footer } from './Footer'

interface Props {
  emailTemplateComponentItem: EmailTemplateComponentItem
}

export const EmailTemplateComponent: FC<Props> = ({ emailTemplateComponentItem }) => {
  const { component, description } = emailTemplateComponentItem

  switch (component) {
    case 'Header':
      return <Header description={description} />
    case 'Footer':
      return <Footer description={description} />
  }
}
