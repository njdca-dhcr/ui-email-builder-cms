import React from 'react'
import { Body } from '../Body'
import { render } from '@testing-library/react'
import { EmailTemplate } from 'src/appTypes'
import { buildEmailTemplateComponent, emailPartWrapper } from 'src/testHelpers'
import { faker } from '@faker-js/faker'

describe('Body', () => {
  let id: string
  let emailComponent: EmailTemplate.Component<'Body'>

  beforeEach(() => {
    id = faker.lorem.word()
    emailComponent = buildEmailTemplateComponent('Body')
  })

  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <Body emailComponent={emailComponent} id={id}>
        <tr>
          <td>{text}</td>
        </tr>
      </Body>,
      { wrapper: emailPartWrapper },
    )

    expect(baseElement).toContainHTML(`<tr><td>${text}</td></tr>`)
  })
})
