import React from 'react'
import { render } from '@testing-library/react'
import IndexPage from '../index'
import { TEST_ID as layoutTestId } from '../../ui/Layout'

describe('index - Root page', () => {
  it('is displayed in a layout', () => {
    const { queryByTestId } = render(<IndexPage />)
    expect(queryByTestId(layoutTestId)).not.toBeNull()
  })
})
