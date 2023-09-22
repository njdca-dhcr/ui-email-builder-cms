import { faker } from '@faker-js/faker'
import { EmailTemplate, EmailTemplateComponentItem } from './appTypes'

export const buildEmailTemplateComponent = (
  options?: Partial<EmailTemplateComponentItem>,
): EmailTemplateComponentItem => {
  return { component: 'Header', description: faker.lorem.words(3), ...options }
}

export const buildEmailTemplate = (options?: Partial<EmailTemplate>): EmailTemplate => {
  return {
    name: faker.lorem.word(),
    description: faker.lorem.paragraph(),
    components: [
      buildEmailTemplateComponent({ component: 'Header' }),
      buildEmailTemplateComponent({ component: 'Footer' }),
    ],
    ...options,
  }
}
