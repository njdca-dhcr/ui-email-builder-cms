import { EmailTemplate } from 'src/appTypes'

export interface EmailSubComponentProps<T extends EmailTemplate.Kinds.SubComponent> {
  emailSubComponent: EmailTemplate.Unique.Part<T>
}
