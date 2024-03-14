import { AppMode } from 'src/utils/appMode'
import {
  AdditionalContentValue,
  BannerValue,
  DateRangeValue,
  DirectiveValue,
  InformationalBoxValue,
  IntroValue,
  LoginDetailsValue,
  NameValue,
  ProgramNameValue,
  RulesRightsRegulationsValue,
  StateSealValue,
  StatusValue,
  SupplementalContentValue,
  TitleValue,
} from './EmailTemplateValues'

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
    'InformationalBox',
  ],
  Footer: ['AdditionalContent'],
  Header: ['DateRange', 'Title', 'ProgramName', 'DepartmentSeal', 'DirectiveButton'],
  Name: [],
  Disclaimer: [],
  StateSeal: [],
} as const

export namespace EmailTemplate {
  interface ComponentDefaultValueMapping {
    Banner: BannerValue
    Body: unknown
    Footer: unknown
    Header: unknown
    Name: NameValue
    Disclaimer: unknown
    StateSeal: StateSealValue
  }

  interface SubComponentDefaultValueMapping {
    Intro: IntroValue
    RulesRightsRegulations: RulesRightsRegulationsValue
    Status: StatusValue
    SupplementalContent: SupplementalContentValue
    Directive: DirectiveValue
    LoginDetails: LoginDetailsValue
    InformationalBox: InformationalBoxValue
    AdditionalContent: AdditionalContentValue
    DateRange: DateRangeValue
    Title: TitleValue
    ProgramName: ProgramNameValue
    DepartmentSeal: unknown
    DirectiveButton: unknown
  }

  interface PartDefaultValueMapping
    extends ComponentDefaultValueMapping,
      SubComponentDefaultValueMapping {}

  type EmailTemplateComponentsMappingType = typeof EmailTemplateComponentsMapping

  export type ComponentKind = keyof EmailTemplateComponentsMappingType
  export type SubComponentKind<T extends ComponentKind = ComponentKind> =
    EmailTemplateComponentsMappingType[T][number]

  type PartKind = ComponentKind | SubComponentKind

  interface Part<K extends PartKind = PartKind> {
    defaultValue?: Partial<PartDefaultValueMapping[K]>
  }

  export interface SubComponent<
    T extends ComponentKind = ComponentKind,
    K extends SubComponentKind = SubComponentKind<T>,
  > {
    kind: K
    defaultValue?: Partial<SubComponentDefaultValueMapping[K]>
    description?: string
    required?: boolean
    visibleByDefault?: boolean
    variant?: number
    icon?: string
    boxColor?: string
  }

  export interface Component<T extends ComponentKind = ComponentKind> {
    kind: T
    defaultValue?: Partial<ComponentDefaultValueMapping[T]>
    description?: string
    visibleByDefault?: boolean
    required?: boolean
    subComponents?: SubComponentKind<T> extends any ? SubComponent<T>[] : never
  }

  export interface UniqueSubComponent<
    T extends ComponentKind = ComponentKind,
    K extends SubComponentKind = SubComponentKind<T>,
  > extends SubComponent<T, K> {
    id: string
  }

  type ComponentWithoutSubComponents<T extends ComponentKind = ComponentKind> = Omit<
    Component<T>,
    'subComponents'
  >

  export interface UniqueComponent<T extends ComponentKind = ComponentKind>
    extends ComponentWithoutSubComponents<T> {
    id: string
    subComponents?: UniqueSubComponent<T>[]
  }

  export interface UniquePart<K extends PartKind = PartKind> extends Part<K> {
    id: string
  }

  export interface Config {
    name: string
    description?: string
    components?: Component[]
    appModes?: AppMode[]
  }

  export interface UniqueConfig {
    name: string
    description?: string
    components?: UniqueComponent[]
  }

  export type Banner = UniqueComponent<'Banner'>
  export type Body = UniqueComponent<'Body'>
  export type Footer = UniqueComponent<'Footer'>
  export type Header = UniqueComponent<'Header'>
  export type Name = UniqueComponent<'Name'>
  export type Disclaimer = UniqueComponent<'Disclaimer'>
  export type StateSeal = UniqueComponent<'StateSeal'>

  export type DateRange = UniqueSubComponent<'Header', 'DateRange'>
  export type Title = UniqueSubComponent<'Header', 'Title'>
  export type ProgramName = UniqueSubComponent<'Header', 'ProgramName'>
  export type DepartmentSeal = UniqueSubComponent<'Header', 'DepartmentSeal'>
  export type Intro = UniqueSubComponent<'Body', 'Intro'>
  export type RulesRightsRegulations = UniqueSubComponent<'Body', 'RulesRightsRegulations'>
  export type Status = UniqueSubComponent<'Body', 'Status'>
  export type SupplementalContent = UniqueSubComponent<'Body', 'SupplementalContent'>
  export type Directive = UniqueSubComponent<'Body', 'Directive'>
  export type DirectiveButton = UniqueSubComponent<'Body', 'DirectiveButton'>
  export type LoginDetails = UniqueSubComponent<'Body', 'LoginDetails'>
  export type InformationalBox = UniqueSubComponent<'Body', 'InformationalBox'>
  export type AdditionalContent = UniqueSubComponent<'Footer', 'AdditionalContent'>
}
