import { buildUniqueEmailSubComponent } from 'src/testHelpers'
import {
  applyIntroStructure,
  applyRulesRightsRegulationsStructure,
  applyStatusStructure,
  applySupplementalContentStructure,
  applyDirectiveStructure,
  applyLoginDetailsStructure,
  applyInformationalBoxStructure,
  applyAdditionalContentStructure,
  applyDateRangeStructure,
  applyTitleStructure,
  applyProgramNameStructure,
  applyDirectiveButtonStructure,
} from '../applySubComponentStructures'
import { BoxColor } from 'src/ui'
import {
  DirectiveVariant,
  LoginDetailsVariant,
  ProgramNameNJPreset,
  RulesRightsRegulationsVariant,
  StatusVariant,
  SupplementalContentVariant,
} from 'src/appTypes'

describe('applyIntroStructure', () => {
  it('applies the non-text values of the first to the second', async () => {
    const englishComponent = buildUniqueEmailSubComponent({
      kind: 'Intro',
      defaultValue: { visible: true, intro: [{ bold: false, text: 'english' }] },
    })
    const spanishComponent = buildUniqueEmailSubComponent({
      kind: 'Intro',
      defaultValue: { visible: false, intro: [{ bold: true, text: 'spanish' }] },
    })

    expect(applyIntroStructure(englishComponent, spanishComponent)).toEqual({
      ...spanishComponent,
      defaultValue: { visible: true, intro: [{ bold: true, text: 'spanish' }] },
    })
  })
})

describe('applyRulesRightsRegulationsStructure', () => {
  it('applies the non-text values of the first to the second', async () => {
    const englishComponent = buildUniqueEmailSubComponent({
      kind: 'RulesRightsRegulations',
      defaultValue: {
        visible: true,
        variant: RulesRightsRegulationsVariant.AppealRights,
        icon: 'AccountBalance',
        boxColor: BoxColor.GrantedGreen,
        reminderTitle: 'english title',
        reminderDescription: [{ text: 'english description' }],
        appealRightsTitle: 'english',
        appealRightsSummary: [{ text: 'english' }],
        appealRightsShowInstruction: false,
        appealRightsInstruction: [{ text: 'english' }],
        appealRightsButton: 'english',
        appealRightsHref: 'english href',
        appealRightsShowInfoLabel: true,
        appealRightsInfoLabel: 'english label',
        appealRightsShowInfo: false,
        appealRightsInfo: [{ text: 'english info' }],
        yourRightsTitle: 'english rights',
        showYourRightsDescription: false,
        yourRightsDescription: [{ text: 'english description' }],
        yourRightsList: [{ text: 'english list' }],
      },
    })
    const spanishComponent = buildUniqueEmailSubComponent({
      kind: 'RulesRightsRegulations',
      defaultValue: {
        visible: false,
        variant: RulesRightsRegulationsVariant.Reminder,
        icon: 'AccountBox',
        boxColor: BoxColor.GoverningGray,
        reminderTitle: 'spanish title',
        reminderDescription: [{ text: 'spanish description' }],
        appealRightsTitle: 'spanish',
        appealRightsSummary: [{ text: 'spanish' }],
        appealRightsShowInstruction: true,
        appealRightsInstruction: [{ text: 'spanish' }],
        appealRightsButton: 'spanish',
        appealRightsHref: 'spanish href',
        appealRightsShowInfoLabel: false,
        appealRightsInfoLabel: 'spanish label',
        appealRightsShowInfo: true,
        appealRightsInfo: [{ text: 'spanish info' }],
        yourRightsTitle: 'spanish rights',
        showYourRightsDescription: true,
        yourRightsDescription: [{ text: 'spanish description' }],
        yourRightsList: [{ text: 'spanish list' }],
      },
    })

    expect(applyRulesRightsRegulationsStructure(englishComponent, spanishComponent)).toEqual({
      ...spanishComponent,
      defaultValue: {
        visible: true,
        variant: RulesRightsRegulationsVariant.AppealRights,
        icon: 'AccountBox',
        boxColor: BoxColor.GoverningGray,
        reminderTitle: 'spanish title',
        reminderDescription: [{ text: 'spanish description' }],
        appealRightsTitle: 'spanish',
        appealRightsSummary: [{ text: 'spanish' }],
        appealRightsShowInstruction: false,
        appealRightsInstruction: [{ text: 'spanish' }],
        appealRightsButton: 'spanish',
        appealRightsHref: 'spanish href',
        appealRightsShowInfoLabel: true,
        appealRightsInfoLabel: 'spanish label',
        appealRightsShowInfo: false,
        appealRightsInfo: [{ text: 'spanish info' }],
        yourRightsTitle: 'spanish rights',
        showYourRightsDescription: false,
        yourRightsDescription: [{ text: 'spanish description' }],
        yourRightsList: [{ text: 'spanish list' }],
      },
    })
  })
})

