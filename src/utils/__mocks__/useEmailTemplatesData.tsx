export const useEmailTemplatesData = (): {
  id: string
  name: string
  path: string
}[] => {
  return [
    {
      id: '123',
      name: 'Email Template',
      path: '/email-templates/email-template',
    },
    {
      id: '456',
      name: 'Another Email Template',
      path: '/email-templates/another-email-template',
    },
  ]
}
