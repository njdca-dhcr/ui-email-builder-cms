import { EmailTemplate } from 'src/appTypes'

export interface EmailSubComponentProps {
  emailSubComponent: EmailTemplate.SubComponent<EmailTemplate.ComponentKind>
  componentId: string
  id: string
}
