import { faker } from '@faker-js/faker'
import sample from 'lodash.sample'
import { EmailTemplate, EmailTemplateComponentsMapping } from './appTypes'

export const buildEmailTemplateSubComponent = <T extends EmailTemplate.ComponentKind>(
  component: EmailTemplate.ComponentKind,
  options?: Partial<EmailTemplate.SubComponent<T>>,
): EmailTemplate.SubComponent<T> => {
  const possibleSubComponents = EmailTemplateComponentsMapping[component]

  if (possibleSubComponents.length === 0) {
    throw new Error(`Component ${component} does not have SubComponents`)
  }

  return {
    kind: sample(possibleSubComponents)!,
    required: false,
    ...options,
  }
}

export const buildEmailTemplateComponent = <T extends EmailTemplate.ComponentKind>(
  kind: T,
  options?: Partial<EmailTemplate.Component<T>>,
): EmailTemplate.Component<T> => {
  return {
    kind,
    required: false,
    description: faker.lorem.words(3),
    ...options,
  }
}

export const buildEmailTemplateConfig = (
  options?: Partial<EmailTemplate.Config>,
): EmailTemplate.Config => {
  return {
    name: faker.lorem.word(),
    description: faker.lorem.paragraph(),
    components: [buildEmailTemplateComponent('Header'), buildEmailTemplateComponent('Footer')],
    ...options,
  }
}

export const urlFor = (path: string): string => `http://localhost${path}`
