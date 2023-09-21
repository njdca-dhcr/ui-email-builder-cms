import React, { FC, ReactNode, useContext } from 'react'
import { act, render, renderHook } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { useStaticQuery } from 'gatsby'
import { useEmailTemplatesData } from '../useEmailTemplatesData'

jest.unmock('../useEmailTemplatesData')

describe('useEmailTemplatesData', () => {
  beforeEach(() => {
    ;(useStaticQuery as any).mockImplementation((): Queries.EmailTemplatesDataQuery => {
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
        slug: 'email-template',
      },
      {
        id: '789',
        name: 'Another Email Template',
        description: 'This is the second email template',
        slug: 'another-email-template',
      },
    ])
  })
})
