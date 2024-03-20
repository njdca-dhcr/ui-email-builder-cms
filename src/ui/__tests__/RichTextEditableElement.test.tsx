import { render } from '@testing-library/react'
import React from 'react'
import { RichTextEditableElement, RichTextEditableElementProps } from '../RichTextEditableElement'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { TEST_ID as richTextEditorTestId } from '../RichTextEditor'
import { faker } from '@faker-js/faker'

describe('RichTextEditableElement', () => {
  describe('when focused', () => {
    let user: UserEvent

    const renderRichTextEditableElement = async (
      props: Partial<RichTextEditableElementProps> = {},
    ) => {
      const element = props.element ?? 'article'
      const rendered = render(
        <>
          <RichTextEditableElement
            label={faker.lorem.word()}
            element={element}
            value={[]}
            onValueChange={jest.fn()}
            {...props}
          />
          <button onClick={() => null}>blur</button>
        </>,
      )
      await user.click(rendered.getByRole(element))
      return rendered
    }

    beforeEach(() => {
      user = userEvent.setup()
    })

    it('is the given element', async () => {
      const element = 'article'
      const { baseElement } = await renderRichTextEditableElement({ element })
      expect(baseElement.querySelector(element)).not.toBeNull()
    })

    it('displays the rich text editor', async () => {
      const { queryByTestId } = await renderRichTextEditableElement()
      expect(queryByTestId(richTextEditorTestId)).not.toBeNull()
    })

    it('displays the rich text value', async () => {
      const text = faker.lorem.paragraph()
      const { baseElement } = await renderRichTextEditableElement({
        value: [{ type: 'paragraph', children: [{ text }] }],
      })
      const paragraph = baseElement.querySelector('p')
      expect(paragraph).not.toBeNull()
      expect(paragraph).toHaveTextContent(text)
    })

    it('displays the rich text value with additional styles', async () => {
      const text = faker.lorem.paragraph()
      const { baseElement } = await renderRichTextEditableElement({
        value: [{ type: 'paragraph', children: [{ text }] }],
        additionalStyles: { paragraph: { fontWeight: 'bolder' } },
      })
      const paragraph = baseElement.querySelector('p')
      expect(paragraph).not.toBeNull()
      expect(paragraph?.style.fontWeight).toEqual('bolder')
    })
  })

  describe('when blurred', () => {
    const renderRichTextEditableElement = (props: Partial<RichTextEditableElementProps> = {}) => {
      const element = props.element ?? 'article'
      return render(
        <RichTextEditableElement
          label={faker.lorem.word()}
          element={element}
          value={[]}
          onValueChange={jest.fn()}
          {...props}
        />,
      )
    }

    it('is the given element', () => {
      const element = 'article'
      const { baseElement } = renderRichTextEditableElement({ element })
      expect(baseElement.querySelector(element)).not.toBeNull()
    })

    it('displays rich text value', () => {
      const text = faker.lorem.paragraph()
      const { baseElement } = renderRichTextEditableElement({
        value: [{ type: 'paragraph', children: [{ text }] }],
      })
      const paragraph = baseElement.querySelector('p')
      expect(paragraph).not.toBeNull()
      expect(paragraph).toHaveTextContent(text)
    })

    it('displays the additional styles', () => {
      const text = faker.lorem.paragraph()
      const { baseElement } = renderRichTextEditableElement({
        additionalStyles: { paragraph: { fontWeight: 'bolder' } },
        value: [{ type: 'paragraph', children: [{ text }] }],
      })
      const paragraph = baseElement.querySelector('p')
      expect(paragraph).not.toBeNull()
      expect(paragraph?.style.fontWeight).toEqual('bolder')
    })
  })
})
