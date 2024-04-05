import React from 'react'
import { render } from '@testing-library/react'
import { MoreInfoAboutStatus } from '../MoreInfoAboutStatus'
import { MoreInfoAboutAdditionalContent } from '../MoreInfoAboutAdditionalContent'

describe('MoreInfoAboutSubComponent', () => {
  describe('MoreInfoAboutStatus', () => {
    it('renders without issue', () => {
      const { baseElement } = render(<MoreInfoAboutStatus />)
      expect(baseElement.querySelector('button')).not.toBeNull()
    })
  })

  describe('MoreInfoAboutAdditionalContent', () => {
    it('renders without issue', () => {
      const { baseElement } = render(<MoreInfoAboutAdditionalContent />)
      expect(baseElement.querySelector('button')).not.toBeNull()
    })
  })
})
