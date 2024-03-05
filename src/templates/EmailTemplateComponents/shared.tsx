import { ReactNode } from 'react'
import { EmailTemplate } from 'src/appTypes'

export interface EmailComponentProps<T extends EmailTemplate.ComponentKind> {
  children: ReactNode
  emailComponent: EmailTemplate.UniqueComponent<T>
}
