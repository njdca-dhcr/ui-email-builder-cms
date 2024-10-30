import { RulesRightsRegulationsValue, RulesRightsRegulationsVariant } from 'src/appTypes'
import { BoxColor } from 'src/ui'

export const defaultRulesRightsRegulationsValue: RulesRightsRegulationsValue = {
  variant: RulesRightsRegulationsVariant.Reminder,
  icon: 'Flag',
  boxColor: BoxColor.GoverningGray,
  reminderTitle: 'Reminder',
  reminderDescription: [
    {
      type: 'paragraph',
      children: [
        {
          text: 'You may only be eligible for this waiver if...',
          bold: true,
        },
      ],
    },
    {
      type: 'paragraph',
      children: [
        {
          bold: true,
          text: '',
        },
      ],
    },
    {
      type: 'numbered-list',
      children: [
        {
          type: 'list-item',
          children: [
            {
              bold: true,
              text: 'Overpayment was due to no fault of your own*',
            },
          ],
        },
        {
          type: 'list-item',
          children: [
            {
              bold: true,
              text: 'Repayment would be unfair and unreasonable given the context',
            },
          ],
        },
      ],
    },
    {
      type: 'paragraph',
      children: [
        {
          bold: true,
          text: '',
        },
      ],
    },
    {
      type: 'paragraph',
      children: [
        {
          text: 'This waiver is for Pandemic Unemployment Assistance (PUA), Federal Pandemic Unemployment Compensation (FPUC), Mixed Earners Unemployment Compensation (MEUC), and Pandemic Extended Unemployment Compensation (PEUC).',
          italic: true,
        },
      ],
    },
    {
      type: 'paragraph',
      children: [
        {
          text: '',
        },
      ],
    },
    {
      type: 'paragraph',
      children: [
        {
          text: '*State and federal laws, rules, and guidance will be used to make these determinations.',
          bold: true,
        },
      ],
    },
  ],
  appealRightsTitle: 'Appeal Rights',
  appealRightsSummary: [
    {
      type: 'paragraph',
      children: [
        {
          text: 'If you disagree with this determination, you have the right to file an appeal. Your appeal must be received within seven (7) days after the date you received this email.',
        },
      ],
    },
  ],
  appealRightsShowInstruction: true,
  appealRightsInstruction: [
    { type: 'paragraph', children: [{ text: 'To begin an appeal online, get started below:' }] },
  ],
  appealRightsButton: 'Get Started',
  appealRightsHref:
    'https://link.embedded-into-the-button-above.should-be-shown-here-in-order-to-give-an-alternative-way-to-access-a-link',
  appealRightsShowInfoLabel: true,
  appealRightsInfoLabel: 'For your appeal:',
  appealRightsShowInfo: true,
  appealRightsInfo: [
    {
      type: 'paragraph',
      children: [{ text: 'Program Code:', bold: true }, { text: '  ###' }],
    },
    {
      type: 'paragraph',
      children: [{ text: 'Date of Claim:', bold: true }, { text: '  00/00/0000' }],
    },
    {
      type: 'paragraph',
      children: [{ text: 'Date of Determination:', bold: true }, { text: '  00/00/0000' }],
    },
  ],
  yourRightsTitle: 'Your Rights:',
  showYourRightsDescription: true,
  yourRightsDescription: [
    {
      type: 'paragraph',
      children: [
        {
          text: 'A dependent is an unemployed spouse/civil union partner or an unemployed, unmarried child (including stepchild or legally adopted child) under the age of 19 (or 22 if the child is attending school full-time).',
          italic: true,
        },
      ],
    },
  ],
  yourRightsList: [
    {
      type: 'numbered-list',
      children: [
        {
          type: 'list-item',
          children: [
            {
              text: 'You may represent yourself or you may be represented at your own expense by an attorney or non-attorney',
            },
          ],
        },
        {
          type: 'list-item',
          children: [
            {
              text: 'You may request a postponement, if you require additional time to prepare your response to this questionnaire',
            },
          ],
        },
        {
          type: 'list-item',
          children: [
            {
              text: 'You may request that your employer produce any documents which relate to your eligibility for benefits',
            },
          ],
        },
        {
          type: 'list-item',
          children: [
            {
              text: 'You may request that statements be taken from your witnesses who have firsthand knowledge of the case',
            },
          ],
        },
        {
          type: 'list-item',
          children: [
            {
              text: 'You or your representative will have the opportunity to provide witness statements, present documents and provide a closing statement or summary',
            },
          ],
        },
        {
          type: 'list-item',
          children: [
            {
              text: 'If the reason for the questionnaire is related to your employment, any questions that you may have for your former employer may be included on the form and the reviewing claims examiner may, at his/her discretion, pose the question(s) to your former employer.',
            },
          ],
        },
      ],
    },
  ],
}
