import { faker } from '@faker-js/faker'
import { render } from '@testing-library/react'
import React from 'react'
import { ColorPicker } from '../ColorPicker'

describe('ColorPicker', () => {
  it('accepts a className', () => {
    const { baseElement } = render(
      <ColorPicker
        value={faker.color.rgb()}
        onChange={jest.fn()}
        id={faker.lorem.word()}
        className="my-class"
      />,
    )
    const container = baseElement.querySelector('.my-class')
    expect(container).not.toBeNull()
  })

  it('has a color input', () => {
    const color = faker.color.rgb()
    const inputId = faker.lorem.word()
    const { baseElement } = render(<ColorPicker value={color} onChange={jest.fn()} id={inputId} />)
    const input: HTMLInputElement | null = baseElement.querySelector('input[type="color"]') as any
    expect(input).not.toBeNull()
    expect(input?.value).toEqual(color)
    expect(input?.type).toEqual('color')
    expect(input?.id).toEqual(inputId)
  })

  it('displays abbreviated hex codes as their full 6 character version', () => {
    const abbreviatedColor = '#abc'
    const inputId = faker.lorem.word()
    const { baseElement } = render(
      <ColorPicker value={abbreviatedColor} onChange={jest.fn()} id={inputId} />,
    )
    const input: HTMLInputElement | null = baseElement.querySelector('input[type="color"]') as any
    expect(input).not.toBeNull()
    expect(input?.value).toEqual('#aabbcc')
  })
})
