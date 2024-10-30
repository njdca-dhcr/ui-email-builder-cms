import { EmailTemplate } from 'src/appTypes'

import { defaultDisclaimerValue } from './EmailTemplateComponents/Values/DisclaimerValue'
import { defaultBannerValue } from './EmailTemplateComponents/Values/BannerValue'
import { defaultNameValue } from './EmailTemplateComponents/Values/NameValue'
import { defaultIntroValue } from './EmailTemplateSubComponents/Values/IntroValue'
import { defaultRulesRightsRegulationsValue } from './EmailTemplateSubComponents/Values/RulesRightsRegulationsValue'
import { defaultStatusValue } from './EmailTemplateSubComponents/Values/StatusValue'
import { defaultStateSealValue } from './EmailTemplateComponents/Values/StateSealValue'
import { defaultSupplementalContentValue } from './EmailTemplateSubComponents/Values/SupplementalContentValue'
import { defaultDirectiveValue } from './EmailTemplateSubComponents/Values/DirectiveValue'
import { defaultLoginDetailsValue } from './EmailTemplateSubComponents/Values/LoginDetailsValue'
import { defaultInformationalBoxValue } from './EmailTemplateSubComponents/Values/InformationalBoxValue'
import { defaultAdditionalContentValue } from './EmailTemplateSubComponents/Values/AdditionalContentValue'
import { defaultDateRangeValue } from './EmailTemplateSubComponents/Values/DateRangeValue'
import { defaultTitleValue } from './EmailTemplateSubComponents/Values/TitleValue'
import { defaultProgramNameValue } from './EmailTemplateSubComponents/Values/ProgramNameValue'
import { defaultDepartmentSealValue } from './EmailTemplateSubComponents/Values/DepartmentSealValue'

export const AllDefaultValues: EmailTemplate.DefaultValues.Part = {
  Banner: defaultBannerValue(),
  Body: {},
  Footer: {},
  Header: {},
  Name: defaultNameValue,
  Disclaimer: defaultDisclaimerValue(),
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
  DepartmentSeal: defaultDepartmentSealValue(),
  DirectiveButton: {},
}
