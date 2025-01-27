import React from 'react'
import { render } from '@testing-library/react'
import IndexPage from '../index'

describe('index - Root page', () => {
  it('is displayed in a layout', () => {
    const { baseElement } = render(<IndexPage />)
    expect(baseElement.querySelector('.layout')).not.toBeNull()
  })

  it('shows a loading screen for the email templates', () => {})

  it('has links to create a template', () => {})

  describe('when the user has no drafts', () => {
    it('shows a message that there are no drafts', () => {})
  })

  describe('when the user has drafts', () => {
    it('shows 3 drafts', () => {})
  })

  describe('when there is an error loading drafts', () => {
    it('shows an error message', () => {})
  })
})
