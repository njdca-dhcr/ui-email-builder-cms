import { AppMode } from 'src/utils/appMode'
import {
  AdditionalContentValue,
  BannerValue,
  BaseValue,
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
  export namespace DefaultValues {
    export interface Component {
      Banner: BannerValue
      Body: BaseValue
      Footer: BaseValue
      Header: BaseValue
      Name: NameValue
      Disclaimer: BaseValue
      StateSeal: StateSealValue
    }

    export interface SubComponent {
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
      DepartmentSeal: BaseValue
      DirectiveButton: BaseValue
    }

    export interface Part extends Component, SubComponent {}
  }

  export namespace Kinds {
    type Structure = typeof EmailTemplateComponentsMapping
    export type Component = keyof Structure
    export type SubComponent<T extends Component = Component> = Structure[T][number]
    export type Part = Component | SubComponent
  }

  export namespace Base {
    export interface Part<K extends Kinds.Part = Kinds.Part> {
      defaultValue?: Partial<DefaultValues.Part[K]>
    }

    export interface SubComponent<
      T extends Kinds.Component = Kinds.Component,
      K extends Kinds.SubComponent = Kinds.SubComponent<T>,
    > {
      kind: K
      defaultValue?: Partial<DefaultValues.SubComponent[K]>
      required?: boolean
      variant?: number
      icon?: string
      boxColor?: string
    }

    export interface Component<T extends Kinds.Component = Kinds.Component> {
      kind: T
      defaultValue?: Partial<DefaultValues.Component[T]>
      required?: boolean
      subComponents?: Kinds.SubComponent<T> extends any ? SubComponent<T>[] : never
    }

    export interface Config {
      name: string
      description?: string
      previewText?: string
      components?: Component[]
      appModes?: AppMode[]
    }
  }

  export namespace Unique {
    export interface SubComponent<
      T extends Kinds.Component = Kinds.Component,
      K extends Kinds.SubComponent = Kinds.SubComponent<T>,
    > extends Base.SubComponent<T, K> {
      id: string
    }

    export interface Component<T extends Kinds.Component = Kinds.Component>
      extends Omit<Base.Component<T>, 'subComponents'> {
      id: string
      subComponents?: SubComponent<T>[]
    }

    export interface Part<K extends Kinds.Part = Kinds.Part> extends Base.Part<K> {
      id: string
    }

    export interface Config {
      id?: string
      name: string
      description?: string
      previewText?: string
      components?: Component[]
    }
  }

  export type Banner = Unique.Component<'Banner'>
  export type Body = Unique.Component<'Body'>
  export type Footer = Unique.Component<'Footer'>
  export type Header = Unique.Component<'Header'>
  export type Name = Unique.Component<'Name'>
  export type Disclaimer = Unique.Component<'Disclaimer'>
  export type StateSeal = Unique.Component<'StateSeal'>

  export type DateRange = Unique.SubComponent<'Header', 'DateRange'>
  export type Title = Unique.SubComponent<'Header', 'Title'>
  export type ProgramName = Unique.SubComponent<'Header', 'ProgramName'>
  export type DepartmentSeal = Unique.SubComponent<'Header', 'DepartmentSeal'>
  export type Intro = Unique.SubComponent<'Body', 'Intro'>
  export type RulesRightsRegulations = Unique.SubComponent<'Body', 'RulesRightsRegulations'>
  export type Status = Unique.SubComponent<'Body', 'Status'>
  export type SupplementalContent = Unique.SubComponent<'Body', 'SupplementalContent'>
  export type Directive = Unique.SubComponent<'Body', 'Directive'>
  export type DirectiveButton = Unique.SubComponent<'Body', 'DirectiveButton'>
  export type LoginDetails = Unique.SubComponent<'Body', 'LoginDetails'>
  export type InformationalBox = Unique.SubComponent<'Body', 'InformationalBox'>
  export type AdditionalContent = Unique.SubComponent<'Footer', 'AdditionalContent'>
}
