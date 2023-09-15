import React from 'react'
import { render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import type { EmailTemplate } from '../../appTypes'
import BasicTemplate, { TEST_IDS } from '../BasicTemplate'
import { TEST_ID as headerTestId } from '../components/Header'
import { TEST_ID as footerTestId } from '../components/Footer'

describe('BasicTemplate', () => {
  let emailTemplate: EmailTemplate

  beforeEach(() => {
    emailTemplate = {
      name: faker.lorem.word(),
      description: faker.lorem.paragraph(),
      components: [
        { component: 'Header', description: faker.lorem.words(3) },
        { component: 'Footer', description: faker.lorem.words(3) },
      ],
    }
  })

  it('display the email template name and description', () => {
    const rendered = render(<BasicTemplate pageContext={{ emailTemplate }} />)
    expect(rendered.getByTestId(TEST_IDS.name)).toHaveTextContent(emailTemplate.name)
    expect(rendered.getByTestId(TEST_IDS.description)).toHaveTextContent(emailTemplate.description)
  })

  it('displays email template components properly', () => {
    const rendered = render(<BasicTemplate pageContext={{ emailTemplate }} />)
    expect(rendered.queryByTestId(headerTestId)).toBeDefined()
    expect(rendered.queryByTestId(footerTestId)).toBeDefined()
  })
})
