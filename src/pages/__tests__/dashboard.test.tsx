import React from 'react'
import { render } from '@testing-library/react'
import IndexPage from '../index'

describe('index - Root page', () => {
  it('is displayed in a layout', () => {
    const { baseElement } = render(<IndexPage />)
    expect(baseElement.querySelector('.layout')).not.toBeNull()
  })
})
