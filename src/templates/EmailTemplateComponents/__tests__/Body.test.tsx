import React from 'react'
import { Body } from '../Body'
import { render } from '@testing-library/react'
import { EmailParts } from 'src/appTypes'
import { buildUniqueEmailComponent, emailPartWrapper } from 'src/testHelpers'
import { faker } from '@faker-js/faker'

describe('Body', () => {
  let emailComponent: EmailParts.Body

  beforeEach(() => {
    emailComponent = buildUniqueEmailComponent('Body')
  })

  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <Body emailComponent={emailComponent}>
        <tr>
          <td>{text}</td>
        </tr>
      </Body>,
      { wrapper: emailPartWrapper },
    )

    expect(baseElement).toContainHTML(`<tr><td>${text}</td></tr>`)
  })
})
