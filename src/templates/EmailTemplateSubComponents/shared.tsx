import { EmailTemplate } from 'src/appTypes'

export interface EmailSubComponentProps<T extends EmailTemplate.SubComponentKind> {
  emailSubComponent: EmailTemplate.UniqueSubComponent<any, T>
}