describe('applyStatusStructure', () => {
  it('applies the non-text values of the first to the second', async () => {
    const englishComponent = buildUniqueEmailSubComponent({
      kind: 'Status',
      defaultValue: {
        visible: true,
        variant: StatusVariant.MissingDocument,
        icon: 'Alarm',
        status: 'english',
        description: [{ text: 'english' }],
        supportiveInformation: [{ text: 'english' }],
        statusDueTo: 'english',
        showSupportiveInformation: false,
        spaceAfter: false,
        showDescription: false,
        documentsNeededLabel: 'english',
        documentsNeededValue: 'english',
        emailToLabel: 'english',
        emailToValue: 'english',
        subjectLineLabel: 'english',
        subjectLineValue: 'english',
        showMissingDocumentDeadline: false,
        missingDocumentDeadline: 'english',
        boxColor: BoxColor.YieldingYellow,
        amountLabel: 'english',
        amountLineItems: [{ label: 'english', value: 'english' }],
        amountTotal: { label: 'english', value: 'english' },
      },
    })
    const spanishComponent = buildUniqueEmailSubComponent({
      kind: 'Status',
      defaultValue: {
        visible: false,
        variant: StatusVariant.OverviewWithReason,
        icon: 'AccountCircle',
        status: 'spanish',
        description: [{ text: 'spanish' }],
        supportiveInformation: [{ text: 'spanish' }],
        statusDueTo: 'spanish',
        showSupportiveInformation: true,
        spaceAfter: true,
        showDescription: true,
        documentsNeededLabel: 'spanish',
        documentsNeededValue: 'spanish',
        emailToLabel: 'spanish',
        emailToValue: 'spanish',
        subjectLineLabel: 'spanish',
        subjectLineValue: 'spanish',
        showMissingDocumentDeadline: true,
        missingDocumentDeadline: 'spanish',
        boxColor: BoxColor.GoverningGray,
        amountLabel: 'spanish',
        amountLineItems: [{ label: 'spanish', value: 'spanish' }],
        amountTotal: { label: 'spanish', value: 'spanish' },
      },
    })

    expect(applyStatusStructure(englishComponent, spanishComponent)).toEqual({
      ...spanishComponent,
      defaultValue: {
        visible: true,
        variant: StatusVariant.MissingDocument,
        icon: 'Alarm',
        status: 'spanish',
        description: [{ text: 'spanish' }],
        supportiveInformation: [{ text: 'spanish' }],
        statusDueTo: 'spanish',
        showSupportiveInformation: false,
        spaceAfter: false,
        showDescription: false,
        documentsNeededLabel: 'spanish',
        documentsNeededValue: 'spanish',
        emailToLabel: 'spanish',
        emailToValue: 'spanish',
        subjectLineLabel: 'spanish',
        subjectLineValue: 'spanish',
        showMissingDocumentDeadline: false,
        missingDocumentDeadline: 'spanish',
        boxColor: BoxColor.YieldingYellow,
        amountLabel: 'spanish',
        amountLineItems: [{ label: 'spanish', value: 'spanish' }],
        amountTotal: { label: 'spanish', value: 'spanish' },
      },
    })
  })
})

