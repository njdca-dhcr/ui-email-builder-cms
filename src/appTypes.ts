export type ID = string | number

export const EmailTemplateComponentsMapping = {
  Amount: ['Breakdown'],
  Banner: [],
  Body: ['Intro', 'Status'],
  Footer: ['AdditionalContent'],
  Header: ['Title', 'Label'],
  Name: [],
  Disclaimer: [],
} as const

export namespace EmailTemplate {
  type EmailTemplateComponentsMappingType = typeof EmailTemplateComponentsMapping

  export type ComponentKind = keyof EmailTemplateComponentsMappingType
  export type SubComponentKind<T extends ComponentKind> =
    EmailTemplateComponentsMappingType[T][number]

  export interface SubComponent<T extends ComponentKind> {
    kind: SubComponentKind<T>
    required?: boolean
  }

  export interface Component<T extends ComponentKind = ComponentKind> {
    kind: T
    description?: string
    required?: boolean
    subComponents?: SubComponentKind<T> extends any ? SubComponent<T>[] : never
  }

  export interface Config {
    name: string
    description?: string
    components?: Component[]
  }
}
