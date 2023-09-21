import React from 'react'
import { List } from '../List'
import { render } from '@testing-library/react'
import { faker } from '@faker-js/faker'

describe('List', () => {
  it('is a ul tag with some basic styles', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <List>
        <li>{text}</li>
      </List>,
    )
    const list = baseElement.querySelector('.list')
    expect(list).not.toBeNull()
    expect(list?.tagName).toEqual('UL')
  })

  it('accepts a class name', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <List className="my-class">
        <li>{text}</li>
      </List>,
    )
    const list = baseElement.querySelector('.my-class')
    expect(list).not.toBeNull()
    expect(list?.tagName).toEqual('UL')
  })

  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <List>
        <li>{text}</li>
      </List>,
    )
    const list = baseElement.querySelector('.list')
    expect(list).not.toBeNull()
    expect(list).toContainHTML(`<li>${text}</li>`)
  })
})
