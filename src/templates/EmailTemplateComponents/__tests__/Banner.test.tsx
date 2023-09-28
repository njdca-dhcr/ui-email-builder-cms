import React from 'react'
import { Banner } from '../Banner'
import { render } from '@testing-library/react'
import { EmailTemplate } from 'src/appTypes'
import { buildEmailTemplateComponent, emailPartWrapper } from 'src/testHelpers'
import { faker } from '@faker-js/faker'

describe('Banner', () => {
  let id: string
  let emailComponent: EmailTemplate.Component<'Banner'>

  beforeEach(() => {
    id = faker.lorem.word()
    emailComponent = buildEmailTemplateComponent('Banner')
  })

  xit('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <Banner emailComponent={emailComponent} id={id}>
        <tr>
          <td>{text}</td>
        </tr>
      </Banner>,
      { wrapper: emailPartWrapper },
    )

    expect(baseElement).toContainHTML(`<tr><td>${text}</td></tr>`)
  })
})
