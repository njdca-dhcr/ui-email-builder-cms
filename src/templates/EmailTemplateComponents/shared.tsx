import { ReactNode } from 'react'
import { EmailTemplate } from 'src/appTypes'

export interface EmailComponentProps {
  children: ReactNode
  emailComponent: EmailTemplate.UniqueComponent
}
