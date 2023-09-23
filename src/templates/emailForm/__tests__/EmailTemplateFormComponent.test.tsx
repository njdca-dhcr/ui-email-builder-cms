import React from 'react'
import { render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { EmailTemplateFormComponent } from '../EmailTemplateFormComponent'
import { TEST_ID as headerInputTestId } from '../../emailPreview/HeaderInput'
import { TEST_ID as footerInputTestId } from '../../emailPreview/FooterInput'
import { TEST_ID as introInputTestId } from '../../emailPreview/IntroInput'
import { TEST_ID as bannerInputTestId } from '../../emailPreview/BannerInput'

describe('EmailTemplateFormComponent', () => {
  let description: string

  beforeEach(() => {
    description = faker.lorem.paragraph()
  })

  it('can display a HeaderInput', () => {
    const { queryByTestId } = render(
      <EmailTemplateFormComponent
        copyId="copyId"
        emailTemplateComponentItem={{ kind: 'Header', description }}
      />,
    )
    expect(queryByTestId(headerInputTestId)).not.toBeNull()
    expect(queryByTestId(footerInputTestId)).toBeNull()
  })

  it('can display a FooterInput', () => {
    const { queryByTestId } = render(
      <EmailTemplateFormComponent
        copyId="copyId"
        emailTemplateComponentItem={{ kind: 'Footer', description }}
      />,
    )
    expect(queryByTestId(footerInputTestId)).not.toBeNull()
    expect(queryByTestId(headerInputTestId)).toBeNull()
  })

  it('can display an IntroInput', () => {
    const { queryByTestId } = render(
      <EmailTemplateFormComponent
        copyId="copyId"
        emailTemplateComponentItem={{ kind: 'Intro', description }}
      />,
    )
    expect(queryByTestId(introInputTestId)).not.toBeNull()
    expect(queryByTestId(headerInputTestId)).toBeNull()
  })

  it('can display an BannerInput', () => {
    const { queryByTestId } = render(
      <EmailTemplateFormComponent
        copyId="copyId"
        emailTemplateComponentItem={{ kind: 'Banner', description }}
      />,
    )
    expect(queryByTestId(bannerInputTestId)).not.toBeNull()
    expect(queryByTestId(headerInputTestId)).toBeNull()
  })
})
