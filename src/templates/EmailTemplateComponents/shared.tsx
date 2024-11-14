import { ReactNode } from 'react'
import { EmailParts } from 'src/appTypes'

export interface EmailComponentProps<T extends EmailParts.Kinds.Component> {
  children: ReactNode
  emailComponent: EmailParts.Unique.Component<T>
}
