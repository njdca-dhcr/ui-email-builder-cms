import React from 'react'
import { render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { IndexList, IndexListItem } from '../IndexList'

let text: string
let customClassName: string

beforeEach(async () => {
  text = faker.lorem.paragraph()
  customClassName = faker.lorem.word()
})

describe('IndexList', () => {
  it('is a ul tag with some basic styles', () => {
    const { baseElement } = render(
      <IndexList>
        <li>{text}</li>
      </IndexList>,
    )
    const list = baseElement.querySelector('.index-page-list')
    expect(list).toBeTruthy()
    expect(list?.tagName).toEqual('UL')
  })

  it('displays its children', () => {
    const { baseElement } = render(
      <IndexList>
        <li>{text}</li>
      </IndexList>,
    )
    const list = baseElement.querySelector('.index-page-list')
    expect(list).not.toBeNull()
    expect(list).toContainHTML(`<li>${text}</li>`)
  })
})

describe('IndexListItem', () => {
  it('is a li tag with some basic styles', async () => {
    const { baseElement } = render(
      <IndexList>
        <IndexListItem>
          <span>{text}</span>
        </IndexListItem>
      </IndexList>,
    )
    const listItem = baseElement.querySelector('.index-page-list-item')
    expect(listItem).not.toBeNull()
    expect(listItem?.tagName).toEqual('LI')
  })

  it('displays its children', async () => {
    const { baseElement } = render(
      <IndexList>
        <IndexListItem>
          <span>{text}</span>
        </IndexListItem>
      </IndexList>,
    )
    const listItem = baseElement.querySelector('.index-page-list-item')
    expect(listItem).not.toBeNull()
    expect(listItem).toContainHTML(`<span>${text}</span>`)
  })
})
