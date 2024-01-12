export type ID = string | number

export const EmailTemplateComponentsMapping = {
  Banner: [],
  Body: [
    'Intro',
    'RulesRightsRegulations',
    'Status',
    'SupplementalContent',
    'Directive',
    'LoginDetails',
    'BenefitAmount',
    'InformationalBox',
  ],
  Footer: ['AdditionalContent'],
  Header: ['DateRange', 'Title', 'ProgramName', 'DepartmentSeal'],
  Name: [],
  Disclaimer: [],
  StateSeal: [],
} as const

export namespace EmailTemplate {
  type EmailTemplateComponentsMappingType = typeof EmailTemplateComponentsMapping

  export type ComponentKind = keyof EmailTemplateComponentsMappingType
  export type SubComponentKind<T extends ComponentKind = ComponentKind> =
    EmailTemplateComponentsMappingType[T][number]

  export interface SubComponent<T extends ComponentKind = ComponentKind> {
    kind: SubComponentKind<T>
    description?: string
    required?: boolean
    variant?: number
    icon?: string
    boxColor?: string
  }

  export interface Component<T extends ComponentKind = ComponentKind> {
    kind: T
    description?: string
    required?: boolean
    subComponents?: SubComponentKind<T> extends any ? SubComponent<T>[] : never
  }

  export interface UniqueSubComponent extends SubComponent {
    id: string
  }

  export interface UniqueComponent extends Omit<Component, 'subComponents'> {
    id: string
    subComponents?: SubComponentKind extends any ? UniqueSubComponent[] : never
  }

  export interface Config {
    name: string
    description?: string
    components?: Component[]
  }

  export interface UniqueConfig {
    name: string
    description?: string
    components?: UniqueComponent[]
  }
}
