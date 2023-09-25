import React from 'react'
import {
  EmailEditorToggles,
  EmailEditorToggleSection,
  EmailEditorToggle,
} from '../EmailEditorToggles'
import { render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import userEvent from '@testing-library/user-event'
import { ShouldShowEmailPart } from '../../ShouldShowEmailPart'

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
      <ShouldShowEmailPart>
        <EmailEditorToggleSection
          componentId={faker.lorem.word()}
          description={text}
          label={faker.lorem.words(2)}
        >
          {null}
        </EmailEditorToggleSection>
      </ShouldShowEmailPart>,
    )
    const description = baseElement.querySelector('.description')
    expect(description).not.toBeNull()
    expect(description).toHaveTextContent(text)
  })

  it('does not display a description when none is given', () => {
    const { baseElement } = render(
      <ShouldShowEmailPart>
        <EmailEditorToggleSection
          componentId={faker.lorem.word()}
          label={faker.lorem.words(2)}
          description={undefined}
        >
          {null}
        </EmailEditorToggleSection>
      </ShouldShowEmailPart>,
    )
    const description = baseElement.querySelector('.description')
    expect(description).toBeNull()
  })

  describe('when it is required', () => {
    it('displays its label text', () => {
      const text = faker.lorem.words(3)
      const { baseElement } = render(
        <ShouldShowEmailPart>
          <EmailEditorToggleSection componentId={faker.lorem.word()} label={text} required={true}>
            {null}
          </EmailEditorToggleSection>
        </ShouldShowEmailPart>,
      )
      const label = baseElement.querySelector('.section-label')
      expect(label).not.toBeNull()
      expect(label).toHaveTextContent(text)
      expect(label?.tagName).toEqual('LABEL')
    })

    it('does not display a toggle', () => {
      const { baseElement } = render(
        <ShouldShowEmailPart>
          <EmailEditorToggleSection
            componentId={faker.lorem.word()}
            label={faker.lorem.words(2)}
            required={true}
          >
            {null}
          </EmailEditorToggleSection>
        </ShouldShowEmailPart>,
      )
      const checkbox = baseElement.querySelector('input[type="checkbox"]')
      expect(checkbox).toBeNull()
    })

    it('displays its children', () => {
      const text = faker.lorem.paragraph()
      const { baseElement } = render(
        <ShouldShowEmailPart>
          <EmailEditorToggleSection
            componentId={faker.lorem.word()}
            label={faker.lorem.words(2)}
            required={true}
          >
            <li>{text}</li>
          </EmailEditorToggleSection>
        </ShouldShowEmailPart>,
      )
      expect(baseElement).toContainHTML(`<li>${text}</li>`)
    })
  })

  describe('when it is not required', () => {
    it('displays its label text', () => {
      const text = faker.lorem.words(3)
      const { baseElement } = render(
        <ShouldShowEmailPart>
          <EmailEditorToggleSection componentId={faker.lorem.word()} label={text} required={false}>
            {null}
          </EmailEditorToggleSection>
        </ShouldShowEmailPart>,
      )
      const label = baseElement.querySelector('.section-label')
      expect(label).not.toBeNull()
      expect(label).toHaveTextContent(text)
      expect(label?.tagName).toEqual('LABEL')
    })

    it('displays a toggle', async () => {
      const user = userEvent.setup()
      const { baseElement } = render(
        <ShouldShowEmailPart>
          <EmailEditorToggleSection
            componentId={faker.lorem.word()}
            label={faker.lorem.words(2)}
            required={false}
          >
            {null}
          </EmailEditorToggleSection>
        </ShouldShowEmailPart>,
      )
      const checkbox: HTMLInputElement = baseElement.querySelector('input[type="checkbox"]') as any
      expect(checkbox).not.toBeNull()
      expect(checkbox.checked).toEqual(true)
      await user.click(checkbox)
      expect(checkbox.checked).toEqual(false)
    })

    it('displays its children', () => {
      const text = faker.lorem.paragraph()
      const { baseElement } = render(
        <ShouldShowEmailPart>
          <EmailEditorToggleSection
            componentId={faker.lorem.word()}
            label={faker.lorem.words(2)}
            required={false}
          >
            <li>{text}</li>
          </EmailEditorToggleSection>
        </ShouldShowEmailPart>,
      )
      expect(baseElement).toContainHTML(`<li>${text}</li>`)
    })
  })
})

describe('EmailEditorToggle', () => {
  it('displays its label', () => {
    const text = faker.lorem.words(3)
    const { baseElement } = render(
      <ShouldShowEmailPart>
        <EmailEditorToggle
          componentId={faker.lorem.word()}
          subComponentId={faker.lorem.word()}
          label={text}
          disabled={false}
        />
      </ShouldShowEmailPart>,
    )
    const label = baseElement.querySelector('.toggle-label')
    expect(label).not.toBeNull()
    expect(label).toHaveTextContent(text)
    expect(label?.tagName).toEqual('LABEL')
  })

  it('displays its toggle', async () => {
    const user = userEvent.setup()
    const { baseElement } = render(
      <ShouldShowEmailPart>
        <EmailEditorToggle
          componentId={faker.lorem.word()}
          subComponentId={faker.lorem.word()}
          label={faker.lorem.words(3)}
          disabled={false}
        />
      </ShouldShowEmailPart>,
    )

    const checkbox: HTMLInputElement = baseElement.querySelector('input[type="checkbox"]') as any
    expect(checkbox).not.toBeNull()
    expect(checkbox.checked).toEqual(true)
    expect(checkbox.disabled).toEqual(false)

    await user.click(checkbox)
    expect(checkbox.checked).toEqual(false)
  })

  it('can have a disabled toggle', () => {
    const { baseElement } = render(
      <ShouldShowEmailPart>
        <EmailEditorToggle
          componentId={faker.lorem.word()}
          subComponentId={faker.lorem.word()}
          label={faker.lorem.words(3)}
          disabled={true}
        />
      </ShouldShowEmailPart>,
    )

    const checkbox: HTMLInputElement = baseElement.querySelector('input[type="checkbox"]') as any
    expect(checkbox).not.toBeNull()
    expect(checkbox.disabled).toEqual(true)
  })

  describe('when its parent component is turned off', () => {
    it('has a disabled toggle', async () => {
      const user = userEvent.setup()
      const componentId = faker.lorem.word()
      const componentLabel = faker.lorem.words(3)
      const subComponentLabel = faker.lorem.words(4)
      const { getByLabelText } = render(
        <ShouldShowEmailPart>
          <EmailEditorToggleSection
            required={false}
            label={componentLabel}
            componentId={componentId}
          >
            <EmailEditorToggle
              componentId={componentId}
              subComponentId={faker.lorem.word()}
              label={subComponentLabel}
              disabled={false}
            />
          </EmailEditorToggleSection>
        </ShouldShowEmailPart>,
      )

      const componentToggle: HTMLInputElement = getByLabelText(componentLabel) as any
      const subComponentToggle: HTMLInputElement = getByLabelText(subComponentLabel) as any

      expect(componentToggle.checked).toEqual(true)
      expect(subComponentToggle.checked).toEqual(true)

      expect(subComponentToggle.disabled).toEqual(false)
      await user.click(componentToggle)
      expect(componentToggle.checked).toEqual(false)
      expect(subComponentToggle.disabled).toEqual(true)
    })
  })
})
