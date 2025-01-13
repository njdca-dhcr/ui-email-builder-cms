import { render } from '@testing-library/react'
import React from 'react'
import { EmailComponentDescription } from '../EmailComponentDescription'
import { buildEmailTemplateComponent } from 'src/testHelpers'

describe('EmailComponentDescription', () => {
  describe('Name', () => {
    it('is a simple description', () => {
      const { baseElement } = render(
        <EmailComponentDescription emailComponent={buildEmailTemplateComponent('Name')} />,
      )
      const result = baseElement.querySelector('.description')
      expect(result).not.toBeNull()
      expect(result).toHaveTextContent(
        'Adding a name is highly encouraged. Avoid using "Dear" before the name',
      )
    })
  })

  describe('Header', () => {
    it('is nothing', () => {
      const { baseElement } = render(
        <EmailComponentDescription emailComponent={buildEmailTemplateComponent('Header')} />,
      )
      const result = baseElement.querySelector('.description')
      expect(result).toBeNull()
    })
  })

  describe('Body', () => {
    it('is nothing', () => {
      const { baseElement } = render(
        <EmailComponentDescription emailComponent={buildEmailTemplateComponent('Body')} />,
      )
      const result = baseElement.querySelector('.description')
      expect(result).toBeNull()
    })
  })

  describe('Footer', () => {
    it('is nothing', () => {
      const { baseElement } = render(
        <EmailComponentDescription emailComponent={buildEmailTemplateComponent('Footer')} />,
      )
      const result = baseElement.querySelector('.description')
      expect(result).toBeNull()
    })
  })

  describe('Banner', () => {
    it('is informs the user it can be edited on the Settings page', () => {
      const { baseElement } = render(
        <EmailComponentDescription emailComponent={buildEmailTemplateComponent('Banner')} />,
      )
      const result = baseElement.querySelector('.description')
      expect(result).not.toBeNull()
      expect(result).toHaveTextContent('Edit this in Settings')
      expect(result?.querySelector('a[href="/settings/email"]'))
    })
  })

  describe('StateSeal', () => {
    it('is informs the user it can be edited on the Settings page', () => {
      const { baseElement } = render(
        <EmailComponentDescription emailComponent={buildEmailTemplateComponent('StateSeal')} />,
      )
      const result = baseElement.querySelector('.description')
      expect(result).not.toBeNull()
      expect(result).toHaveTextContent('Edit this in Settings')
      expect(result?.querySelector('a[href="/settings/email"]'))
    })
  })

  describe('Disclaimer', () => {
    it('is informs the user it can be edited on the Settings page', () => {
      const { baseElement } = render(
        <EmailComponentDescription emailComponent={buildEmailTemplateComponent('Disclaimer')} />,
      )
      const result = baseElement.querySelector('.description')
      expect(result).not.toBeNull()
      expect(result).toHaveTextContent('Edit this in Settings')
      expect(result?.querySelector('a[href="/settings/email"]'))
    })
  })
})
