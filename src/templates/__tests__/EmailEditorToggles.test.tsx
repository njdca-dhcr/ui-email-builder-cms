import React from 'react'
import {
  EmailEditorToggles,
  EmailEditorToggleSection,
  EmailEditorToggle,
} from '../EmailEditorToggles'
import { render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import userEvent from '@testing-library/user-event'

describe('EmailEditorToggles', () => {
  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <EmailEditorToggles>
        <li>{text}</li>
      </EmailEditorToggles>,
    )
    expect(baseElement).toContainHTML(`<li>${text}</li>`)
  })
})

describe('EmailEditorToggleSection', () => {
  it('displays a description when given', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <EmailEditorToggleSection
        topLevelCanToggle={true}
        onChange={jest.fn()}
        label={faker.lorem.words(2)}
        value={true}
        description={text}
      />,
    )
    const description = baseElement.querySelector('.description')
    expect(description).not.toBeNull()
    expect(description).toHaveTextContent(text)
  })

  it('does not display a description when none is given', () => {
    const { baseElement } = render(
      <EmailEditorToggleSection
        topLevelCanToggle={true}
        onChange={jest.fn()}
        label={faker.lorem.words(2)}
        value={true}
        description={undefined}
      />,
    )
    const description = baseElement.querySelector('.description')
    expect(description).toBeNull()
  })

  describe('when it can be toggled', () => {
    it('displays its label text', () => {
      const text = faker.lorem.words(3)
      const { baseElement } = render(
        <EmailEditorToggleSection
          topLevelCanToggle={true}
          onChange={jest.fn()}
          label={text}
          value={true}
        />,
      )
      const label = baseElement.querySelector('.section-label')
      expect(label).not.toBeNull()
      expect(label).toHaveTextContent(text)
      expect(label?.tagName).toEqual('LABEL')
    })

    it('displays a toggle', async () => {
      const user = userEvent.setup()
      const handleChange = jest.fn()
      const { baseElement } = render(
        <EmailEditorToggleSection
          topLevelCanToggle={true}
          onChange={handleChange}
          label={faker.lorem.words(3)}
          value={true}
        />,
      )
      const checkbox: HTMLInputElement = baseElement.querySelector('input[type="checkbox"]') as any
      expect(checkbox).not.toBeNull()
      expect(checkbox.checked).toEqual(true)

      expect(handleChange).not.toHaveBeenCalled()
      await user.click(checkbox)
      expect(handleChange).toHaveBeenCalled()
    })

    it('displays its children', () => {
      const text = faker.lorem.paragraph()
      const { baseElement } = render(
        <EmailEditorToggleSection
          topLevelCanToggle={true}
          onChange={jest.fn()}
          label={faker.lorem.words(3)}
          value={true}
        >
          <li>{text}</li>
        </EmailEditorToggleSection>,
      )
      expect(baseElement).toContainHTML(`<li>${text}</li>`)
    })
  })

  describe('when it cannot be toggled', () => {
    it('displays its label text', () => {
      const text = faker.lorem.words(3)
      const { baseElement } = render(
        <EmailEditorToggleSection topLevelCanToggle={false} label={text}>
          <li />
        </EmailEditorToggleSection>,
      )
      const label = baseElement.querySelector('.section-label')
      expect(label).not.toBeNull()
      expect(label).toHaveTextContent(text)
      expect(label?.tagName).toEqual('SPAN')
    })

    it('does not display a toggle', () => {
      const { baseElement } = render(
        <EmailEditorToggleSection topLevelCanToggle={false} label={faker.lorem.words(3)}>
          <li />
        </EmailEditorToggleSection>,
      )
      expect(baseElement.querySelector('input[type="checkbox"]')).toBeNull()
    })

    it('displays its children', () => {
      const text = faker.lorem.paragraph()
      const { baseElement } = render(
        <EmailEditorToggleSection topLevelCanToggle={false} label={faker.lorem.words(3)}>
          <li>{text}</li>
        </EmailEditorToggleSection>,
      )
      expect(baseElement).toContainHTML(`<li>${text}</li>`)
    })
  })
})

describe('EmailEditorToggle', () => {
  it('displays its label', () => {
    const text = faker.lorem.words(3)
    const { baseElement } = render(
      <EmailEditorToggle label={text} disabled={false} value={true} onChange={jest.fn()} />,
    )
    const label = baseElement.querySelector('.toggle-label')
    expect(label).not.toBeNull()
    expect(label).toHaveTextContent(text)
    expect(label?.tagName).toEqual('LABEL')
  })

  it('displays its toggle', async () => {
    const user = userEvent.setup()
    const handleChange = jest.fn()
    const { baseElement } = render(
      <EmailEditorToggle
        label={faker.lorem.words(3)}
        disabled={false}
        value={true}
        onChange={handleChange}
      />,
    )

    const checkbox: HTMLInputElement = baseElement.querySelector('input[type="checkbox"]') as any
    expect(checkbox).not.toBeNull()
    expect(checkbox.checked).toEqual(true)
    expect(checkbox.disabled).toEqual(false)

    expect(handleChange).not.toHaveBeenCalled()
    await user.click(checkbox)
    expect(handleChange).toHaveBeenCalled()
  })

  it('can have a disabled toggle', () => {
    const { baseElement } = render(
      <EmailEditorToggle
        label={faker.lorem.words(3)}
        disabled={true}
        value={true}
        onChange={jest.fn()}
      />,
    )

    const checkbox: HTMLInputElement = baseElement.querySelector('input[type="checkbox"]') as any
    expect(checkbox).not.toBeNull()
    expect(checkbox.disabled).toEqual(true)
  })
})
