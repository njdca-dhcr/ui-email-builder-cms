import React from 'react'
import { render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { EmailTemplateComponent } from '../EmailTemplateComponent'
import { TEST_ID as headerTestId } from '../Header'
import { TEST_ID as footerTestId } from '../Footer'

describe('EmailTemplateComponent', () => {
  let description: string

  beforeEach(() => {
    description = faker.lorem.paragraph()
  })

  it('can display a Header', () => {
    const rendered = render(
      <EmailTemplateComponent emailTemplateComponentItem={{ component: 'Header', description }} />,
    )
    expect(rendered.queryByTestId(headerTestId)).toBeDefined()
    expect(rendered.queryByTestId(footerTestId)).toBeNull()
  })

  it('can display a Footer', () => {
    const rendered = render(
      <EmailTemplateComponent emailTemplateComponentItem={{ component: 'Footer', description }} />,
    )
    expect(rendered.queryByTestId(footerTestId)).toBeDefined()
    expect(rendered.queryByTestId(headerTestId)).toBeNull()
  })
})
