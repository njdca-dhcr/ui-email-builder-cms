import React from 'react'
import { render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { EmailCopyData } from '../EmailCopyData'
import { Header } from '../Header'

describe('Header', () => {
  let copyId: string
  let value: string

  beforeEach(() => {
    copyId = faker.lorem.word()
    value = faker.lorem.words(3)
  })

  it('displays its copy data', () => {
    const { baseElement } = render(
      <EmailCopyData initialData={{ [copyId]: value }}>
        <Header copyId={copyId} />
      </EmailCopyData>,
    )
    expect(baseElement).toHaveTextContent(value)
  })

  it('displays a placeholder when there is no copy data', () => {
    const { baseElement } = render(
      <EmailCopyData initialData={{ [copyId]: '' }}>
        <Header copyId={copyId} />
      </EmailCopyData>,
    )
    expect(baseElement).toHaveTextContent('Header Placeholder')
  })
})
