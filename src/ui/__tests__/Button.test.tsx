import React from 'react'
import { faker } from '@faker-js/faker'
import { RenderResult, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '../Button'

describe('Button', () => {
  let text: string
  let handleClick: jest.Mock

  beforeEach(() => {
    text = faker.lorem.paragraph()
    handleClick = jest.fn()
  })

  it('is a button tag with some basic styles', () => {
    const { baseElement } = render(
      <Button onClick={handleClick}>
        <div>{text}</div>
      </Button>,
    )
    const button = baseElement.querySelector('.button')
    expect(button).not.toBeNull()
    expect(button?.tagName).toEqual('BUTTON')
  })

  it('accepts a class name', () => {
    const { baseElement } = render(
      <Button className="my-class" onClick={handleClick}>
        <div>{text}</div>
      </Button>,
    )
    const button = baseElement.querySelector('.my-class')
    expect(button).not.toBeNull()
    expect(button?.tagName).toEqual('BUTTON')
  })

  it('displays its children', () => {
    const { baseElement } = render(
      <Button onClick={handleClick}>
        <div>{text}</div>
      </Button>,
    )
    const button = baseElement.querySelector('.button')
    expect(button).not.toBeNull()
    expect(button).toContainHTML(`<div>${text}</div>`)
  })

  it('handles clicks', async () => {
    const user = userEvent.setup()
    const text = faker.lorem.paragraph()
    const handleClick = jest.fn()
    const { baseElement } = render(
      <Button onClick={handleClick}>
        <div>{text}</div>
      </Button>,
    )
    const button = baseElement.querySelector('.button')!
    expect(handleClick).not.toHaveBeenCalled()
    await user.click(button)
    expect(handleClick).toHaveBeenCalled()
  })
})
