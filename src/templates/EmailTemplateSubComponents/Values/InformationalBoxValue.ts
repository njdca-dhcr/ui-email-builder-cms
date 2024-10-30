import { InformationalBoxValue } from 'src/appTypes'
import { BoxColor } from 'src/ui'

export const defaultInformationalBoxValue: InformationalBoxValue = {
  boxColor: BoxColor.BenefitBlue,
  icon: 'LockOpen',
  title: 'Application confirmation number',
  description: [{ type: 'paragraph', children: [{ text: 'Confirmation number: 123456789' }] }],
  showSupportiveInformation: true,
  supportiveInformation: [
    {
      type: 'paragraph',
      children: [
        {
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a tellus nec eros placerat ornare at sed ante. Duis enim quam, auctor quis congue eget, commodo eu urna. Donec laoreet a dui consequat sollicitudin. Aliquam et dapibus ex, at malesuada tellus.',
          italic: true,
        },
      ],
    },
  ],
}
