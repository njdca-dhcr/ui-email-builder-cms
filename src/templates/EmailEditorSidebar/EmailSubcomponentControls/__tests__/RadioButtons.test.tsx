import { render } from '@testing-library/react'
import React from 'react'
import { Radio } from '../RadioButtons'
import { faker } from '@faker-js/faker'

describe(Radio.Button.displayName!, () => {
  it('is a radio input', () => {
    const { baseElement } = render(
      <Radio.Button onChange={jest.fn()} checked={true} label={faker.lorem.word()} />,
    )
    const input: HTMLInputElement | null = baseElement.querySelector('input')
    expect(input).not.toBeNull()
    expect(input!.type).toEqual('radio')
  })

  it('has a label', () => {
    const text = faker.lorem.words(3)
    const { baseElement } = render(
      <Radio.Button onChange={jest.fn()} checked={true} label={text} />,
    )
    const label: HTMLLabelElement | null = baseElement.querySelector('label')
    expect(label).toHaveTextContent(text)
  })

  it('can be checked', () => {
    const { baseElement } = render(
      <Radio.Button onChange={jest.fn()} checked={true} label={faker.lorem.word()} />,
    )
    const input: HTMLInputElement | null = baseElement.querySelector('input')

    expect(input).toBeChecked()
  })

  it('can be unchecked', () => {
    const { baseElement } = render(
      <Radio.Button onChange={jest.fn()} checked={false} label={faker.lorem.word()} />,
    )
    const input: HTMLInputElement | null = baseElement.querySelector('input')

    expect(input).not.toBeChecked()
  })
})

describe(Radio.Fieldset.displayName!, () => {
  it('is a fieldset', () => {
    const { baseElement } = render(
      <Radio.Fieldset legend={faker.lorem.paragraph()} legendId={faker.lorem.word()}>
        <p />
      </Radio.Fieldset>,
    )
    expect(baseElement.querySelector('fieldset')).not.toBeNull()
  })

  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <Radio.Fieldset legend={faker.lorem.paragraph()} legendId={faker.lorem.word()}>
        <p>{text}</p>
      </Radio.Fieldset>,
    )
    expect(baseElement).toContainHTML(`<p>${text}</p>`)
  })

  it('displays a legend', () => {
    const legend = faker.lorem.paragraph()
    const legendId = faker.lorem.word()
    const { baseElement } = render(
      <Radio.Fieldset legend={legend} legendId={legendId}>
        <p />
      </Radio.Fieldset>,
    )
    expect(baseElement.querySelector(`#${legendId}`)).toHaveTextContent(legend)
  })

  it('is labelled by the legend', () => {
    const legend = faker.lorem.paragraph()
    const legendId = faker.lorem.word()
    const { queryByLabelText } = render(
      <Radio.Fieldset legend={legend} legendId={legendId}>
        <p />
      </Radio.Fieldset>,
    )
    expect(queryByLabelText(legend)).not.toBeNull()
  })

  it('accepts classname', () => {
    const className = faker.lorem.word()
    const { baseElement } = render(
      <Radio.Fieldset
        className={className}
        legend={faker.lorem.paragraph()}
        legendId={faker.lorem.word()}
      >
        <p />
      </Radio.Fieldset>,
    )
    expect(baseElement.querySelector(`.${className}`)).not.toBeNull()
  })
})
