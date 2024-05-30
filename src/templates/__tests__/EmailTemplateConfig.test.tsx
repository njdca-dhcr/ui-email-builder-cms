import { faker } from '@faker-js/faker'
import { render, renderHook } from '@testing-library/react'
import React, { FC, ReactNode } from 'react'
import { buildUniqueEmailConfig } from 'src/testHelpers'
import { EmailTemplateConfig, useEmailTemplateConfig } from '../EmailTemplateConfig'

describe('EmailTemplateConfig', () => {
  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <EmailTemplateConfig emailTemplateConfig={buildUniqueEmailConfig()}>
        <p>{text}</p>
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
