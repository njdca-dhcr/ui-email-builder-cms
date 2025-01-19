import React from 'react'
import { render } from '@testing-library/react'
import { TranslationModeHeader } from '../TranslationModeHeader'

describe('TranslationModeHeader', () => {
  const renderComponent = () => {
    return render(<TranslationModeHeader previewType="desktop" onPreviewTypeChange={jest.fn()} />)
  }

  it('displays an exit translation mode button', async () => {
    const { queryByRole } = await renderComponent()
    expect(queryByRole('button', { name: 'Exit Translation Mode' })).toBeTruthy()
  })

  it('displays the preview type selector', async () => {
    const { baseElement } = renderComponent()
    expect(baseElement.querySelector('.select-preview-type')).toBeTruthy()
  })
})
