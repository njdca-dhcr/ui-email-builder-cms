import React from 'react'
import { RenderResult, render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import type { EmailTemplate } from 'src/appTypes'
import BasicTemplate, { Head } from '../BasicTemplate'
import { TEST_IDS } from '../BasicTemplateContents'

describe('BasicTemplate', () => {
  let emailTemplate: EmailTemplate
  let rendered: RenderResult

  beforeEach(() => {
    emailTemplate = {
      name: faker.lorem.word(),
      description: faker.lorem.paragraph(),
      components: [
        { component: 'Header', description: faker.lorem.words(3) },
        { component: 'Footer', description: faker.lorem.words(3) },
      ],
    }
    rendered = render(<BasicTemplate pageContext={{ emailTemplate }} />)
  })

  it('is displays the layout', () => {
    const { baseElement } = rendered
    expect(baseElement.querySelector('.layout')).not.toBeNull()
  })

  it('displays the BasicTemplateContents', () => {
    const { queryByTestId } = rendered
    expect(queryByTestId(TEST_IDS.basicTemplateContents)).not.toBeNull()
  })

  describe('Head', () => {
    it("uses the email template's name as the title", () => {
      const { baseElement } = render(<Head pageContext={{ emailTemplate }} {...({} as any)} />)
      expect(baseElement.querySelector('title')).toHaveTextContent(emailTemplate.name)
    })
  })
})
