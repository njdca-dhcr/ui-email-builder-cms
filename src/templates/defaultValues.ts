import { EmailTemplate } from 'src/appTypes'
import { defaultBannerValue } from './EmailTemplateComponents/Banner'
import { defaultNameValue } from './EmailTemplateComponents/Name'
import { defaultStateSealValue } from './EmailTemplateComponents/StateSeal'
import { defaultIntroValue } from './EmailTemplateSubComponents/Intro'
import { defaultRulesRightsRegulationsValue } from './EmailTemplateSubComponents/RulesRightsRegulations'
import { defaultStatusValue } from './EmailTemplateSubComponents/Status'
import { defaultSupplementalContentValue } from './EmailTemplateSubComponents/SupplementalContent'
import { defaultDirectiveValue } from './EmailTemplateSubComponents/Directive'
import { defaultLoginDetailsValue } from './EmailTemplateSubComponents/LoginDetails'
import { defaultInformationalBoxValue } from './EmailTemplateSubComponents/InformationalBox'
import { defaultAdditionalContentValue } from './EmailTemplateSubComponents/AdditionalContent'
import { defaultDateRangeValue } from './EmailTemplateSubComponents/DateRange'
import { defaultTitleValue } from './EmailTemplateSubComponents/Title'
import { defaultProgramNameValue } from './EmailTemplateSubComponents/ProgramName'

export const AllDefaultValues: EmailTemplate.DefaultValues.Part = {
  Banner: defaultBannerValue(),
  Body: {},
  Footer: {},
  Header: {},
  Name: defaultNameValue,
  Disclaimer: {},
  StateSeal: defaultStateSealValue(),
  Intro: defaultIntroValue,
  RulesRightsRegulations: defaultRulesRightsRegulationsValue,
  Status: defaultStatusValue,
  SupplementalContent: defaultSupplementalContentValue,
  Directive: defaultDirectiveValue,
  LoginDetails: defaultLoginDetailsValue,
  InformationalBox: defaultInformationalBoxValue,
  AdditionalContent: defaultAdditionalContentValue,
  DateRange: defaultDateRangeValue,
  Title: defaultTitleValue,
  ProgramName: defaultProgramNameValue(),
  DepartmentSeal: {},
  DirectiveButton: {},
}
