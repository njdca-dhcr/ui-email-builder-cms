import { LoginDetailsValue, LoginDetailsVariant } from 'src/appTypes'

export const defaultLoginDetailsValue: LoginDetailsValue = {
  variant: LoginDetailsVariant.Details,
  // Details
  loginDetailsTitle: 'Login Details',
  usernameLabel: 'Your username is:',
  usernameValue: 'CAPTAIN AMERICA',
  resetPasswordMessage: [
    {
      type: 'paragraph',
      children: [
        { text: "If you're having trouble logging in, send a request to reset your password." },
      ],
    },
  ],
  button: 'Reset Password',
  buttonHref:
    'https://link.embedded-into-the-button-above.should-be-shown-here-in-order-to-give-an-alternative-way-to-access-a-link',
  resetPasswordDetails: [
    {
      type: 'paragraph',
      children: [
        {
          text: 'Your request may take up to 7-10 business days. An email will be sent to you when your password has been reset.',
          italic: true,
        },
      ],
    },
  ],
  loginDetailsIcon: 'Lock',
  // Information
  loginInformationTitle: 'Important Login Information',
  loginInformationDescription: [
    {
      type: 'paragraph',
      children: [
        {
          text: 'Login using the same Login ID and Password you used to file your claim.',
          bold: true,
        },
      ],
    },
  ],
  showLoginInformationBody: true,
  loginInformationBody: [
    {
      type: 'bulleted-list',
      children: [
        {
          type: 'list-item',
          children: [
            { text: 'If you do not have an account,', bold: true, italic: true },
            {
              text: ' create one here. After creating your account, return to this email and get started.',
              italic: true,
            },
          ],
        },
        {
          type: 'list-item',
          children: [
            { text: 'Forget your username and password?', bold: true, italic: true },
            {
              text: ' Follow the links on the login page to help access your account.',
              italic: true,
            },
          ],
        },
      ],
    },
  ],
  loginInformationIcon: 'LockOpen',
}
