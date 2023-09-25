import React, { FC } from 'react'
import { Header } from '../EmailTemplateComponents/Header'
import { EmailComponentProps } from '../EmailTemplateComponents/shared'
import { useShouldShowEmailComponent } from '../ShouldShowEmailPart'

export const EditEmailComponent: FC<EmailComponentProps> = (props) => {
  const shouldShow = useShouldShowEmailComponent(props.id)

  if (!shouldShow.on) return null

  switch (props.emailComponent.kind) {
    case 'Header':
      return <Header {...props} />
    default:
      console.warn(`Component (${props.emailComponent.kind}) not implemented`, props)
  }
}
