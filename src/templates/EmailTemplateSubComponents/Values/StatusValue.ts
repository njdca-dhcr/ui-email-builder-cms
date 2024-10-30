import { StatusValue, StatusVariant } from 'src/appTypes'
import { BoxColor } from 'src/ui'

export const defaultStatusValue: StatusValue = {
  variant: StatusVariant.Overview,
  icon: 'Warning',
  status: 'Status of Claim',
  statusDueTo: 'because...',
  showSupportiveInformation: true,
  spaceAfter: true,
  showDescription: true,
  description: [
    {
      type: 'paragraph',
      children: [
        {
          text: '{Data Reference} or a sentence that colors more of the status of claim',
          bold: true,
        },
      ],
    },
  ],
  supportiveInformation: [
    {
      type: 'paragraph',
      children: [
        {
          text: 'Supportive information around how the status above was informed and how a claimant will receive more detailed information and/or a determination.',
          italic: true,
        },
      ],
    },
  ],

  documentsNeededLabel: 'We need the following:',
  documentsNeededValue: '{Name_of_document(s)}',
  emailToLabel: 'Email this to:',
  emailToValue: 'DUA@unemployment.gov',
  subjectLineLabel: 'Subject Line:',
  subjectLineValue: 'Eligible Pending Review Documents<br/>{Name_of_claimant}',
  showMissingDocumentDeadline: true,
  missingDocumentDeadline:
    'If you do not submit your documents by 00/00/0000, you will be denied your claim and will be required to pay back any DUA funds released to you.',
  boxColor: BoxColor.YieldingYellow,
  amountLabel: 'You owe $200',
  amountLineItems: [
    { label: 'Overpayment Total', value: '$200' },
    { label: 'Amount waived', value: '$50', bold: true, italic: true },
  ],
  amountTotal: { label: 'You must pay', value: '$150', bold: true },
}
