import React from 'react'
import { List, ListItem } from '../List'
import { render } from '@testing-library/react'
import { faker } from '@faker-js/faker'

let text: string
let customClassName: string

beforeEach(async () => {
  text = faker.lorem.paragraph()
  customClassName = faker.lorem.word()
})

describe('List', () => {
  it('is a ul tag with some basic styles', () => {
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
    const { baseElement } = render(
      <List className={customClassName}>
        <li>{text}</li>
      </List>,
    )
    const list = baseElement.querySelector(`.${customClassName}`)
    expect(list).not.toBeNull()
    expect(list?.tagName).toEqual('UL')
  })

  it('displays its children', () => {
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

describe('ListItem', () => {
  it('is a li tag with some basic styles', async () => {
    const { baseElement } = render(
      <List>
        <ListItem>
          <span>{text}</span>
        </ListItem>
      </List>,
    )
    const listItem = baseElement.querySelector('.list-item')
    expect(listItem).not.toBeNull()
    expect(listItem?.tagName).toEqual('LI')
  })

  it('accepts a class name', async () => {
    const { baseElement } = render(
      <List>
        <ListItem className={customClassName}>
          <span>{text}</span>
        </ListItem>
      </List>,
    )
    const listItem = baseElement.querySelector(`.${customClassName}`)
    expect(listItem).not.toBeNull()
    expect(listItem?.tagName).toEqual('LI')
  })

  it('displays its children', async () => {
    const { baseElement } = render(
      <List>
        <ListItem>
          <span>{text}</span>
        </ListItem>
      </List>,
    )
    const listItem = baseElement.querySelector('.list-item')
    expect(listItem).not.toBeNull()
    expect(listItem).toContainHTML(`<span>${text}</span>`)
  })
})
