export type ID = string | number

type EmailTemplateComponentOption = 'Header' | 'Footer' | 'Intro' | 'Banner'

export interface EmailTemplateComponentItem {
  component: EmailTemplateComponentOption
  description: string
}

export interface EmailTemplate {
  name: string
  description: string
  components: EmailTemplateComponentItem[]
}
