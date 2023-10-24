import React, { FC } from 'react'
import { Header } from '../EmailTemplateComponents/Header'
import { Footer } from '../EmailTemplateComponents/Footer'
import { Banner } from '../EmailTemplateComponents/Banner'
import { Name } from '../EmailTemplateComponents/Name'
import { Body } from '../EmailTemplateComponents/Body'
import { Disclaimer } from '../EmailTemplateComponents/Disclaimer'
import { StateSeal } from '../EmailTemplateComponents/StateSeal'
import { EmailComponentProps } from '../EmailTemplateComponents/shared'
import { useShouldShowEmailComponent } from '../ShouldShowEmailPart'

export const EditEmailComponent: FC<EmailComponentProps> = (props) => {
  const shouldShow = useShouldShowEmailComponent(props.id)

  if (shouldShow.off) return null

  switch (props.emailComponent.kind) {
    case 'Header':
      return <Header {...props} />
    case 'Footer':
      return <Footer {...props} />
    case 'Banner':
      return <Banner {...props} />
    case 'Name':
      return <Name {...props} />
    case 'Body':
      return <Body {...props} />
    case 'Disclaimer':
      return <Disclaimer {...props} />
    case 'StateSeal':
      return <StateSeal {...props} />
    default:
      console.warn(`Component (${props.emailComponent.kind}) not implemented`, props)
  }
}
