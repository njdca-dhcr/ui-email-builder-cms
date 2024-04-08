import React from 'react'
import { render } from '@testing-library/react'
import { MoreInfoAboutStatus } from '../MoreInfoAboutStatus'
import { MoreInfoAboutAdditionalContent } from '../MoreInfoAboutAdditionalContent'
import { MoreInfoAboutDateRange } from '../MoreInfoAboutDateRange'
import { MoreInfoAboutProgramName } from '../MoreInfoAboutProgramName'
import { MoreInfoAboutDirectiveButton } from '../MoreInfoAboutDirectiveButton'
import { MoreInfoAboutDirective } from '../MoreInfoAboutDirective'

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

  describe('MoreInfoAboutDateRange', () => {
    it('renders without issue', () => {
      const { baseElement } = render(<MoreInfoAboutDateRange />)
      expect(baseElement.querySelector('button')).not.toBeNull()
    })
  })

  describe('MoreInfoAboutProgramName', () => {
    it('renders without issue', () => {
      const { baseElement } = render(<MoreInfoAboutProgramName />)
      expect(baseElement.querySelector('button')).not.toBeNull()
    })
  })

  describe('MoreInfoAboutDirectiveButton', () => {
    it('renders without issue', () => {
      const { baseElement } = render(<MoreInfoAboutDirectiveButton />)
      expect(baseElement.querySelector('button')).not.toBeNull()
    })
  })

  describe('MoreInfoAboutDirective', () => {
    it('renders without issue', () => {
      const { baseElement } = render(<MoreInfoAboutDirective />)
      expect(baseElement.querySelector('button')).not.toBeNull()
    })
  })
})
