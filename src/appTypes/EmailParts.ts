import {
  AdditionalContentValue,
  BannerValue,
  BaseValue,
  DateRangeValue,
  DepartmentSealValue,
  DirectiveValue,
  DisclaimerValue,
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
  TranslationLinksValue,
} from './EmailTemplateValues'

export const COMPONENTS = [
  'Banner',
  'TranslationLinks',
  'Body',
  'Footer',
  'Header',
  'Name',
  'Disclaimer',
  'StateSeal',
] as const

export const SUBCOMPONENTS = [
  'Intro',
  'RulesRightsRegulations',
  'Status',
  'SupplementalContent',
  'Directive',
  'LoginDetails',
  'InformationalBox',
  'AdditionalContent',
  'DateRange',
  'Title',
  'ProgramName',
  'DepartmentSeal',
  'DirectiveButton',
] as const

export namespace EmailParts {
  export namespace Kinds {
    export type Component = (typeof COMPONENTS)[number]
    export type SubComponent = (typeof SUBCOMPONENTS)[number]
    export type Part = Component | SubComponent
  }

  export namespace DefaultValues {
    export interface Component {
      Banner: BannerValue
      TranslationLinks: TranslationLinksValue
      Body: BaseValue
      Footer: BaseValue
      Header: BaseValue
      Name: NameValue
      Disclaimer: DisclaimerValue
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
      DepartmentSeal: DepartmentSealValue
      DirectiveButton: BaseValue
    }

    export interface Part extends Component, SubComponent {}
  }

  export namespace Base {
    export interface Part<K extends Kinds.Part = Kinds.Part> {
      kind: K
      defaultValue?: Partial<DefaultValues.Part[K]>
      required?: boolean
    }

    export interface SubComponent<K extends Kinds.SubComponent = Kinds.SubComponent>
      extends Part<K> {}

    export interface Component<T extends Kinds.Component = Kinds.Component> extends Part<T> {
      subComponents?: SubComponent[]
    }
  }

  export namespace Unique {
    export interface Part<K extends Kinds.Part = Kinds.Part> extends Base.Part<K> {
      id: string
    }

    export interface SubComponent<K extends Kinds.SubComponent = Kinds.SubComponent>
      extends Base.SubComponent<K> {
      id: string
    }

    export interface Component<T extends Kinds.Component = Kinds.Component>
      extends Omit<Base.Component<T>, 'subComponents'> {
      id: string
      subComponents?: SubComponent[]
    }
  }

  export type Banner = Unique.Part<'Banner'>
  export type TranslationLinks = Unique.Part<'TranslationLinks'>
  export type Body = Unique.Part<'Body'>
  export type Footer = Unique.Part<'Footer'>
  export type Header = Unique.Part<'Header'>
  export type Name = Unique.Part<'Name'>
  export type Disclaimer = Unique.Part<'Disclaimer'>
  export type StateSeal = Unique.Part<'StateSeal'>

  export type DateRange = Unique.Part<'DateRange'>
  export type Title = Unique.Part<'Title'>
  export type ProgramName = Unique.Part<'ProgramName'>
  export type DepartmentSeal = Unique.Part<'DepartmentSeal'>
  export type Intro = Unique.Part<'Intro'>
  export type RulesRightsRegulations = Unique.Part<'RulesRightsRegulations'>
  export type Status = Unique.Part<'Status'>
  export type SupplementalContent = Unique.Part<'SupplementalContent'>
  export type Directive = Unique.Part<'Directive'>
  export type DirectiveButton = Unique.Part<'DirectiveButton'>
  export type LoginDetails = Unique.Part<'LoginDetails'>
  export type InformationalBox = Unique.Part<'InformationalBox'>
  export type AdditionalContent = Unique.Part<'AdditionalContent'>
}
