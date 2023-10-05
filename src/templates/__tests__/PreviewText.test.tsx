import React, { FC, ReactNode } from 'react'
import { act, render, renderHook } from '@testing-library/react'
import { PreviewText, usePreviewText } from '../PreviewText'
import { faker } from '@faker-js/faker'

describe('PreviewText', () => {
  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <PreviewText>
        <section>{text}</section>
      </PreviewText>,
    )
    expect(baseElement).toContainHTML(`<section>${text}</section>`)
  })
})

describe('usePreviewText', () => {
  const wrapper: FC<{ children: ReactNode }> = (props) => <PreviewText {...props} />

  it('provides the preview text and a way to update it', () => {
    const { result } = renderHook(() => usePreviewText(), { wrapper })
    let [previewText, setPreviewText] = result.current

    expect(previewText).toEqual('')

    const value = faker.lorem.paragraph()
    act(() => {
      setPreviewText(value)
    })
    previewText = result.current[0]

    expect(previewText).toEqual(value)
  })
})
