import React from 'react'
import { render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { EmailTemplateFormComponent } from '../EmailTemplateFormComponent'
import { TEST_ID as headerInputTestId } from '../HeaderInput'
import { TEST_ID as footerInputTestId } from '../FooterInput'

describe('EmailTemplateFormComponent', () => {
  let description: string

  beforeEach(() => {
    description = faker.lorem.paragraph()
  })

  it('can display a HeaderInput', () => {
    const rendered = render(
      <EmailTemplateFormComponent
        copyId="copyId"
        emailTemplateComponentItem={{ component: 'Header', description }}
      />,
    )
    expect(rendered.queryByTestId(headerInputTestId)).not.toBeNull()
    expect(rendered.queryByTestId(footerInputTestId)).toBeNull()
  })

  it('can display a Footer', () => {
    const rendered = render(
      <EmailTemplateFormComponent
        copyId="copyId"
        emailTemplateComponentItem={{ component: 'Footer', description }}
      />,
    )
    expect(rendered.queryByTestId(footerInputTestId)).not.toBeNull()
    expect(rendered.queryByTestId(headerInputTestId)).toBeNull()
  })
})
