import { faker } from '@faker-js/faker'
import { render } from '@testing-library/react'
import React from 'react'
import { Control } from '../shared'

describe(Control.Group.displayName!, () => {
  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <Control.Group>
        <span>{text}</span>
      </Control.Group>,
    )
    expect(baseElement).toContainHTML(`<span>${text}</span>`)
  })

  it('accepts className', () => {
    const { baseElement } = render(
      <Control.Group className="my-class">
        <span />
      </Control.Group>,
    )
    const controlGroup: HTMLDivElement | null = baseElement.querySelector('.control-group') as any
    expect(controlGroup).not.toBeNull()
    expect(controlGroup?.className).toEqual('control-group my-class')
  })
})

describe(Control.Container.displayName!, () => {
  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <Control.Container>
        <span>{text}</span>
      </Control.Container>,
    )
    expect(baseElement).toContainHTML(`<span>${text}</span>`)
  })

  it('accepts className', () => {
    const { baseElement } = render(
      <Control.Container className="my-class">
        <span />
      </Control.Container>,
    )
    const controlContainer: HTMLDivElement | null = baseElement.querySelector(
      '.control-container',
    ) as any
    expect(controlContainer).not.toBeNull()
    expect(controlContainer?.className).toEqual('control-container my-class')
  })

  it('accepts a layout of column', () => {
    const { baseElement } = render(
      <Control.Container layout="column">
        <span />
      </Control.Container>,
    )
    const controlContainer: HTMLDivElement | null = baseElement.querySelector(
      '.control-container',
    ) as any
    expect(controlContainer).not.toBeNull()
    expect(controlContainer?.className).toEqual('control-container column')
  })
})

describe(Control.Label.displayName!, () => {
  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <Control.Label htmlFor={faker.lorem.word()}>
        <span>{text}</span>
      </Control.Label>,
    )
    expect(baseElement).toContainHTML(`<span>${text}</span>`)
  })

  it('has the correct "for" attribute', () => {
    const inputId = faker.lorem.word()
    const { baseElement } = render(
      <Control.Label htmlFor={inputId}>
        <span />
      </Control.Label>,
    )
    const label: HTMLLabelElement | null = baseElement.querySelector('label') as any
    expect(label).not.toBeNull()
    expect(label?.htmlFor).toEqual(inputId)
  })

  it('accepts className', () => {
    const inputId = faker.lorem.word()
    const { baseElement } = render(
      <Control.Label htmlFor={inputId} className="my-class">
        <span />
      </Control.Label>,
    )
    const label: HTMLLabelElement | null = baseElement.querySelector('label') as any
    expect(label).not.toBeNull()
    expect(label?.className).toEqual('control-label my-class')
  })

  it('accepts a size', () => {
    const { baseElement } = render(
      <Control.Label size="small">
        <span />
      </Control.Label>,
    )
    const label: HTMLLabelElement | null = baseElement.querySelector('label') as any
    expect(label).not.toBeNull()
    expect(label?.className).toEqual('control-label small')
  })

  it('accepts id', () => {
    const id = faker.lorem.word()
    const { baseElement } = render(
      <Control.Label id={id} className="my-class">
        <span />
      </Control.Label>,
    )
    const label: HTMLLabelElement | null = baseElement.querySelector('label') as any
    expect(label).not.toBeNull()
    expect(label?.id).toEqual(id)
  })
})
