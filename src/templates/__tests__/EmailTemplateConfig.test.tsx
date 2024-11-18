import { faker } from '@faker-js/faker'
import { act, render, renderHook } from '@testing-library/react'
import React, { FC, ReactNode } from 'react'
import { buildUniqueEmailConfig } from 'src/testHelpers'
import {
  EmailTemplateConfig,
  useEmailTemplateConfig,
  useSetEmailTemplateConfig,
} from '../EmailTemplateConfig'

describe('EmailTemplateConfig', () => {
  it('displays its children when given as a react node', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <EmailTemplateConfig emailTemplateConfig={buildUniqueEmailConfig()}>
        <p>{text}</p>
      </EmailTemplateConfig>,
    )
    expect(baseElement).toContainHTML(`<p>${text}</p>`)
  })

  it('displays its children when given as a function', () => {
    const text = faker.lorem.paragraph()
    const emailTemplate = buildUniqueEmailConfig()
    const { baseElement } = render(
      <EmailTemplateConfig emailTemplateConfig={emailTemplate}>
        {(emailTemplateConfig) => {
          expect(emailTemplateConfig).toEqual(emailTemplate)
          return <p>{text}</p>
        }}
      </EmailTemplateConfig>,
    )
    expect(baseElement).toContainHTML(`<p>${text}</p>`)
  })
})

describe('useEmailTemplateConfig', () => {
  it('provides the email template config provided to the larger context', () => {
    const emailTemplateConfig = buildUniqueEmailConfig()
    const wrapper: FC<{ children: ReactNode }> = ({ children }) => {
      return (
        <EmailTemplateConfig emailTemplateConfig={emailTemplateConfig}>
          {children}
        </EmailTemplateConfig>
      )
    }
    const { result } = renderHook(() => useEmailTemplateConfig(), { wrapper })
    expect(result.current).toEqual(emailTemplateConfig)
  })
})

describe('useSetEmailTemplateConfig', () => {
  it('provides a function to update the email template config in context', async () => {
    const emailTemplateConfig = buildUniqueEmailConfig()
    const wrapper: FC<{ children: ReactNode }> = ({ children }) => {
      return (
        <EmailTemplateConfig emailTemplateConfig={emailTemplateConfig}>
          {children}
        </EmailTemplateConfig>
      )
    }
    const { result } = renderHook(
      () => [useEmailTemplateConfig(), useSetEmailTemplateConfig()] as const,
      { wrapper },
    )
    expect(result.current[1]).toEqual(expect.any(Function))
    const newName = faker.lorem.word()
    act(() => {
      result.current[1]({ ...emailTemplateConfig, name: newName })
    })

    expect(result.current[0].name).toEqual(newName)
  })
})
