export type ID = string | number

type EmailTemplateComponentOption = 'Header' | 'Footer'

export interface EmailTemplateComponentItem {
  component: EmailTemplateComponentOption
  description: string
}

export interface EmailTemplate {
  name: string
  description: string
  components: EmailTemplateComponentItem[]
}
