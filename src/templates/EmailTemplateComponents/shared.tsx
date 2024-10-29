import { ReactNode } from 'react'
import { EmailTemplate } from 'src/appTypes'

export interface EmailComponentProps<T extends EmailTemplate.Kinds.Component> {
  children: ReactNode
  emailComponent: EmailTemplate.Unique.Component<T>
}
