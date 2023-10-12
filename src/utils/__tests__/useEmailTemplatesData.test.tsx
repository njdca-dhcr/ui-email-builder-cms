import { renderHook } from '@testing-library/react'
import { useStaticQuery } from 'gatsby'
import { useEmailTemplatesData } from '../useEmailTemplatesData'
import { asMock } from 'src/testHelpers'

jest.unmock('../useEmailTemplatesData')

describe('useEmailTemplatesData', () => {
  beforeEach(() => {
    asMock(useStaticQuery).mockImplementation((): Queries.EmailTemplatesDataQuery => {
      return {
        emailTemplates: {
          edges: [
            {
              node: {
                id: '123',
                name: 'Email Template',
                description: 'This is the first email template',
                parent: { id: '456', name: 'email-template' },
              },
            },
            {
              node: {
                id: '789',
                name: 'Another Email Template',
                description: 'This is the second email template',
                parent: { id: '012', name: 'another-email-template' },
              },
            },
          ],
        },
      }
    })
  })

  it('is an array of email template metadata', () => {
    const { result } = renderHook(() => useEmailTemplatesData())
    expect(result.current).toEqual([
      {
        id: '123',
        name: 'Email Template',
        description: 'This is the first email template',
        path: '/email-templates/email-template',
      },
      {
        id: '789',
        name: 'Another Email Template',
        description: 'This is the second email template',
        path: '/email-templates/another-email-template',
      },
    ])
  })
})
