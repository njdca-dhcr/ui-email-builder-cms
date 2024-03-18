import { TableTerm } from 'src/ui/EditableTermsTable'
import { RichTextValue } from 'src/ui/RichTextEditor'
import { BoxColor } from 'src/ui/SelectBoxColor'
import { UswdsIconVariantKey } from 'src/ui/UswdsIcon'
import { StateAbbreviation } from 'src/utils/statesAndTerritories'

export interface BannerValue {
  backgroundColor: string
  primaryText: string
  primaryLink: string
  secondaryLink: string
  [key: string]: null | string
}

export interface NameValue {
  name: string
}

export interface StateSealValue {
  stateAbbreviation: StateAbbreviation
  additionalDisclaimer: string
  [key: string]: null | string
}

export interface AdditionalContentValue {
  content: RichTextValue
}

export interface DateRangeValue {
  range: string
}

export const enum DirectiveVariant {
  OneStep = 'One Step',
  ThreeStep = 'Three Steps',
  StepTwoExpansion = 'Three Steps w/ Step 2 Expansion',
  PayOnline = 'Pay Online',
}

export interface DirectiveValue {
  variant: DirectiveVariant

  // Always Used
  title: string
  showTitle: boolean
  label: RichTextValue
  linkHref: string
  buttonLabel: string
  buttonColor: string

  // OneStep
  step1Label: RichTextValue
  step1Additional: RichTextValue
  oneStepSupportiveText: RichTextValue

  // ThreeStep uses OneStep values
  step2Label: RichTextValue
  showStep1AdditionalContent: boolean
  showStep2AdditionalContent: boolean
  step2Additional: RichTextValue
  step3Label: RichTextValue
  showStep3AdditionalContent: boolean
  step3Additional: RichTextValue

  // StepTwoExpansion uses ThreeStep values
  step2Tertiary: RichTextValue
  step2CaseNumber: RichTextValue

  // ThreeStep and StepTwoExpansion
  showMultipleStepsSupportiveText: boolean
  multipleStepsSupportiveText: RichTextValue

  // PayOnline uses OneStep values
  alternativePaymentLabel: string
  payOnlineSupportiveText: RichTextValue
}

export interface InformationalBoxValue {
  boxColor: BoxColor
  icon: UswdsIconVariantKey
  title: string
  description: string
  showSupportiveInformation: boolean
  supportiveInformation: RichTextValue
}

export interface IntroValue {
  intro: RichTextValue
}

export const enum LoginDetailsVariant {
  Details = 'Details',
  Information = 'Information',
}

export interface LoginDetailsValue {
  variant: LoginDetailsVariant
  loginDetailsTitle: string
  usernameLabel: string
  usernameValue: string
  resetPasswordMessage: RichTextValue
  button: string
  buttonHref: string
  resetPasswordDetails: RichTextValue
  loginDetailsIcon: UswdsIconVariantKey
  loginInformationTitle: string
  loginInformationDescription: RichTextValue
  showLoginInformationList: boolean
  loginInformationList: string[]
  loginInformationIcon: UswdsIconVariantKey
}

export enum ProgramNameNJPreset {
  DependencyBenefits = 'Dependency Benefits',
  DisasterUnemploymentAssistance = 'Disaster Unemployment Assistance (DUA)',
  MixedEarnersUnemploymentCompensation = 'Mixed Earners Unemployment Compensation (MEUC)',
  PandemicUnemploymentAssistance = 'Pandemic Unemployment Assistance (PUA)',
  PandemicUnemploymentOverpayment = 'Pandemic Unemployment Overpayment',
  UnemploymentInsurance = 'Unemployment Insurance (UI)',
  UnemploymentInsuranceUiDependencyBenefits = 'Unemployment Insurance (UI) Dependency Benefits',
  UnemploymentInsuranceUiMonetaryEligibility = 'Unemployment Insurance (UI) Monetary Eligibility',
  Custom = 'Custom',
}

export interface ProgramNameValue {
  preset: ProgramNameNJPreset
  name: string
  backgroundColor: string
}

export const enum RulesRightsRegulationsVariant {
  Reminder = 'Reminder',
  AppealRights = 'Appeal Rights',
  YourRights = 'Your Rights',
}

export interface RulesRightsRegulationsValue {
  variant: RulesRightsRegulationsVariant
  icon: UswdsIconVariantKey
  // Reminder
  reminderTitle: string
  eligibilityLabel: string
  eligibilityConditionsList: string[]
  showReminderIsFor: boolean
  reminderIsFor: RichTextValue
  showFootnote: boolean
  footnote: RichTextValue
  // Appeal Rights
  appealRightsTitle: string
  appealRightsSummary: RichTextValue
  appealRightsShowInstruction: boolean
  appealRightsInstruction: RichTextValue
  appealRightsButton: string
  appealRightsHref: string
  appealRightsShowInfoLabel: boolean
  appealRightsInfoLabel: string
  appealRightsShowTerms: boolean
  appealRightsTerms: TableTerm[]
  // Your Rights
  yourRightsTitle: string
  yourRightsList: string[]
}

export const enum StatusVariant {
  Overview = 'Overview',
  OverviewWithReason = 'Overview With Reason',
  MissingDocument = 'Missing Document',
  OverviewWithReasonAndAmountDue = 'Overview With Reason And Amount Due',
  OverviewWithReasonAndAmountBreakdown = 'Overview With Reason And Amount Breakdown',
}

export interface StatusValue {
  variant: StatusVariant
  icon: UswdsIconVariantKey
  // Always used
  status: string
  description: RichTextValue
  supportiveInformation: RichTextValue
  statusDueTo: string
  showSupportiveInformation: boolean
  spaceAfter: boolean
  // Almost always used
  showDescription: boolean
  // Missing Document
  documentsNeededLabel: string
  documentsNeededValue: string
  emailToLabel: string
  emailToValue: string
  subjectLineLabel: string
  subjectLineValue: string
  missingDocumentDeadline: string
  // Amount/Breakdown
  boxColor: BoxColor
  amountLabel: string
  overpaymentLabel: string
  overpaymentValue: string
  waivedLabel: string
  waivedValue: string
  totalLabel: string
  totalValue: string
}

export const enum SupplementalContentVariant {
  BenefitAmount = 'Benefit Amount',
  SingleSupplementalContent = 'Single Supplemental Content',
  DoubleSupplementalContent = 'Double Supplemental Content',
}

export interface SupplementalContentValue {
  variant: SupplementalContentVariant
  // All
  title: string
  description: RichTextValue
  // Double Supplemental Content
  secondTitle: string
  secondDescription: RichTextValue
  // Benefit Amount
  benefitAmountBoxColor: BoxColor
  benefitAmountIcon: UswdsIconVariantKey
  benefitAmountTitle: string
  benefitAmountDescription: RichTextValue
  benefitAmountBoxTitle: string
  benefitAmountMainBoxCopy: RichTextValue
  benefitAmountSupplementalBoxCopy: RichTextValue
  benefitAmountSupportiveInformation: RichTextValue
}

export interface TitleValue {
  title: string
}
