import React from 'react'
import { act, render, renderHook } from '@testing-library/react'
import { PreviewText, usePreviewText } from '../PreviewText'
import { faker } from '@faker-js/faker'
import { buildEmailTranslation } from 'src/factories'

describe('PreviewText', () => {
  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <PreviewText emailTranslation={buildEmailTranslation()}>
        <section>{text}</section>
      </PreviewText>,
    )
    expect(baseElement).toContainHTML(`<section>${text}</section>`)
  })
})

describe('usePreviewText', () => {
  it('provides the preview text and a way to update it', () => {
    const { result } = renderHook(() => usePreviewText(), {
      wrapper: (props) => (
        <PreviewText
          emailTranslation={buildEmailTranslation({ language: 'english', previewText: undefined })}
          {...props}
        />
      ),
    })
    let [previewText, setPreviewText] = result.current

    expect(previewText).toEqual('')

    const value = faker.lorem.paragraph()
    act(() => {
      setPreviewText(value)
    })
    previewText = result.current[0]

    expect(previewText).toEqual(value)
  })

  describe('when the current translation has preview text', () => {
    it('is the preview text from the current translation', async () => {
      const language = 'english'
      const translation = buildEmailTranslation({ language, previewText: faker.lorem.paragraph() })
      const { result } = renderHook(() => usePreviewText(), {
        wrapper: (props) => <PreviewText emailTranslation={translation} {...props} />,
      })
      const [previewText] = result.current

      expect(previewText).toEqual(translation.previewText)
    })
  })

  describe('when the current translation lacks preview text', () => {
    it('is an empty string', async () => {
      const language = 'english'
      const translation = buildEmailTranslation({ language, previewText: undefined })
      const { result } = renderHook(() => usePreviewText(), {
        wrapper: (props) => <PreviewText emailTranslation={translation} {...props} />,
      })
      const [previewText] = result.current
      expect(previewText).toEqual('')
    })
  })

  describe('when the current translation changes', () => {
    it('updates the preview text', async () => {
      const englishPreviewText = faker.lorem.paragraph()
      let translation = buildEmailTranslation({
        language: 'english',
        previewText: englishPreviewText,
      })

      const { result, rerender } = renderHook(() => usePreviewText(), {
        wrapper: (props) => <PreviewText emailTranslation={translation} {...props} />,
      })

      expect(result.current[0]).toEqual(englishPreviewText)

      const spanishPreviewText = faker.lorem.paragraph()
      translation = buildEmailTranslation({
        language: 'spanish',
        previewText: spanishPreviewText,
      })

      rerender()

      expect(result.current[0]).toEqual(spanishPreviewText)
    })
  })
})