describe('applySupplementalContentStructure', () => {
  it('applies the non-text values of the first to the second', async () => {
    const englishComponent = buildUniqueEmailSubComponent({
      kind: 'SupplementalContent',
      defaultValue: {
        visible: true,
        variant: SupplementalContentVariant.BenefitAmount,
        benefitAmountBoxColor: BoxColor.GrantedGreen,
        benefitAmountIcon: 'Backpack',
        title: 'english',
        description: [{ text: 'english' }],
        secondTitle: 'english',
        secondDescription: [{ text: 'english' }],
        thirdTitle: 'english',
        thirdDescription: [{ text: 'english' }],
        benefitAmountTitle: 'english',
        benefitAmountDescription: [{ text: 'english' }],
        benefitAmountBoxTitle: 'english',
        benefitAmountMainBoxCopy: [{ text: 'english' }],
        benefitAmountSupplementalBoxCopy: [{ text: 'english' }],
        benefitAmountSupportiveInformation: [{ text: 'english' }],
      },
    })
    const spanishComponent = buildUniqueEmailSubComponent({
      kind: 'SupplementalContent',
      defaultValue: {
        visible: false,
        variant: SupplementalContentVariant.DoubleSupplementalContent,
        benefitAmountBoxColor: BoxColor.YieldingYellow,
        benefitAmountIcon: 'AccessibleForward',
        title: 'spanish',
        description: [{ text: 'spanish' }],
        secondTitle: 'spanish',
        secondDescription: [{ text: 'spanish' }],
        thirdTitle: 'spanish',
        thirdDescription: [{ text: 'spanish' }],
        benefitAmountTitle: 'spanish',
        benefitAmountDescription: [{ text: 'spanish' }],
        benefitAmountBoxTitle: 'spanish',
        benefitAmountMainBoxCopy: [{ text: 'spanish' }],
        benefitAmountSupplementalBoxCopy: [{ text: 'spanish' }],
        benefitAmountSupportiveInformation: [{ text: 'spanish' }],
      },
    })

    expect(applySupplementalContentStructure(englishComponent, spanishComponent)).toEqual({
      ...spanishComponent,
      defaultValue: {
        visible: true,
        variant: SupplementalContentVariant.BenefitAmount,
        benefitAmountBoxColor: BoxColor.GrantedGreen,
        benefitAmountIcon: 'Backpack',
        title: 'spanish',
        description: [{ text: 'spanish' }],
        secondTitle: 'spanish',
        secondDescription: [{ text: 'spanish' }],
        thirdTitle: 'spanish',
        thirdDescription: [{ text: 'spanish' }],
        benefitAmountTitle: 'spanish',
        benefitAmountDescription: [{ text: 'spanish' }],
        benefitAmountBoxTitle: 'spanish',
        benefitAmountMainBoxCopy: [{ text: 'spanish' }],
        benefitAmountSupplementalBoxCopy: [{ text: 'spanish' }],
        benefitAmountSupportiveInformation: [{ text: 'spanish' }],
      },
    })
  })
})

describe('applyDirectiveStructure', () => {
  it('applies the non-text values of the first to the second', async () => {
    const englishComponent = buildUniqueEmailSubComponent({
      kind: 'Directive',
      defaultValue: {
        visible: true,
        variant: DirectiveVariant.ThreeStep,
        showTitle: false,
        showLabel: false,
        showStep1AdditionalContent: false,
        showStep2AdditionalContent: false,
        showStep3AdditionalContent: false,
        showMultipleStepsSupportiveText: false,
        title: 'english',
        label: [{ text: 'english' }],
        linkHref: 'english',
        buttonLabel: 'english',
        buttonColor: 'english',
        step1Label: [{ text: 'english' }],
        step1Additional: [{ text: 'english' }],
        oneStepSupportiveText: [{ text: 'english' }],
        step2Label: [{ text: 'english' }],
        step2Additional: [{ text: 'english' }],
        step3Label: [{ text: 'english' }],
        step3Additional: [{ text: 'english' }],
        step2Tertiary: [{ text: 'english' }],
        step2CaseNumber: [{ text: 'english' }],
        multipleStepsSupportiveText: [{ text: 'english' }],
        alternativePaymentLabel: 'english',
        payOnlineSupportiveText: [{ text: 'english' }],
      },
    })
    const spanishComponent = buildUniqueEmailSubComponent({
      kind: 'Directive',
      defaultValue: {
        visible: false,
        variant: DirectiveVariant.PayOnline,
        showTitle: true,
        showLabel: true,
        showStep1AdditionalContent: true,
        showStep2AdditionalContent: true,
        showStep3AdditionalContent: true,
        showMultipleStepsSupportiveText: true,
        title: 'spanish',
        label: [{ text: 'spanish' }],
        linkHref: 'spanish',
        buttonLabel: 'spanish',
        buttonColor: 'spanish',
        step1Label: [{ text: 'spanish' }],
        step1Additional: [{ text: 'spanish' }],
        oneStepSupportiveText: [{ text: 'spanish' }],
        step2Label: [{ text: 'spanish' }],
        step2Additional: [{ text: 'spanish' }],
        step3Label: [{ text: 'spanish' }],
        step3Additional: [{ text: 'spanish' }],
        step2Tertiary: [{ text: 'spanish' }],
        step2CaseNumber: [{ text: 'spanish' }],
        multipleStepsSupportiveText: [{ text: 'spanish' }],
        alternativePaymentLabel: 'spanish',
        payOnlineSupportiveText: [{ text: 'spanish' }],
      },
    })

    expect(applyDirectiveStructure(englishComponent, spanishComponent)).toEqual({
      ...spanishComponent,
      defaultValue: {
        visible: true,
        variant: DirectiveVariant.ThreeStep,
        showTitle: false,
        showLabel: false,
        showStep1AdditionalContent: false,
        showStep2AdditionalContent: false,
        showStep3AdditionalContent: false,
        showMultipleStepsSupportiveText: false,
        title: 'spanish',
        label: [{ text: 'spanish' }],
        linkHref: 'spanish',
        buttonLabel: 'spanish',
        buttonColor: 'spanish',
        step1Label: [{ text: 'spanish' }],
        step1Additional: [{ text: 'spanish' }],
        oneStepSupportiveText: [{ text: 'spanish' }],
        step2Label: [{ text: 'spanish' }],
        step2Additional: [{ text: 'spanish' }],
        step3Label: [{ text: 'spanish' }],
        step3Additional: [{ text: 'spanish' }],
        step2Tertiary: [{ text: 'spanish' }],
        step2CaseNumber: [{ text: 'spanish' }],
        multipleStepsSupportiveText: [{ text: 'spanish' }],
        alternativePaymentLabel: 'spanish',
        payOnlineSupportiveText: [{ text: 'spanish' }],
      },
    })
  })
})

