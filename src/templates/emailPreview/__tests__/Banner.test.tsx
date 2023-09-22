import React from 'react'
import { render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { EmailCopyData } from '../../emailForm/EmailCopyData'
import { Banner } from '../Banner'

describe('Status', () => {
  let copyId: string
  let value: any

  beforeEach(() => {
    copyId = faker.lorem.word()
    value = { banner1: faker.lorem.words(3), banner2: faker.lorem.words(3) }
  })

  it('displays its copy data', () => {
    const { baseElement } = render(
      <EmailCopyData initialData={{ [copyId]: value }}>
        <Banner copyId={copyId} />
      </EmailCopyData>,
    )
    expect(baseElement).toHaveTextContent(value.banner1)
    expect(baseElement).toHaveTextContent(value.banner2)
  })

  it('displays a placeholder when there is no copy data', () => {
    const { baseElement } = render(
      <EmailCopyData initialData={{ [copyId]: '' }}>
        <Banner copyId={copyId} />
      </EmailCopyData>,
    )
    expect(baseElement).toHaveTextContent('Banner1 Placeholder')
    expect(baseElement).toHaveTextContent('Banner2 Placeholder')
  })
})
