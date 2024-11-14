import { EmailParts } from 'src/appTypes'

export interface EmailSubComponentProps<T extends EmailParts.Kinds.SubComponent> {
  emailSubComponent: EmailParts.Unique.Part<T>
}
