import React, { ReactNode } from 'react'
import { Header } from '../Header'
import { render } from '@testing-library/react'
import { EmailTemplate } from 'src/appTypes'
import { buildEmailTemplateComponent } from 'src/testHelpers'
import { faker } from '@faker-js/faker'
import userEvent from '@testing-library/user-event'

describe('Header', () => {
  let id: string
  let emailComponent: EmailTemplate.Component<'Header'>

  const wrapper = ({ children }: { children: ReactNode }) => {
    return (
      <table>
        <tbody>{children}</tbody>
      </table>
    )
  }

  beforeEach(() => {
    id = faker.lorem.word()
    emailComponent = buildEmailTemplateComponent('Header')
  })

  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <Header emailComponent={emailComponent} id={id}>
        <tr>
          <td>{text}</td>
        </tr>
      </Header>,
      { wrapper },
    )

    expect(baseElement).toContainHTML(`<tr><td>${text}</td></tr>`)
  })
})
