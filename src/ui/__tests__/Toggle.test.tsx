import { render } from '@testing-library/react'
import React from 'react'
import { Toggle } from '../Toggle'
import { faker } from '@faker-js/faker'
import userEvent from '@testing-library/user-event'

describe('Toggle', () => {
  it('has its given id', () => {
    const id = faker.lorem.word()
    const { baseElement } = render(<Toggle id={id} onChange={jest.fn()} value={true} />)
    const checkbox: HTMLInputElement = baseElement.querySelector('input') as any
    expect(checkbox).not.toBeNull()
    expect(checkbox.type).toEqual('checkbox')
    expect(checkbox.id).toEqual(id)
  })

  describe('when enabled', () => {
    it('can be "on"', () => {
      const { baseElement } = render(
        <Toggle disabled={false} id={faker.lorem.word()} onChange={jest.fn()} value={true} />,
      )
      const checkbox: HTMLInputElement = baseElement.querySelector('input') as any
      expect(checkbox.checked).toEqual(true)
    })

    it('can be "off"', () => {
      const { baseElement } = render(
        <Toggle disabled={false} id={faker.lorem.word()} onChange={jest.fn()} value={false} />,
      )
      const checkbox: HTMLInputElement = baseElement.querySelector('input') as any
      expect(checkbox.checked).toEqual(false)
    })

    it('can be toggled', async () => {
      const user = userEvent.setup()
      const handleChange = jest.fn()
      const { baseElement } = render(
        <Toggle disabled={false} id={faker.lorem.word()} onChange={handleChange} value={true} />,
      )
      const checkbox: HTMLInputElement = baseElement.querySelector('input') as any

      expect(handleChange).not.toHaveBeenCalled()
      await user.click(checkbox)
      expect(handleChange).toHaveBeenCalledWith(false)
    })
  })

  describe('when disabled', () => {
    it('can be "on"', () => {
      const { baseElement } = render(
        <Toggle disabled={true} id={faker.lorem.word()} onChange={jest.fn()} value={true} />,
      )
      const checkbox: HTMLInputElement = baseElement.querySelector('input') as any
      expect(checkbox.checked).toEqual(true)
    })

    it('can be "off"', () => {
      const { baseElement } = render(
        <Toggle disabled={true} id={faker.lorem.word()} onChange={jest.fn()} value={false} />,
      )
      const checkbox: HTMLInputElement = baseElement.querySelector('input') as any
      expect(checkbox.checked).toEqual(false)
    })

    it('cannot be toggled', async () => {
      const user = userEvent.setup()
      const handleChange = jest.fn()
      const { baseElement } = render(
        <Toggle disabled={true} id={faker.lorem.word()} onChange={handleChange} value={true} />,
      )
      const checkbox: HTMLInputElement = baseElement.querySelector('input') as any

      expect(handleChange).not.toHaveBeenCalled()
      await user.click(checkbox)
      expect(handleChange).not.toHaveBeenCalled()
    })
  })
})
