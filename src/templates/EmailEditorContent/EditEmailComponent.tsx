import React, { FC } from 'react'
import { Header } from '../EmailTemplateComponents/Header'
import { Footer } from '../EmailTemplateComponents/Footer'
import { Banner } from '../EmailTemplateComponents/Banner'
import { Name } from '../EmailTemplateComponents/Name'
import { Body } from '../EmailTemplateComponents/Body'
import { Disclaimer } from '../EmailTemplateComponents/Disclaimer'
import { StateSeal } from '../EmailTemplateComponents/StateSeal'
import { EmailComponentProps } from '../EmailTemplateComponents/shared'
import { useShouldShowEmailPart } from '../ShouldShowEmailPart'
import { EmailTemplate } from 'src/appTypes'

export const EditEmailComponent: FC<EmailComponentProps<EmailTemplate.Kinds.Component>> = ({
  emailComponent,
  ...props
}) => {
  const shouldShow = useShouldShowEmailPart(emailComponent.id)

  if (shouldShow.off) return null

  switch (emailComponent.kind) {
    case 'Header':
      return (
        <Header
          {...props}
          emailComponent={emailComponent as EmailTemplate.Unique.Component<'Header'>}
        />
      )
    case 'Footer':
      return (
        <Footer
          {...props}
          emailComponent={emailComponent as EmailTemplate.Unique.Component<'Footer'>}
        />
      )
    case 'Banner':
      return (
        <Banner
          {...props}
          emailComponent={emailComponent as EmailTemplate.Unique.Component<'Banner'>}
        />
      )
    case 'Name':
      return (
        <Name
          {...props}
          emailComponent={emailComponent as EmailTemplate.Unique.Component<'Name'>}
        />
      )
    case 'Body':
      return (
        <Body
          {...props}
          emailComponent={emailComponent as EmailTemplate.Unique.Component<'Body'>}
        />
      )
    case 'Disclaimer':
      return (
        <Disclaimer
          {...props}
          emailComponent={emailComponent as EmailTemplate.Unique.Component<'Disclaimer'>}
        />
      )
    case 'StateSeal':
      return (
        <StateSeal
          {...props}
          emailComponent={emailComponent as EmailTemplate.Unique.Component<'StateSeal'>}
        />
      )
    default:
      console.warn(`Component (${emailComponent.kind}) not implemented`, {
        ...props,
        emailComponent,
      })
  }
}
