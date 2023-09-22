import React from 'react'
import { render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { EmailTemplatePreviewComponent } from '../EmailTemplatePreviewComponent'
import { TEST_ID as headerTestId } from '../Header'
import { TEST_ID as footerTestId } from '../Footer'
import { TEST_ID as introTestId } from '../Intro'
import { TEST_ID as bannerTestId } from '../Banner'

describe('EmailTemplatePreviewComponent', () => {
  let description: string

  beforeEach(() => {
    description = faker.lorem.paragraph()
  })

  it('can display a Header', () => {
    const { queryByTestId } = render(
      <EmailTemplatePreviewComponent
        copyId="copyId"
        emailTemplateComponentItem={{ component: 'Header', description }}
      />,
    )
    expect(queryByTestId(headerTestId)).not.toBeNull()
    expect(queryByTestId(footerTestId)).toBeNull()
  })

  it('can display a Footer', () => {
    const { queryByTestId } = render(
      <EmailTemplatePreviewComponent
        copyId="copyId"
        emailTemplateComponentItem={{ component: 'Footer', description }}
      />,
    )
    expect(queryByTestId(footerTestId)).not.toBeNull()
    expect(queryByTestId(headerTestId)).toBeNull()
  })

  it('can display a Intro', () => {
    const { queryByTestId } = render(
      <EmailTemplatePreviewComponent
        copyId="copyId"
        emailTemplateComponentItem={{ component: 'Intro', description }}
      />,
    )
    expect(queryByTestId(introTestId)).not.toBeNull()
    expect(queryByTestId(headerTestId)).toBeNull()
  })

  it('can display a Banner', () => {
    const { queryByTestId } = render(
      <EmailTemplatePreviewComponent
        copyId="copyId"
        emailTemplateComponentItem={{ component: 'Banner', description }}
      />,
    )
    expect(queryByTestId(bannerTestId)).not.toBeNull()
    expect(queryByTestId(headerTestId)).toBeNull()
  })
})
