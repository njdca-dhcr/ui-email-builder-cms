import React from 'react'
import { Footer } from '../Footer'
import { render } from '@testing-library/react'
import { EmailTemplate } from 'src/appTypes'
import { buildEmailTemplateComponent, emailPartWrapper } from 'src/testHelpers'
import { faker } from '@faker-js/faker'

describe('Footer', () => {
  let id: string
  let emailComponent: EmailTemplate.Component<'Footer'>

  beforeEach(() => {
    id = faker.lorem.word()
    emailComponent = buildEmailTemplateComponent('Footer')
  })

  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <Footer emailComponent={emailComponent} id={id}>
        <tr>
          <td>{text}</td>
        </tr>
      </Footer>,
      { wrapper: emailPartWrapper },
    )

    expect(baseElement).toContainHTML(`<tr><td>${text}</td></tr>`)
  })
})
