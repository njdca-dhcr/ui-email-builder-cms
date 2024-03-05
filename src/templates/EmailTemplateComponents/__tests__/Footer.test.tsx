import React from 'react'
import { Footer } from '../Footer'
import { render } from '@testing-library/react'
import { EmailTemplate } from 'src/appTypes'
import { buildUniqueEmailComponent, emailPartWrapper } from 'src/testHelpers'
import { faker } from '@faker-js/faker'

describe('Footer', () => {
  let emailComponent: EmailTemplate.Footer

  beforeEach(() => {
    emailComponent = buildUniqueEmailComponent('Footer')
  })

  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <Footer emailComponent={emailComponent}>
        <tr>
          <td>{text}</td>
        </tr>
      </Footer>,
      { wrapper: emailPartWrapper },
    )

    expect(baseElement).toContainHTML(`<tr><td>${text}</td></tr>`)
  })
})
