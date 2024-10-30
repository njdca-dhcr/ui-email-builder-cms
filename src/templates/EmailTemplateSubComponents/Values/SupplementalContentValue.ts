import { SupplementalContentValue, SupplementalContentVariant } from 'src/appTypes'
import { BoxColor } from 'src/ui'

export const defaultSupplementalContentValue: SupplementalContentValue = {
  variant: SupplementalContentVariant.SingleSupplementalContent,
  title: 'Supplemental Content Title 1',
  description: [
    {
      type: 'paragraph',
      children: [
        {
          text: 'Aenean lacinia bibendum nulla sed consectetur. Cras mattis consectetur purus sit amet fermentum. Curabitur blandit tempus porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
      ],
    },
  ],
  secondTitle: 'Supplemental Content Title 2',
  secondDescription: [
    {
      type: 'paragraph',
      children: [
        {
          text: 'Aenean lacinia bibendum nulla sed consectetur. Cras mattis consectetur purus sit amet fermentum. Curabitur blandit tempus porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
      ],
    },
  ],
  thirdTitle: 'Supplemental Content Title 3',
  thirdDescription: [
    {
      type: 'paragraph',
      children: [
        {
          text: 'Aenean lacinia bibendum nulla sed consectetur. Cras mattis consectetur purus sit amet fermentum. Curabitur blandit tempus porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
      ],
    },
  ],
  benefitAmountBoxColor: BoxColor.GrantedGreen,
  benefitAmountIcon: 'CreditCard',
  benefitAmountTitle: 'Your Benefit Details',
  benefitAmountDescription: [
    {
      type: 'paragraph',
      children: [
        {
          text: 'A detailed breakdown of your benefit amount and how we got to that number will be mailed to you. If you disagree with it, appeal rights and processes are available.',
        },
      ],
    },
  ],
  benefitAmountBoxTitle: 'Benefit Amount',
  benefitAmountMainBoxCopy: [
    {
      type: 'paragraph',
      children: [
        {
          text: 'Weekly Rate:   ',
          bold: true,
        },
        { text: '$400', bold: true },
      ],
    },
    {
      type: 'paragraph',
      children: [
        {
          text: 'Partial Weekly Rate:   ',
          bold: true,
        },
        { text: '$200', bold: true },
      ],
    },
  ],
  benefitAmountSupplementalBoxCopy: [
    {
      type: 'paragraph',
      children: [
        {
          text: 'This rate includes an increase for dependency benefits',
          bold: true,
          italic: true,
        },
      ],
    },
    {
      type: 'paragraph',
      children: [{ text: ' ' }],
    },
    {
      type: 'paragraph',
      children: [
        {
          text: 'This amount is subject to change based on the submitted tax record or dependency documents you send in.',
          italic: true,
        },
      ],
    },
  ],
  benefitAmountSupportiveInformation: [
    {
      type: 'paragraph',
      children: [
        {
          text: "If you're working part-time, a partial weekly rate (which is 20% higher than your weekly rate) will be used to calculate your benefit amount.",
          italic: true,
        },
      ],
    },
  ],
}
