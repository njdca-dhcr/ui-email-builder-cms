import React from 'react'
import { Header } from '../Header'
import { render } from '@testing-library/react'
import { EmailTemplate } from 'src/appTypes'
import { buildUniqueEmailComponent, emailPartWrapper } from 'src/testHelpers'
import { faker } from '@faker-js/faker'

describe('Header', () => {
  let emailComponent: EmailTemplate.Header

  beforeEach(() => {
    emailComponent = buildUniqueEmailComponent('Header')
  })

  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <Header emailComponent={emailComponent}>
        <tr>
          <td>{text}</td>
        </tr>
      </Header>,
      { wrapper: emailPartWrapper },
    )

    expect(baseElement).toContainHTML(`<tr><td>${text}</td></tr>`)
  })
})
