import { faker } from '@faker-js/faker'
import { render } from '@testing-library/react'
import React from 'react'
import { Alert } from '../Alert'

describe('Alert', () => {
  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <Alert>
        <p>{text}</p>
      </Alert>,
    )
    expect(baseElement).toContainHTML(`<p>${text}</p>`)
  })

  it('is an alert div', () => {
    const { queryByRole } = render(
      <Alert>
        <p>{faker.lorem.words(3)}</p>
      </Alert>,
    )
    expect(queryByRole('alert')).not.toBeNull()
  })

  it('accepts a className', () => {
    const className = faker.lorem.word()
    const { getByRole } = render(
      <Alert className={className}>
        <p>{faker.lorem.words(3)}</p>
      </Alert>,
    )
    const alert = getByRole('alert')
    expect(alert.className).toContain(className)
  })
})
