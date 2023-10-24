import { faker } from '@faker-js/faker'
import { render } from '@testing-library/react'
import React from 'react'
import { ColorPicker } from '../ColorPicker'

describe('ColorPicker', () => {
  it('displays color', () => {
    const color = faker.color.rgb()
    const { baseElement } = render(
      <ColorPicker value={color} onChange={jest.fn()} id={faker.lorem.word()} />,
    )
    const span = baseElement.querySelector('span')
    expect(span).not.toBeNull()
    expect(span).toHaveTextContent(color)
  })

  it('has an input (type color)', () => {
    const color = faker.color.rgb()
    const inputId = faker.lorem.word()
    const { baseElement } = render(<ColorPicker value={color} onChange={jest.fn()} id={inputId} />)
    const input: HTMLInputElement | null = baseElement.querySelector('input') as any
    expect(input).not.toBeNull()
    expect(input?.value).toEqual(color)
    expect(input?.type).toEqual('color')
    expect(input?.id).toEqual(inputId)
  })
})
