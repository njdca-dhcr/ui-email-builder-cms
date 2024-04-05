import React from 'react'
import { render } from '@testing-library/react'
import { MoreInfoAboutStatus } from '../MoreInfoAboutStatus'

describe('MoreInfoAboutSubComponent', () => {
  describe('MoreInfoAboutStatus', () => {
    it('renders without issue', () => {
      const { baseElement } = render(<MoreInfoAboutStatus />)
      expect(baseElement.querySelector('button')).not.toBeNull()
    })
  })
})
