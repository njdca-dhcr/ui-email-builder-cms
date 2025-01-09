export const useEmailTemplatesData = (): {
  id: string
  description: string
  name: string
  path: string
}[] => {
  return [
    {
      id: '123',
      name: 'MEUC - Email Template',
      path: '/email-templates/email-template',
      description: 'This is the very FiRSt email template that appears.',
    },
    {
      id: '456',
      name: 'eMonetary - Another Email Template',
      path: '/email-templates/another-email-template',
      description: 'This is the sEcoNd email template that appears.',
    },
  ]
}
