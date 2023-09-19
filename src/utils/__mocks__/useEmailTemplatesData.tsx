export const useEmailTemplatesData = (): { id: string; name: string; slug: string }[] => {
  return [
    {
      id: '123',
      name: 'Email Template',
      slug: 'email-template',
    },
    {
      id: '456',
      name: 'Another Email Template',
      slug: 'another-email-template',
    },
  ]
}
