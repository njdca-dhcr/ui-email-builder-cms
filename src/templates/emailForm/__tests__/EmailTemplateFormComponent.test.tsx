import React from 'react'
import { render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { EmailTemplateFormComponent } from '../EmailTemplateFormComponent'
import { TEST_ID as headerInputTestId } from '../../emailPreview/HeaderInput'
import { TEST_ID as footerInputTestId } from '../../emailPreview/FooterInput'

describe('EmailTemplateFormComponent', () => {
  let description: string

  beforeEach(() => {
    description = faker.lorem.paragraph()
  })

  it('can display a HeaderInput', () => {
    const { queryByTestId } = render(
      <EmailTemplateFormComponent
        copyId="copyId"
        emailTemplateComponentItem={{ component: 'Header', description }}
      />,
    )
    expect(queryByTestId(headerInputTestId)).not.toBeNull()
    expect(queryByTestId(footerInputTestId)).toBeNull()
  })

  it('can display a FooterInput', () => {
    const { queryByTestId } = render(
      <EmailTemplateFormComponent
        copyId="copyId"
        emailTemplateComponentItem={{ component: 'Footer', description }}
      />,
    )
    expect(queryByTestId(footerInputTestId)).not.toBeNull()
    expect(queryByTestId(headerInputTestId)).toBeNull()
  })
})