describe('applyLoginDetailsStructure', () => {
  it('applies the non-text values of the first to the second', async () => {
    const englishComponent = buildUniqueEmailSubComponent({
      kind: 'LoginDetails',
      defaultValue: {
        visible: true,
        variant: LoginDetailsVariant.Details,
        loginDetailsIcon: 'ArrowBack',
        loginInformationIcon: 'ArrowDownward',
        showLoginInformationBody: true,
        loginDetailsTitle: 'english',
        usernameLabel: 'english',
        usernameValue: 'english',
        resetPasswordMessage: [{ text: 'english' }],
        button: 'english',
        buttonHref: 'english',
        resetPasswordDetails: [{ text: 'english' }],
        loginInformationTitle: 'english',
        loginInformationDescription: [{ text: 'english' }],
        loginInformationBody: [{ text: 'english' }],
      },
    })
    const spanishComponent = buildUniqueEmailSubComponent({
      kind: 'LoginDetails',
      defaultValue: {
        visible: false,
        variant: LoginDetailsVariant.Information,
        loginDetailsIcon: 'Api',
        loginInformationIcon: 'Checkroom',
        showLoginInformationBody: false,
        loginDetailsTitle: 'spanish',
        usernameLabel: 'spanish',
        usernameValue: 'spanish',
        resetPasswordMessage: [{ text: 'spanish' }],
        button: 'spanish',
        buttonHref: 'spanish',
        resetPasswordDetails: [{ text: 'spanish' }],
        loginInformationTitle: 'spanish',
        loginInformationDescription: [{ text: 'spanish' }],
        loginInformationBody: [{ text: 'spanish' }],
      },
    })

    expect(applyLoginDetailsStructure(englishComponent, spanishComponent)).toEqual({
      ...spanishComponent,
      defaultValue: {
        visible: true,
        variant: LoginDetailsVariant.Details,
        loginDetailsIcon: 'ArrowBack',
        loginInformationIcon: 'ArrowDownward',
        showLoginInformationBody: true,
        loginDetailsTitle: 'spanish',
        usernameLabel: 'spanish',
        usernameValue: 'spanish',
        resetPasswordMessage: [{ text: 'spanish' }],
        button: 'spanish',
        buttonHref: 'spanish',
        resetPasswordDetails: [{ text: 'spanish' }],
        loginInformationTitle: 'spanish',
        loginInformationDescription: [{ text: 'spanish' }],
        loginInformationBody: [{ text: 'spanish' }],
      },
    })
  })
})

