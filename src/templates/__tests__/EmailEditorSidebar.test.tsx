import React from 'react'
import { EmailEditorSidebar } from '../EmailEditorSidebar'
import { render } from '@testing-library/react'
import { EmailTemplate } from 'src/appTypes'
import { faker } from '@faker-js/faker'

describe('EmailEditorSidebar', () => {
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

  it('displays a link back to the home page', () => {
    const { baseElement } = render(<EmailEditorSidebar emailTemplate={emailTemplate} />)
    const link: HTMLAnchorElement = baseElement.querySelector('.back-link') as any
    expect(link.tagName).toEqual('A')
    expect(link.href).toEqual('http://localhost/')
  })

  it('displays the heading and select navigator', () => {
    const { baseElement } = render(<EmailEditorSidebar emailTemplate={emailTemplate} />)
    const h1 = baseElement.querySelector('h1')
    expect(h1).not.toBeNull()
    expect(h1?.tagName).toEqual('H1')
  })
})