describe('applyInformationalBoxStructure', () => {
  it('applies the non-text values of the first to the second', async () => {
    const englishComponent = buildUniqueEmailSubComponent({
      kind: 'InformationalBox',
      defaultValue: {
        visible: true,
        boxColor: BoxColor.BenefitBlue,
        icon: 'CalendarToday',
        showSupportiveInformation: false,
        title: 'english',
        description: [{ text: 'english' }],
        supportiveInformation: [{ text: 'english' }],
      },
    })
    const spanishComponent = buildUniqueEmailSubComponent({
      kind: 'InformationalBox',
      defaultValue: {
        visible: false,
        boxColor: BoxColor.YieldingYellow,
        icon: 'Deck',
        showSupportiveInformation: true,
        title: 'spanish',
        description: [{ text: 'spanish' }],
        supportiveInformation: [{ text: 'spanish' }],
      },
    })

    expect(applyInformationalBoxStructure(englishComponent, spanishComponent)).toEqual({
      ...spanishComponent,
      defaultValue: {
        visible: true,
        boxColor: BoxColor.BenefitBlue,
        icon: 'CalendarToday',
        showSupportiveInformation: false,
        title: 'spanish',
        description: [{ text: 'spanish' }],
        supportiveInformation: [{ text: 'spanish' }],
      },
    })
  })
})

describe('applyAdditionalContentStructure', () => {
  it('applies the non-text values of the first to the second', async () => {
    const englishComponent = buildUniqueEmailSubComponent({
      kind: 'AdditionalContent',
      defaultValue: { visible: true, content: [{ bold: false, text: 'english' }] },
    })
    const spanishComponent = buildUniqueEmailSubComponent({
      kind: 'AdditionalContent',
      defaultValue: { visible: false, content: [{ bold: true, text: 'spanish' }] },
    })

    expect(applyAdditionalContentStructure(englishComponent, spanishComponent)).toEqual({
      ...spanishComponent,
      defaultValue: { visible: true, content: [{ bold: true, text: 'spanish' }] },
    })
  })
})

describe('applyDateRangeStructure', () => {
  it('applies the non-text values of the first to the second', async () => {
    const englishComponent = buildUniqueEmailSubComponent({
      kind: 'DateRange',
      defaultValue: { visible: true, range: 'english' },
    })
    const spanishComponent = buildUniqueEmailSubComponent({
      kind: 'DateRange',
      defaultValue: { visible: false, range: 'spanish' },
    })

    expect(applyDateRangeStructure(englishComponent, spanishComponent)).toEqual({
      ...spanishComponent,
      defaultValue: { visible: true, range: 'spanish' },
    })
  })
})

describe('applyTitleStructure', () => {
  it('applies the non-text values of the first to the second', async () => {
    const englishComponent = buildUniqueEmailSubComponent({
      kind: 'Title',
      defaultValue: { visible: true, title: 'english' },
    })
    const spanishComponent = buildUniqueEmailSubComponent({
      kind: 'Title',
      defaultValue: { visible: false, title: 'spanish' },
    })

    expect(applyTitleStructure(englishComponent, spanishComponent)).toEqual({
      ...spanishComponent,
      defaultValue: { visible: true, title: 'spanish' },
    })
  })
})

describe('applyProgramNameStructure', () => {
  it('applies the non-text values of the first to the second', async () => {
    const englishComponent = buildUniqueEmailSubComponent({
      kind: 'ProgramName',
      defaultValue: {
        visible: true,
        preset: ProgramNameNJPreset.DependencyBenefits,
        backgroundColor: 'specific color',
        name: 'english',
      },
    })
    const spanishComponent = buildUniqueEmailSubComponent({
      kind: 'ProgramName',
      defaultValue: {
        visible: false,
        preset: ProgramNameNJPreset.PandemicUnemploymentAssistance,
        backgroundColor: 'a different color',
        name: 'spanish',
      },
    })

    expect(applyProgramNameStructure(englishComponent, spanishComponent)).toEqual({
      ...spanishComponent,
      defaultValue: {
        visible: true,
        preset: ProgramNameNJPreset.DependencyBenefits,
        backgroundColor: 'specific color',
        name: 'spanish',
      },
    })
  })
})

describe('applyDirectiveButtonStructure', () => {
  it('applies the non-text values of the first to the second', async () => {
    const englishComponent = buildUniqueEmailSubComponent({
      kind: 'DirectiveButton',
      defaultValue: { visible: true },
    })
    const spanishComponent = buildUniqueEmailSubComponent({
      kind: 'DirectiveButton',
      defaultValue: { visible: false },
    })

    expect(applyDirectiveButtonStructure(englishComponent, spanishComponent)).toEqual({
      ...spanishComponent,
      defaultValue: { visible: true },
    })
  })
})
